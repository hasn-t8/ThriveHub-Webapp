import { goto } from '$app/navigation';
import { API_BASE_URL } from '$lib/config';
import { getJWT, logout } from '$lib/stores/auth';
import type { ProfileData } from '$lib/types/Profile';
import { writable } from 'svelte/store';

export const Email = writable('');
/** 
 * Upload a Business Logo
 */
export async function uploadBusinessLogo(file: File, businessProfileId: number): Promise<boolean> {
	const JWT = getJWT();

	if (!JWT) {
		goto('/user/auth/sign-in');
		return false;
	}

	// Create a FormData object to handle multipart/form-data
	const formData = new FormData();
	formData.append('logo', file); // Append the logo file
	formData.append('businessProfileId', String(businessProfileId)); // Append the profile ID

	try {
		// Perform the POST request
		const response = await fetch(`${API_BASE_URL}/upload-logo`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${JWT}` // Add the JWT token for authentication
			},
			body: formData // Use FormData as the request body
		});

		if (!response.ok) {
			if (response.status === 401) {
				logout();
				goto('/user/auth/sign-in');
			}
			throw new Error(`Failed to upload logo: ${response.statusText}`);
		}

		const result = await response.json();
		console.log('Logo uploaded successfully:', result);
		// alert('Logo uploaded successfully!');
		return true;
	} catch (error) {
		console.error('Error uploading logo:', error);
		alert('Failed to upload logo. Please try again.');
		return false;
	}
}

export async function getProfileById(profilId: number) {

	const response = await fetch(`${API_BASE_URL}/businessprofiles/${profilId}`, {
		method: 'GET'
	});
	console.log('response from business-prof.ts:', response);

	if (!response.ok) {
		if (response.status === 401) {
			logout();
			goto('/user/auth/sign-in');
		}
	}

	return await response.json();
}

export async function getProfiles() {
	const JWT = getJWT();
	console.log(JWT);

	if (!JWT) {
		goto('/user/auth/sign-in');
		return false;
	}

	const response = await fetch(`${API_BASE_URL}/admin/businessprofiles`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${JWT}`
		}
	});
	// console.log('response from business-prof.ts:', response);

	if (!response.ok) {
		if (response.status === 401) {
			logout();
			goto('/user/auth/sign-in');
		}
	}

	return await response.json();
}

export async function getProfilesPublic(): Promise<any> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/businessprofiles`, {
            method: 'GET'
        });

        if (!response.ok) {
            console.error(`API request failed with status ${response.status}`);
            return {
                error: `Failed to fetch profiles. Status: ${response.status}`
            };
        }

        const profilesData = await response.json();
        console.log('Profiles fetched:', profilesData.data);
        return profilesData.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return { error: 'An unexpected error occurred.' };
    }
}


/**
 * Delete a Business profile
 */
export async function deleteBusinessProfile(profileId: number): Promise<boolean> {
	const JWT = getJWT();

	if (!JWT) {
		goto('/user/auth/sign-in');
		return false;
	}

	try {
		const response = await fetch(`${API_BASE_URL}/businessprofiles/${profileId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${JWT}`
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to delete profile: ${response.statusText}`);
		}

		console.log('Business profile deleted successfully');
		alert('Business profile deleted successfully!');
		return true;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

/**
 * Save Business profile
 */
export async function saveBusinessProfile(profileData: ProfileData): Promise<number | boolean> {
	const JWT = getJWT();

	if (!JWT) {
		goto('/user/auth/sign-in');
		return false;
	}

	const filterNonEmptyValues = (data: Record<string, string | undefined>) =>
		Object.entries(data).reduce(
			(acc, [key, value]) => {
				if (value && value.trim() !== '') {
					acc[key] = value;
				}
				return acc;
			},
			{} as Record<string, string>
		);

	const apiRequestBody = {
		profileType: 'business',
		fullName: profileData.fullName,
		profileData: filterNonEmptyValues({
			org_name: profileData.org_name,
			job_title: profileData.job_title,
			work_email: profileData.work_email,
			about_business: profileData.about_business,
			category: profileData.category,
			business_website_url: profileData.business_website_url,
			business_website_title: profileData.business_website_title
		})
	};

	console.log('apiRequestBody for saveBusinessProfile:', apiRequestBody);

	try {
		const response = await fetch(`${API_BASE_URL}/businessprofiles`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${JWT}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(apiRequestBody)
		});

		if (!response.ok) {
			throw new Error(`Failed to save profile: ${response}`);
		}

		const result = await response.json();
		console.log('Business profile saved with profile ID: ', result.profile.profileId);
		alert('Business profile submitted successfully!');
		return result.profile.profileId;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

/**
 * Update an existing Business profile
 */
export async function updateBusinessProfile(
	profileId: number,
	profileData: Partial<ProfileData>
): Promise<boolean> {
	const JWT = getJWT();

	if (!JWT) {
		goto('/user/auth/sign-in');
		return false;
	}

	const apiRequestBody = {
		profileData: {
			org_name: profileData.org_name,
			category: profileData.category,
			work_email: profileData.work_email,
			about_business: profileData.about_business,
			business_website_title: profileData.business_website_title,
			business_website_url: profileData.business_website_url
		}
	};

	console.log('apiRequestBody for updateBusinessProfile:', apiRequestBody);

	try {
		const response = await fetch(`${API_BASE_URL}/businessprofiles/${profileId}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${JWT}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(apiRequestBody)
		});

		if (!response.ok) {
			throw new Error(`Failed to update profile: ${response.statusText}`);
		}

		const result = await response.json();
		console.log('Business profile updated successfully:', result);
		alert('Business profile updated successfully!');
		return true;
	} catch (error) {
		console.error(error);
		throw error;
	}
}


/**
 * Register a new user
 */
export async function registerUser(
	userData: {
		email: string;
		password: string;
		types: string[];
		full_name: string;
		org_name: string;
		job_title: string;
		business_website_url: string;
	}
): Promise<boolean> {
	const JWT = getJWT();

	if (!JWT) {
		goto('/user/auth/sign-in');
		return false;
	}

	const apiRequestBody = {
		userData: {
			email: userData.email,
			password: userData.password,
			types: userData.types,
			full_name: userData.full_name,
			org_name: userData.org_name,
			job_title: userData.job_title,
			business_website_url: userData.business_website_url,
		}
	};

	console.log('apiRequestBody for registerUser:', apiRequestBody);

	try {
		const response = await fetch(`${API_BASE_URL}/auth/register`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${JWT}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(apiRequestBody)
		});

		if (!response.ok) {
			if (response.status === 400) {
				const errorData = await response.json();
				throw new Error(
					errorData.errors?.map((err: { msg: string }) => err.msg).join(', ') || 'Validation error'
				);
			} else if (response.status === 409) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Conflict: Email already exists');
			} else {
				throw new Error(`Failed to register user: ${response.statusText}`);
			}
		}

		const result = await response.json();
		console.log('User registered successfully:', result);
		alert('User registered successfully!');
		return true;
	} catch (error) {
		console.error(error);
		throw error;
	}
}


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
