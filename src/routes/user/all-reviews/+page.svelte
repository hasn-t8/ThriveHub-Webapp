<script lang="ts">
    import { goto } from '$app/navigation';
    import { deleteReview, getUserReviews, updateReview } from '$lib/stores/reviews';
    import { getProfileById } from '$lib/stores/business';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';

    interface Review {
        likes: number;
        id: number;
        business_id: number;
        user_id: number;
        rating: number;
        feedback: string;
        created_at: string;
        updated_at: string;
        customer_name: string;
        approval_status: string;
        org_name?: string;
    }

    let reviews: Writable<Review[]> = writable([]);
    let currentPage = 1;
    let itemsPerPage = 6;
    let totalPages = 0;

    async function fetchReviews(): Promise<void> {
        try {
            const userReviews = await getUserReviews();
            if (userReviews) {
                for (const review of userReviews) {
                    if (review.business_id) {
                        const businessProfile = await getProfileById(review.business_id);
                        review.org_name = businessProfile?.org_name || 'Unknown Organization';
                    }
                }
                reviews.set(userReviews);
                totalPages = Math.ceil(userReviews.length / itemsPerPage);
            } else {
                console.error('Failed to fetch user reviews.');
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    }

    function handleEdit(businessId: number, reviewId: number): void {
        goto(`/user/review/${businessId}?reviewId=${reviewId}`);
    }

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

    function handleLike(reviewId: number): void {
        reviews.update((currentReviews) => {
            return currentReviews.map((review) => {
                if (review.id === reviewId) {
                    review.likes += 1;
                }
                return review;
            });
        });
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
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
    {#if $reviews.length > 0}
        <div class="container">
			<div class="h1"> All Reviews</div>

			{#each $reviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as review}
                <div class="card review-card">
                    <div class="card-content review-card-content">
                        <div class="review-header">
                            <div class="user-info">
                                <h5 class="name"> {review.org_name || 'Unknown Organization'}
                                </h5>
                                {review.rating} <span class="star">★</span>
                            </div>
                            <div class="meta-info">
                                <strong>{review.approval_status === 'true' ? 'Approved' : 'Pending'}</strong>
                                <p class="meta-date">
                                    {new Date(review.created_at).toLocaleDateString()}
                                </p>
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

                        <hr />
                        <p class="review-text">{review.feedback || 'No feedback provided.'}</p>
                        <div class="review-footer">
                            <p class="likes">
                                <!-- svelte-ignore a11y_click_events_have_key_events -->
                                <!-- svelte-ignore a11y_no_static_element_interactions -->
                                <i class="fas fa-heart" on:click={() => handleLike(review.id)}></i>
                                {review.likes}
                            </p>
                            <p class="share">
                                <i class="fas fa-share-alt"></i>
                            </p>
                        </div>

                    </div>
                </div>
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
        <p>No reviews available to display.</p>
    {/if}
</div>




<style>
		/* ========================================
   Review Section Page Styling Starts Here
======================================== */

.review-list-container {
        padding: 10px;
        font-family: Arial, sans-serif;
	
    }
	.container{

		justify-items: center;
	}
	.card {
        flex: 0 0 calc(33.33% - 10px);
        border: 1px solid #e5e5e5;
        border-radius: 10px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        padding: 15px;
        background-color: #fff;
		width: 80%;
    }

  .h1{
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

	.review-footer {
		display: flex;
		align-items: center; /* Vertically center the icons and text */
		font-size: 0.9rem;
		color: #555;
	}

	.likes,
	.share {
		display: flex;
		align-items: center;
		margin-right: 1rem; /* Space between the like and share sections */
	}

	.likes i,
	.share i {
		margin-right: 8px; /* Add space between the icon and text */
	}


	.fas {
		color: unset !important;
	}

	.likes {
		color: #ff6b6b !important; /* Heart color */
	}

	.share {
		color: #4a90e2 !important; /* Share icon color */
	}

	/* Reviews about us Section Start */

	
	/* Reviews about us Section End */

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


</style>
