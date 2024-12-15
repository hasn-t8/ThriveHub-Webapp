export type ProfileData = {
	id: number;
	profile_type: string;
	category: any;
	business_website_url: any;
	// id(id: any): any;
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
	profile_id?: number;
};
