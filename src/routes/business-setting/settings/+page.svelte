<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Sidemenu from '../../admin-area/components/Sidemenu.svelte';
	import { getProfiles, saveProfile } from '$lib/stores/profile';

	// Writable store for user profile
	let profile = writable({
		fullName: '',
		email: '',
		dob: '',
		phone: '',
		location: '',
		address: '',
		city: '',
		postalCode: '',
		profileImage: ''
	});

	// Utility function to format date to "yyyy-MM-dd"
	/**
	 * @param {string | number | Date} dateString
	 */
	function formatDateToYMD(dateString) {
		if (!dateString) return ''; // Handle null or undefined dates
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	// Fetch profile from backend
	async function fetchProfile() {
		try {
			// Fetch the profiles for the logged-in user
			const response = await getProfiles();
			console.log('Fetched profiles:', response);

			// Handle cases where the response might have different formats
			const profiles = Array.isArray(response) ? response : response?.profiles || response?.data;

			if (!profiles || !Array.isArray(profiles)) {
				throw new Error('Invalid profiles data structure');
			}

			// Find the personal profile (if necessary)
			const personalProfile = profiles.find((profile) => profile.profile_type === 'personal');
			console.log('Personal profile:', personalProfile);

			if (!personalProfile) {
				console.warn('No personal profile found for the current user.');
				// Set empty default values if no profile is found
				profile.set({
					fullName: '',
					email: '',
					dob: '',
					phone: '',
					location: '',
					address: '',
					city: '',
					postalCode: '',
					profileImage: ''
				});
				return;
			}

			// Update the writable store with the fetched profile data
			const updatedProfile = {
				fullName: personalProfile.full_name || '',
				email: personalProfile.email || '',
				dob: formatDateToYMD(personalProfile.date_of_birth),
				phone: personalProfile.phone_number || '',
				location: personalProfile.address_line_1 || '',
				address: personalProfile.address_line_2 || '',
				city: personalProfile.address_city || '',
				postalCode: personalProfile.address_zip_code || '',
				profileImage: personalProfile.img_profile_url || ''
			};

			// Save to localStorage
			localStorage.setItem('profile', JSON.stringify(updatedProfile));
			profile.set(updatedProfile);

			console.log('Updated profile store:', updatedProfile);
		} catch (error) {
			console.error('Error fetching profile data:', error);
		}
	}

	// Save the user's profile information
	async function handleSaveProfile() {
		try {
			const currentProfile = $profile;
			console.log('Saving profile:', currentProfile);

			// Save profile to backend
			const result = await saveProfile(currentProfile);
			console.log('Profile saved successfully:', result);

			// Save the updated profile in localStorage
			localStorage.setItem('profile', JSON.stringify(currentProfile));
			alert('Profile saved successfully!');
		} catch (error) {
			console.error('Error saving profile:', error);
			alert('Failed to save profile. Please try again.');
		}
	}

	// Load profile from localStorage on component mount
	onMount(() => {
		const savedProfile = localStorage.getItem('profile');
		if (savedProfile) {
			console.log('Loaded profile from localStorage:', savedProfile);
			profile.set(JSON.parse(savedProfile));
		} else {
			// Fetch from backend if no cached data exists
			fetchProfile();
		}
	});
</script>

<div class="main-content">
	<Sidemenu />
	<!-- Analytics Header -->
	<div class="analytics-header">
		<div class="header-top">
			<h1>Hi {$profile.fullName}</h1> <!-- Correctly displays the full name -->
		</div>
		<!-- Divider -->
		<hr class="divider" />
	</div>

	<section class="section user-profile">
		<div class="container">
			<h1 class="title">Personal Information</h1>
			<div class="field">
				<label class="label" for="full_name">Full name</label>
				<div class="control">
					<input
						class="input"
						type="text"
						id="full_name"
						bind:value={$profile.fullName}
						placeholder="Enter your full name"
					/>
				</div>
			</div>
			<div class="field">
				<label class="label" for="email">Email address</label>
				<div class="control">
					<input
						class="input"
						type="email"
						id="email"
						bind:value={$profile.email}
						placeholder="Enter your email address"
					/>
				</div>
			</div>
			<div class="field is-horizontal">
				<div class="field-body">
					<div class="field">
						<label class="label" for="dob">Date of birth</label>
						<div class="control">
							<input
								class="input"
								type="date"
								id="dob"
								bind:value={$profile.dob}
								placeholder="Enter your date of birth"
							/>
						</div>
					</div>
					<div class="field">
						<label class="label" for="tel">Phone number</label>
						<div class="control">
							<input
								class="input"
								id="tel"
								type="tel"
								bind:value={$profile.phone}
								placeholder="+1 123 456 7890"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="field is-horizontal">
				<div class="field-body">
					<div class="field">
						<div class="control">
							<button on:click={handleSaveProfile} class="button">Save</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	<div class="container">
		<h1 class="title">Security</h1>
		<div class="field">
			<span class="label">Password: <a href="/user/auth/change_my_pass">Change Password</a></span>
			<!-- <label class="label" for="password">Password</label>
			<div class="control">
				<input class="input" type="password" id="password" placeholder="Enter your password" />
			</div> -->
		</div>
	</div>
	</section>
</div>



<style>
	.main-content {
		margin-left: 200px;
	}

	.analytics-header {
		margin-left: 50px;
		padding: 20px;
		background-color: transparent;
	}

	.header-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.analytics-header h1 {
		font-size: 2rem;
		font-weight: bold;
		color: #333;
		margin: 0;
	}
	.divider {
		border: none;
		height: 1px;
		background-color: #dfe6ed;
		margin: 20px 0;
	}

	/* Team container */
	.team-container {
		display: flex;
		align-items: center;
		background-color: #f4f6fa; /* Ping background */
		width: 1002px;
		height: 84px;
		padding: 20px 12px;
		gap: 16px;
		border-radius: 16px;
		margin-top: 20px;
	}

	/* Team member image */
	.team-image {
		width: 44px;
		height: 44px;
		border-radius: 50%; /* Optional for circular image */
	}

	/* Team content */
	.team-content {
		flex-grow: 1;
	}

	.team-title {
		font-size: 16px;
		font-weight: 700;
		margin: 0;
		line-height: 2; /* Remove extra space */
	}

	.team-description {
		font-size: 12px;
		color: #979797;
		margin: 0; /* Remove space below the description */
		line-height: 1.2; /* Adjust line spacing for better alignment */
	}

	/* Team actions (Vertical dots) */
	.team-actions {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.dots {
		display: flex;
		flex-direction: column;
		font-size: 28px; /* Increased size for dots */
		color: #707070;
		cursor: pointer;
	}

	.dots span {
		line-height: 0.3; /* Remove extra spacing inside each dot */
	}
	/* Ensure the input field is styled to look like a dropdown */
	.dropdown {
		position: relative;
		width: 100%;
	}

	.dropdown input {
		width: 100%;
		padding: 10px 40px 10px 10px; /* space for the icon */
		border: 1px solid #ccc;
		border-radius: 10px;
		font-size: 16px;
		background-color: white;
		cursor: pointer;
	}

	.dropdown-icon {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		width: 10px;
		height: 10px;
		background: url('path/to/your-arrow-icon.svg') no-repeat center center;
		background-size: contain;
	}

	.dropdown-options {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		border: 1px solid #ccc;
		border-top: none;
		background-color: white;
		display: none;
		z-index: 10;
	}
	.dropdown-options .dropdown-option {
		padding: 10px;
		cursor: pointer;
	}
	.dropdown-options .dropdown-option:hover {
		background-color: #f0f0f0;
	}
	/* Display options on input focus */
	.dropdown input:focus + .dropdown-icon + .dropdown-options {
		display: block;
	}
	/* Scoped Styles for User Profile */
	.user-profile {
		background-color: #e7f3fe;
		font-family: Inter, sans-serif;
		padding-left: 70px;
	}
	.user-profile .container {
		background-color: white;
		padding: 24px;
		margin-bottom: 20px;
		border-radius: 8px; /* Applied border radius */
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		width: 1050px; /* Fixed width for each container */
		display: flex; /* Added flexbox for vertical alignment */
		flex-direction: column; /* Align content vertically */
		justify-content: space-between; /* Distribute content vertically */
	}
	.user-profile .title {
		font-weight: 600;
		font-size: 24px;
		color: #1f1f1f;
	}
	.user-profile .field {
		margin-bottom: 10px;
	}
	.user-profile .label {
		font-weight: 500;
		font-size: 16px;
	}
	.user-profile .input {
		border: 1px solid #ccc;
		padding: 5px;
		width: 100%;
		border-radius: 10px;
	}
	.user-profile .button {
		border: 1px solid #118bf6;
		color: #118bf6;
		font-size: 12px;
		font-weight: 500;
		border-radius: 8px;
		cursor: pointer;
		width: 134px;
		height: 32px;
		margin-top: 2%;
	}
	.user-profile p {
		font-size: 16px;
		font-weight: 500;
		color: #1f1f1f;
	}
</style>
