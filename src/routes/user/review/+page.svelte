<script>
  import { onMount } from 'svelte';

  let rating = null; // Initial rating (null for no selection)
  let textareaValue = ''; // Value of the textarea

  // Map rating values to text labels and image paths
  const ratingLabels = {
    1: { label: 'Poor!', image: '/assets/poor.png' },
    2: { label: 'Fair!', image: '/assets/fair.png' },
    3: { label: 'Neutral!', image: '/assets/neutral.png' },
    4: { label: 'Good!', image: '/assets/good.png' },
    5: { label: 'Excellent!', image: '/assets/excellent.png' }
  };

  onMount(() => {
    // You can add any initialization logic here,
    // such as fetching data or setting up event listeners.
  });
</script>


<!-- Page Header -->
<section class="page-header">
	<h1>Bluehost</h1>
</section>

<main class="container">
  <h1 class="title">How was your experience?</h1>

  <div class="subtitle">
    {rating ? ratingLabels[rating].label : 'Please rate your experience'}
  </div>

<div class="rating-container">
  {#each [1, 2, 3, 4, 5] as num}
    <label class="rating">
      <input type="radio" name="rating" value={num} bind:group={rating} />
      <img
        src={ratingLabels[num].image}
        alt={ratingLabels[num].label}
        class="star-icon {rating === num ? 'selected' : ''}"
      />
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

  <div class="field">
    <div class="file has-name">
      <label class="file-label">
        <input class="file-input" type="file" accept="image/*" />
        <span class="file-label-text">
          <span class="file-icon">
            <i class="fas fa-paperclip"></i>
          </span>
          <span class="file-name">
            Attach Photo
          </span>
        </span>
      </label>
    </div>
  </div>

  <button class="custom-button" disabled={!rating}>
    Submit your review
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

  .star-icon {
    width: 44px;
    height: 44px;
    transition: all 0.2s ease-in-out;
  }

  .star-icon:hover {
    transform: scale(1.1); /* Slightly enlarge the star on hover */
  } 
  .star-icon {
  width: 50px; /* Adjust as needed */
  height: 50px; /* Adjust as needed */
  transition: background-color 0.3s, transform 0.2s; /* Smooth effect */
}

.star-icon.selected {
  background-color: #FABF35; /* Highlight the selected star */
  border-radius: 50%; /* Optional: make the background circular */
  padding: 5px; /* Ensures the content doesn't get cropped */
  box-shadow: 0 0 10px rgba(255, 223, 0, 0.8); /* Optional glow effect */
}

.star-icon.selected img {
  z-index: 1; /* Ensures the image remains on top */
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

  .button {
    margin-top: 20px;
  }

 

  .custom-button:disabled {
    background-color: #eeeeee; /* Light gray for disabled button */
    color: #707070; /* Darker text color */
    cursor: not-allowed;
  }

  /* Adjust the text-decoration and icon color */
  .file-name,
  .file-label-text {
    text-decoration-skip-ink: none; /* Remove underlines */
    color: #707070; /* Icon and text color in gray */
    border: none;
  }
  .fa-paperclip{
    color:#41A2F8
  }
</style>
