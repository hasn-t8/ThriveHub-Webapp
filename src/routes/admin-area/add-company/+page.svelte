<script>
	// @ts-nocheck
	
	import Sidemenu from '../components/Sidemenu.svelte';
	import { onMount } from 'svelte';
	
	let searchQuery = '';
	let companyLogoPreview = '';
	let selectedFileName = 'No file selected';
	let keyFeatureTitle = '';
	let keyFeatureDescription = '';
	let whyChooseTitle = '';
	let whyChooseDescription = '';
	let keyFeatures = [];
	let whyChoose = [];
	let companyName = '';
	let companyCategory = '';
	let companyUrl = '';
	let companyDescription = '';
	
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
	
	// Function to add a new row to the "Key Features and Benefits" table
	function addKeyFeature(event) {
		event.preventDefault(); // Prevent form submission on click
		if (keyFeatureTitle && keyFeatureDescription) {
		  keyFeatures = [...keyFeatures, { title: keyFeatureTitle, description: keyFeatureDescription }];
		  keyFeatureTitle = ''; // Clear the title input for Key Features
		  keyFeatureDescription = ''; // Clear the description input for Key Features
		}
	}
	
	// Function to add a new row to the "Why Choose" table
	function addWhyChoose(event) {
		event.preventDefault(); // Prevent form submission on click
		if (whyChooseTitle && whyChooseDescription) {
		  whyChoose = [...whyChoose, { title: whyChooseTitle, description: whyChooseDescription }];
		  whyChooseTitle = ''; // Clear the title input for Why Choose
		  whyChooseDescription = ''; // Clear the description input for Why Choose
		}
	}
	
	// Function to remove a row from the "Key Features and Benefits" table
	function removeKeyFeature(index) {
		keyFeatures = keyFeatures.filter((_, i) => i !== index);
	}
	
	// Function to remove a row from the "Why Choose" table
	function removeWhyChoose(index) {
		whyChoose = whyChoose.filter((_, i) => i !== index);
	}
	
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
	</script>
	
	<div class="main-content">
	  <Sidemenu />
	  <!-- Analytics Header -->
	  <div class="analytics-header">
		<div class="header-top">
		  <h1>Hi, Alex</h1>
		  <div class="search-bar">
			<i class="fas fa-search"></i>
			<input
			  type="text"
			  placeholder="Search reviews, feedback, analytics..."
			  bind:value={searchQuery}
			/>
		  </div>
		</div>
		<!-- Divider -->
		<hr class="divider" />
	  </div>
	
	  <!-- Stats Section -->
	  <div class="stats-section">
		<div class="box">
		  <h2 class="subtitle">Company Details</h2>
		  <form on:submit={handleSubmit}>
			<div class="columns is-multiline">
			  <div class="column is-half">
				<label class="label" for="company-name">Company Name</label>
				<input
				  id="company-name"
				  class="input"
				  type="text"
				  placeholder="Bluehost"
				  bind:value={companyName}
				/>
			  </div>
			  <div class="column is-half">
				<label class="label" for="company-category">Business Category</label>
				<div class="select is-fullwidth">
				  <select id="company-category" bind:value={companyCategory}>
					<option>Tech</option>
					<option>Finance</option>
					<option>Retail</option>
				  </select>
				</div>
			  </div>
	
			  <div class="column is-half">
				<label class="label" for="company-url">Company URL</label>
				<input
				  id="company-url"
				  class="input"
				  type="text"
				  placeholder="www.company.com"
				  bind:value={companyUrl}
				/>
			  </div>
	
			  <div class="column is-half">
				<label class="label" for="company-logo">Company Logo</label>
				<div class="file has-name is-boxed">
				  <label class="file-label">
					<input
					  class="file-input"
					  type="file"
					  accept="image/*"
					  on:change={handleLogoUpload}
					/>
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
					<img src={companyLogoPreview} alt="Company Logo Preview">
				  </figure>
				  <button class="button is-danger mt-3" on:click={removeLogo}>Remove Image</button>
				{/if}
			  </div>
	
			  <div class="column is-full">
				<label class="label" for="company-description">Company Description</label>
				<textarea
				  class="textarea"
				  rows="3"
				  bind:value={companyDescription}
				>Bluehost is a trusted web hosting provider offering reliable hosting services...</textarea>
			  </div>
	
			  <!-- Key Features and Benefits Section -->
			  <div class="column is-full">
				<h3 class="subtitle">Key Features and Benefits</h3>
				<div class="columns is-multiline">
				  <div class="column is-half">
					<label class="label" for="key-feature-title">Title</label>
					<input
					  class="input"
					  id="key-feature-title"
					  type="text"
					  bind:value={keyFeatureTitle}
					  placeholder="Enter feature title"
					/>
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
					<button class="button is-primary mt-3" type="button" on:click={addKeyFeature}>Add to Key Features Table</button>
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
						  <button class="button is-danger" type="button" on:click={() => removeKeyFeature(index)}>Remove</button>
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
					<input
					  class="input"
					  id="why-choose-title"
					  type="text"
					  bind:value={whyChooseTitle}
					  placeholder="Enter reason title"
					/>
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
					<button class="button is-primary mt-3" type="button" on:click={addWhyChoose}>Add to Why Choose Table</button>
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
						  <button class="button is-danger" type="button" on:click={() => removeWhyChoose(index)}>Remove</button>
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
		  </form>
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
	
	  .box{
		flex: 1;
	  }
	</style>
	