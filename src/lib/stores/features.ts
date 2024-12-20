import { goto } from '$app/navigation';
import { API_BASE_URL } from '$lib/config';
import { getJWT, logout } from '$lib/stores/auth';
import type { ProfileData } from '$lib/types/Profile';

export async function getFeatures() {
    const JWT = getJWT();
    console.log('getJWT from prof.ts:', JWT);

    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/feature-names`, {
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
        return false;
    }

    return await response.json();
}

export async function addFeatures(featureData: any) {
    const JWT = getJWT();
    console.log('getJWT from prof.ts:', JWT);

    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/feature-names`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JWT}`
        },
        body: JSON.stringify(featureData)
    });

    if(!response.ok) {
        if(response.status === 401) {
            logout();
            goto('/user/auth/sign-in');
        }
        return false;
    }

    return await response.json();
}

export async function getFeatureById(featureId: any) {
    const JWT = getJWT();
    console.log('getJWT from prof.ts:', JWT);

    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/feature-names/${featureId}`, {
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
        return false;
    }

    return await response.json();
}

export async function updateFeature(featureId: any, featureData: any) {
    const JWT = getJWT();
    console.log('getJWT from prof.ts:', JWT);

    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/feature-names/${featureId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JWT}`
        },
        body: JSON.stringify(featureData)
    });

    if(!response.ok) {
        if(response.status === 401) {
            logout();
            goto('/user/auth/sign-in');
        }
        return false;
    }

    return await response.json();
}

export async function deleteFeature(featureId: any) {
    const JWT = getJWT();
    console.log('getJWT from prof.ts:', JWT);

    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/feature-names/${featureId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${JWT}`
        }
    });

    if(!response.ok) {
        if(response.status === 401) {
            logout();
            goto('/user/auth/sign-in');
        }
        return false;
    }

    return true;
}
