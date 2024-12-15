<script lang="ts">
	import Sidemenu from '../components/Sidemenu.svelte';
	import { writable } from 'svelte/store';

	import { saveBusinessProfile } from '$lib/stores/profile';
	import { onMount } from 'svelte';
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
	let businessProfile = writable({
		org_name: '',
		job_title: '',
		work_email: '',
		about_business: '',
		full_name: '',
		industry: '',
		business_website_url: ''
	});


	function handleSubmit(event: Event) {
		event.preventDefault();
		// Log the collected data as JSON
		console.log('Form Data:', JSON.stringify('formData', null, 2));
	}
</script>
<div class="main-content">
	<Sidemenu />
	<!-- Analytics Header -->
	<div class="analytics-header">
		<div class="header-top">
			<h1>Add a new Company</h1>
	
		</div>
		<hr class="divider" />
	</div>
	<div class="stats-section">
		<div class="card">
			<!-- <h1 class="title">Company Details</h1> -->
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
					<div class="column is-full">
						<label class="label">A Short Description</label>
						<textarea
							class="textarea"
							bind:value={description}
							placeholder="Enter a short description"
						></textarea>
					</div>
					<div class="column is-full">
						<div class="column is-full is-flex is-justify-content-flex-end">
							<button class="button is-light mr-5">Cancel</button>
							<button type="submit" class="button is-primary">Save Company</button>
						</div>
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

	.stats-section {
		display: flex;
		justify-content: space-between;
		gap: 2px;
		padding: 20px;
		border-radius: 10px;
		background-color: #f4faff;
		margin-top: -40px;
	}


</style>