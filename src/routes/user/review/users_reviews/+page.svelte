<script>
  // Sample review data
  const reviews = [
    {
      name: 'Dropbox',
      rating: 4.9,
      review: 'Good service. Been looking for a similar one for a long time',
      date: '1 days ago',
      likes: 23,
    },
    {
      name: 'Dropbox',
      rating: 4.9,
      review: 'Good service. Been looking for a similar one for a long time',
      date: '1 days ago',
      likes: 23,
    },
  ];
</script>

<div class="reviews-container">
  <div class="reviews-header">
    <h2>Reviews ({reviews.length})</h2>
    <div class="filters">
      <button>Filter</button>
      <button>Sort</button>
    </div>
  </div>

  <div class="reviews">
    {#each reviews as review}
      <div class="review">
        <div class="review-header">
          <div class="name">{review.name}</div>
          <div class="rating">
            {#each Array(5) as _, i}
              <span class={i <= review.rating ? 'star' : 'star-empty'} />
            {/each}
          </div>
          <div class="date">{review.date}</div>
        </div>

        <!-- Rating with stars and separator line -->
          <div class="rating-row">
            <p>{review.rating}</p>
            <span class="icon is-small">
              <i class="fas fa-star"></i>
            </span>
          </div>
          <hr class="separator"/>
          <div class="review-text">{review.review}</div>

        <div class="actions">
          <span class="icon">
            <i class="fas fa-heart"></i>
          </span>
          <p>{review.likes}</p>          
          <span class="icon">
            <i class="fas fa-share-alt"></i>
          </span>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  /* Reviews Container */
  .reviews-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color:transparent;
    border-radius: 5px;
  }

  .reviews-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .rating-row {
		gap: 10px;
		display: flex; /* Align items in the same row */
	}
	.rating-row .icon {
		padding-top: 6px;
		font-size: 1em; /* Adjust icon size */
	}

  .filters {
    display: flex;
    gap: 10px;
  }

  .filters button {
    background-color: #E4E6EB;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
  }

  /* Reviews */
  .reviews {
    display: flex;
    border-radius: 8px;
    flex-direction: column;
    gap: 20px;
  }

  .review {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }

  .review-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .name {
    font-weight: bold;
    font-size: 24px;
    text-decoration: underline;
    font-family: inter;

  }

  .rating {
    display: flex;
    align-items: center;
  }

  .star,
  .star-empty {
    width: 18px;
    height: 18px;
    background-size: cover;
  }


  .date {
    font-size: 12px;
    color: #888;
  }


  .separator {
    border: 1px solid #ccc;
    margin: 10px 0;
  }

  .review-text {
    font-size: 14px;
    line-height: 1.5;
    color: #707070;
    margin-bottom: 10px;
  }
  .actions {
		display: flex;
		gap: 10px;
	}

	.actions .icon  {
    margin-top: 10px;
		/* font-size: 1.5rem; */
		color: #118bf6;
		cursor: pointer;
	}
	.actions .icon:hover {
		color: #0a6ebf;
	}
	.fa-share-alt,
	.fa-heart {
		color: #939393;
	}
  .actions p{
   margin-top: 10%p;
  }
</style>
