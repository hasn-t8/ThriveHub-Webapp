<script lang="ts">
    import { writable, derived, get, type Writable } from 'svelte/store';
    import { getAllReviewsByBusinessId, deleteReview } from '$lib/stores/reviews';
    import { addReplyToReview, deleteReply, getRepliesForReview, updateReply } from '$lib/stores/reply-reviews';
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
        replies?: Array<{
			reply: any;
            id: number;
            review_id: number;
            content: string;
            created_at: string;
            updated_at: string;
        }>;
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
    let replyId: number | null = null; // Track which review is being replied to
    let replyText: string = ''; // Text for the reply

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
    async function fetchRepliesForReview(review: Review): Promise<void> {
        try {
            const replies = await getRepliesForReview(review.id);
            reviews.update((currentReviews) =>
                currentReviews.map((currentReview) =>
                    currentReview.id === review.id
                        ? { ...currentReview, replies }
                        : currentReview
                )
            );
        } catch (error) {
            console.error(`Error fetching replies for review ID ${review.id}:`, error);
        }
    }
    async function fetchReviews(businessId: number): Promise<void> {
        try {
            const businessReviews = await getAllReviewsByBusinessId(businessId);
            if (businessReviews) {
                const orgName = get(organizationName);
                const updatedReviews = businessReviews.map((review: any) => ({
                    ...review,
                    business_name: orgName,
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

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handlePageClick(pageNumber: number) {
        currentPage = pageNumber;
        scrollToTop();
    }

    function getPageNumbers(): number[] {
        const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
        const endPage = Math.min(startPage + 4, totalPages);
        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    }

    function nextPage() {
        if (currentPage < totalPages) currentPage++;
        scrollToTop();
    }

    function prevPage() {
        if (currentPage > 1) currentPage--;
        scrollToTop();
    }

    function handleReplyReview(id: number): void {
        replyId = id; // Set the reply ID to the selected review
    }

    function submitReply(): void {
        if (replyText.trim() === '') {
            alert('Reply text cannot be empty.');
            return;
        }

        if (replyId === null) {
            console.error('No review selected for replying.');
            return;
        }

        addReplyToReview(replyId, replyText)
            .then((newReply) => {
                reviews.update((currentReviews) =>
                    currentReviews.map((review) =>
                        review.id === replyId
                            ? {
                                  ...review,
                                  replies: [...(review.replies || []), newReply],
                              }
                            : review
                    )
                );
                alert('Reply added successfully.');
            })
            .catch((error) => {
                console.error('Error submitting reply:', error);
                alert('Failed to submit reply. Please try again.');
            })
            .finally(() => {
                replyId = null;
                replyText = '';
            });
    }

    function cancelReply(): void {
        replyId = null;
        replyText = '';
    }

    onMount(async () => {
        try {
            const jwt = getJWT();
            if (!jwt) {
                console.error('JWT token not found.');
                return;
            }

            const decodedPayload = decodeJWT(jwt);
            if (!decodedPayload) {
                console.error('Failed to decode JWT payload.');
                return;
            }

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

            user.set({
                id: userId,
                email: decodedPayload['email'] as string,
                full_name: decodedPayload['full_name'] as string,
                userTypes: decodedPayload['userTypes'] as string[],
                businessProfiles: businessProfiles,
            });

            const profile = businessProfiles[0];
            businessId.set(profile.profile_id);

            await fetchReviews(profile.profile_id);
        } catch (error) {
            console.error('Error fetching data or initializing user:', error);
        }
    });


    async function handleEditReply(replyId: number, currentContent: string): Promise<void> {
    const updatedContent = prompt('Edit your reply:', currentContent);

    if (updatedContent && updatedContent.trim() !== '') {
        try {
            const updatedReply = await updateReply(replyId, updatedContent);

            // Update the reviews store with the updated reply
            reviews.update((currentReviews) =>
                currentReviews.map((review) =>
                    review.replies
                        ? {
                              ...review,
                              replies: review.replies.map((reply) =>
                                  reply.id === replyId ? { ...reply, reply: updatedReply } : reply
                              ),
                          }
                        : review
                )
            );

            alert('Reply updated successfully.');
            window.location.reload();

        } catch (error) {
            console.error(`Error updating reply ID ${replyId}:`, error);
            alert('Failed to update reply. Please try again.');
        }
    }
}



async function handleDeleteReply(replyId: number, reviewId: number): Promise<void> {
    const confirmDelete = confirm('Are you sure you want to delete this reply?');

    if (!confirmDelete) return;

    try {
        await deleteReply(replyId);

        // Update the reviews store to remove the deleted reply
        reviews.update((currentReviews) =>
            currentReviews.map((review) =>
                review.id === reviewId
                    ? {
                          ...review,
                          replies: review.replies?.filter((reply) => reply.id !== replyId),
                      }
                    : review
            )
        );

        alert('Reply deleted successfully.');
    } catch (error) {
        console.error(`Error deleting reply ID ${replyId}:`, error);
        alert('Failed to delete reply. Please try again.');
    }
}

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
                    <button
                        class="custom-button reply-button"
                        on:click={() => handleReplyReview(review.id)}>
                        Reply
                    </button>
                </div>

                <!-- Replies Section -->
                {#if review.replies}
                <div class="replies-section">
                    <h4>Replies:</h4>
                    <div class="reply-cards">
                        {#each review.replies as reply}
                            <div class="card">
                                <div class="reply-content">
                                    <p>{reply.reply}</p> <!-- Displaying the 'reply' field -->
                                    <p><small>{new Date(reply.created_at).toLocaleString()}</small></p>
                                </div>
                                <div class="reply-actions">
                                    <button
                                        class="button edit-button"
                                        on:click={() => handleEditReply(reply.id, reply.reply)}>
                                        Edit
                                    </button>
                                    <button
                                        class="button delete-button"
                                        on:click={() => handleDeleteReply(reply.id, review.id)}>
                                        Delete
                                    </button>
                                </div>
                                
                            </div>
                        {/each}
                    </div>
                </div>
            {:else}
                {#await fetchRepliesForReview(review)}
                    <p>Loading replies...</p>
                {:then}
                    <p>No replies yet.</p>
                {:catch error}
                    <p>Error loading replies: {error.message}</p>
                {/await}
            {/if}
            
            
            </div>

            <!-- Reply Form -->
            {#if replyId === review.id}
                <div class="reply-section">
                    <textarea
                        placeholder="Write your reply..."
                        bind:value={replyText}
                        class="reply-textbox">
                    </textarea>
                    <div class="reply-actions">
                        <button class="custom-button submit-button" on:click={submitReply}>Submit</button>
                        <button class="custom-button cancel-button" on:click={cancelReply}>Cancel</button>
                    </div>
                </div>
            {/if}
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
    .reply-section {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .reply-textbox {
        width: 100%;
        height: 80px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 14px;
    }

    .reply-actions {
        display: flex;
        gap: 10px;
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
