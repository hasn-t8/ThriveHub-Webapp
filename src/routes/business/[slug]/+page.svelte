<script lang="ts">
	import { onMount } from 'svelte';
	import { getProfileById } from '$lib/stores/business';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import { getAllReviewsByBusinessId } from '$lib/stores/reviews';
	import type { ProfileData } from '$lib/types/Profile';
	import { getRepliesForReview } from '$lib/stores/reply-reviews';

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
				reviews.set(reviewsData);

				// Initialize empty replies for each review
				const initialReplies = reviewsData.reduce((acc: any, review: any) => {
					acc[review.id] = [];
					return acc;
				}, {});
				repliesStore.set(initialReplies);

				// Fetch replies for each review
				await Promise.all(reviewsData.map((review: any) => fetchReplies(review.id)));
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
			repliesStore.update(current => {
				current[reviewId] = replies;
				return current;
			});
		} catch (error) {
			console.error(`Error fetching replies for review ${reviewId}:`, error);
		}
	}

	// Utility function to scroll to top
	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	let currentPage = 1;
	let itemsPerPage = 4;
	let totalPages = 0;

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

	onMount(() => {
		fetchProfile();
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
                <h2>About {$theProfile.org_name}</h2>
                <p>{$theProfile.about_business}</p>
            </div>
            {#if $reviews.length > 0}
                <h2>Reviews</h2>
                <div class="review-list">
					{#each $reviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as review}
                        <div class="card review-item">
                            <div class="card-content">
                                <p><strong>Reviewer:</strong> {review.customer_name || 'Anonymous'}</p>
                                <p><strong>Feedback:</strong> {review.feedback || 'No Comment'}</p>
                                <p><strong>Rating:</strong> {review.rating || 'N/A'}</p>
                                <p><strong>Date:</strong> {new Date(review.created_at).toLocaleDateString()}</p>

                                <!-- Replies Section -->
                    	<!-- Replies Section -->
								{#if $repliesStore[review.id]?.length > 0}
								<div class="replies-section">
									<h4>Replies:</h4>
									<ul class="reply-list">
										{#each $repliesStore[review.id] as reply}
											<div class="card">
												<div class="reply-item">
													<p>{reply.reply}</p>
													<p><small>{new Date(reply.created_at).toLocaleString()}</small></p>
												</div>
											</div>
										{/each}
									</ul>
								</div>
							{:else}
								<p>No replies yet.</p>
							{/if}
                            </div>
                        </div>
                    {/each}
                </div>

                <!-- Pagination -->
                <div class="pagination-container">
                    <button class="pagination-arrow double-arrow" on:click={() => handlePageClick(1)}>&lt;&lt;</button>
                    <button class="pagination-arrow single-arrow" on:click={prevPage} disabled={currentPage === 1}>&lt;</button>
                    {#each getPageNumbers() as page}
                        <button class="pagination-link {currentPage === page ? 'is-current' : ''}" on:click={() => handlePageClick(page)}>
                            {page}
                        </button>
                    {/each}
                    <button class="pagination-arrow single-arrow" on:click={nextPage} disabled={currentPage === totalPages}>&gt;</button>
                    <button class="pagination-arrow double-arrow" on:click={() => handlePageClick(totalPages)}>&gt;&gt;</button>
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
                        <a href={$theProfile.business_website_url} target="_blank" class="website-link">Go to Website</a>
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
                        <img style="min-width: 50px; max-width: 300px;" src={$theProfile.logo_url} alt={$theProfile.org_name} class="company-logo" />
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>



<style>
	
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