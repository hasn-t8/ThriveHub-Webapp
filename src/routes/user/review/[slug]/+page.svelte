<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import { createReview, updateReview, getReviewById } from '$lib/stores/reviews';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const slug = Number($page.params.slug);

	/**
	 * @type {number | null}
	 */
	let rating = null;
	let textareaValue = '';
	let reviewId = null;
	let isEditing = false;
	let business_name = '';

	const ratingLabels = {
		1: 'Poor!',
		2: 'Fair!',
		3: 'Neutral!',
		4: 'Good!',
		5: 'Excellent!'
	};

	const businessId = slug;

	// Function to fetch review data if reviewId exists in the URL
	onMount(async () => {
		const params = new URLSearchParams(window.location.search);
		reviewId = params.get('reviewId');
		business_name = params.get('business_name');

		if (reviewId) {
			isEditing = true;
			try {
				const reviewData = await getReviewById(reviewId);
				if (reviewData) {
					rating = reviewData.rating / 2; // Convert back to scale of 5
					textareaValue = reviewData.feedback;
				}
			} catch (error) {
				console.error('Error fetching review:', error);
				alert('Failed to fetch review data.');
			}
		}
	});

	// Function to handle review submission
	async function submitReview() {
		if (!rating || !textareaValue.trim()) {
			alert('Please provide both a rating and feedback.');
			return;
		}

		const reviewData = {
			businessId,
			rating: rating * 2, // Convert rating to a scale of 10
			feedback: textareaValue
		};

    try {
      if (isEditing && reviewId) {
    // Set approval status to "false" (pending) before update
    const updatedReviewData = {
        ...reviewData,
        approval_status: "false", // Set approval status to pending
    };

    try {
        // Update the existing review
        const response = await updateReview(reviewId, updatedReviewData);

        if (response) {
            // Ensure approval status is set to pending in the response
            response.approval_status = "false"; 
            alert('Review updated successfully!');
            // Redirect to thank you page with the reviewId
            window.location.href = `/user/review/thankyou?reviewId=${reviewId}`;
        } else {
            alert('Failed to update review. Please try again.');
        }
    } catch (error) {
        console.error("Error updating review:", error);
        alert('An error occurred while updating the review. Please try again.');
    }
}
 else {
            // Create new review
            const response = await createReview(reviewData);
            if (response?.reviewId) {
                alert('Review submitted successfully!');
                // Redirect to the thank-you page with reviewId
                window.location.href = `/user/review/thankyou?reviewId=${response.reviewId}`;
            } else {
                alert('Failed to save review ID. Please try again.');
            }
        }
    } catch (error) {
        console.error('Error submitting review:', error);
        alert('Failed to submit review. Please try again.');
    }
}

  
  </script>
  
  <main class="container">
      <h1 class="title">{isEditing ? 'Edit your review' : 'How was your experience?'}</h1>
  
      <div class="subtitle">
        {rating ? ratingLabels[rating] : 'Please rate your experience'}
      </div>
  
      <div class="rating-container">
        {#each [1, 2, 3, 4, 5] as num}
          <label class="rating">
            <input
              type="radio"
              name="rating"
              value={num}
              bind:group={rating}
            />
            <span class="star {rating >= num ? 'selected' : ''}">&#9733;</span>
          </label>
        {/each}
      </div>
  
      <div class="subtitle">Tell us more about your experience</div>
  
      <div class="field">
        <textarea
          bind:value={textareaValue}
          class="textarea"
          placeholder="What aspects of your experience stood out as positive? What is this company excelling at? Be sure to share your thoughts honestly, offering helpful and constructive feedback."
        ></textarea>
      </div>
  
      <button class="custom-button" on:click={submitReview} disabled={!rating || !textareaValue.trim()}>
        {isEditing ? 'Save changes' : 'Submit your review'}
      </button>
  </main>
  
  
  <style>
    .container {
      width: 1199px;
      height: 704px;
      padding: 60px 236px;
      gap: 10px;
      margin-top: 2%;
      margin-bottom: 2%;
      border-radius: 8px;
      background-color: white;
      font-family: Inter, sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      text-align: left;
      text-underline-position: from-font;
    }
  
    .title {
      font-family: Inter, sans-serif;
      font-weight: 700;
      font-size: 24px;
      line-height: 1.2;
      text-align: center;
      color: #1E1E1E;
      margin-bottom: 10%;
    }
  
    .subtitle {
      font-family: Inter, sans-serif;
      font-weight: 600;
      color: #000000;
      font-size: 18px;
      margin-top: 30px;
    }
  
    .rating-container {
      display: flex;
      justify-content: left;
      gap: 15px; /* Space between stars */
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
      font-size: 44px; /* Adjust star size */
      color: #ccc; /* Default star color */
      transition: all 0.2s ease-in-out;
    }
  
    .star:hover {
      transform: scale(1.1); /* Slightly enlarge the star on hover */
    }
  
    .star.selected {
      color: #FABF35; /* Highlight the selected star */
      text-shadow: 0 0 10px rgba(255, 223, 0, 0.8); /* Optional glow effect */
    }
  
    .textarea {
      width: 100%;
      height: 229px;
      resize: none;
      border-radius: 8px;
      border-color: #1018281A;
    }
  
    .textarea::placeholder {
      color: #707070; /* Change this to your desired placeholder color */
    }
  
    .field {
      margin-top: 20px;
    }
  
    .file {
      margin-top: 10px;
    }
  
    .file-label {
      display: flex;
      align-items: center;
      border: none; /* Remove border around file label */
      background-color: transparent; /* No background */
    }
  
    .file-label-text {
      display: flex;
      align-items: center;
    }
  
    .file-name {
      font-size: 14px;
      font-weight: 400;
      color: #707070; /* Text color */
    }
  
    .file-input {
      display: none; /* Hide the actual file input */
    }
  
    .custom-button:disabled {
      background-color: #eeeeee; /* Light gray for disabled button */
      color: #707070; /* Darker text color */
      cursor: not-allowed;
    }
  
    .fa-paperclip {
      color: #41A2F8;
    }
  </style>
  