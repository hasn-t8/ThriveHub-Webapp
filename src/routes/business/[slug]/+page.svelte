<script lang="ts">
	import { onMount } from 'svelte';
	import { getProfileById } from '$lib/stores/business';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import { getAllReviewsByBusinessId } from '$lib/stores/reviews';
	import type { ProfileData } from '$lib/types/Profile';
	import { getRepliesForReview } from '$lib/stores/reply-reviews';
    import { getKeyPoints } from '$lib/stores/key-point';

	// Profile store
	let theProfile = writable<ProfileData>({
		org_name: '',
		job_title: '',
		work_email: '',
		about_business: '',
		full_name: '',
		industry: '',
		business_website_url: '',
		business_website_title: '',
		business_profile_id: null,
		profile_type: '',
		category: '',
		id: '',
		logo_url: '',
		total_reviews: 0
	});
	let keyFeatures: string | any[] = [];
    let whyChoosePoints: string | any[] = [];
	// Reviews store
	let reviews = writable<any[]>([]);

	// Store for replies
	let repliesStore = writable<{ [key: number]: any[] }>({});

	// Fetch business profile
	async function fetchProfile(): Promise<void> {
		try {
			const slug = Number($page.params.slug); // Get business ID from URL
			const profile: ProfileData = await getProfileById(slug);
			theProfile.set(profile);

			// Fetch reviews after fetching profile
			await fetchReviews(slug);
		} catch (error) {
			console.error('Error fetching profile:', error);
		}
	}

	async function fetchReviews(businessId: number): Promise<void> {
		try {
			const reviewsData = await getAllReviewsByBusinessId(businessId);
			if (reviewsData) {
				// Filter reviews with approval status "true"
				const approvedReviews = reviewsData.filter(
					(review: any) => review.approval_status === 'true'
				);
				reviews.set(approvedReviews);

				// Initialize empty replies for each review
				const initialReplies = approvedReviews.reduce((acc: any, review: any) => {
					acc[review.id] = [];
					return acc;
				}, {});
				repliesStore.set(initialReplies);

				// Fetch replies for each review
				await Promise.all(approvedReviews.map((review: any) => fetchReplies(review.id)));
			}
		} catch (error) {
			console.error('Error fetching reviews:', error);
		}
	}

	// Fetch replies for a review
	async function fetchReplies(reviewId: number): Promise<void> {
		try {
			const replies = await getRepliesForReview(reviewId);
			console.log(`Fetched replies for review ${reviewId}:`, replies);
			repliesStore.update((current) => {
				current[reviewId] = replies;
				return current;
			});
		} catch (error) {
			console.error(`Error fetching replies for review ${reviewId}:`, error);
		}
	}

	/**
	 * @type {number | null}
	 */
	let rating = null;

	let currentPage = 1;
	let itemsPerPage = 10;
	let totalPages = 1;
	let totalResults = 0;

	// Utility function to scroll to top
	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
	// Handle page click
	function handlePageClick(pageNumber: number) {
		currentPage = pageNumber;
		scrollToTop();
	}

	// Calculate the visible page numbers (intervals of 5)
	function getPageNumbers(): number[] {
		const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
		const endPage = Math.min(startPage + 4, totalPages);
		const pageNumbers = [];
		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}
		return pageNumbers;
	}

	// Handle Next and Previous buttons
	function nextPage() {
		if (currentPage < totalPages) currentPage++;
		scrollToTop();
	}

	function prevPage() {
		if (currentPage > 1) currentPage--;
		scrollToTop();
	}
    const slug = Number($page.params.slug);


	onMount(async () => {
		fetchProfile();
        try {
            // Fetch key points by business profile ID
            const keyPoints = await getKeyPoints(slug);

            if (keyPoints) {
                // Filter key points by type
                keyFeatures = keyPoints.filter(
                    (point: { key_point_type: string }) => point.key_point_type === 'feature'
                );

                whyChoosePoints = keyPoints.filter(
                    (point: { key_point_type: string }) => point.key_point_type === 'why-us'
                );
            }
        } catch (error) {
            console.error('Error fetching key points:', error);
        }
    });
</script>

<section class="page-header">
	<h1>{$theProfile.org_name}</h1>
</section>
<div class="container">
	<div class="columns is-variable is-8">
		<!-- About Section -->
		<div class="column is-two-thirds">
			<div class="card">
				<!-- About Section -->
				<h2>About {$theProfile.org_name}</h2>
				<p>{$theProfile.about_business}</p>
				<hr />
		
				<!-- Why Us Section -->
				<h2>Why {$theProfile.org_name}?</h2>
{#if whyChoosePoints.length > 0}
    <ul style="list-style-type: disc; padding-left: 20px;">
        {#each whyChoosePoints as point}
            <li>
                <strong>{point.key_point_name}:</strong> {point.text || 'No description available'}
            </li>
        {/each}
    </ul>
{:else}
    <p>No key points available for "Why Us".</p>
{/if}

				<hr />
		
				<!-- Key Features Section -->
				<h2>Key Features:</h2>
				{#if keyFeatures.length > 0}
				<ul style="list-style-type: disc; padding-left: 20px;">
					{#each keyFeatures as feature}
							<li>
								<strong>{feature.key_point_name}:</strong> {feature.text || 'No description available'}
							</li>
						{/each}
					</ul>
				{:else}
					<p>No key features available.</p>
				{/if}
			</div>
		<!-- </div> -->
		

			{#if $reviews.length > 0}
				<div class="card review-item">
					<h5 class="name">All Reviews</h5>
					{#each $reviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as review}
						<!-- <div class="card review-card"> -->
						<div class="card-content review-card-content">
							<div class="review-header">
								<div class="review-user">
									<p class="review-text">{new Date(review.created_at).toLocaleDateString()}</p>
									<div class="user-info">
										<div class="rating-container">
											{#each [1, 2, 3, 4, 5] as num}
												<span
													class="star
													{Math.floor(review.rating / 2) >= num ? 'selected' : ''} 
													{Math.ceil(review.rating / 2) === num && review.rating % 2 !== 0 ? 'half-selected' : ''}"
												>
													★
												</span>
											{/each}
										</div>

										<h5 class="h5" style="font-size: large; font-weight: 550">
											{review.customer_name || 'Anonymous'}
										</h5>
										<!-- <p class="title">{review.title}</p> -->
									</div>
								</div>
							</div>

							<br />
							<p class="review-text">{review.feedback || 'No feedback provided.'}</p>

							<!-- Replies Section -->

							<!-- Replies Section -->
							{#if $repliesStore[review.id]?.length > 0}
								<div class="replies-section">
									<h4 class="reply" style="color: darkgray; font-weight: bold">
										<span class="reply-arrow">↪</span>
										Replies from: {$theProfile.org_name}
									</h4>
									<ul class="reply-list">
										{#each $repliesStore[review.id] as reply}
											<div class="card" style="background-color: ghostwhite;">
												<div class="reply-item">
													<div class="meta-info">
														<small>
															{Math.floor(
																(Date.now() - new Date(reply.created_at).getTime()) /
																	(1000 * 60 * 60 * 24)
															)} days ago
														</small>
														</div>
													<p>
														{reply.reply}
													</p>
													
												
											
												</div>
											</div>
										{/each}
									</ul>
									<hr />
								</div>
							{:else}
								<p>No replies yet.</p>
								<hr />
							{/if}
						</div>
						<!-- </div> -->
					{/each}
				</div>

				<!-- Pagination -->
				<div class="pagination-container has-text-weight-bold">
					<!-- "Go to First" Button -->
					<button class="pagination-arrow double-arrow mr-5" on:click={() => handlePageClick(1)}>
						&lt;&lt;
					</button>
					<!-- Previous Button -->
					<button
						class="pagination-arrow single-arrow mr-4"
						on:click={prevPage}
						disabled={currentPage === 1}
					>
						&lt;
					</button>

					{#if currentPage > 5}
						<span class="pagination-link">...</span>
					{/if}

					<!-- Interval Page Numbers -->
					{#each getPageNumbers() as page}
						<button
							class="pagination-link {currentPage === page ? 'is-current' : ''}"
							on:click={() => handlePageClick(page)}
						>
							{page}
						</button>
					{/each}

					<!-- "Go to Last" Button -->

					{#if currentPage < totalPages - 4}
						<span class="pagination-link">...</span>
					{/if}
					<button
						class="pagination-arrow single-arrow ml-4"
						on:click={nextPage}
						disabled={currentPage === totalPages}
					>
						>
					</button>

					<!-- Next Button -->
					<button
						class="pagination-arrow double-arrow ml-5"
						on:click={() => handlePageClick(totalPages)}
					>
						>>
					</button>
				</div>
			{:else}
				<p>No reviews available for this business.</p>
			{/if}
		</div>

		<!-- Contact Information and Map Section -->
		<div class="column is-one-third">
			<div class="card">
				<p class="contact-item">
					<span class="link-container">
						<img src="/assets/internet-icon.png" alt="WWW Icon" class="www-icon" />
						<a href={$theProfile.business_website_url} target="_blank" class="website-link"
							>Go to Website</a
						>
						<span class="arrow">↗</span>
					</span>
				</p>
				{#if $theProfile.work_email}
					<p class="contact-item">
						<img src="/assets/mail.png" alt="Email Icon" class="icon" />
						<a href="mailto:{$theProfile.work_email}">{$theProfile.work_email}</a>
					</p>
				{/if}
				{#if $theProfile.logo_url}
					<div style="margin-top: 3rem;">
						<img
							style="min-width: 50px; max-width: 300px;"
							src={$theProfile.logo_url}
							alt={$theProfile.org_name}
							class="company-logo"
						/>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	/* ========================================
   Review Section Page Styling Starts Here
======================================== */

	.h1 {
		padding-right: 71%;
		/* align-content: start; */
		font-size: large;
		font-weight: 600;
	}

	.star {
		color: #ffd700;
		font-weight: bold;
	}

	.name {
		font-size: 1rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}
	/* Header Section */
	.review-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0rem;
	}
	.rating-container {
		display: flex;
		justify-content: left;
		gap: 10px; /* Space between stars */
		margin-top: 20px;
	}

	.rating {
		display: inline-block;
		cursor: pointer;
	}

	.rating input {
		display: none; /* Hide the radio button circles */
	}

	.star {
		position: relative;
		display: inline-block;
		font-size: 24px;
		color: #ccc; /* Default color for unselected stars */
		width: 1em; /* Ensures consistent star size */
	}

	.star.selected {
		color: #ffd700; /* Full star color */
	}

	.star.half-selected::before {
		content: '★'; /* Display a star */
		position: absolute;
		left: 0;
		top: 0;
		width: 50%; /* Clip to half */
		overflow: hidden;
		color: #ffd700; /* Half star color */
	}

	.user-info .name {
		font-size: 1.4rem;
		margin: 0;
		font-weight: 700;
	}

	.meta-info {
		text-align: right;
	}

	.meta-date {
		font-size: 0.7rem;
		color: #999;
		margin-top: 2px;
	}

	.review-text {
		font-size: 1rem;
		line-height: 1.4;
		color: #8b8a8f;
		margin-bottom: 1rem;
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
