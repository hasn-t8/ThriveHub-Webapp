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
    console.log('function hit');

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
export interface KeyFeature {
    featureNameId: number;
    text: string;
  }

// export async function createKeyFeature(newFeature: KeyFeature): Promise<any> {
//     const JWT = getJWT();
//     if (!JWT) {
//       goto('/user/auth/sign-in');
//       return false;
//     }
  
//     try {
//       console.log("Sending payload:", newFeature);
  
//       const response = await fetch(`${API_BASE_URL}/keyfeatures`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${JWT}`
//         },
//         body: JSON.stringify(newFeature)
//       });
  
//       if (!response.ok) {
//         const errorDetails = await response.json();
//         console.error("API Response Error:", errorDetails);
//         throw new Error(`API Error: ${errorDetails.message || 'Unknown error'}`);
//       }
  
//       return await response.json();
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         console.error("Network or Parsing Error:", error.message);
//       } else {
//         console.error("Unexpected Error:", error);
//       }
//       return false;
//     }
//   }
  

export async function createKeyFeature(featureData: number) {
    console.log('function hit');

    const JWT = getJWT();
    console.log('getJWT from prof.ts:', JWT);

    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/keyfeatures`, {
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
  

export async function getKeyFeatures(businessProfileId: number) {
    const JWT = getJWT();
    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/keyfeatures/business-profile/${businessProfileId}`, {
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


export async function deleteKeyFeatureById(keyFeatureId: any) {
    const JWT = getJWT();
    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/keyfeatures/${keyFeatureId}`, {
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
