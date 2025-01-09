<script>
// @ts-nocheck

	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Sidemenu from '../../admin-area/components/Sidemenu.svelte';
	import { getProfiles } from '$lib/stores/business';
	import { saveProfile } from '$lib/stores/profile';
	// import Sidemenu from './admin-area/components/Sidemenu.svelte
	// @ts-ignore
	let searchQuery = '';
	// import { getProfiles, saveProfile } from '$lib/stores/profile';

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

	// Fetch profile data
	// async function fetchProfile() {
	// 	try {
	// 		const profiles = await getProfiles();

	// 		if (profiles.length > 0) {
	// 			const data = profiles[0];

	// 			profile.set({
	// 				fullName: data.full_name || '',
	// 				email: data.email || '',
	// 				dob: data.date_of_birth || '',
	// 				phone: data.phone_number || '',
	// 				location: data.address_line_1 || '',
	// 				address: data.address_line_2 || '',
	// 				city: data.address_city || '',
	// 				postalCode: data.address_zip_code || '',
	// 				profileImage: data.img_profile_url || ''
	// 			});
	// 		}
	// 	} catch (error) {
	// 		console.log('An error occurred while fetching profile data:'); // TODO: send to analytics and monitoring tool
	// 		console.log(error);
	// 	}
	// }

	// Fetch profile data
	async function fetchProfile() {
		try {
			const profiles = await getProfiles();

			// Look for the 'personal' profile in the array
			const personalProfile = profiles.find((/** @type {{ profile_type: string; }} */ profile) => profile.profile_type === 'personal');

			// If no 'personal' profile exists, handle it (e.g., set defaults or log an error)
			if (!personalProfile) {
				console.log('No personal profile found.');
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

			// Use the personal profile data
			profile.set({
				fullName: personalProfile.full_name || '',
				email: personalProfile.email || '',
				dob: formatDateToYMD(personalProfile.date_of_birth),
				phone: personalProfile.phone_number || '',
				location: personalProfile.address_line_1 || '',
				address: personalProfile.address_line_2 || '',
				city: personalProfile.address_city || '',
				postalCode: personalProfile.address_zip_code || '',
				profileImage: personalProfile.img_profile_url || ''
			});
		} catch (error) {
			console.log('An error occurred while fetching profile data:'); // TODO: send to analytics and monitoring tool
			console.log(error);
		}
	}

	// Save profile data
	async function handleSaveProfile() {
		console.log('Saving profile:', $profile);

		try {
			const currentProfile = $profile;
			// @ts-ignore
			const result = await saveProfile(currentProfile);
			console.log('Profile saved successfully:', result);
		} catch (error) {
			console.error('An error occurred while saving the profile:', error); // TODO: send to analytics and monitoring tool
			console.log(error);
		}
	}

	// Utility to format date to "yyyy-MM-dd"
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

	// Fetch profile on component mount
	onMount(() => {
		fetchProfile();
	});

	function redirectToNewPage() {
		// Redirect to the new page on button click
		window.location.href = '/business-setting/team'; // Update with your target URL
	}
</script>

<div class="main-content">
	<Sidemenu/>
	<!-- Analytics Header -->
	<div class="analytics-header">
		<div class="header-top">
			<h1>Hi, Alex</h1>
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
						disabled
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
			<div class="field">
				<label class="label" for="password">Password</label>
				<div class="control">
					<input class="input" type="password" id="password" placeholder="Enter your Password" />
				</div>
			</div>

			<br />

			<h1 class="title">Company details</h1>
			<div class="field">
				<label class="label" for="company_name">Company name</label>
				<div class="control">
					<input
						class="input"
						type="text"
						id="company_name"
						bind:value={$profile.company_name}
						placeholder="BlueHost"
					/>
				</div>
			</div>
			<div class="field">
				<label class="label" for="category">Business category</label>
				<div class="control">
					<div class="dropdown">
						<input
							type="text"
							id="category"
							bind:value={$profile.category}
							placeholder="Category"
							readonly
						/>
						<div class="dropdown-icon"></div>
						<div class="dropdown-options">
							<div class="dropdown-option">Option 1</div>
							<div class="dropdown-option">Option 2</div>
							<div class="dropdown-option">Option 3</div>
						</div>
					</div>
				</div>
			</div>

			<div class="field">
				<label class="label" for="logo">Company Logo</label>
				<div class="control">
					<div
						class="logo-container"
						style="min-height: 90px; max-width: 250px; display: flex; align-items: center; background-color: #EDF1F3;"
					>
						<!-- Display the logo if available -->
						<span class="logo-preview" style="margin-right: 10px;">
							<img
								src={$profile.logo}
								alt="Logo"
								style="padding:20px; width: 88px; height: 77px; object-fit: contain;"
							/>
						</span>
						<!-- Button to change the logo -->
						<button class="custom-button">Change Logo</button>
					</div>
				</div>
			</div>

			<div class="field">
				<label class="label" for="description">A short description</label>
				<div class="control">
					<textarea
						class="textarea"
						id="description"
						bind:value={$profile.description}
						placeholder="Enter a short description"
						style="height: 99px;"
					></textarea>
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
			<h2 class="title">Team</h2>
			<p>You haven't added colleagues to your team yet</p>
			<!-- New container below the text -->
			<div class="team-container">
				<img src="/assets/profile.png" alt="Avatar" class="team-image" />
				<div class="team-content">
					<h3 class="team-title">Anna Gator</h3>
					<p class="team-description">CEO</p>
				</div>
				<div class="team-actions">
					<div class="dots">
						<span>.</span>
						<span>.</span>
						<span>.</span>
					</div>
				</div>
			</div>
			<!-- New container below the text -->
			<div class="team-container">
				<img src="/assets/profile.png" alt="Avatar" class="team-image" />
				<div class="team-content">
					<h3 class="team-title">Anna Gator</h3>
					<p class="team-description">CEO</p>
				</div>
				<div class="team-actions">
					<div class="dots">
						<span>.</span>
						<span>.</span>
						<span>.</span>
					</div>
				</div>
			</div>
			<div class="buttons">
				<button class="button" on:click={redirectToNewPage}>+ Add team member</button>
			</div>
		</div>

		<!-- <div class="container">
			<h2 class="title">Log out everywhere</h2>
			<p>
				Log out wherever you have your Thrive Hub account open (this includes desktop, mobile, and
				any other devices).
			</p>
			<div class="buttons">
				<button class="button">Log out</button>
			</div>
		</div> -->

		<div class="container">
			<h2 class="title">Delete user</h2>
			<p>
				When you delete your Business profile, your reviews are deleted as well and can not be
				restored
			</p>
			<div class="buttons">
				<button class="button">Delete my profile</button>
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