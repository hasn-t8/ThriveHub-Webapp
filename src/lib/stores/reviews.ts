import { goto } from '$app/navigation';
import { API_BASE_URL } from '$lib/config';
import { getJWT, logout } from '$lib/stores/auth';
import type { AnyARecord } from 'node:dns';

/**
 * Fetch all reviews by business ID.
 * @param {number} businessId - The ID of the business.
 * @returns {Promise<any>} The reviews data or false if unauthorized.
 */
export async function getAllReviewsByBusinessId(businessId: any) {
    const JWT = getJWT();
    console.log('getJWT:', JWT);

    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/reviews/business/${businessId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${JWT}`
        }
    });

    if (!response.ok) {
        if (response.status === 401) {
            logout();
            goto('/user/auth/sign-in');
        }
        return false;
    }

    return await response.json();
}

/**
 * Fetch all reviews in the system.
 * @returns {Promise<any>} The reviews data or false if unauthorized.
 */
export async function getAllReviews() {
    const JWT = getJWT();
    console.log('getJWT:', JWT);

    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${JWT}`
        }
    });

    if (!response.ok) {
        if (response.status === 401) {
            logout();
            goto('/user/auth/sign-in');
        }
        return false;
    }

    return await response.json();
}

/**
 * Get a review by its ID.
 * @param {number} reviewId - The ID of the review to fetch.
 * @returns {Promise<any>} The review data or false if unauthorized.
 */
export async function getReviewById(reviewId: AnyARecord) {
    const JWT = getJWT();
  
    if (!JWT) {
      goto('/user/auth/sign-in');
      return false;
    }
  
    const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    });
  
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        goto('/user/auth/sign-in');
      }
      return false;
    }
  
    return await response.json();
  }
  
/**
 * Create a new review.
 * @param {Object} reviewData - The review data to create.
 * @param {number} reviewData.businessId - The ID of the business.
 * @param {number} reviewData.rating - The rating.
 * @param {string} reviewData.feedback - The feedback.
 * @returns {Promise<any>} The created review data or false if unauthorized.
 */
export async function createReview(reviewData: any) {
    console.log('Creating review with data:', reviewData);

    const JWT = getJWT();
    console.log('getJWT:', JWT);

    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JWT}`
        },
        body: JSON.stringify(reviewData)
    });

    if (!response.ok) {
        if (response.status === 401) {
            logout();
            goto('/user/auth/sign-in');
        }
        return false;
    }

    return await response.json();
}

/**
 * Delete a review by ID.
 * @param {number} reviewId - The ID of the review to delete.
 * @returns {Promise<boolean>} True if the review was deleted, otherwise false.
 */
export async function deleteReview(reviewId: any) {
    const JWT = getJWT();
    console.log('getJWT:', JWT);

    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${JWT}`
        }
    });

    if (!response.ok) {
        if (response.status === 401) {
            logout();
            goto('/user/auth/sign-in');
        }
        return false;
    }

    return true;
}


/**
 * Fetch reviews by approval status.
 * @param {boolean} approvalStatus - The approval status to filter reviews (true for approved, false for unapproved).
 * @returns {Promise<any>} The reviews data or false if unauthorized.
 */
export async function getReviewsByApprovalStatus(approvalStatus: boolean) {
    const JWT = getJWT();
    console.log('getJWT:', JWT);

    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/reviews/approval-status/${approvalStatus}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${JWT}`
        }
    });

    if (!response.ok) {
        if (response.status === 401) {
            logout();
            goto('/user/auth/sign-in');
        }
        return false;
    }

    return await response.json();
}


/**
 * Fetch all reviews by the authenticated user.
 * @returns {Promise<any>} The reviews data or false if unauthorized.
 */
export async function getUserReviews(): Promise<any> {
    const JWT = getJWT();
    console.log('getJWT:', JWT);

    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/reviews`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${JWT}`,
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                logout();
                goto('/user/auth/sign-in');
            }
            return false;
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching user reviews:", error);
        return false;
    }
}

/**
 * Update a review by ID.
 * @param {number} reviewId - The ID of the review to update.
 * @param {Object} reviewData - The updated review data.
 * @param {number} reviewData.rating - The updated rating.
 * @param {string} reviewData.feedback - The updated feedback.
 * @returns {Promise<any>} The updated review data or false if unauthorized.
 */
export async function updateReview(reviewId: any, reviewData: any) {
    console.log('Updating review ID:', reviewId, 'with data:', reviewData);

    const JWT = getJWT();
    console.log('getJWT:', JWT);

    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JWT}`
        },
        body: JSON.stringify(reviewData)
    });

    if (!response.ok) {
        if (response.status === 401) {
            logout();
            goto('/user/auth/sign-in');
        }
        return false;
    }

    return await response.json();
}


/**
 * Approve a review by ID.
 * @param {number} reviewId - The ID of the review to approve.
 * @returns {Promise<any>} The approved review data or false if unauthorized.
 */
export async function approveReview(reviewId: number): Promise<any> {
    const JWT = getJWT();
    console.log('getJWT:', JWT);

    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}/approve`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JWT}`,
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                logout();
                goto('/user/auth/sign-in');
            }
            throw new Error('Failed to approve review');
        }

        return await response.json();
    } catch (error) {
        console.error('Error approving review:', error);
        return false;
    }
}
