<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { getProfiles, saveProfile } from '$lib/stores/profile';

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
			const personalProfile = await getProfiles();

			console.log('Profiles::::::', personalProfile);
			
			// // Look for the 'personal' profile in the array
			// const personalProfile = profiles.find((profile) => profile.profile_type === 'personal');

			// // If no 'personal' profile exists, handle it (e.g., set defaults or log an error)
			// if (!personalProfile) {
			// 	console.log('No personal profile found.');
			// 	profile.set({
			// 		fullName: '',
			// 		email: '',
			// 		dob: '',
			// 		phone: '',
			// 		location: '',
			// 		address: '',
			// 		city: '',
			// 		postalCode: '',
			// 		profileImage: ''
			// 	});
			// 	return;
			// }

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
			const result = await saveProfile(currentProfile);
			console.log('Profile saved successfully:', result);
		} catch (error) {
			console.error('An error occurred while saving the profile:', error); // TODO: send to analytics and monitoring tool
			console.log(error);
		}
	}

	// Utility to format date to "yyyy-MM-dd"
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
</script>

<section class="top-bar">
	<div class="container">
		<div class="left-section">
			<div class="links ml-9">
				<a href="#">Home</a> / <span>My Settings</span>
			</div>
			<div class="profile-section">
				<!-- <img class="profile-img" src={user.profileImage} alt="User Profile Image" /> -->
				<div class="user-details">
					<h3>{$profile.fullName}</h3>
					<!-- <a href="#">Edit account photo</a> -->
				</div>
			</div>
		</div>
	</div>
</section>

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

		<br />

		<h1 class="title">Address</h1>
		<div class="field">
			<label class="label" for="address">Location</label>
			<div class="control">
				<input
					class="input"
					type="text"
					id="address"
					bind:value={$profile.location}
					placeholder="New York, NY, USA"
				/>
			</div>
		</div>
		<div class="field">
			<label class="label" for="address_2">Address</label>
			<div class="control">
				<input
					class="input"
					type="text"
					id="address_2"
					bind:value={$profile.address}
					placeholder="123 Main St, City, State, 12345"
				/>
			</div>
		</div>
		<div class="field is-horizontal">
			<div class="field-body">
				<div class="field">
					<label class="label" for="city">City</label>
					<div class="control">
						<input
							class="input"
							type="text"
							id="city"
							bind:value={$profile.city}
							placeholder="City you reside in"
						/>
					</div>
				</div>
				<div class="field">
					<label class="label" for="zip_code">Postal code</label>
					<div class="control">
						<input
							class="input"
							type="text"
							id="zip_code"
							bind:value={$profile.postalCode}
							placeholder="Enter your postal code"
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

	<div class="container">
		<h2 class="title">Log out everywhere</h2>
		<p>
			Log out wherever you have your Thrive Hub account open (this includes desktop, mobile, and any
			other devices).
		</p>
		<div class="buttons">
			<button class="button">Log out</button>
		</div>
	</div>

	<div class="container">
		<h2 class="title">Delete user</h2>
		<p>
			When you delete your user profile, your reviews are deleted as well and can not be restored.
		</p>
		<div class="buttons">
			<button class="button">Delete my profile</button>
		</div>
	</div>
</section>

<style>
	/* Scoped Styles for User Profile */
	.user-profile {
		background-color: #e7f3fe;
		font-family: Inter, sans-serif;
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
	/* Style for the top-bar */
	.top-bar {
		background-color: white; /* Background color is white */
		display: flex;
		align-items: flex-start; /* Align the items to the top */
		justify-content: flex-start; /* Align items to the left */
		padding: 20px;
	}

	/* Left section (links and profile) */
	.left-section {
		display: flex;
		flex-direction: column; /* Stack items vertically */
		gap: 20px; /* Increase gap between the two rows */
		margin-left: 40px;
	}
	.links a {
		color: #1f1f1f;
		font-size: 16px;
		font-weight: 500;
	}
	/* Links placed on the same row with a / separator */
	.links {
		display: flex;
		color: #1f1f1f;
		gap: 5px; /* Small gap between Home and My Settings */
		align-items: center;
		font-size: 18px; /* Increase font size for better visibility */
	}

	/* Profile section with profile image and user details */
	.profile-section {
		display: flex;
		align-items: center; /* Align items horizontally */
		gap: 10px; /* Space between the image and user details */
		margin-top: 20px; /* Add space above the profile section */
		/* margin-left: 60px; */
	}

	/* Circle profile image */
	.profile-img {
		width: 99px;
		height: 99px;
		border-radius: 50%; /* Makes the image round */
		object-fit: cover; /* Ensures the image fills the circle */
		border: 2px solid #ccc; /* Optional: adds a border around the circle */
	}

	/* User details section */
	.user-details h3 {
		margin: 0;
		font-weight: 700;
		color: #1f1f1f;
		font-size: 24px;
		margin-bottom: 6px;
	}

	.user-details a {
		font-size: 18px;
		color: #1f1f1f;
		text-decoration: underline; /* Add underline */
		text-decoration-color: black; /* Set the underline color to black */
		text-decoration-thickness: 1px; /* Set the thickness of the underline */
		text-underline-offset: 3px; /* Add space between the text and the underline */
		font-weight: 400;
		font-family: 'Inter', sans-serif; /* Ensure the Inter font is applied */
	}
</style>
