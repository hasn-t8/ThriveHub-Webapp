export type ProfileData = {
	job_title?: string;
	full_name?: string;
	work_email?: string;
	about_business?: string;
	industry?: string;
	profile_type: string;
	category?: string;
	business_website_title?: string;
	business_website_url?: string;
	profile_id?: string | number;
	business_profile_id?: string | number | null;
	fullName?: string;
	email?: string;
	dob?: string; // ISO date string (e.g., '2023-12-03')
	phone?: string;
	location?: string;
	address?: string;
	city?: string;
	logo_url? : string;
	postalCode?: string;
	profileImage?: string;
	org_name?: string;
	work_email_verified?: boolean | string;
	id?: string | number;
	total_reviews?: number;
	avg_rating?: number;
};