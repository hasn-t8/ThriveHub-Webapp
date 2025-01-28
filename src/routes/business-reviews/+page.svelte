<script lang="ts">
	import { writable, derived, get, type Writable } from 'svelte/store';
	import { getAllReviewsByBusinessId, deleteReview } from '$lib/stores/reviews';
	import {
		addReplyToReview,
		deleteReply,
		getRepliesForReview,
		updateReply
	} from '$lib/stores/reply-reviews';
	import { onMount } from 'svelte';
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
	let userData;
	// Derived store to get the organization name for the current business ID
	const organizationName = derived(
		[user, businessId],
		([$user, $businessId]) =>
			$user?.businessProfiles.find((profile) => profile.profile_id === $businessId)?.org_name ||
			'Unknown Organization'
	);

	// Filtered store for approved reviews
	const approvedReviews = derived(reviews, ($reviews) =>
		$reviews.filter((review) => review.approval_status === 'true')
	);
	let storedBusinessProfiles = [];
	// Retrieve and log businessProfiles data from localStorage only in the browser
	if (typeof window !== 'undefined') {
		storedBusinessProfiles = JSON.parse(localStorage.getItem('businessProfiles') || '[]');
		console.log('Stored businessProfiles:', storedBusinessProfiles);
	}
	let currentPage = 1;
	let itemsPerPage = 6;
	let totalPages = 0;
	let replyId: number | null = null; // Track which review is being replied to
	let replyText: string = ''; // Text for the reply
	let editingReplyId: number | null = null; // ID of the reply being edited
	let editingReplyText: string = ''; // Text for the reply being edited

	async function fetchRepliesForReview(review: Review): Promise<void> {
		try {
			const replies = await getRepliesForReview(review.id);
			reviews.update((currentReviews) =>
				currentReviews.map((currentReview) =>
					currentReview.id === review.id ? { ...currentReview, replies } : currentReview
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
					business_name: orgName
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
									replies: [...(review.replies || []), newReply]
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
	onMount(() => {
		if (typeof window !== 'undefined') {
			const storedBusinessProfiles = JSON.parse(localStorage.getItem('businessProfiles') || '[]');
			if (storedBusinessProfiles.length > 0) {
				const profile = storedBusinessProfiles[0];
				businessId.set(profile.profile_id);
				fetchReviews(profile.profile_id);
			} else {
				console.error('No business profiles found in localStorage.');
			}
		}
	});
	//     async function handleEditReply(replyId: number, currentContent: string): Promise<void> {
	//     const updatedContent = prompt('Edit your reply:', currentContent);

	//     if (updatedContent && updatedContent.trim() !== '') {
	//         try {
	//             const updatedReply = await updateReply(replyId, updatedContent);

	//             // Update the reviews store with the updated reply
	//             reviews.update((currentReviews) =>
	//                 currentReviews.map((review) =>
	//                     review.replies
	//                         ? {
	//                               ...review,
	//                               replies: review.replies.map((reply) =>
	//                                   reply.id === replyId ? { ...reply, reply: updatedReply } : reply
	//                               ),
	//                           }
	//                         : review
	//                 )
	//             );

	//             alert('Reply updated successfully.');
	//             window.location.reload();

	//         } catch (error) {
	//             console.error(`Error updating reply ID ${replyId}:`, error);
	//             alert('Failed to update reply. Please try again.');
	//         }
	//     }
	// }
	async function handleEditReply(replyId: number, currentContent: string): Promise<void> {
		editingReplyId = replyId; // Set the ID of the reply being edited
		editingReplyText = currentContent; // Set the current content to the editing text
	}

	async function saveEditedReply(): Promise<void> {
		if (!editingReplyId || editingReplyText.trim() === '') {
			alert('Reply text cannot be empty.');
			return;
		}

		try {
			const updatedReply = await updateReply(editingReplyId, editingReplyText);

			// Update the reviews store with the updated reply
			reviews.update((currentReviews) =>
				currentReviews.map((review) =>
					review.replies
						? {
								...review,
								replies: review.replies.map((reply) =>
									reply.id === editingReplyId ? { ...reply, reply: updatedReply } : reply
								)
							}
						: review
				)
			);
            window.location.reload();

			// alert('Reply updated successfully.');
			editingReplyId = null; // Reset editing state
			editingReplyText = '';
		} catch (error) {
			console.error(`Error updating reply ID ${editingReplyId}:`, error);
			alert('Failed to update reply. Please try again.');
		}
	}

	function cancelEditReply(): void {
		editingReplyId = null; // Cancel editing state
		editingReplyText = '';
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
								replies: review.replies?.filter((reply) => reply.id !== replyId)
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

<Sidemenu />
<div class="review-list-container">
	<div class="header">
		<h1>All Reviews for {$organizationName}</h1>
		<div class="status"></div>
	</div>

	{#if $approvedReviews.length > 0}
		<ul class="review-list">
			{#each $approvedReviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as review}
				<li class="review-item">
					<div class="review-content">
						<div class="card-content review-card-content">
							<div class="review-header">
								<div class="review-user">
									<p class="review-text">{new Date(review.created_at).toLocaleDateString()}</p>
									<div class="user-info">
										<div class="rating-container">
											{#each [1, 2, 3, 4, 5] as num}
												<span
													class="star
                                            {Math.floor(review.rating / 2) >= num
														? 'selected'
														: ''} 
                                            {Math.ceil(review.rating / 2) === num &&
													review.rating % 2 !== 0
														? 'half-selected'
														: ''}"
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

							<div class="status">
								{#if !review.replies || review.replies.length === 0}
									<button
										class="custom-button reply-button"
										on:click={() => handleReplyReview(review.id)}
									>
										Reply
									</button>
								{/if}
							</div>
							
						</div>
                        		<!-- Reply Form -->
					{#if replyId === review.id}
                    <div class="reply-section">
                        <textarea
                            placeholder="Write your reply..."
                            bind:value={replyText}
                            class="reply-textbox"
                        >
                        </textarea>
                        <div class="reply-actions">
                            <button class="custom-button submit-button" on:click={submitReply}>Submit</button>
                            <button class="custom-button cancel-button" on:click={cancelReply}>Cancel</button>
                        </div>
                    </div>
                {/if}
						<!-- Replies Section -->

						<!-- Reply Section -->
						{#if review.replies}
							<div class="replies-section">
								<h4 class="reply" style="color: darkgray; font-weight: bold">
									<span class="reply-arrow">↪</span>
									Replies:
								</h4>

								<div class="reply-cards">
									{#each review.replies as reply}
										<div class="card" style="background-color: ghostwhite;">
											<!-- Editable Reply Content -->
											{#if editingReplyId === reply.id}
												<div>
													<textarea class="reply-edit-box" bind:value={editingReplyText}>
													</textarea>
													<div class="reply-actions">
														<button class="button save-button" on:click={saveEditedReply}>
															Save
														</button>
														<button class="button cancel-button" on:click={cancelEditReply}>
															Cancel
														</button>
													</div>
												</div>
											{:else}
												<!-- Non-editable Reply Content -->
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
												<div class="reply-actions">
													<button
														class="button edit-button"
														on:click={() => handleEditReply(reply.id, reply.reply)}
													>
														Edit
													</button>
													<button
														class="button delete-button"
														on:click={() => handleDeleteReply(reply.id, review.id)}
													>
														Delete
													</button>
												</div>
											{/if}
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

			
				</li>
			{/each}
		</ul>

		<!-- Pagination -->
		<div class="pagination-container">
			<button class="pagination-arrow double-arrow" on:click={() => handlePageClick(1)}
				>&lt;&lt;</button
			>
			<button class="pagination-arrow single-arrow" on:click={prevPage} disabled={currentPage === 1}
				>&lt;</button
			>
			{#each getPageNumbers() as page}
				<button
					class="pagination-link {currentPage === page ? 'is-current' : ''}"
					on:click={() => handlePageClick(page)}
				>
					{page}
				</button>
			{/each}
			<button
				class="pagination-arrow single-arrow"
				on:click={nextPage}
				disabled={currentPage === totalPages}>&gt;</button
			>
			<button class="pagination-arrow double-arrow" on:click={() => handlePageClick(totalPages)}
				>&gt;&gt;</button
			>
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
    .reply-edit-box {
  width: 100%; /* Make it full-width */
  min-height: 80px; /* Adjust height as needed */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
