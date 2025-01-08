import { goto } from '$app/navigation';
import { API_BASE_URL } from '$lib/config';
import { writable } from 'svelte/store';

export const userEmail = writable('');
type User = {
	userTypes: string[];
	[key: string]: unknown;
};

export const theUser = writable<User>({ userTypes: [] });
export const isAdmin = writable(false);

type JWTHeader = {
	alg: string;
	typ: string;
};

type JWTPayload = {
	exp?: number;
	[key: string]: unknown;
};

type DecodedJWT = {
	header: JWTHeader;
	payload: JWTPayload;
	signature: string;
};

// Create a reactive store for the token
// export const token = writable(false);

/*********** Login and Logout Function ***********/
export const loggedInStatus = writable(false);

export function login(token: string) {
	console.log('login:', token);

	localStorage.setItem('authToken', token);
	loggedInStatus.set(true);
	theUser.set({ userTypes: [] });
}

export function logout() {
	localStorage.removeItem('authToken');
	loggedInStatus.set(false);
	isAdmin.set(false);
	goto('/');
}

export function getJWT() {
	const jwtToken = localStorage.getItem('authToken');

	if (jwtToken) {
		const decodedToken = decodeJWT(jwtToken);
		console.log('decodedToken:', decodedToken);

		const isValid = isTokenValid(jwtToken);
		console.log('isValid:', isValid);
		if (isValid) {
			return jwtToken;
		} else {
			const getNewJWT = refreshJWT();
			if (getNewJWT) {
				console.log('getNewJWT:', getNewJWT);
				return getNewJWT;
			} else {
				console.log(
					'logout called because token is invalid after refresh JWT check from the getNewJWT function'
				);
				logout();
				return false;
			}
		}
	}
	return false;
}

export function refreshJWT() {
	console.log('refreshJWT called');
	const jwtToken = localStorage.getItem('authToken'); //TODO: Implement refresh token logic

	if (jwtToken) {
		const isValid = isTokenValid(jwtToken);
		if (isValid) {
			return jwtToken;
		}
	}
	return false;
}

export function storeUserType(userTypes: string[]) {
	localStorage.setItem('userType', JSON.stringify(userTypes)); // Save as JSON string
	console.log('User type stored in localStorage:', userTypes);
}

export function setUserAndType() {
	const jwtToken = localStorage.getItem('authToken');

	if (jwtToken) {
		const { payload } = decodeJWT(jwtToken);
		console.log('payload:', payload);
		storeUserType((payload as User).userTypes || []);

		const isValid = isTokenValid(jwtToken);
		if (isValid) {
			theUser.set(payload as User);
			if ((payload as User).userTypes.includes('admin')) {
				isAdmin.set(true);
			}
		}
	}
}

/*********** JWT Helper Functions ***********/
const decodeJWT = (token: string): DecodedJWT => {
	const [header, payload, signature] = token.split('.');

	const decodeBase64Url = (str: string): { [key: string]: unknown } => {
		const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
		const json = atob(base64);
		return JSON.parse(json);
	};

	const decodedHeader = decodeBase64Url(header) as JWTHeader;
	const decodedPayload = decodeBase64Url(payload);

	return { header: decodedHeader, payload: decodedPayload, signature };
};
const isTokenValid = (token: string): boolean => {
	const { payload } = decodeJWT(token);
	if (!payload) return false; // If payload decoding fails, return false

	const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
	const bufferTime = 60; // Buffer time in seconds (1 minute)

	if (!payload.exp) {
		console.error("Token has no 'exp' field");
		return false;
	}
	const isValid = payload.exp > currentTime + bufferTime; // Check expiration
	return isValid; // Return true if valid, false if expired or about to expire
};

/********************password management********************/

export async function forgotPassword(email: string): Promise<string> {
	try {
		const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		if (!response.ok) {
			const errorData = await response.json();

			// Handle specific status codes
			if (response.status === 400) {
				const validationErrors = errorData.errors.map((err: { msg: string }) => err.msg).join(', ');
				throw new Error(`Validation error: ${validationErrors}`);
			}
			if (response.status === 404) {
				throw new Error(errorData.error || 'User not found.');
			}
			if (response.status === 500) {
				throw new Error(errorData.error || 'Internal Server Error.');
			}

			throw new Error('An unexpected error occurred.');
		}

		const data = await response.json();
		console.log('Password reset token sent successfully:', data);
		return data.message || 'Password reset token sent successfully.';
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error in forgotPassword:', error.message);
			throw error;
		} else {
			console.error('Unexpected error:', error);
			throw new Error('An unexpected error occurred.');
		}
	}
}

export async function changePassword(
	email: string,
	token: string,
	newPassword: string
): Promise<string> {
	try {
		const response = await fetch(`${API_BASE_URL}/auth/forgot-password/change`, {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, token, newPassword })
		});

		if (!response.ok) {
			const errorData = await response.json();

			// Handle specific status codes
			if (response.status === 400) {
				const validationErrors = errorData.errors.map((err: { msg: string }) => err.msg).join(', ');
				const tokenError = errorData.error || '';
				throw new Error(
					`Validation error: ${validationErrors}${tokenError ? ` (${tokenError})` : ''}`
				);
			}
			if (response.status === 404) {
				throw new Error(errorData.error || 'User not found.');
			}
			if (response.status === 500) {
				throw new Error(errorData.error || 'Internal Server Error.');
			}

			throw new Error('An unexpected error occurred.');
		}

		const data = await response.json();
		console.log('Password changed successfully:', data);
		return data.message || 'Password changed successfully.';
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error in changePassword:', error.message);
			throw error;
		} else {
			console.error('Unexpected error:', error);
			throw new Error('An unexpected error occurred.');
		}
	}
}

export async function changeMyPassword(
	currentPassword: string,
	newPassword: string
): Promise<string | void> {
	const JWT = getJWT();

	if (!JWT) {
		goto('/user/auth/sign-in');
		return;
	}

	try {
		const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
			method: 'POST',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${JWT}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ currentPassword, newPassword })
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.log('errorData:', errorData.error);
			throw new Error(errorData.error || 'An unexpected error occurred.');
		}

		const data = await response.json();
		console.log('Password changed successfully:', data);
		return data.message || 'Password changed successfully.';
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error in changePassword:', error.message);
			throw error;
		} else {
			console.error('Unexpected error:', error);
			throw new Error('An unexpected error occurred.');
		}
	}
}

/********************Account verification********************/

export async function getVerificationCode(email: string): Promise<number> {
	try {
		const response = await fetch(`${API_BASE_URL}/auth/activate-account/get-code`, {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		if (!response.ok) {
			const errorData = await response.json();

			// Handle specific status codes
			if (response.status === 400) {
				const validationErrors = errorData.errors.map((err: { msg: string }) => err.msg).join(', ');
				throw new Error(`Validation error: ${validationErrors}`);
			}
			if (response.status === 404) {
				throw new Error(errorData.error || 'User not found or code not found.');
			}
			if (response.status === 500) {
				throw new Error(errorData.error || 'Internal Server Error.');
			}

			throw new Error('An unexpected error occurred.');
		}

		const data = await response.json();
		console.log('Verification code retrieved successfully:', data);
		return data.verificationCode;
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error in getVerificationCode:', error.message);
			throw error;
		} else {
			console.error('Unexpected error:', error);
			throw new Error('An unexpected error occurred.');
		}
	}
}
