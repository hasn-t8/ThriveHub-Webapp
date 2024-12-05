// import { writable } from 'svelte/store';

// // Check if running in a browser (client-side only)
// const isBrowser = typeof window !== 'undefined';

// // Initialize authToken store with a value from localStorage (only if in a browser)
// export const authToken = writable(isBrowser ? localStorage.getItem('authToken') : null);

// // Sync authToken changes with localStorage
// if (isBrowser) {
//     authToken.subscribe((value) => {
//         if (value) {
//             localStorage.setItem('authToken', value);
//         } else {
//             localStorage.removeItem('authToken');
//         }
//     });

//     // Optional: Listen for storage events to sync across tabs
//     window.addEventListener('storage', (event) => {
//         if (event.key === 'authToken') {
//             authToken.set(event.newValue);
//         }
//     });
// }

// const authToken = typeof window !== 'undefined' ? localStorage.Item('authToken') || '' : '';
// const loggedInStatus = writable(!!authToken);

import { writable } from 'svelte/store';

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
}

export function logout() {
	console.log('logout');

	localStorage.removeItem('authToken');
	loggedInStatus.set(false);
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
				console.log('logout called because token is invalid after refresh JWT check from the getNewJWT function');
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
/****************************************/