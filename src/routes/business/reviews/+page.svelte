<script>
	// @ts-nocheck
	import { API_BASE_URL } from '$lib/config';
	import { onMount } from 'svelte';
	import { page } from '$app/stores'; // Import the page store
	import { goto } from '$app/navigation'; // Import goto for navigation

	let query = '';
	let reviews = [];
	let error = '';
	let orgName = 'Unknown Organization'; // Default value

	// Function to redirect to the business profile page
	function redirectToBusinessProfile(id) {
		goto(`/business/${id}`);
	}

	// Reactively get query from URL
	$: query = $page.url.searchParams.get('query') || '';

	// Function to fetch reviews along with `org_name`
	async function fetchReviews() {
		error = '';
		reviews = [];

		try {
			const response = await fetch(
				`${API_BASE_URL}/reviews/search?query=${encodeURIComponent(query)}`
			);
			if (!response.ok) {
				throw new Error(`Failed to fetch reviews: ${response.statusText}`);
			}
			const data = await response.json();
			// Assuming `org_name` is included in each review from the backend
			reviews = data.filter((review) => review.approval_status === 'true');
			console.log('Filtered Reviews with org_name:', reviews);
		} catch (err) {
			error = `Error fetching reviews: ${err.message}`;
			console.error(error);
		}
	}

	// Reactive fetch only when `query` is available
	$: if (query) {
		fetchReviews();
	}
</script>

<section class="page-header">
	<h1>Search Results for "{query}"</h1>
</section>

<div class="reviews-page">
	{#if error}
		<p style="color: red;">{error}</p>
	{:else if reviews.length === 0}
		<p>No reviews found for your search.</p>
	{:else}
		<div class="review-list">
			{#each reviews as review (review.id)}
				<div class="review-card">
					<div class="content">
						<!-- Organization name with click handler for redirection -->
						<div 
							class="title-row"
							role="button"
							tabindex="0"
							on:click={() => redirectToBusinessProfile(review.business_id)}
						>
							<p class="title is-4">{review.org_name || 'Unknown Organization'}</p>
							<p class="days-ago">
								{Math.floor((new Date() - new Date(review.created_at)) / (1000 * 60 * 60 * 24))} days
								ago
							</p>
						</div>

						<div class="rating-row">
							<p>{review.rating}</p>
							<span class="icon is-small">
								<i class="fas fa-star"></i>
							</span>
						</div>
						<p>{review.feedback}</p>

						<div class="actions">
							<span class="icon">
								<i class="fas fa-heart"></i>
							</span>
							<p>{review.likes_total || 0}</p>
							<span class="icon">
								<i class="fas fa-share-alt"></i>
							</span>
						</div>
					</div>

					<footer class="footer">
						<!-- <div class="footer-item">
							<span class="icon is-small">
								<i class="fas fa-edit"></i>
							</span>
							Reply
						</div> -->
					</footer>
				</div>
			{/each}
		</div>
	{/if}
</div>


<style>
	/* Use the same styles as the original review card */
	.review-card {
		width: 100%;
		max-width: 1026px;
		margin-top: 4%;
		margin-bottom: 4%;
		justify-self: center;
		background-color: #ffffff;
		border-radius: 8px;
	}

	.header {
		height: 56px;
		display: flex;
		align-items: center;
		background-color: #118bf6;
		color: white;
		padding-top: 16px;
		padding-left: 20px;
		border-radius: 8px 8px 0 0;
	}

	.content {
		padding: 20px;
		display: flex;
		flex-direction: column;
		color: #1f1f1f;
	}

	.title-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-decoration: underline;
	}

	.rating-row {
		gap: 10px;
		display: flex;
	}

	.rating-row .icon {
		padding-top: 6px;
		font-size: 1em;
	}

	.footer {
		display: flex;
		justify-content: start;
		padding: 10px 20px;
		gap: 30px;
		border-top: 1px solid #ddd;
		background-color: #ffffff;
	}

	.footer-item {
		display: flex;
		align-items: center;
		gap: 5px;
		cursor: pointer;
		color: #939393;
	}

	.actions {
		display: flex;
		gap: 10px;
	}

	.actions .icon {
		font-size: 1.5rem;
		color: #118bf6;
		cursor: pointer;
	}

	.actions .icon:hover {
		color: #0a6ebf;
	}
</style>
