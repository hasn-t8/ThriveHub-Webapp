<script lang="ts">
	import { getProfilesPublic } from '$lib/stores/business';
	import { onMount } from 'svelte';
	import { writable, get } from 'svelte/store';
	import { page } from '$app/stores';
	import type { ProfileData } from '$lib/types/Profile';

	let businessProfile = writable<ProfileData[]>([]);
	let filteredProfiles = writable<ProfileData[]>([]);
	let selectedRatings = writable<string[]>([]);
	let selectedFilters = writable<string[]>([]);
	let query: string = '';

	$: totalResults = $filteredProfiles.length;

	// Extract query from the URL
	$: {
		const urlParams = new URLSearchParams($page.url.search);
		query = urlParams.get('query') || '';
		if (query.trim()) {
			applyFilters();
		}
	}

	// Fetch profiles
	async function fetchProfiles(): Promise<void> {
		try {
			const profiles = await getProfilesPublic();
			businessProfile.set(profiles);
			applyFilters();
		} catch (error) {
			console.error('Error fetching profiles:', error);
		}
	}

	// Toggle ratings
	function toggleRating(rating: string): void {
		selectedRatings.update((ratings) =>
			ratings.includes(rating) ? ratings.filter((r) => r !== rating) : [...ratings, rating]
		);
		applyFilters();
	}

	// Toggle filters
	function toggleFilter(filter: string): void {
		selectedFilters.update((filters) =>
			filters.includes(filter) ? filters.filter((f) => f !== filter) : [...filters, filter]
		);
		applyFilters();
	}

	// Pagination
	let currentPage = 1;
	const itemsPerPage = 10;

	function getPageNumbers(): number[] {
		const totalPages = Math.ceil(totalResults / itemsPerPage);
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	function prevPage() {
		if (currentPage > 1) currentPage--;
	}

	function nextPage() {
		const totalPages = Math.ceil(totalResults / itemsPerPage);
		if (currentPage < totalPages) currentPage++;
	}

	function handlePageClick(page: number) {
		currentPage = page;
	}

	function redirectToBusinessProfile(id: string): void {
		window.location.href = `/business/${id}`;
	}

	// Apply search query, ratings, and category filters
	function applyFilters(): void {
		const lowerCaseQuery = query.toLowerCase();
		const ratings = get(selectedRatings);
		const filters = get(selectedFilters);

		const profiles = get(businessProfile);
		const result = profiles.filter((profile) => {
			const matchesQuery =
				(profile.org_name && profile.org_name.toLowerCase().includes(lowerCaseQuery)) ||
				(profile.category && profile.category.toLowerCase().includes(lowerCaseQuery));

			const matchesRatings = ratings.length === 0 || ratings.includes(profile.avg_rating?.toString() || '');

			const matchesFilters = filters.length === 0 || filters.includes(profile.category || '');

			return matchesQuery && matchesRatings && matchesFilters;
		});

		filteredProfiles.set(result);
	}

	onMount(() => {
		fetchProfiles();
	});
</script>

<section class="section category-content">
	<div class="box mb-2">
		<div class="level">
			<div class="level-left">
				<p>Showing {totalResults} companies</p>
			</div>
			<div class="level-right">
				<p class="mr-5">Sorting By</p>
				<div class="select">
					<select>
						<option>Most Popular</option>
						<option>Highest Rated</option>
						<option>Most Reviewed</option>
					</select>
				</div>
			</div>
		</div>
	</div>

	<!-- Companies List -->
	{#each $filteredProfiles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as business}
		<div class="box mb-4">
			<article class="media">
				<div
					class="media-left"
					on:click={() => business.id && redirectToBusinessProfile(business.id.toString())}
					on:keydown={(e) =>
						e.key === 'Enter' && business.id && redirectToBusinessProfile(business.id.toString())}
				>
					<figure class="media-left">
						<img
							src="{business.logo_url ?? '/assets/no_image.jpg'}"
							alt="Company logo"
							style="width: 4rem;"
						/>
					</figure>
				</div>
				<div class="media-content">
					<div
						class="content"
						on:click={() => business.id && redirectToBusinessProfile(business.id.toString())}
						on:keydown={(e) =>
							e.key === 'Enter' && business.id && redirectToBusinessProfile(business.id.toString())}
					>
						<strong>{business.org_name}</strong>
						<p>{business.category ?? 'No Category'}</p>
						<p>{business.avg_rating} ★ | {business.total_reviews} Reviews</p>
					</div>
				</div>
			</article>
		</div>
	{/each}

	<!-- Pagination -->
	<div class="pagination-container has-text-weight-bold">
		<button class="pagination-arrow double-arrow mr-5" on:click={() => handlePageClick(1)}>
			&lt;&lt;
		</button>
		<button
			class="pagination-arrow single-arrow mr-4"
			on:click={prevPage}
			disabled={currentPage === 1}
		>
			&lt;
		</button>

		{#each getPageNumbers() as page}
			<button
				class="pagination-link {currentPage === page ? 'is-current' : ''}"
				on:click={() => handlePageClick(page)}
			>
				{page}
			</button>
		{/each}

		<button
			class="pagination-arrow single-arrow ml-4"
			on:click={nextPage}
			disabled={currentPage === Math.ceil(totalResults / itemsPerPage)}
		>
			&gt;
		</button>
	</div>
</section>
<style>

    
	.stars .icon {
		margin-right: 10px;
	}

	.pagination-container {
		display: flex;
		justify-content: center;
		padding-top: 20px;
		padding-bottom: 20px;
	}

	.pagination-arrow {
		font-size: 18px;
		cursor: pointer;
		color: black;
		all: unset;
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		color: inherit;
		cursor: pointer;
	}

	.pagination-arrow.double-arrow {
		color: #b08888; /* Light black */
	}

	.pagination {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.pagination-link {
		padding: 5px 10px;
		cursor: pointer;
		user-select: none;
		color: black;
		border: 1px solid rgb(193, 193, 193);
		border-radius: 5px;
		background-color: transparent;
		transition:
			background-color 0.3s,
			border-color 0.3s;
	}

	.pagination-link:hover,
	.pagination-link.is-current {
		background-color: #118cf6;
		color: white;
		border-color: #118cf6;
	}

	.pagination-link.disabled {
		pointer-events: none;
		opacity: 0.5;
	}

</style>