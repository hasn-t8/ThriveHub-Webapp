export type SubscriptionData = {
	id?: string | number;
	user_id?: string | number;
	stripe_subscription_id?: string;
	plan?: string;
	status?: string;
	start_date?: string; // ISO date string (e.g., '2023-12-03')
	end_date?: string | null; // Nullable ISO date string
	next_billing_date?: string | null; // Nullable ISO date string
	created_at?: string; // ISO date string
	updated_at?: string; // ISO date string
	full_name?: string; // Full name of the user associated with the subscription
	email?: string; // Email of the user associated with the subscription
	phone?: string; // Phone number of the user
	profile_id?: string | number; // Profile ID associated with the subscription
	organization_name?: string; // Organization name for the subscription, if applicable
	profileImage?: string; // Profile image URL of the user
	plan_type?: string; // Type of the subscription plan (e.g., 'monthly', 'yearly')
	billing_status?: string; // Billing status (e.g., 'paid', 'due')
	renewal_status?: string; // Renewal status (e.g., 'auto-renew', 'manual')
};
