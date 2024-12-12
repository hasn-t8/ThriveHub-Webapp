<script>
	// @ts-ignore
	// @ts-ignore
	import { onMount } from 'svelte';
	import Sidemenu from '../components/Sidemenu.svelte';

	let category = 'Tech';
	let logo = '';
	let logoPreview = '';
	let description = '';

	let featureName = 'Reliable Uptime';
	let customFeatureName = '';
	let featureDescription = '';
	// @ts-ignore
	/**
	 * @type {any[]}
	 */
	let features = [];

	let keypointName = 'Reliable Uptime';
	let customKeypointName = '';
	let keypointDescription = '';
	// @ts-ignore
	/**
	 * @type {any[]}
	 */
	let keypoints = [];

	let website = '';
	let companyName = '';
	let fullName = '';
	let jobTitle = '';
	let email = '';
	let password = '';
	let isButtonDisabled = true;
	let isLoading = false; // Tracks the loading state
	let errorMessage = ''; // Tracks errors during API call

	// Handles logo upload
	// @ts-ignore
	async function handleLogoUpload(event) {
	const file = event.target.files[0];
	if (!file) return;

	const formData = new FormData();
	formData.append("logo", file);
	formData.append("businessProfileId", "YOUR_BUSINESS_PROFILE_ID"); // Replace with actual businessProfileId

	// Use provided token directly
	const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ1c2VyNDRAZXhhbXBsZS5jb20iLCJ0b2tlblZlcnNpb24iOjAsImlhdCI6MTczNDAwNzMzNSwiZXhwIjoxNzM0MDEwOTM1fQ.lNzMB9MwEFKIELTZAlnTs3PjvvEpnJEWCccJFG62xBc";

	try {
		isLoading = true;
		errorMessage = '';

		const response = await fetch("https://api.app.thrivehub.ai/api/upload-logo", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});

		const result = await response.json();
		if (!response.ok) {
			throw new Error(result.message || "Logo upload failed.");
		}

		logoPreview = result.logoUrl || '';
		logo = file.name;
		alert("Logo uploaded successfully!");
	} catch (error) {
		// @ts-ignore
		errorMessage = error.message || "An error occurred.";
		alert(`Error: ${errorMessage}`);
	} finally {
		isLoading = false;
	}
}

	// Handles changes in features and keypoints
	// @ts-ignore
	function handleFeatureChange(type) {
		if (type === 'feature' && featureName === 'Other') {
			customFeatureName = '';
		} else if (type === 'keypoint' && keypointName === 'Other') {
			customKeypointName = '';
		}
	}

	// Adds features or keypoints
	// @ts-ignore
	function addFeature(type) {
		if (type === 'feature') {
			const name = featureName === 'Other' ? customFeatureName : featureName;
			if (name && featureDescription) {
				// @ts-ignore
				features = [...features, { name, description: featureDescription }];
				featureName = 'Reliable Uptime';
				customFeatureName = '';
				featureDescription = '';
			}
		} else if (type === 'keypoint') {
			const name = keypointName === 'Other' ? customKeypointName : keypointName;
			if (name && keypointDescription) {
				// @ts-ignore
				keypoints = [...keypoints, { name, description: keypointDescription }];
				keypointName = 'Reliable Uptime';
				customKeypointName = '';
				keypointDescription = '';
			}
		}
	}

	// Validates the form
	function validateForm() {
		isButtonDisabled = !website || !companyName || !fullName || !jobTitle || !email || !password;
	}
</script>

<div class="columns is-variable is-8">
	<!-- About Section -->
	<div class="column is-one-fifth">
		<Sidemenu />
	</div>
	<div class="column is-two-third">
		<div class="container">
			<div class="card">
				<h1 class="title">Company Details</h1>

				<div class="field">
					<label class="label">Business Website URL</label>
					<div class="control">
						<input
							class="input"
							type="url"
							bind:value={website}
							placeholder="Website"
							on:input={validateForm}
						/>
					</div>
				</div>
				<div class="field">
					<label class="label">Company Name</label>
					<div class="control">
						<input
							class="input"
							type="text"
							bind:value={companyName}
							placeholder="Enter your company name"
							on:input={validateForm}
						/>
					</div>
				</div>
				<div class="field">
					<label class="label">Full Name</label>
					<div class="control">
						<input
							class="input"
							type="text"
							bind:value={fullName}
							placeholder="Enter your full name"
							on:input={validateForm}
						/>
					</div>
				</div>
				<div class="field">
					<label class="label">Job Title</label>
					<div class="control">
						<input
							class="input"
							type="text"
							bind:value={jobTitle}
							placeholder="Enter your job title"
							on:input={validateForm}
						/>
					</div>
				</div>
				<div class="field">
					<label class="label">Work Email</label>
					<div class="control">
						<input
							class="input"
							type="email"
							bind:value={email}
							id="email"
							placeholder="Enter your email"
							on:input={validateForm}
						/>
					</div>
				</div>

				<div class="field">
					<label class="label">Business Category</label>
					<select class="input" bind:value={category}>
						<option value="Tech">Tech</option>
						<option value="E-commerce">E-commerce</option>
						<option value="Education">Education</option>
					</select>
				</div>

				<div class="field">
					<label class="label">Company Logo</label>
					<input type="file" accept="image/*" on:change={handleLogoUpload} />
					{#if logoPreview}
						<img src={logoPreview} alt="Logo Preview" />
					{/if}
				</div>

				<div class="field">
					<label class="label">A Short Description</label>
					<textarea
						class="textarea"
						bind:value={description}
						placeholder="Enter a short description"
					></textarea>
				</div>
			</div>

			<div class="card">
				<h1 class="title">Features</h1>

				<div class="field">
					<label class="label">Feature Name</label>
					<select
						class="input"
						bind:value={featureName}
						on:change={() => handleFeatureChange('feature')}
					>
						<option value="High Reliable Uptime">High Uptime</option>
						<option value="Affordable Plans">Affordable Plans</option>
						<option value="Easy-to-Use Control Panel">Easy-to-Use Control Panel</option>
						<option value="Scalability">Scalability</option>
						<option value="Free Domain Name">Free Domain Name</option>
						<option value="Security Features">Security Features</option>
						<option value="24/7 Customer Support">24/7 Customer Support</option>
						<option value="Other">Other</option>
					</select>
				</div>

				{#if featureName === 'Other'}
					<div class="field">
						<label class="label">Custom Feature Name</label>
						<input
							class="input"
							type="text"
							bind:value={customFeatureName}
							placeholder="Enter custom feature name"
						/>
					</div>
				{/if}

				<div class="field">
					<label class="label">Feature Description</label>
					<textarea
						class="textarea"
						bind:value={featureDescription}
						placeholder="Enter feature description"
					></textarea>
				</div>

				<div class="field">
					<button class="button is-info" on:click={() => addFeature('feature')}>Add Feature</button>
				</div>

				<div>
					<h2 class="title is-4">Added Features</h2>
					<ul>
						{#each features as feature}
							<li>{feature.name}: {feature.description}</li>
						{/each}
					</ul>
				</div>
			</div>

			<div class="card">
				<h1 class="title">Why Us?</h1>

				<div class="field">
					<label class="label">Name</label>
					<select
						class="input"
						bind:value={keypointName}
						on:change={() => handleFeatureChange('keypoint')}
					>
						<option value="High Reliable Uptime">High Uptime</option>
						<option value="Affordable Plans">Affordable Plans</option>
						<option value="Easy-to-Use Control Panel">Easy-to-Use Control Panel</option>
						<option value="Scalability">Scalability</option>
						<option value="Free Domain Name">Free Domain Name</option>
						<option value="Security Features">Security Features</option>
						<option value="24/7 Customer Support">24/7 Customer Support</option>
						<option value="Other">Other</option>
					</select>
				</div>

				{#if keypointName === 'Other'}
					<div class="field">
						<label class="label">Custom Name</label>
						<input
							class="input"
							type="text"
							bind:value={customKeypointName}
							placeholder="Enter custom keypoint name"
						/>
					</div>
				{/if}

				<div class="field">
					<label class="label">Description</label>
					<textarea
						class="textarea"
						bind:value={keypointDescription}
						placeholder="Enter keypoint description"
					></textarea>
				</div>

				<div class="field">
					<button class="button is-info" on:click={() => addFeature('keypoint')}
						>Add Keypoint</button
					>
				</div>

				<div>
					<h2 class="title is-4">Added Keypoints</h2>
					<ul>
						{#each keypoints as keypoint}
							<li>{keypoint.name}: {keypoint.description}</li>
						{/each}
					</ul>
				</div>
			</div>
			<div class="card">
				<button class="button is-info">Save</button>
			</div>
		</div>
	</div>
</div>

<style>
	.card {
		padding: 5%;
		margin-bottom: 2%;
		margin-right: 2%;
		width:98%;
		/* width: 90%; */
	}
</style>
