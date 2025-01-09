<script lang="ts">
	import { goto } from '$app/navigation';
	import { deleteReview, getUserReviews, updateReview } from '$lib/stores/reviews';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	interface Review {
		id: number;
		business_id: number;
		user_id: number;
		rating: number;
		feedback: string;
		created_at: string;
		updated_at: string;
		customer_name: string;
		approval_status: string;
		business_name?: string;
	}

	let reviews: Writable<Review[]> = writable([]);
	let currentPage = 1;
	let itemsPerPage = 6;
	let totalPages = 0;
    let reviewId: null = null;
    /**
	 * @type {null}
	 */
    let businessId: null = null;

	// Fetch reviews by the authenticated user
	async function fetchReviews(): Promise<void> {
		try {
			const userReviews = await getUserReviews();
			if (userReviews) {
				reviews.set(userReviews);
				totalPages = Math.ceil(userReviews.length / itemsPerPage);
			} else {
				console.error('Failed to fetch user reviews.');
			}
		} catch (error) {
			console.error('Error fetching reviews:', error);
		}
	}

	// Edit a review

    // Function to handle edit and redirect to edit page with reviewId and businessId in the URL
    function handleEdit(businessId: number, reviewId: number): void {
		goto(`/user/review/${businessId}?reviewId=${reviewId}`);
	}


    
	// Delete a review
	async function handleDeleteReview(reviewId: number): Promise<void> {
		try {
			const isDeleted = await deleteReview(reviewId);
			if (isDeleted) {
				reviews.update((currentReviews) =>
					currentReviews.filter((review) => review.id !== reviewId)
				);
				alert('Review deleted successfully.');
			} else {
				console.error('Failed to delete the review.');
			}
		} catch (error) {
			console.error('Error deleting review:', error);
		}
	}
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

	onMount(() => {
		fetchReviews();
	});
</script>

<div class="review-list-container">
	<div class="header">
		<h1>All Reviews</h1>
		<div class="status">
			<!-- <button class="custom-button add-button" on:click={showPendingReviews}>Pending</button>
			<button class="custom-button add-button" on:click={showApprovedReviews}>Approved</button> -->
		</div>
	</div>

{#if $reviews.length > 0}

<ul class="review-list">
	{#each $reviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as review}
		<li class="review-item">
			<div class="review-content">
				<div class="reviewer-name">Reviewer: {review.customer_name || 'Anonymous'}</div>
				<div class="review-business">Organization: {review.business_name || 'Unknown Organization'}</div>
				<div class="review-rating">Rating: {review.rating || 'N/A'}</div>
				<div class="review-status">Status: {review.approval_status === 'true' ? 'Approved' : 'Pending'}</div>
				<div class="review-created">Date: {new Date(review.created_at).toLocaleDateString()}</div>
				<div class="review-feedback">Feedback: {review.feedback || 'No feedback provided.'}</div>
				<div class="status">
					<button
						class="custom-button edit-button"
						on:click={() => handleEdit(review.business_id, review.id)}>
						Edit
					</button>
					<button
						class="custom-button delete-button"
						on:click={() => handleDeleteReview(review.id)}>
						Delete
					</button>
				</div>
			</div>
		</li>
	{/each}
</ul>
			<!-- Pagination -->
            <div class="pagination-container has-text-weight-bold">
                <!-- "Go to First" Button -->
                <button
                    class="pagination-arrow double-arrow mr-5"
                    on:click={() => handlePageClick(1)}
                >
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
			<p>No reviews available to display.</p>
		{/if}
</div>

<style>
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

	.divider {
		border: none;
		height: 1px;
		background-color: #dfe6ed;
		margin: 20px 0;
	}
	.review-list-container {
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
	.review-list {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
	.review-item {
		background-color: #f9f9f9;
		border-radius: 5px;
		padding: 15px;
		margin-bottom: 10px;
		border: 1px solid #e0e0e0;
	}
	.review-content {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.reviewer-name,
	.review-business,
	.review-rating,
	.review-status,
	.review-created,
	.review-feedback {
		font-size: 14px;
		margin: 5px 0;
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

    /* Styles remain unchanged */
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

	.divider {
		border: none;
		height: 1px;
		background-color: #dfe6ed;
		margin: 20px 0;
	}
	.review-list-container {
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
	.review-list {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
	.review-item {
		background-color: #f9f9f9;
		border-radius: 5px;
		padding: 15px;
		margin-bottom: 10px;
		border: 1px solid #e0e0e0;
	}
	.review-content {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.reviewer-name,
	.review-business,
	.review-rating,
	.review-status,
	.review-created,
	.review-feedback {
		font-size: 14px;
		margin: 5px 0;
	}
	.reviewer-name {
		font-weight: bold;
		font-size: 16px;
	}
	.review-business {
		color: #555;
	}
	.review-feedback {
		color: #666;
	}
</style>
