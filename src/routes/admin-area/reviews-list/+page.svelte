<script lang="ts">
	import Sidemenu from '../components/Sidemenu.svelte';
	import { deleteReview, getAllReviews, getReviewsByApprovalStatus, approveReview } from '$lib/stores/reviews';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { getJWT } from '$lib/stores/auth';

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
	let currentFilter: 'all' | 'pending' | 'approved' = 'all';
	let isLoading = false;

	// Fetch reviews and calculate pagination
	async function fetchReviews(approvalStatus?: boolean): Promise<void> {
		try {
			isLoading = true;
			let reviewData;

			if (approvalStatus !== undefined) {
				reviewData = await getReviewsByApprovalStatus(approvalStatus);
			} else {
				reviewData = await getAllReviews();
			}

			reviews.set(reviewData);
			totalPages = Math.ceil(reviewData.length / itemsPerPage);
		} catch (error) {
			console.error('Error fetching reviews:', error);
		} finally {
			isLoading = false;
		}
	}

	function showAllReviews() {
		currentPage = 1;
		currentFilter = 'all';
		fetchReviews();
	}

	function showPendingReviews() {
		currentPage = 1;
		currentFilter = 'pending';
		fetchReviews(false);
	}

	function showApprovedReviews() {
		currentPage = 1;
		currentFilter = 'approved';
		fetchReviews(true);
	}

	// Approve a review
	async function handleApproveReview(reviewId: number): Promise<void> {
		try {
			isLoading = true;

			const approvedReview = await approveReview(reviewId);
			if (approvedReview) {
				alert('Review approved successfully');

				// Update reviews locally
				reviews.update((currentReviews) => 
					currentReviews.filter((review) => review.id !== reviewId)
				);

				// Refresh the approved list if the current filter is "approved"
				if (currentFilter === 'approved') {
					fetchReviews(true);
				}
			} else {
				console.error('Failed to approve the review.');
			}
		} catch (error) {
			console.error('Error approving review:', error);
		} finally {
			isLoading = false;
		}
	}

	// Delete a review
	async function handleDeleteReview(reviewId: number): Promise<void> {
		try {
			isLoading = true;

			const isDeleted = await deleteReview(reviewId);
			if (isDeleted) {
				reviews.update((currentReviews) =>
					currentReviews.filter((review) => review.id !== reviewId)
				);
				alert('Review deleted successfully');
			} else {
				console.error('Failed to delete the review.');
			}
		} catch (error) {
			console.error('Error deleting review:', error);
		} finally {
			isLoading = false;
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
		showAllReviews();
	});
</script>




<div class="main-content" style="height: 100vh;">
	<Sidemenu />
	<div class="analytics-header">
		<div class="header-top">
			<span style="font-size: 1.5rem">Reviews</span>
		</div>
		<hr class="divider" />
	</div>
	<div class="review-list-container">
		<div class="header">
			<h1>All Reviews</h1>
			<div class="status">
				<button class="custom-button add-button" on:click={showPendingReviews}>Pending</button>
				<button class="custom-button add-button" on:click={showApprovedReviews}>Approved</button>
			</div>
		</div>

		{#if isLoading}
			<p>Loading...</p>
		{:else if $reviews.length > 0}
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
								{#if review.approval_status === 'false'}
									<button
										class="custom-button add-button"
										on:click={() => handleApproveReview(review.id)}
										disabled={isLoading}>
										Approve
									</button>
								{/if}
								<button
									class="custom-button add-button"
									on:click={() => handleDeleteReview(review.id)}
									disabled={isLoading}>
									Delete
								</button>
							</div>
						</div>
					</li>
				{/each}
			</ul>

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
			<p>No reviews available to display.</p>
		{/if}
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
