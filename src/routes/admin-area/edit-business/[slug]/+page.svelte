<script lang="ts">
	import Sidemenu from '../../components/Sidemenu.svelte';
	import { updateBusinessProfile, getProfileById, deleteBusinessProfile } from '$lib/stores/business';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { page } from '$app/stores';
	import LogoUpload from '../upload_logo.svelte';
	import { getFeatures, addFeatures, createKeyFeature, getKeyFeatures, deleteKeyFeatureById } from '$lib/stores/features';
	import type { ProfileData } from '$lib/types/Profile';

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

	// Key Features
	let availableKeyFeatures = [
		'High Reliable Uptime',
		'Affordable Plans',
		'Easy-to-Use Control Panel',
		'Scalability',
		'Free Domain Name',
		'Security Features',
		'24/7 Customer Support'
	];
	let keyFeatureTitle = '';
	let customKeyFeatureTitle = '';
	let keyFeatureDescription = '';
	let keyFeatures: { title: string; description: string }[] = [];

	// Why Choose
	let availableWhyChoose = [...availableKeyFeatures];
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



	// Manage Key Features
	async function addCustomKeyFeature() {
		if (customKeyFeatureTitle.trim()) {
			try {
				const newFeature = await addFeatures({ name: customKeyFeatureTitle });
				if (newFeature) {
					availableKeyFeatures = [...availableKeyFeatures, newFeature];
					keyFeatureTitle = newFeature.name;
					customKeyFeatureTitle = '';
					alert('Feature added successfully!');
					window.location.reload(); // Reload the page

				} else {
					throw new Error('Failed to add feature.');
				}
			} catch (error) {
				console.error('Failed to add feature:', error);
				alert('Error adding feature. Please try again.');
			}
		}
	}

	function cancelCustomKeyFeature() {
		customKeyFeatureTitle = '';
		keyFeatureTitle = '';
	}

	async function addKeyFeature() {
		const featureNameId = availableKeyFeatures.findIndex(
			(feature) => feature.name === keyFeatureTitle
		);

		const newFeature = {
			businessProfileId: slug,
			featureNameId: featureNameId,
			text: keyFeatureDescription
		};

		console.log('Payload for addKeyFeature:', newFeature);

		const response = await createKeyFeature(newFeature);

		if (response) {
			keyFeatures = [
				...keyFeatures,
				{ title: keyFeatureTitle, description: keyFeatureDescription }
			];
			window.location.reload(); // Reload the page

			clearForm();
			
		} else {
			alert('Failed to add the key feature. Please try again.');
		}
	}

	// function removeKeyFeature(index: number) {
	// 	keyFeatures = keyFeatures.filter((_, i) => i !== index);
	// }

	// Manage Why Choose
	function addCustomWhyChoose() {
		if (customWhyChooseTitle) {
			availableWhyChoose = [...availableWhyChoose, customWhyChooseTitle];
			whyChooseTitle = customWhyChooseTitle;
			customWhyChooseTitle = '';
		}
	}

	function cancelCustomWhyChoose() {
		customWhyChooseTitle = '';
		whyChooseTitle = '';
	}

	function addWhyChoose() {
		if (whyChooseTitle && whyChooseDescription) {
			whyChoose = [...whyChoose, { title: whyChooseTitle, description: whyChooseDescription }];
			whyChooseTitle = '';
			whyChooseDescription = '';
		}
	}

	function removeWhyChoose(index: number) {
		whyChoose = whyChoose.filter((_, i) => i !== index);
	}

	function handleDelete() {
		const confirmDelete = confirm('Are you sure you want to delete this business?');
		if (confirmDelete) {
			deleteBusinessProfile(slug);
			console.log('Deleting business:', slug, '   -  type: ', typeof slug);
		}
	}

onMount(async () => {
  try {
	fetchProfile();
    availableKeyFeatures = await getFeatures() || [];
    availableWhyChoose = availableKeyFeatures;

    const features = await getKeyFeatures(slug);
    if (features) {
      keyFeatures = features;
    }
  
  } catch (error) {
    console.error('Error fetching data on mount:', error);
    alert('Failed to load features. Please refresh the page.');
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
						<button type="button" class="button is-primary" on:click={toggleEdit}>
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
						<!-- <div class="column is-half">
							<label class="label">Business Category</label>
							<select class="input" bind:value={$theProfile.category} disabled={!isEditable}>
								<option value="Tech">Tech</option>
								<option value="E-commerce">E-commerce</option>
								<option value="Wellness">Wellness</option>
								<option value="Education">Education</option>
								<option value="Finance">Finance</option>
								<option value="Home Electronics">Home Electronics</option>
							</select>
						</div> -->

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
								<button class="button is-success mt-2" type="button" on:click={addCustomKeyFeature}>
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
							<label class="label" for="key-feature-description">Description</label>
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

							<button class="button is-primary mt-3" type="button" on:click={addKeyFeature}>
								Add to Key Features Table
							</button>
						</div>
					</div>
					<table class="table is-striped is-hoverable is-fullwidth mt-5">
						<thead>
						  <tr>
							<th>Feature Name</th>
							<th>Text</th>
							<th>Actions</th>
						  </tr>
						</thead>
						<tbody>
						  {#if keyFeatures.length > 0}
							{#each keyFeatures as { id, feature_name, text }, index}
							  <tr>
								<td>{feature_name}</td>
								<td>{text}</td>
								<td>
								  <button
									class="button is-danger"
									type="button"
									on:click={async () => {
									  const success = await deleteKeyFeatureById(id);
									  if (success) {
										keyFeatures = keyFeatures.filter((_, i) => i !== index);
									  } else {
										alert('Failed to remove the feature. Please try again.');
									  }
									}}
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
									<option>{reason}</option>
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
								<button class="button is-success mt-2" type="button" on:click={addCustomWhyChoose}
									>✔</button
								>
								<button class="button is-danger mt-2" type="button" on:click={cancelCustomWhyChoose}
									>✘</button
								>
							{/if}
						</div>
						<div class="column is-half">
							<label class="label" for="why-choose-description">Description</label>
							<input
								class="input"
								id="why-choose-description"
								type="text"
								bind:value={whyChooseDescription}
								placeholder="Enter reason description"
							/>
						</div>
						<div class="column is-full">
							<button class="button is-primary mt-3" type="button" on:click={addWhyChoose}
								>Add to Why Choose Table</button
							>
						</div>
					</div>

					<!-- Why Choose Table -->
					<table class="table is-striped is-hoverable is-fullwidth mt-5">
						<thead>
							<tr>
								<th>Title</th>
								<th>Description</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each whyChoose as { title, description }, index}
								<tr>
									<td>{title}</td>
									<td>{description}</td>
									<td>
										<button
											class="button is-danger"
											type="button"
											on:click={() => removeWhyChoose(index)}>Remove</button
										>
									</td>
								</tr>
							{/each}
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
					<p>Once you delete a business, there is no going back. Please be certain.</p>

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
