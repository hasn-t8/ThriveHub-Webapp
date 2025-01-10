<script>
	// @ts-nocheck
	import { API_BASE_URL } from '$lib/config';
	import { onMount } from 'svelte';
	import { page } from '$app/stores'; // Import the page store

	let query = '';
	let reviews = [];
	let error = '';
	let userType = ''; // To store the user type
	let businessId = null; // To store the business ID
	let orgName = 'Unknown Organization'; // Default value

	// Function to decode JWT token
	function decodeJWT(token) {
		try {
			const [, payload] = token.split('.');
			const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
			return JSON.parse(decodedPayload);
		} catch (error) {
			console.error('Error decoding JWT:', error);
			return null;
		}
	}

	// Fetch user type and business ID from the JWT payload
	onMount(() => {
		const jwtToken = localStorage.getItem('authToken'); // Get the JWT token from localStorage
		if (!jwtToken) {
			error = 'No JWT token found. Please log in.';
			console.error(error);
			return;
		}

		const decodedPayload = decodeJWT(jwtToken);
		if (!decodedPayload) {
			error = 'Failed to decode JWT token.';
			console.error(error);
			return;
		}

		// Extract user type and business profiles from the payload
		userType = decodedPayload?.userTypes?.[0] || '';
		const businessProfiles = decodedPayload?.businessProfiles || [];

		if (businessProfiles.length > 0) {
			businessId = businessProfiles[0].profile_id; // Use the first profile ID
		} else {
			error = 'No business profiles found in JWT payload.';
			console.error(error);
		}

		console.log('User Type:', userType);
		console.log('Business ID:', businessId);
	});

	// Reactively get query from URL
	$: query = $page.url.searchParams.get('query') || '';

	// Function to search reviews for the specific business ID
	async function fetchReviews() {
		error = '';
		reviews = [];

		// Ensure businessId is available
		if (!businessId) {
			error = 'No business profile found. Cannot search reviews.';
			console.error(error);
			return;
		}

		try {
			const response = await fetch(
				`${API_BASE_URL}/reviews/search?query=${encodeURIComponent(query)}&businessId=${businessId}`
			);
			if (!response.ok) {
				throw new Error(`Failed to fetch reviews: ${response.statusText}`);
			}
			const data = await response.json();
			// Filter reviews for specific businessId and approval_status === "true"
			reviews = data.filter(
				(review) => review.business_id === businessId && review.approval_status === 'true'
			);
			console.log('Filtered Reviews:', reviews);
		} catch (err) {
			error = `Error fetching reviews: ${err.message}`;
			console.error(error);
		}
	}

	async function getProfileById(id) {
		try {
			const response = await fetch(`${API_BASE_URL}/businessProfiles/${id}`);
			if (!response.ok) {
				throw new Error(`Failed to fetch profile: ${response.statusText}`);
			}
			return await response.json();
		} catch (err) {
			console.error('Error fetching profile:', err);
			return null;
		}
	}

	$: if (businessId) {
		fetchOrgName(businessId);
	}

	async function fetchOrgName(id) {
		const businessProfile = await getProfileById(id);
		if (businessProfile && businessProfile.org_name) {
			orgName = businessProfile.org_name;
		} else {
			orgName = 'Unknown Organization';
		}
	}

	// Reactive fetch only when both `query` and `businessId` are available
	$: if (businessId && query) {
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
						<div class="title-row">
							<p class="title is-4">{orgName || 'Loading...'}</p>
							<p class="days-ago">
								{Math.floor((new Date() - new Date(review.created_at)) / (1000 * 60 * 60 * 24))} days ago
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
						<div class="footer-item">
							<span class="icon is-small">
								<i class="fas fa-edit"></i>
							</span>
							Reply					
						</div>
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
