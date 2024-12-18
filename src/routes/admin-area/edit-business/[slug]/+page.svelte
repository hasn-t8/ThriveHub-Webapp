<script lang="ts">
	import Sidemenu from '../../components/Sidemenu.svelte';
	import { updateBusinessProfile, getProfileById } from '$lib/stores/business';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { page } from '$app/stores';

	const slug = Number($page.params.slug);

	let theProfile = writable({
		org_name: '',
		job_title: '',
		work_email: '',
		about_business: '',
		full_name: '',
		industry: '',
		business_website_url: '',
		profile_type: '',
		category: '',
		id: ''
	});

	

	// State management
	let isEditable = false; // Default to read-only

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
	function addCustomKeyFeature() {
		if (customKeyFeatureTitle) {
			availableKeyFeatures = [...availableKeyFeatures, customKeyFeatureTitle];
			keyFeatureTitle = customKeyFeatureTitle;
			customKeyFeatureTitle = '';
		}
	}

	function cancelCustomKeyFeature() {
		customKeyFeatureTitle = '';
		keyFeatureTitle = '';
	}

	function addKeyFeature() {
		if (keyFeatureTitle && keyFeatureDescription) {
			keyFeatures = [
				...keyFeatures,
				{ title: keyFeatureTitle, description: keyFeatureDescription }
			];
			keyFeatureTitle = '';
			keyFeatureDescription = '';
		}
	}

	function removeKeyFeature(index: number) {
		keyFeatures = keyFeatures.filter((_, i) => i !== index);
	}

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

	function handleDelete(id: number) {
		const confirmDelete = confirm('Are you sure you want to delete this business?');
		if (confirmDelete) {
			console.log('Deleting business:', id);
		}
	}

	onMount(() => {
		fetchProfile();
		console.log('Component Mounted');
		console.log('Profile: >>>', theProfile);
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
								bind:value={$theProfile.business_website_url}
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
		<div class="stats-section">
			<div class="box">
				<div class="column is-half">
					<h1 class="title">Logo</h1>
					<div class="file has-name is-boxed">
						<label class="file-label">
							<input class="file-input" type="file" accept="image/*" on:change={handleLogoUpload} />
							<span class="file-cta">
								<span class="file-icon">
									<i class="fas fa-upload"></i>
								</span>
								<span class="file-label">Choose a file…</span>
							</span>
							<span class="file-name">{selectedFileName}</span>
						</label>
					</div>

					{#if companyLogoPreview}
						<figure class="image is-128x128 mt-3">
							<img src={companyLogoPreview} alt="Logo Preview" />
						</figure>
						<button class="button is-danger mt-3" on:click={removeLogo}>Remove Image</button>
					{/if}
				</div>
			</div>
		</div>

		<div class="stats-section">
			<div class="card">
				<!-- Key Features and Benefits Section -->
				<div class="column is-full">
					<h1 class="title">Key Features and Benefits</h1>
					<div class="columns is-multiline">
						<div class="column is-half">
							<label class="label" for="key-feature-title">Title</label>
							<select class="input" bind:value={keyFeatureTitle}>
								{#each availableKeyFeatures as feature}
									<option>{feature}</option>
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
								<button class="button is-success mt-2" type="button" on:click={addCustomKeyFeature}
									>✔</button
								>
								<button
									class="button is-danger mt-2"
									type="button"
									on:click={cancelCustomKeyFeature}>✘</button
								>
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
							<button class="button is-primary mt-3" type="button" on:click={addKeyFeature}
								>Add to Key Features Table</button
							>
						</div>
					</div>

					<!-- Key Features Table -->
					<table class="table is-striped is-hoverable is-fullwidth mt-5">
						<thead>
							<tr>
								<th>Title</th>
								<th>Description</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each keyFeatures as { title, description }, index}
								<tr>
									<td>{title}</td>
									<td>{description}</td>
									<td>
										<button
											class="button is-danger"
											type="button"
											on:click={() => removeKeyFeature(index)}>Remove</button
										>
									</td>
								</tr>
							{/each}
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
					<h1 class="title">Delete this Business}</h1>
					<p>Once you delete a business, there is no going back. Please be certain.</p>

					<button
						class="button is-danger"
						type="button"
						on:click={handleDelete($theProfile.business_profile_id)}>Delete this Business</button
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
