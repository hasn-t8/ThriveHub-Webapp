import { goto } from '$app/navigation';
import { API_BASE_URL } from '$lib/config';
import { getJWT, logout } from '$lib/stores/auth';
// import type { ProfileData } from '$lib/types/Profile';



export async function addKeypointname(keypointData: any) {
    console.log('function hit');

    const JWT = getJWT();
    console.log('getJWT from prof.ts:', JWT);

    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/business-key-point-names`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JWT}`
        },
        body: JSON.stringify(keypointData)
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
// export async function addKeypoint(keypointData: any) {
//     console.log('Function hit: addKeypoint');

//     const JWT = getJWT();
//     console.log('Retrieved JWT:', JWT);

//     if (!JWT) {
//         console.warn('JWT not found, redirecting to sign-in');
//         goto('/user/auth/sign-in');
//         return { success: false, error: 'JWT missing' };
//     }

//     try {
//         const response = await fetch(`${API_BASE_URL}/business-key-point-names`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${JWT}`
//             },
//             body: JSON.stringify(keypointData)
//         });

//         if (!response.ok) {
//             if (response.status === 401) {
//                 console.warn('Unauthorized, logging out user');
//                 logout();
//                 goto('/user/auth/sign-in');
//                 return { success: false, error: 'Unauthorized' };
//             }

//             const errorMessage = await response.text();
//             console.error(`Error adding keypoint: ${response.status} - ${errorMessage}`);
//             return { success: false, error: errorMessage || 'Unknown error' };
//         }

//         return { success: true, data: await response.json() };
//     } catch (error) {
//         console.error('Network or server error:', error);
//         return { success: false, error: 'Network or server error' };
//     }
// }

type KeyPoint = {
    name: string; // Define properties you expect in the keypoint object
};

export async function getKeypointnames(): Promise<KeyPoint[] | false> {
    const JWT = getJWT();
    console.log('getJWT from prof.ts:', JWT);

    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/business-key-point-names/feature`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${JWT}`,
            },
        });

        if (!response.ok) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            if (response.status === 401) {
                logout();
                goto('/user/auth/sign-in');
            }
            return false;
        }

        const data = await response.json();
        // Validate the structure of the data
        if (!Array.isArray(data) || !data.every(item => typeof item === 'object' && 'name' in item)) {
            console.error('Unexpected data structure:', data);
            return false;
        }

        return data as KeyPoint[];
    } catch (error) {
        console.error('Fetch error:', error);
        return false;
    }
}

export async function createKeyPoint(featureData: number) {
    console.log('function hit');

    const JWT = getJWT();
    console.log('getJWT from prof.ts:', JWT);

    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/business-key-points`, {
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
  
export async function getKeyPoints(businessProfileId: number) {
    const JWT = getJWT();
    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/business-key-points/business-profile/${businessProfileId}`, {
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

export async function deleteKeyPointById(id: any) {
    const JWT = getJWT();
    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/business-key-points/${id}`, {
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