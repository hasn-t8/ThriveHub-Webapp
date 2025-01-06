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

		if (!response.ok) {
			console.error(`API request failed with status ${response.status}`);
			return { error: `Failed to get subscriptions: ${response.status}` };
		}

		const subscriptionsData = await response.json();
		console.log('Subscriptions fetched:::', subscriptionsData.data);
		return subscriptionsData.data;
	} catch (error) {
		console.error('Error fetching subscriptions:', error);
		return { error: 'An unexpected error occurred.' };
	}
}
