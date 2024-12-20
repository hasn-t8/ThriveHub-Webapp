<script lang="ts">
	// @ts-nocheck

	import Sidemenu from '../components/Sidemenu.svelte';
	import { onMount } from 'svelte';
	import { getFeatures } from '$lib/stores/features';

	// Props from the load function
	export let profile: any;

	// State management
	let isEditable = false; // Default to read-only

	// Pre-filled form fields
	let companyName = profile?.org_name || '';
	let companyUrl = profile?.business_website_url || '';
	let fullName = profile?.full_name || '';
	let jobTitle = profile?.job_title || '';
	let email = profile?.work_email || '';
	let companyCategory = profile?.industry || '';
	let companyDescription = profile?.about_business || '';

	// Additional Form Variables
	let companyLogoPreview = '';
	let selectedFileName = 'No file selected';

	// Key Features
	let availableKeyFeatures = [];
	let keyFeatureTitle = '';
	let customKeyFeatureTitle = '';
	let keyFeatureDescription = '';
	let keyFeatures: { title: string; description: string }[] = [];

	// Why Choose
	let availableWhyChoose = [];
	let whyChooseTitle = '';
	let customWhyChooseTitle = '';
	let whyChooseDescription = '';
	let whyChoose: { title: string; description: string }[] = [];

	// Function to toggle edit mode
	function toggleEdit() {
		isEditable = !isEditable;
	}

	// Form submission handler
	async function handleSubmit(event: Event) {
		event.preventDefault();

		const updatedProfile = {
			id: profile.id,
			org_name: companyName,
			business_website_url: companyUrl,
			full_name: fullName,
			job_title: jobTitle,
			work_email: email,
			industry: companyCategory,
			about_business: companyDescription
		};

		try {
			const response = await fetch(`${API_BASE_URL}/profiles/${profile.id}`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${getJWT()}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(updatedProfile)
			});

			if (!response.ok) {
				throw new Error('Failed to update the business profile.');
			}

			const result = await response.json();
			console.log('Updated Profile:', result);
			alert('Profile updated successfully!');
		} catch (error) {
			console.error('Error:', error);
			alert('Failed to update the profile.');
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
		if (customKeyFeatureTitle.trim()) {
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
		if (keyFeatureTitle && keyFeatureDescription.trim()) {
			keyFeatures = [...keyFeatures, { title: keyFeatureTitle, description: keyFeatureDescription }];
			keyFeatureTitle = '';
			keyFeatureDescription = '';
		}
	}

	function removeKeyFeature(index: number) {
		keyFeatures = keyFeatures.filter((_, i) => i !== index);
	}

	// Manage Why Choose
	function addCustomWhyChoose() {
		if (customWhyChooseTitle.trim()) {
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
		if (whyChooseTitle && whyChooseDescription.trim()) {
			whyChoose = [...whyChoose, { title: whyChooseTitle, description: whyChooseDescription }];
			whyChooseTitle = '';
			whyChooseDescription = '';
		}
	}

	function removeWhyChoose(index: number) {
		whyChoose = whyChoose.filter((_, i) => i !== index);
	}

	onMount(async () => {
		availableKeyFeatures = await getFeatures() || [];
		availableWhyChoose = availableKeyFeatures;
	});
</script>


<div class="main-content">
	<Sidemenu />
	<div class="analytics-header">
		<hr class="divider" />
	</div>

	<!-- Company Details Form -->
	<div class="stats-section">
		<div class="card">
			<h1 class="title">Company Details</h1>
			<div class="column is-full is-flex is-justify-content-flex-end">
				<!-- Toggle Button -->
				<button type="button" class="button is-primary" on:click={toggleEdit}>
					{isEditable ? 'Save' : 'Edit'}
				</button>
			</div>

			<form on:submit|preventDefault={handleSubmit}>
				<div class="columns is-multiline">
					<!-- Company Name -->
					<div class="column is-half">
						<label class="label">Company Name</label>
						<input
							class="input"
							type="text"
							bind:value={companyName}
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
							bind:value={companyUrl}
							placeholder="www.company.com"
							disabled={!isEditable}
						/>
					</div>

					<!-- Full Name -->
					<div class="column is-half">
						<label class="label">Full Name</label>
						<input
							class="input"
							type="text"
							bind:value={fullName}
							placeholder="Enter your full name"
							disabled={!isEditable}
						/>
					</div>

					<!-- Job Title -->
					<div class="column is-half">
						<label class="label">Job Title</label>
						<input
							class="input"
							type="text"
							bind:value={jobTitle}
							placeholder="Enter your job title"
							disabled={!isEditable}
						/>
					</div>

					<!-- Work Email -->
					<div class="column is-half">
						<label class="label">Work Email</label>
						<input
							class="input"
							type="email"
							bind:value={email}
							placeholder="Enter your email"
							disabled={!isEditable}
						/>
					</div>

					<!-- Business Category -->
					<div class="column is-half">
						<label class="label">Business Category</label>
						<select class="input" bind:value={companyCategory} disabled={!isEditable}>
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
							bind:value={companyDescription}
							placeholder="Enter a short description"
							readonly={!isEditable}
						></textarea>
					</div>

					<!-- Submit Button: Show only if in edit mode -->
					{#if isEditable}
						<div class="column is-full is-flex is-justify-content-flex-end">
							<button type="submit" class="button is-success">Save Changes</button>
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
				  <button class="button is-danger mt-2" type="button" on:click={cancelCustomKeyFeature}>
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
				<button class="button is-primary mt-3" type="button" on:click={addKeyFeature}>
				  Add to Key Features Table
				</button>
			  </div>
			</div>
	  
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
						on:click={() => removeKeyFeature(index)}>
						Remove
					  </button>
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
				<h1 cla..ss="title">Why Choose</h1>
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
		padding: 20px;
		border-radius: 10px;
		background-color: #f4faff;
	}

	.box {
		flex: 1;
	}
</style>
