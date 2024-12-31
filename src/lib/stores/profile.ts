import { goto } from '$app/navigation';
import { API_BASE_URL } from '$lib/config';
import { getJWT, logout } from '$lib/stores/auth';
import type { ProfileData } from '$lib/types/Profile';

export async function getProfiles() {
	const JWT = getJWT();
	console.log('getJWT from prof.ts:', JWT);

	if (!JWT) {
		goto('/user/auth/sign-in');
		return false;
	}

	const response = await fetch(`${API_BASE_URL}/profiles`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${JWT}`
		}
	});

	if(!response.ok) {
		if(response.status === 401) {
			logout();
			goto('/user/auth/sign-in');
		}
	}

	return await response.json();
}

/**
 * Save user profile
 */
export async function saveProfile(profileData: ProfileData): Promise<number | boolean> {
	const JWT = getJWT();

	if (!JWT) {
		goto('/user/auth/sign-in');
		return false;
	}

	// Dynamically filter out empty values
	const filterNonEmptyValues = (data: Record<string, string | undefined>) =>
		Object.entries(data).reduce(
			(acc, [key, value]) => {
				if (value && value.trim() !== '') {
					// Check for non-empty strings
					acc[key] = value;
				}
				return acc;
			},
			{} as Record<string, string>
		);

	// Transform `ProfileData` into the required API format
	const apiRequestBody = {
		profileType: 'personal',
		fullName: profileData.fullName,
		profileData: filterNonEmptyValues({
			date_of_birth: profileData.dob,
			phone_number: profileData.phone,
			address_line_1: profileData.location,
			address_line_2: profileData.address,
			address_city: profileData.city,
			address_zip_code: profileData.postalCode,
			img_profile_url: profileData.profileImage
		})
	};

	console.log('apiRequestBody:', apiRequestBody);

	try {
		const response = await fetch(`${API_BASE_URL}/profiles`, {
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
		console.log('profile saved with profile id: ', result.profile.profileId);
		return result.profile.profileId;
	} catch (error) {
		console.log(error);
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

	// Dynamically filter out empty values
	const filterNonEmptyValues = (data: Record<string, string | undefined>) =>
		Object.entries(data).reduce(
			(acc, [key, value]) => {
				if (value && value.trim() !== '') {
					// Check for non-empty strings
					acc[key] = value;
				}
				return acc;
			},
			{} as Record<string, string>
		);

	// Transform `ProfileData` into the required API format
	const apiRequestBody = {
		profileType: 'business',
		fullName: profileData.fullName,
		profileData: filterNonEmptyValues({
		  org_name: profileData.org_name,
		  job_title: profileData.job_title,
		  work_email: profileData.work_email,
		  about_business: profileData.about_business,
		  industry: profileData.industry,
		  business_website_url: profileData.business_website_url,
		  business_website_title: profileData.business_website_title,
		})
	  };
	  
	console.log('apiRequestBody for saveBusinessProfile:', apiRequestBody);

	try {
		const response = await fetch(`${API_BASE_URL}/profiles`, {
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
		console.log('Business profile saved with profile id: ', result.profile.profileId);
		return result.profile.profileId;
	} catch (error) {
		console.log(error);
		throw error;
	}
}