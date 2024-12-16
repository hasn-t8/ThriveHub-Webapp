<script lang="ts">
	import Sidemenu from '../components/Sidemenu.svelte';
	import { getProfiles } from '$lib/stores/business';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { ProfileData } from '$lib/types/Profile';

	let businessProfile: Writable<ProfileData[]> = writable([]);

	function editBusiness(id: string) {
    window.location.href = `/admin-area/edit-business/${id}`;
  }

	function addBusiness(): void {
		window.location.href = '/admin-area/add-company';
	}

	function addBusinessProfile(newProfile: ProfileData): void {
		businessProfile.update((profiles) => [...profiles, newProfile]);
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

<div class="main-content" style="height: 100vh; width:85%; justify-content:center; justify-items:flex-end">
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
						<button class="custom-button edit" on:click={() => editBusiness(business.id)}>Edit</button>
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
    /* margin-right: 388px; */
    /* background-color: transparent; */
    /* align-content: center; */
    /* align-items: flex-start; */
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
	.header .add-button:hover {
		background-color: #0056b3;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}
	.header .add-button:active {
		background-color: #004080;
	}
	.business-list {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
	.business-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #f9f9f9;
		border: 1px solid #ddd;
		border-radius: 5px;
		padding: 15px;
		margin-bottom: 10px;
	}
	.business-item img {
		width: 50px;
		height: 50px;
		border-radius: 5px;
		margin-right: 15px;
	}
	.business-info {
		flex-grow: 1;
	}
	.business-name {
		font-weight: bold;
		font-size: 18px;
	}
	.business-category {
		color: gray;
		font-size: 14px;
	}
</style>
