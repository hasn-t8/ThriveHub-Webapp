<script>
	import { onMount } from 'svelte';
	import { deleteReview, updateReview } from '$lib/stores/reviews'; // Adjust the path as needed

	// let reviewId = 123; // Example review ID (replace with actual ID from your app logic)
	let reviewText = 'Good service. Been looking for a similar one for a long time';
	let rating = 4.9;
	let likes = 23;
	let daysAgo = 7;
	let isEditing = false;
	let newReviewText = reviewText;
	let newRating = rating;
    /**
	 * @type {null}
	 */
    let reviewId = null;

	// Function to handle review deletion
	async function handleDelete() {
		if (confirm('Are you sure you want to delete this review?')) {
			const success = await deleteReview(reviewId);
			if (success) {
				alert('Review deleted successfully.');
				// Redirect or update the UI as needed
			} else {
				alert('Failed to delete review.');
			}
		}
	}

	// Function to handle review update
	async function handleUpdate() {
		const updatedReview = {
			rating: newRating,
			feedback: newReviewText
		};
		const response = await updateReview(reviewId, updatedReview);
		if (response) {
			alert('Review updated successfully.');
			reviewText = response.feedback;
			rating = response.rating;
			isEditing = false;
		} else {
			alert('Failed to update review.');
		}
	}

	// Toggle edit mode
	function toggleEdit() {
		isEditing = !isEditing;
		newReviewText = reviewText;
		newRating = rating;
	}
	onMount(() => {
        const params = new URLSearchParams(window.location.search);
        // @ts-ignore
        reviewId = params.get('reviewId');
        console.log('Review ID:', reviewId);
        // Use the reviewId for update or delete operations
    });
</script>



<!-- Page Header -->
<section class="page-header">
	<img src="/assets/thankyou.png" alt="Review Image" class="header-image" />
	<h1>Thanks for review!</h1>
</section>

<div class="review-card">
	<header class="header">
		<p>Your review is pending.</p>
	</header>

	<div class="content">
		<div class="title-row">
			<p class="title is-4">Bluehost</p>
			<p class="days-ago">{daysAgo} days ago</p>
		</div>

		{#if isEditing}
			<div class="edit-section">
				<input type="number" bind:value={newRating} min="0" max="5" step="0.1" />
				<textarea bind:value={newReviewText}></textarea>
				<button on:click={handleUpdate}>Save</button>
				<button on:click={toggleEdit}>Cancel</button>
			</div>
		{:else}
			<div class="rating-row">
				<p>{rating}</p>
				<span class="icon is-small">
					<i class="fas fa-star"></i>
				</span>
			</div>
			<p>{reviewText}</p>
			<div class="actions">
				<span class="icon">
					<i class="fas fa-heart"></i>
				</span>
				<p>{likes}</p>
				<span class="icon">
					<i class="fas fa-share-alt"></i>
				</span>
			</div>
		{/if}
	</div>

	<footer class="footer">
		<div class="footer-item" on:click={toggleEdit}>
			<span class="icon is-small">
				<i class="fas fa-edit"></i>
			</span>
			Edit
		</div>
		<div class="footer-item" on:click={handleDelete}>
			<span class="icon is-small">
				<i class="fas fa-trash-alt"></i>
			</span>
			Delete
		</div>
	</footer>
</div>

<style>
	.review-card {
		width: 100%;
		max-width: 1026px;
		/* height: ; */
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
		display: flex; /* Align items in the same row */
	}
	.rating-row .icon {
		padding-top: 6px;
		font-size: 1em; /* Adjust icon size */
	}
	.title-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-decoration: underline;
	}
	.title-row .days-ago {
		color: #949494; /* Set the color for the 'days ago' text */
		text-decoration: none !important; /* Ensure no underline is applied */
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
	.fa-trash-alt,
	.fa-edit,
	.fa-share-alt,
	.fa-heart {
		color: #939393;
	}
</style>
