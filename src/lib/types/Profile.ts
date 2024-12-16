export type ProfileData = {
	job_title: string | undefined;
	work_email: string | undefined;
	about_business: string | undefined;
	industry: string | undefined;
	profile_type: string;
	category: any;
	business_website_url: any;
	profile_id:string;
	fullName?: string;
	email?: string;
	dob?: string; // ISO date string (e.g., '2023-12-03')
	phone?: string;
	location?: string;
	address?: string;
	city?: string;
	postalCode?: string;
	profileImage?: string;
	org_name?: string;
};