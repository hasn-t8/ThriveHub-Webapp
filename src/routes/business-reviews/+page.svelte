<script lang="ts">
    import { writable, derived, get, type Writable } from 'svelte/store';
    import { getAllReviewsByBusinessId, deleteReview } from '$lib/stores/reviews';
    import { onMount } from 'svelte';
    import { getJWT } from '$lib/stores/auth';
	import Sidemenu from '../admin-area/components/Sidemenu.svelte';

    interface User {
        id: number;
        email: string;
        full_name: string;
        userTypes: string[];
        businessProfiles: Array<{
            profile_id: number;
            profile_type: string;
            org_name: string;
            avg_rating: string;
            total_reviews: number;
        }>;
    }

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

    const user: Writable<User | null> = writable(null);
    const businessId = writable<number | null>(null);
    const reviews: Writable<Review[]> = writable([]);

    // Derived store to get the organization name for the current business ID
    const organizationName = derived(
        [user, businessId],
        ([$user, $businessId]) =>
            $user?.businessProfiles.find((profile) => profile.profile_id === $businessId)?.org_name || 'Unknown Organization'
    );

    // Filtered store for approved reviews
    const approvedReviews = derived(reviews, ($reviews) =>
        $reviews.filter((review) => review.approval_status === 'true')
    );

    let currentPage = 1;
    let itemsPerPage = 6;
    let totalPages = 0;

    function decodeJWT(token: string): { [key: string]: unknown } | null {
        try {
            const [, payload] = token.split('.');
            const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
            return JSON.parse(decodedPayload);
        } catch (error) {
            console.error('Error decoding JWT:', error);
            return null;
        }
    }

    async function fetchReviews(businessId: number): Promise<void> {
        try {
            const businessReviews = await getAllReviewsByBusinessId(businessId);
            if (businessReviews) {
                // Add org_name dynamically to each review
                const orgName = get(organizationName);
                const updatedReviews = businessReviews.map((review: any) => ({
                    ...review,
                    business_name: orgName, // Attach org_name to each review
                }));
                reviews.set(updatedReviews);
                totalPages = Math.ceil(businessReviews.length / itemsPerPage);
            } else {
                console.error('No reviews found for this business.');
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
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

    onMount(async () => {
        try {
            const jwt = getJWT(); // Get the JWT token from storage or store
            if (!jwt) {
                console.error('JWT token not found.');
                return;
            }

            const decodedPayload = decodeJWT(jwt);
            if (!decodedPayload) {
                console.error('Failed to decode JWT payload.');
                return;
            }

            // Extract user and business profile information from the JWT payload
            const userId = decodedPayload['id'] as number;
            const businessProfiles = decodedPayload['businessProfiles'] as Array<{
                profile_id: number;
                profile_type: string;
                org_name: string;
                avg_rating: string;
                total_reviews: number;
            }>;

            if (!businessProfiles || businessProfiles.length === 0) {
                console.error('No business profiles found in the JWT payload.');
                return;
            }

            // Set the user data
            user.set({
                id: userId,
                email: decodedPayload['email'] as string,
                full_name: decodedPayload['full_name'] as string,
                userTypes: decodedPayload['userTypes'] as string[],
                businessProfiles: businessProfiles
            });

            const profile = businessProfiles[0]; // Use the first profile dynamically
            businessId.set(profile.profile_id);
            console.log('Business profile ID:', profile.profile_id);

            // Fetch reviews for the business profile
            await fetchReviews(profile.profile_id);
        } catch (error) {
            console.error('Error fetching data or initializing user:', error);
        }
    });
</script>

<Sidemenu/>
<div class="review-list-container">
	<div class="header">
		<h1>All Reviews for {$organizationName}</h1>
		<div class="status">
		</div>
	</div>


{#if $approvedReviews.length > 0}
<ul class="review-list">
    {#each $approvedReviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as review}
        <li class="review-item">
            <div class="review-content">
                <div class="reviewer-name">Reviewer: {review.customer_name || 'Anonymous'}</div>
                <div class="review-business">Organization: {review.business_name || 'Unknown Organization'}</div>
                <div class="review-rating">Rating: {review.rating || 'N/A'}</div>
                <div class="review-status">Status: Approved</div>
                <div class="review-created">Date: {new Date(review.created_at).toLocaleDateString()}</div>
                <div class="review-feedback">Feedback: {review.feedback || 'No feedback provided.'}</div>
                <div class="status">
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
<p>No approved reviews available to display.</p>
{/if}


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
