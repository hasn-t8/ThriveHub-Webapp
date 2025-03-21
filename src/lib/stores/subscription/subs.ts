import { API_BASE_URL } from '$lib/config';
import { getJWT } from '../auth';

import type { SubscriptionData } from '$lib/types/Subscriptions';
import type { ErrData } from '$lib/types/Error';

export async function getMySubscriptions(): Promise<SubscriptionData[] | ErrData> {
	try {
		const response = await fetch(`${API_BASE_URL}/subscriptions-active`, {
			method: 'GET',
			headers: { Authorization: `Bearer ${getJWT()}` }
		});

		const responseJson = await response.json();

		if (!response.ok) {
			if (responseJson.error === 'No subscriptions found') {
				return [];
			}
			console.error(`API request failed with status ${response.status}`);
			return { error: `Failed to get subscriptions: ${response.status}` };
		}

		const subscriptionsData = responseJson as SubscriptionData[];
		return subscriptionsData;
	} catch (error) {
		console.error('Error fetching subscriptions:', error);
		return { error: 'An unexpected error occurred.' };
	}
}

export async function createSubscription(plan: string): Promise<SubscriptionData | ErrData> {
	try {
		const response = await fetch(`${API_BASE_URL}/subscription`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getJWT()}`
			},
			body: JSON.stringify({ plan })
		});

		// console.log('Switching to plan:', plan);
		const responseJson = await response.json();
		// console.log('>>>>>>>>>> Response:', responseJson.data);
		if (responseJson.url) {
			// console.log('Redirecting to:<><<><<<><><><><>', responseJson.url);
			window.location.href = responseJson.url;
		}

		if (!response.ok) {
			console.error(`API request failed with status ${response.status}`);
			return { error: `Failed to create subscription: ${response.status}` };
		}

		const subscriptionData = responseJson as SubscriptionData;
		return subscriptionData;
	} catch (error) {
		console.error('Error creating subscription:', error);
		return { error: 'An unexpected error occurred.' };
	}
}
