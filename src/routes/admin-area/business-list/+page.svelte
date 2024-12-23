<script lang="ts">
	import Sidemenu from '../components/Sidemenu.svelte';
	import { getProfiles } from '$lib/stores/business';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { ProfileData } from '$lib/types/Profile';

	let businessProfile: Writable<ProfileData[]> = writable([]);

	function editBusiness(id: number | undefined) {
		if (!id) {
			console.error('Business ID is undefined');
			alert('Failed to edit: Business ID is missing.');
			return;
		}
		window.location.href = `/admin-area/edit-business/${id}`;
	}

	function addBusiness(): void {
		window.location.href = '/admin-area/add-company';
	}

	async function fetchProfiles(): Promise<void> {
		try {
			const profiles: ProfileData[] = await getProfiles();

			businessProfile.set(profiles);
			console.log('Profiles:', profiles);
			
		} catch (error) {
			console.error('Error fetching profiles:', error);
		}
	}

	onMount(() => {
		fetchProfiles();
	});
</script>

<div class="main-content" style="height: 100vh;">
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

		<ul class="business-list">
			{#each $businessProfile as business, index}
				{@render organizationTab(business)}
			{/each}
		</ul>
	</div>
</div>

{#snippet organizationTab(item: ProfileData)}
	<div class="business-item">
		<div class="business-info">
			<li class="business-item">
				<div class="business-logo">
					<img src="{item.logo_url ? item.logo_url : "https://via.placeholder.com/50"}" alt="Company Logo" />
				</div>
				<div class="business-info">
					<div class="business-name">{item.org_name}</div>
					<div class="business-category">{item.category}</div>
					<div class="business-address">{item.business_website_url}</div>
				</div>
			</li>
		</div>
		<div class="business-actions">
			<button class="custom-button edit" on:click={() => editBusiness(item.business_profile_id)}>Edit</button>
		</div>
	</div>
{/snippet}

<style>
	.main-content {
		margin-left: 200px;
	}
	.analytics-header {
		margin-left: 50px;
		padding: 20px;
		background-color: transparent;
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
		background-color: #0056b3; /* Darker blue on hover */
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Adds a shadow effect */
	}
	.header .add-button:active {
		background-color: #004080; /* Even darker blue on click */
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

	.business-actions button {
		margin-left: 10px;
		padding: 8px 12px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-size: 14px;
	}

	.business-actions .edit {
		background-color: #ffc107;
		color: #fff;
	}

	.business-actions .deletebutton {
		background-color: #dc3545;
		color: #fff;
	}
</style>
