<script>
	// @ts-nocheck

	import Sidemenu from '../components/Sidemenu.svelte';
	import { onMount } from 'svelte';

	let searchQuery = '';
	let companyLogoPreview = '';
	let selectedFileName = 'No file selected';
	let companyName = '';
	let description = '';
	let fullName = '';
	let jobTitle = '';
	let email = '';
	let companyCategory = '';
	let companyUrl = '';
	let companyDescription = '';

	let availableKeyFeatures = ['High Reliable Uptime', 'Affordable Plans', 'Easy-to-Use Control Panel', 'Scalability', 'Free Domain Name', 'Security Features', '24/7 Customer Support'];
	let keyFeatureTitle = '';
	let customKeyFeatureTitle = '';
	let keyFeatureDescription = '';
	let keyFeatures = [];

	let availableWhyChoose = ['High Reliable Uptime', 'Affordable Plans', 'Easy-to-Use Control Panel', 'Scalability', 'Free Domain Name', 'Security Features', '24/7 Customer Support'];
	let whyChooseTitle = '';
	let customWhyChooseTitle = '';
	let whyChooseDescription = '';
	let whyChoose = [];

	// Function to handle logo file upload
	function handleLogoUpload(event) {
		const file = event.target.files[0];
		if (file) {
			selectedFileName = file.name;
			const reader = new FileReader();
			reader.onload = () => {
				companyLogoPreview = reader.result;
			};
			reader.readAsDataURL(file);
		} else {
			selectedFileName = 'No file selected';
			companyLogoPreview = '';
		}
	}

	function removeLogo() {
		companyLogoPreview = '';
		selectedFileName = 'No file selected';
	}

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

	function removeKeyFeature(index) {
		keyFeatures = keyFeatures.filter((_, i) => i !== index);
	}

	onMount(() => {
		console.log('Component Mounted');
	});

	// Handle form submission and collect data as JSON
	function handleSubmit(event) {
		event.preventDefault(); // Prevent the default form submission behavior

		// Create the JSON object with the collected data
		const formData = {
			companyName,
			companyCategory,
			companyUrl,
			companyLogoPreview,
			companyDescription,
			keyFeatures,
			whyChoose
		};

		// Log the collected data as JSON
		console.log('Form Data:', JSON.stringify(formData, null, 2));
	}

	onMount(() => {
		console.log('Component Mounted');
	});

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

	function removeWhyChoose(index) {
		whyChoose = whyChoose.filter((_, i) => i !== index);
	}

	onMount(() => {
		console.log('Component Mounted');
	});
</script>

<div class="main-content">
	<Sidemenu />
	<div class="analytics-header">
		<h1>Hi, Alex</h1>
		<hr class="divider" />
	</div>

	<div class="stats-section">
		<div class="card">
			<h1 class="title">Company Details</h1>
			<form on:submit={handleSubmit}>
				<div class="columns is-multiline">
					<div class="column is-half">
						<label class="label">Company Name</label>
						<input
							class="input"
							type="text"
							bind:value={companyName}
							placeholder="Enter your company name"
						/>
					</div>

					<div class="column is-half">
						<label class="label">Business Website URL</label>
						<input
							class="input"
							type="text"
							bind:value={companyUrl}
							placeholder="www.company.com"
						/>
					</div>

					<div class="column is-half">
						<label class="label">Full Name</label>
						<input
							class="input"
							type="text"
							bind:value={fullName}
							placeholder="Enter your full name"
						/>
					</div>

					<div class="column is-half">
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="label">Job Title</label>
						<input
							class="input"
							type="text"
							bind:value={jobTitle}
							placeholder="Enter your job title"
						/>
					</div>

					<div class="column is-half">
						<label class="label">Work Email</label>
						<input class="input" type="email" bind:value={email} placeholder="Enter your email" />
					</div>

					<div class="column is-half">
						<label class="label">Business Category</label>
						<select class="input" bind:value={companyCategory}>
							<option value="Tech">Tech</option>
							<option value="E-commerce">E-commerce</option>
							<option value="Wellness">Wellness</option>
							<option value="Education">Education</option>
							<option value="Finance">Finance
							</option>
							<option value="Home Electronics">Home Electronics</option>

						</select>
					</div>
					<div class="column is-half">
						<label class="label">A Short Description</label>
						<textarea
							class="textarea"
							bind:value={description}
							placeholder="Enter a short description"
						></textarea>
					</div>

					<div class="column is-half">
						<label class="label">Company Logo</label>
						<input type="file" accept="image/*" on:change={handleLogoUpload} />
						{#if companyLogoPreview}
							<img src={companyLogoPreview} alt="Logo Preview" />
						{/if}
					</div>

					<div class="column is-full is-flex is-justify-content-flex-end">
						<button type="submit" class="button is-primary">Save</button>
					</div>
				</div>
			</form>

			<!-- Key Features and Benefits Section -->
			<div class="column is-full">
				<h3 class="subtitle">Key Features and Benefits</h3>
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
							<button class="button is-danger mt-2" type="button" on:click={cancelCustomKeyFeature}
								>✘</button
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

			<!-- Why Choose Section -->
			<div class="column is-full">
				<h3 class="subtitle">Why Choose</h3>
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

	.search-bar {
		display: flex;
		align-items: center;
		background-color: #fff;
		border: 1px solid #dfe6ed;
		border-radius: 5px;
		padding: 10px 15px;
		width: 100%;
		max-width: 400px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.search-bar input {
		border: none;
		outline: none;
		flex: 1;
		font-size: 1rem;
		color: #333;
	}

	.search-bar i {
		color: #999;
		margin-right: 10px;
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
