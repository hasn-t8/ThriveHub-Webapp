<script>
    import { onMount } from 'svelte';
    // @ts-ignore
    // @ts-ignore
    import { deleteReview, updateReview, getReviewById } from '$lib/stores/reviews';
    // @ts-ignore
    import { getProfileById } from '$lib/stores/business';
    import { goto } from '$app/navigation';

    /**
     * @type {string | import("dns").AnyARecord | null}
     */
    let reviewId = null;
    /**
     * @type {null}
     */
    let businessId = null;
    let reviewText = '';
    /**
     * @type {null}
     */
    let rating = null;
    let likes = 0;
    let daysAgo = 0;
    let approvalStatus = 'Pending';
    let orgName = 'Loading...';

    // Function to handle review deletion
    async function handleDelete() {
        if (confirm('Are you sure you want to delete this review?')) {
            const success = await deleteReview(reviewId);
            if (success) {
                alert('Review deleted successfully.');
                goto(`/user/review/${businessId}`);
            } else {
                alert('Failed to delete review.');
            }
        }
    }

    // Function to handle edit and redirect to edit page with reviewId and businessId in the URL
    function handleEdit() {
        goto(`/user/review/${businessId}?reviewId=${reviewId}`);
    }

    // Capture the reviewId from the URL and fetch the review data
    onMount(async () => {
        const params = new URLSearchParams(window.location.search);
        reviewId = params.get('reviewId');

        if (reviewId) {
            // @ts-ignore
            const reviewData = await getReviewById(reviewId);
            if (reviewData) {
                reviewText = reviewData.feedback;
                rating = reviewData.rating;
                likes = reviewData.likes_total || 0;
                businessId = reviewData.business_id;

                // Calculate days ago from created_at
                const createdAt = new Date(reviewData.created_at);
                const today = new Date();
                // @ts-ignore
                daysAgo = Math.floor((today - createdAt) / (1000 * 60 * 60 * 24));

                // Set approval status
                approvalStatus = reviewData.approval_status === 'true' ? 'Approved' : 'Pending';

                if (businessId) {
    const businessProfile = await getProfileById(businessId);
    console.log('Business Profile:', businessProfile); // Debug the response
    if (businessProfile && businessProfile.org_name){
        orgName = businessProfile.org_name;
    } else {
        orgName = 'Unknown Organization';
    }
}

            }
        }
    });
</script>

<!-- Page Header -->
<section class="page-header">
    <img src="/assets/thankyou.png" alt="Review Image" class="header-image" />
    <h1>Thanks for the review!</h1>
</section>

<div class="review-card">
    <header class="header">
        <p>Your review is "{approvalStatus}".</p>
    </header>

    <div class="content">
        <div class="title-row">
            <p class="title is-4">{orgName}</p>
            <p class="days-ago">{daysAgo} days ago</p>
        </div>

        {#if reviewId && reviewText && rating}
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
        {:else}
            <p>Loading...</p>
        {/if}
    </div>

    <footer class="footer">
        <div class="footer-item" on:click={handleEdit}>
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
  