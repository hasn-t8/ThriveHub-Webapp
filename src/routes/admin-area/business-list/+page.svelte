<script lang="ts">
	import Sidemenu from '../components/Sidemenu.svelte';
	import { getProfiles } from '$lib/stores/business';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { ProfileData } from '$lib/types/Profile';

	let businessProfile: Writable<ProfileData[]> = writable([]);

	function editBusiness(id: string | undefined) {
		if (!id) {
			console.error("Business ID is undefined");
			alert("Failed to edit: Business ID is missing.");
			return;
		}
		window.location.href = `/admin-area/edit-business/${id}`;
	}

	function addBusiness(): void {
		window.location.href = '/admin-area/add-company';
	}

	async function fetchProfile(): Promise<void> {
		try {
			const profiles: ProfileData[] = await getProfiles();

			const businessProfilesFiltered: ProfileData[] = profiles.filter(
				(profile: ProfileData) => profile.profile_type === 'business'
			);

			if (businessProfilesFiltered.length > 0) {
				businessProfile.set(businessProfilesFiltered);
				console.log('Business Profiles:', businessProfilesFiltered);
			} else {
				console.warn('No business profiles found.');
			}
		} catch (error) {
			console.error('Error fetching profiles:', error);
		}
	}

	onMount(() => {
		fetchProfile();
	});
</script>

<div class="main-content">
	<Sidemenu />
	<div class="analytics-header">
		<div class="header-top">
			<h1>Organizations</h1>
		</div>
		<hr class="divider" />
	</div>

	<div class="business-list-container">
		<div class="header">
			<h1>Your Businesses</h1>
			<button class="custom-button add-button" on:click={addBusiness}>Add Business</button>
		</div>

		<ul class="business-list scrollable">
			{#each $businessProfile as business}
				<div class="business-item">
					<div class="business-info">
						<li class="business-item">
							<div class="business-logo">
								<img src="https://via.placeholder.com/50" alt="Company Logo" />
							</div>
							<div class="business-info">
								<div class="business-name">{business.org_name}</div>
								<div class="business-category">{business.category}</div>
								<div class="business-address">{business.business_website_url}</div>
							</div>
						</li>
					</div>
					<div class="business-actions">
						<button class="custom-button edit" on:click={() => editBusiness(business.profile_id)}>Edit</button>
					</div>
				</div>
			{/each}
		</ul>
	</div>
</div>

<style>
	.business-list-container {
		height: calc(100vh - 150px);
		overflow-y: auto;
		padding: 1rem;
	}

	.scrollable {
		height: 100%;
		overflow-y: auto;
	}

	.business-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		border-bottom: 1px solid #ccc;
	}

	.business-info {
		display: flex;
		align-items: center;
	}

	.business-logo img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-right: 1rem;
	}

	.business-name {
		font-size: 1.2rem;
		font-weight: bold;
	}

	.edit {
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 5px;
	}

	.main-content {
		margin-left: 200px;
	}

	.analytics-header {
		margin-left: 50px;
		padding: 20px;
		width: 100%;
		justify-self: flex-start;
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

	.divider {
		border: none;
		height: 1px;
		background-color: #dfe6ed;
		margin: 20px 0;
	}

	.business-list-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.header .add-button {
		cursor: pointer;
	}
</style>