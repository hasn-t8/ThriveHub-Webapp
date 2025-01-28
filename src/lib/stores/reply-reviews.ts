import { goto } from '$app/navigation';
import { API_BASE_URL } from '$lib/config';
import { getJWT, logout } from '$lib/stores/auth';
import { writable } from 'svelte/store';

// Writable store for reply data
export const Reply = writable('');

/**
 * Get all replies for a specific review.
 * @param reviewId The ID of the review
 * @returns An array of replies
 */
export async function getRepliesForReview(reviewId: number): Promise<any[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}/replies`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch replies: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`Replies for review ${reviewId}:`, data);
        return data;
    } catch (error) {
        console.error(`Error fetching replies for review ${reviewId}:`, error);
        throw error;
    }
}

/**
 * Add a reply to a specific review.
 * @param reviewId The ID of the review
 * @param reply The reply content
 * @returns The newly added reply
 */
export async function addReplyToReview(reviewId: number, reply: string): Promise<any> {
    const JWT = getJWT();

    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}/replies`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${JWT}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reply }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                logout();
                goto('/user/auth/sign-in');
            }
            throw new Error(`Failed to add reply: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Reply added successfully:', data);
        return data.reply;
    } catch (error) {
        console.error('Error adding reply:', error);
        throw error;
    }
}

/**
 * Update a reply by its ID.
 * @param replyId The ID of the reply
 * @param reply The updated reply content
 * @returns The updated reply
 */
export async function updateReply(replyId: number, reply: string): Promise<any> {
    const JWT = getJWT();

    if (!JWT) {
        goto('/user/auth/sign-in');
        return false;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/replies/${replyId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${JWT}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reply }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                logout();
                goto('/user/auth/sign-in');
            }
            throw new Error(`Failed to update reply: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Reply updated successfully:', data);
        return data.reply;
    } catch (error) {
        console.error('Error updating reply:', error);
        throw error;
    }
}

/**
 * Delete a reply by its ID.
 * @param replyId The ID of the reply to delete
 */
export async function deleteReply(replyId: number): Promise<void> {
    const JWT = getJWT();

    if (!JWT) {
        goto('/user/auth/sign-in');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/replies/${replyId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${JWT}`,
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                logout();
                goto('/user/auth/sign-in');
            }
            throw new Error(`Failed to delete reply: ${response.statusText}`);
        }

        console.log('Reply deleted successfully.');
    } catch (error) {
        console.error('Error deleting reply:', error);
        throw error;
    }
}

/**
 * Get a single reply by its ID.
 * @param replyId The ID of the reply
 * @returns The reply details
 */
export async function getReplyById(replyId: number): Promise<any> {
    try {
        const response = await fetch(`${API_BASE_URL}/replies/${replyId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch reply: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched reply:', data);
        return data;
    } catch (error) {
        console.error(`Error fetching reply ${replyId}:`, error);
        throw error;
    }
}
