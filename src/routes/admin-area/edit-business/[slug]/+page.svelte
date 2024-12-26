<script lang="ts">
	import Sidemenu from '../../components/Sidemenu.svelte';
	import {
		updateBusinessProfile,
		getProfileById,
		deleteBusinessProfile
	} from '$lib/stores/business';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { page } from '$app/stores';
	import LogoUpload from '../upload_logo.svelte';
	import {
		getFeatures,
		addFeatures,
		createKeyFeature,
		getKeyFeatures,
		deleteKeyFeatureById
	} from '$lib/stores/features';
	import type { ProfileData } from '$lib/types/Profile';
	import {
		addKeypointname,
		getKeypointnames,
		createKeyPoint,
		getKeyPoints,
		deleteKeyPointById
	} from '$lib/stores/key-point';
	const slug = Number($page.params.slug);

	let theProfile = writable<ProfileData>({
		org_name: '',
		job_title: '',
		work_email: '',
		about_business: '',
		full_name: '',
		industry: '',
		business_website_url: '',
		business_profile_id: null,
		profile_type: '',
		category: '',
		id: '',
		logo_url: ''
	});

	// State management
	let isEditable = false; // Default to read-only
	// let logoUrl: string = '';
	// theProfile.subscribe((profile) => {
	// 	logoUrl = profile.logo_url; // Update logoUrl whenever the profile changes
	// });

	// function updateLogoUrl(url) {
	// 	theProfile.update((profile) => {
	// 		return { ...profile, logo_url: url };
	// 	});
	// }

	// Additional Form Variables
	let companyLogoPreview = '';
	let selectedFileName = 'No file selected';
	// let keyFeatures = [];
	let whyChoosePoints: any[] = [];
	// Key Features
	// let availableKeyFeatures = [
	// 	'High Reliable Uptime',
	// 	'Affordable Plans',
	// 	'Easy-to-Use Control Panel',
	// 	'Scalability',
	// 	'Free Domain Name',
	// 	'Security Features',
	// 	'24/7 Customer Support'
	// ];
	let keyFeatureTitle = '';
	let customKeyFeatureTitle = '';
	let keyFeatureDescription = '';
	let keyFeatures: {
		keyPointName: any;
		text: any;
		title: string;
		description: string;
	}[] = [];

	let availableWhyChoose: {
		keyPointName: any;
		text: any;
		title: string;
		description: string;
	}[] = [];
	type KeyFeature = {
		name: string;
	};

	let availableKeyFeatures: KeyFeature[] = [];

	// Why Choose
	// availableWhyChoose = [...filteredKeyPoints];
	let whyChooseTitle = '';
	let customWhyChooseTitle = '';
	let whyChooseDescription = '';
	let whyChoose: { title: string; description: string }[] = [];

	let errorMessage = writable('');

	async function fetchProfile(): Promise<void> {
		try {
			const profile: ProfileData = await getProfileById(slug);

			theProfile.set(profile);
		} catch (error) {
			console.error('Error fetching profiles:', error);
		}
	}
	// Function to toggle edit mode
	function toggleEdit() {
		isEditable = !isEditable;
	}

	// Form submission handler
	async function saveProfile(profileId: number) {
		console.log('Submitting form...');

		try {
			const result = await updateBusinessProfile(profileId, $theProfile);
			console.log('Profile saved successfully:', result);
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error('An error occurred while saving the profile:', error);
				errorMessage.set(`Form submission failed due to: ${error.message}`);
			} else {
				console.error('An unexpected error occurred:', error);
				errorMessage.set('Form submission failed due to an unknown error.');
			}
		}
	}

	// Handle file upload
	function handleLogoUpload(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			selectedFileName = file.name;
			const reader = new FileReader();
			reader.onload = () => (companyLogoPreview = reader.result as string);
			reader.readAsDataURL(file);
		} else {
			removeLogo();
		}
	}

	// Remove logo
	function removeLogo() {
		companyLogoPreview = '';
		selectedFileName = 'No file selected';
	}

	function cancelCustomKeyFeature() {
		customKeyFeatureTitle = '';
		keyFeatureTitle = '';
	}

	//  create Key-point-name
	async function handleAddKeypoint(
		customKeyFeatureTitle: string,
		type: string
	) {
		try {
			if (!customKeyFeatureTitle) {
				alert('Please enter a valid title.');
				return;
			}

			const keypointData = {
				name: customKeyFeatureTitle, // Title becomes the name
				type,
				businessProfileId: slug // Assuming `slug` is in scope
			};

			console.log('Payload for addKeypointName:', keypointData);

			const response = await addKeypointname(keypointData);
			alert('Key-point name added successfully');
			window.location.reload();
		} catch (error) {
			console.error('Error in addKeypointName:', error);
			alert('An unexpected error occurred. Please try again.');
		}
	}

	// createKeyPoint
	async function addKeyPoint(
		type: string,
		title: string,
		description: string,
		availableKeyPoints: any[],
		slug: number,
		createKeyPoint: Function,
		reloadKeypointsList: Function,
		clearForm: Function
	) {
		try {
			// Find the selected key point by its name
			const selectedFeature = availableKeyPoints.find(
				(feature) =>
					feature.name.trim().toLowerCase() === title.trim().toLowerCase()
			);

			if (!selectedFeature || !selectedFeature.id) {
				alert('Please select a valid key point name from the list.');
				return;
			}

			const newFeature = {
				businessProfileId: slug, // Pass the slug dynamically
				keyPointNameId: selectedFeature.id, // Use the ID of the selected key point
				text: description.trim(), // Description for the key point
				type // Pass type dynamically
			};

			console.log('Payload for addKeyPoint:', newFeature);

			const response = await createKeyPoint(newFeature);

			if (response) {
				console.log('Feature added successfully!', response);
				alert('Keypoint added successfully!');

				// Reload the keypoints list after successful addition
				await reloadKeypointsList();

				// Clear the input fields
				clearForm();
			} else {
				alert('Failed to add the key point. Please try again.');
			}
		} catch (error) {
			console.error('Error in addKeyPoint:', error);
			alert('An unexpected error occurred. Please try again.');
		}
	}

	async function reloadKeypointsList(
		type = 'feature',
		listElementId = 'keypointsList'
	) {
		try {
			// Fetch the updated keypoints list for the specified type
			const updatedKeypoints = await fetchKeyPoints(type); // Fetch points for 'feature' or 'why-us'

			// Update the UI directly
			const keypointsListElement = document.getElementById(listElementId); // Dynamic element assignment
			if (!keypointsListElement) {
				console.error(`Element with ID '${listElementId}' not found.`);
				return;
			}

			// Clear existing keypoints
			keypointsListElement.innerHTML = '';

			// Loop through updated keypoints and append them to the list
			updatedKeypoints.forEach(({ keyPointNameId, name, description }) => {
				// Resolve the name using availableKeyFeatures if necessary
				const resolvedName = availableKeyFeatures.find(
					(feature) => feature.id === keyPointNameId
				)?.name;

				// Create a list item element
				const listItem = document.createElement('li');
				listItem.textContent = `${resolvedName || name}: ${description || 'No description provided'}`;
				keypointsListElement.appendChild(listItem);
			});
		} catch (error) {
			console.error(
				`Error reloading keypoints list for type '${type}':`,
				error
			);
			alert(`Failed to reload ${type} keypoints list. Please try again.`);
		}
	}

	// Function to clear the form
	function clearForm() {
		const titleInput = document.getElementById('keyFeatureTitle'); // Assuming an element with this ID exists
		const descriptionInput = document.getElementById('keyFeatureDescription'); // Assuming an element with this ID exists

		if (titleInput) titleInput.value = '';
		if (descriptionInput) descriptionInput.value = '';
	}

	// Function to fetch and set key points
	async function fetchKeyPoints(
		type: string | undefined,
		targetVariable: string | undefined
	) {
		try {
			const response = await getKeyPoints(slug);
			if (response) {
				const filteredKeyPoints = response
					.filter(
						(point: { key_point_type: any }) => point.key_point_type === type
					)
					.map((point: { id: any; key_point_name: any; text: any }) => ({
						id: point.id,
						keyPointName: point.key_point_name || 'Untitled',
						text: point.text || 'No description available'
					}));

				if (type === 'feature') {
					keyFeatures = [...filteredKeyPoints];
				} else if (type === 'why-us') {
					whyChoosePoints = [...filteredKeyPoints];
				}

				console.log(`Filtered ${type} Points:`, filteredKeyPoints);
			} else {
				console.error('Failed to fetch key points.');
			}
		} catch (error) {
			console.error(`Error fetching ${type} key points:`, error);
		}
	}

	// Function to remove a key point from the UI and call the API
	async function removeKeyPoint(id: any, index: number, target: string) {
		const confirmDelete = confirm(
			'Are you sure you want to delete this key point?'
		);
		if (!confirmDelete) return;

		try {
			const isDeleted = await deleteKeyPointById(id);
			if (isDeleted) {
				// Update the UI based on the target
				if (target === 'keyFeatures') {
					keyFeatures = keyFeatures.filter((_, i) => i !== index);
				} else if (target === 'whyChoosePoints') {
					whyChoosePoints = whyChoosePoints.filter((_, i) => i !== index);
				}
				alert('Key point successfully deleted.');
			} else {
				alert('Failed to delete the key point. Please try again.');
			}
		} catch (error) {
			console.error('Error removing key point:', error);
			alert('An error occurred while deleting the key point.');
		}
	}
	function cancelCustomWhyChoose() {
		customWhyChooseTitle = '';
		whyChooseTitle = '';
	}

	function handleDelete() {
		const confirmDelete = confirm(
			'Are you sure you want to delete this business?'
		);
		if (confirmDelete) {
			deleteBusinessProfile(slug);
			console.log('Deleting business:', slug, '   -  type: ', typeof slug);
		}
	}
	onMount(async () => {
		fetchProfile();
		// Fetch key points for both types
		fetchKeyPoints('feature', 'keyFeatures'); // Fetch features
		fetchKeyPoints('why-us', 'availableWhyChoose'); // Fetch why-us points

		// Fetch key point names for features and why-us dynamically
		const featureKeypoints = await getKeypointnames('feature');
		if (featureKeypoints) {
			availableKeyFeatures = featureKeypoints; // Populate available key features
		} else {
			console.error('Failed to fetch keypoint names for features');
		}

		const whyChooseKeypoints = await getKeypointnames('why-us');
		if (whyChooseKeypoints) {
			availableWhyChoose = whyChooseKeypoints; // Populate available why choose key points
		} else {
			console.error('Failed to fetch keypoint names for Why Choose');
		}
	});
</script>

<div class="main-content">
	<Sidemenu />
	<div class="analytics-header">
		<div class="header-top">
			{#if $theProfile}
				<span style="font-size:1.5rem">Edit {$theProfile.org_name}</span>
			{:else}
				<span>Loading...</span>
			{/if}
		</div>
	</div>
	{#if $theProfile}
		<!-- Company Details Form -->
		<div class="stats-section">
			<div class="card">
				<h1 class="title">Company Details</h1>
				<div class="column is-full is-flex is-justify-content-flex-end">
					<!-- Toggle Button -->
					{#if !isEditable}
						<button
							type="button"
							class="button is-primary"
							on:click={toggleEdit}
						>
							{isEditable ? 'Save' : 'Edit'}
						</button>
					{/if}
				</div>

				<form>
					<div class="columns is-multiline">
						<!-- Company Name -->
						<div class="column is-half">
							<label class="label">Company Name</label>
							<input
								class="input"
								type="text"
								bind:value={$theProfile.org_name}
								placeholder="Enter your company name"
								disabled={!isEditable}
							/>
						</div>

						<!-- Business Website URL -->
						<div class="column is-half">
							<label class="label">Business Website URL</label>
							<input
								class="input"
								type="text"
								bind:value={$theProfile.business_website_url}
								placeholder="www.company.com"
								disabled={!isEditable}
							/>
						</div>

						<!-- <div class="column is-half">
							<label class="label">Full Name</label>
							<input
								class="input"
								type="text"
								bind:value={$theProfile.full_name}
								placeholder="Enter your full name"
								disabled={!isEditable}
							/>
						</div>
						<div class="column is-half">
							<label class="label">Job Title</label>
							<input
								class="input"
								type="text"
								bind:value={jobTitle}
								placeholder="Enter your job title"
								disabled={!isEditable}
							/>
						</div> -->

						<!-- Work Email -->
						<div class="column is-half">
							<label class="label">Work Email</label>
							<input
								class="input"
								type="email"
								bind:value={$theProfile.work_email}
								placeholder="Enter your email"
								disabled={!isEditable}
							/>
						</div>

						<!-- Business Category -->
						<div class="column is-half">
							<label class="label">Business Category</label>
							<select class="input" bind:value={$theProfile.category} disabled={!isEditable}>
								<option value="Tech">Tech</option>
								<option value="E-commerce">E-commerce</option>
								<option value="Wellness">Wellness</option>
								<option value="Education">Education</option>
								<option value="Finance">Finance</option>
								<option value="Home Electronics">Home Electronics</option>
							</select>
						</div>

						<!-- Company Description -->
						<div class="column is-full">
							<label class="label">A Short Description</label>
							<textarea
								class="textarea"
								bind:value={$theProfile.about_business}
								placeholder="Enter a short description"
								readonly={!isEditable}
							></textarea>
						</div>

						<!-- Submit Button: Show only if in edit mode -->
						{#if isEditable}
							<div class="column is-full is-flex is-justify-content-flex-end">
								<button
									on:click={saveProfile($theProfile.business_profile_id)}
									class="button is-success">Save Changes</button
								>
							</div>
						{/if}
					</div>
				</form>
			</div>
		</div>

		<!-- Logo Section -->
		{$theProfile.logo_url}
		<LogoUpload
			bind:value={$theProfile.logo_url}
			businessProfileId={$theProfile.business_profile_id}
		></LogoUpload>

		<div class="stats-section">
			<div class="card">
				<div class="column is-full">
					<h1 class="title">Key Features and Benefits</h1>
					<div class="columns is-multiline">
						<div class="column is-half">
							<label class="label" for="key-feature-title">Title</label>
							<select class="input" bind:value={keyFeatureTitle}>
								{#each availableKeyFeatures as feature}
									<option value={feature.name}>{feature.name}</option>
								{/each}
								<option value="custom">Other...</option>
							</select>

							{#if keyFeatureTitle === 'custom'}
								<input
									class="input mt-2"
									type="text"
									bind:value={customKeyFeatureTitle}
									placeholder="Enter custom title"
								/>
								<button
									class="button is-success mt-2"
									type="button"
									on:click={() =>
										handleAddKeypoint(customKeyFeatureTitle, 'feature')}
								>
									✔
								</button>

								<button
									class="button is-danger mt-2"
									type="button"
									on:click={cancelCustomKeyFeature}
								>
									✘
								</button>
							{/if}
						</div>

						<div class="column is-half">
							<label class="label" for="key-feature-description"
								>Description</label
							>
							<input
								class="input"
								id="key-feature-description"
								type="text"
								bind:value={keyFeatureDescription}
								placeholder="Enter feature description"
							/>
						</div>

						<div class="column is-full">
							<!-- <button class="button is-primary mt-3" type="button" on:click={addKeyFeature}>
					  Add to Key Features Table
					</button> -->

							<button
								class="button is-primary mt-3"
								type="button"
								on:click={() =>
									addKeyPoint(
										'feature', // Type
										keyFeatureTitle, // Title selected from the dropdown or input
										keyFeatureDescription, // Description entered by the user
										availableKeyFeatures, // List of available "why-us" points
										slug, // Business profile ID or unique identifier
										createKeyPoint, // Function to handle the API call
										reloadKeypointsList, // Function to reload the key points list
										clearForm // Function to clear the form inputs
									)}
							>
								Add to Key Features Table
							</button>
						</div>
					</div>

					<!-- Features Table -->
					<table class="table is-striped is-hoverable is-fullwidth mt-5">
						<thead>
							<tr>
								<th>Feature Name</th>
								<th>Description</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{#if keyFeatures.length > 0}
								{#each keyFeatures as { id, keyPointName, text }, index}
									<tr>
										<td>{keyPointName}</td>
										<td>{text}</td>
										<td>
											<button
												class="button is-danger"
												type="button"
												on:click={() =>
													removeKeyPoint(id, index, 'keyFeatures')}
											>
												Remove
											</button>
										</td>
									</tr>
								{/each}
							{:else}
								<tr>
									<td colspan="3">No features found.</td>
								</tr>
							{/if}
						</tbody>
					</table>
					<!-- </div> -->
					<!-- </div> -->
					<!-- </div> -->
				</div>
			</div>
		</div>

		<div class="stats-section">
			<div class="card">
				<!-- Why Choose Section -->
				<div class="column is-full">
					<h1 class="title">Why Choose</h1>
					<div class="columns is-multiline">
						<div class="column is-half">
							<label class="label" for="why-choose-title">Title</label>
							<select class="input" bind:value={whyChooseTitle}>
								{#each availableWhyChoose as reason}
									<option value={reason.name}>{reason.name}</option>
								{/each}

								<option value="custom">Other...</option>
							</select>
							{#if whyChooseTitle === 'custom'}
								<input
									class="input mt-2"
									type="text"
									bind:value={customWhyChooseTitle}
									placeholder="Enter custom title"
								/>
								<button
									class="button is-success mt-2"
									type="button"
									on:click={() =>
										handleAddKeypoint(customWhyChooseTitle, 'why-us')}
								>
									✔
								</button>
								<button
									class="button is-danger mt-2"
									type="button"
									on:click={cancelCustomWhyChoose}
								>
									✘
								</button>
							{/if}
						</div>
						<div class="column is-half">
							<label class="label" for="why-choose-description"
								>Description</label
							>
							<input
								class="input"
								id="why-choose-description"
								type="text"
								bind:value={whyChooseDescription}
								placeholder="Enter reason description"
							/>
						</div>
						<div class="column is-full">
							<button
								class="button is-primary mt-3"
								type="button"
								on:click={() =>
									addKeyPoint(
										'why-us', // Type
										whyChooseTitle, // Title selected from the dropdown or input
										whyChooseDescription, // Description entered by the user
										availableWhyChoose, // List of available "why-us" points
										slug, // Business profile ID or unique identifier
										createKeyPoint, // Function to handle the API call
										reloadKeypointsList, // Function to reload the key points list
										clearForm // Function to clear the form inputs
									)}
							>
								Add to Why Choose Table
							</button>
						</div>
					</div>

					<!-- Why Choose Table -->
					<table class="table is-striped is-hoverable is-fullwidth mt-5">
						<thead>
							<tr>
								<th>Key Point Name</th>
								<th>Description</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{#if whyChoosePoints.length > 0}
								{#each whyChoosePoints as { id, keyPointName, text }, index}
									<tr>
										<td>{keyPointName}</td>
										<td>{text}</td>
										<td>
											<button
												class="button is-danger"
												type="button"
												on:click={() =>
													removeKeyPoint(id, index, 'whyChoosePoints')}
											>
												Remove
											</button>
										</td>
									</tr>
								{/each}
							{:else}
								<tr>
									<td colspan="3">No key points found.</td>
								</tr>
							{/if}
						</tbody>
					</table>
				</div>

				<div class="column is-full is-flex is-justify-content-flex-end">
					<button type="submit" class="button is-primary">Submit</button>
				</div>
			</div>
		</div>

		<div class="stats-section">
			<div class="card">
				<!-- Delete this Business -->
				<div class="column is-full">
					<h1 class="title">Delete this Business</h1>
					<p>
						Once you delete a business, there is no going back. Please be
						certain.
					</p>

					<button
						class="button is-danger"
						type="button"
						on:click={handleDelete()}>Delete this Business</button
					>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.main-content {
		margin-left: 250px;
	}

	.analytics-header {
		padding: 20px;
		background-color: #f4faff;
	}

	.divider {
		border: none;
		height: 1px;
		background-color: #dfe6ed;
		margin: 20px 0;
	}

	.stats-section {
		display: flex;
		justify-content: space-between;
		gap: 2px;
		padding: 0 20px 0 20px;
		border-radius: 10px;
		background-color: #f4faff;
	}

	.box {
		flex: 1;
	}
</style>
