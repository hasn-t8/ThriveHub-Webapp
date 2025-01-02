import { goto } from '$app/navigation';
import { API_BASE_URL } from '$lib/config';
import { getJWT, logout } from '$lib/stores/auth';

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
