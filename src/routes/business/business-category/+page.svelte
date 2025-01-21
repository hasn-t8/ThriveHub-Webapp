<script lang="ts">
	import { goto } from '$app/navigation';
	import { updateBusinessProfile } from '$lib/stores/business';
	import { writable } from 'svelte/store';
	import type { ProfileData } from '$lib/types/Profile';
	import { addToast } from '$lib/stores/toasts';

	/**
	 * @type {string | null}
	 */
	// let selectedCategory: string | null = null;
	let selectedCategory = writable<string | null>(null);

	/**
	 * Mocked profile ID for demonstration purposes
	 */
	let profileId;

	let theProfile = writable<ProfileData>({
		category: '',
		profile_type: 'business'
	});

	/**
	 * Selects a category and updates the profile
	 * @param {string} category
	 */
	async function selectCategory(category: string) {
		// console.log('Selected category:', category);

		$selectedCategory = category;
		profileId = Number(localStorage.getItem('businessProfileId'));
		if (!profileId) {
			alert('Profile ID not found. Please try again.');
			return;
		}

		try {
			// Update the business profile with the selected category
			$theProfile.category = category;
			$theProfile.profile_type = 'business';

			const success = await updateBusinessProfile(profileId, $theProfile);
			if (success) {
				// alert(`Category updated to "${category}" successfully!`);
				addToast('Category updated successfully!', 'success');
				goto('/business/business-about');
			} else {
				alert('Failed to update category. Please try again.');
			}
		} catch (error) {
			console.error('Error updating category: --------- ', error);
			alert('An error occurred while updating the category.');
		}
	}
</script>

<!-- Main Content -->
<div class="container">
	<div class="card">
		<!-- Title -->
		<div class="has-text-centered mb-5">
			<h2 class="title is-4">Choose your Category</h2>
			<p class="subtitle is-6">
				Get discovered by your ideal customers. Choose the category that best describes your
				business. Selecting the right category will increase your visibility and attract more
				potential customers.
			</p>
		</div>

		<!-- Category Options -->
		<div class="columns is-centered is-variable is-8">
			<div class="column is-half">
				<div
					class="category-card"
					on:click={() => selectCategory('Tech')}
					class:selected={$selectedCategory === 'Tech'}
				>
					<div class="card-content">
						<img src="/assets/tech.png" alt="Tech Icon" class="category-icon" />
						<h4 class="category-title">Tech</h4>
					</div>
				</div>
			</div>
			<div class="column is-half">
				<div
					class="category-card"
					on:click={() => selectCategory('Wellness')}
					class:selected={$selectedCategory === 'Wellness'}
				>
					<div class="card-content">
						<img src="/assets/wellness.png" alt="Wellness Icon" class="category-icon" />
						<h4 class="category-title">Wellness</h4>
					</div>
				</div>
			</div>
		</div>

		<div class="columns is-centered is-variable is-8">
			<div class="column is-half">
				<div
					class="category-card"
					on:click={() => selectCategory('Finance')}
					class:selected={$selectedCategory === 'Finance'}
				>
					<div class="card-content">
						<img src="/assets/finance.png" alt="Finance Icon" class="category-icon" />
						<h4 class="category-title">Finance</h4>
					</div>
				</div>
			</div>
			<div class="column is-half">
				<div
					class="category-card"
					on:click={() => selectCategory('Home Electronics')}
					class:selected={$selectedCategory === 'Home Electronics'}
				>
					<div class="card-content">
						<img
							src="/assets/home electronics.png"
							alt="Home Electronics Icon"
							class="category-icon"
						/>
						<h4 class="category-title">Home Electronics</h4>
					</div>
				</div>
			</div>
		</div>

		<!-- Continue Button -->
		<div class="has-text-centered">
			<a href="/business/business-logo">
				<button
					id="continue-button"
					class="button is-primary"
					style="border-radius: 10px; margin-bottom: 30px; color: white; background-color: #118BF6; width: 214px;"
					disabled={!selectedCategory}
				>
					go on
				</button>
			</a>
		</div>
	</div>
</div>

<style>
	/* Add your styles here */
	body {
		font-family: 'Inter', sans-serif;
		background-color: #e7f3fe;
		height: auto;
	}
	.slider-container {
		width: 60%;
		margin: 0 auto;
	}
	.title.is-4 {
		margin-bottom: 47px;
	}
	.card {
		background: white;
		border-radius: 8px;
		box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
		margin-bottom: 20px;
		padding: 20px;
		margin-top: 15px;
		width: 60%;
	}
	.container {
		justify-items: center;
	}
	.columns {
		margin-bottom: 20px;
	}
	.category-card {
		display: flex;
		align-items: center;
		padding: 15px;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		background-color: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		width: 100%;
		font-weight: 600;
		cursor: pointer;
	}
	.category-card:hover {
		transform: scale(1.03);
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
	}
	.category-card.selected {
		border-color: #118bf6;
		background-color: #eaf4fd;
	}
	.card-content {
		display: flex;
		align-items: center;
		gap: 20px;
	}
	.category-icon {
		width: 80px;
		height: 80px;
	}
	.category-title {
		font-size: 1.5em;
		color: #333;
		font-weight: 500;
	}
	.progress {
		height: 5px;
	}
</style>
