import { goto } from '$app/navigation';
import { API_BASE_URL } from '$lib/config';
import { getJWT, logout } from '$lib/stores/auth';
import type { ProfileData } from '$lib/types/Profile';

export async function getProfileById(profilId: number) {
	const JWT = getJWT();
	console.log(JWT);

	if (!JWT) {
		goto('/user/auth/sign-in');
		return false;
	}

	const response = await fetch(`${API_BASE_URL}/businessprofiles/${profilId}`, {
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
			industry: profileData.industry,
			business_website_url: profileData.business_website_url
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

	console.log(
		'filterNonEmptyValues:',
		filterNonEmptyValues({
			org_name: profileData.org_name,
			category: profileData.category,
			business_website_url: profileData.business_website_url
		})
	);

	const apiRequestBody = {
		profileData: {
			org_name: profileData.org_name,
			category: profileData.category,
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
