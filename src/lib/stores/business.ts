import { goto } from '$app/navigation';
import { API_BASE_URL } from '$lib/config';
import { getJWT, logout } from '$lib/stores/auth';
import type { ProfileData } from '$lib/types/Profile';

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
