<script lang="ts">
	import Sidemenu from '../components/Sidemenu.svelte';
	import { writable, get } from 'svelte/store';
	import { saveBusinessProfile } from '$lib/stores/business';

	let businessProfile = writable({
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

	let errorMessage = writable('');

	// Handle form submission and collect data as JSON
	async function addBusiness(event: Event) {
		event.preventDefault();
		errorMessage.set('');

		const currentProfile = get(businessProfile);
		console.log('Saving profile:', currentProfile);

		try {
			const result = await saveBusinessProfile(currentProfile);
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

	function resetForm() {
		businessProfile.set({
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
		errorMessage.set('');
	}
</script>

<div class="main-content">
	<Sidemenu />

	<div class="analytics-header">
		<div class="header-top">
			<span style="font-size:1.5rem">Add a New Organization</span>
		</div>
		<hr class="divider" />
	</div>

	{#if $errorMessage}
		<div class="notification is-danger">{$errorMessage}</div>
	{/if}

	<div class="stats-section">
		<div class="card">
			<form on:submit={addBusiness}>
				<div class="columns is-multiline">
					<div class="column is-half">
						<label class="label">Company Name</label>
						<input
							class="input"
							type="text"
							bind:value={$businessProfile.org_name}
							placeholder="Enter your company name"
						/>
					</div>

					<div class="column is-half">
						<label class="label">Business Website URL</label>
						<input
							class="input"
							type="text"
							bind:value={$businessProfile.business_website_url}
							placeholder="www.company.com"
						/>
					</div>

					<div class="column is-half">
						<label class="label">Full Name</label>
						<input
							class="input"
							type="text"
							bind:value={$businessProfile.full_name}
							placeholder="Enter your full name"
						/>
					</div>

					<div class="column is-half">
						<label class="label">Job Title</label>
						<input
							class="input"
							type="text"
							bind:value={$businessProfile.job_title}
							placeholder="Enter your job title"
						/>
					</div>

					<div class="column is-half">
						<label class="label">Work Email</label>
						<input
							class="input"
							type="email"
							bind:value={$businessProfile.work_email}
							placeholder="Enter your email"
						/>
					</div>

					<div class="column is-half">
						<label class="label">Business Category</label>
						<select class="input" bind:value={$businessProfile.industry}>
							<option value="Tech">Tech</option>
							<option value="E-commerce">E-commerce</option>
							<option value="Wellness">Wellness</option>
							<option value="Education">Education</option>
							<option value="Finance">Finance</option>
							<option value="Home Electronics">Home Electronics</option>
						</select>
					</div>

					<div class="column is-full">
						<label class="label">A Short Description</label>
						<textarea
							class="textarea"
							bind:value={$businessProfile.about_business}
							placeholder="Enter a short description"
						></textarea>
					</div>

					<div class="column is-full is-flex is-justify-content-flex-end">
						<button type="button" class="button is-light mr-5" on:click={resetForm}>Cancel</button>
						<button type="submit" class="button is-primary">Save Company</button>
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
