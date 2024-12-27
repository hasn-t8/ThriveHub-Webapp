<script>
	export let review = {
		name: 'Alice P.',
		rating: 4.9,
		location: 'USA',
		date: '1 day ago',
		text: 'Thrive Hub has completely changed how I shop! The AI-powered reviews are so helpful, and I can easily make confident decisions. I trust this app for every purchase.',
		likes: 23,
		avatar: '/assets/avatar.png' // Optional, if an avatar is needed later
	};
</script>

<div class="card review-card">
	<div class="card-content review-card-content">
		<div class="review-header">
			<div class="review-user">
				<div class="user-info">
					<!-- User Name and Rating -->
					<h5 class="name">{review.name}</h5>
					<p class="rating">
						{review.rating} <span class="star">★</span>
					</p>
				</div>
			</div>
			<div class="meta-info">
				<!-- Location and Date -->
				<i class="fa fa-map-marker-alt location-icon"></i>
				<span class="meta-location">{review.location}</span>
				<p class="meta-date">{review.date}</p>
			</div>
		</div>
		<div class="is-divider"></div>
		<!-- Review Text -->
		<p class="review-text">{review.text}</p>
		<div class="review-footer">
			<p class="likes">
				<i class="fas fa-heart"></i>
				<span>{review.likes}</span>
			</p>
			<p class="share">
				<i class="fas fa-share-alt"></i>
			</p>
		</div>
	</div>
</div>


<style>
	/* ========================================
   Review Section Page Styling Starts Here
======================================== */

	.review-card {
		flex: 0 0 calc(33.33% - 20px);
	}

	.horizontal-scroll-container {
		display: flex;
		flex-wrap: nowrap;
		overflow-x: auto;
		overflow-y: hidden;
		cursor: grab; /* Change cursor to indicate draggable */
		scroll-behavior: smooth; /* Optional: smooth scrolling */
		gap: 10px; /* Spacing between cards */
		-ms-overflow-style: none; /* Hides scrollbar in IE and Edge */
		scrollbar-width: none; /* Hides scrollbar in Firefox */
		user-select: none;
	}

	.horizontal-scroll-container::-webkit-scrollbar {
		display: none;
	}

	.horizontal-scroll-container .review-card {
		display: inline-block;
		vertical-align: top;
		margin-right: 20px;
		width: calc(33.33% - 20px);
	}

	@media screen and (max-width: 980px) {
		.review-card {
			flex: 0 0 calc(70% - 20px);
		}
	}

	@media screen and (max-width: 768px) {
		.review-card {
			flex: 0 0 calc(70% - 20px);
		}
	}

	/* Card Styles for Reviews Start */
	.review-card {
		border: 1px solid #e5e5e5;
		border-radius: 12px;
		box-shadow: 0 4px 4px rgba(0, 0, 0, 0.03);
		padding: 1rem;
		margin-bottom: 5%;
		background-color: #ffffff;
	}

	.review-card-content {
		padding: 2% !important;
	}

	/* Header Section */
	.review-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0rem;
	}

	.review-user {
		display: flex;
		align-items: center;
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 0.8rem;
	}

	.user-info .name {
		font-size: 0.9rem;
		margin: 0;
		font-weight: 700;
	}

	.user-info .rating {
		font-size: 1rem;
		color: #949494;
		margin: 0;
		padding: 0;
	}

	.user-info .rating .star {
		font-size: 1rem;
		color: #ffd342;
		margin: 0;
		padding: 0;
	}

	.meta-info {
		text-align: right;
	}

	.location-icon {
		font-size: 0.7rem;
		color: #949494;
		margin-right: 5px;
	}

	.meta-location {
		font-size: 0.7rem;
		font-weight: normal;
		color: #949494;
	}

	.meta-date {
		font-size: 0.7rem;
		color: #999;
		margin-top: 2px;
	}

	.is-divider {
		margin: 0.7rem 0 !important;
	}

	.review-title {
		font-size: 1.2rem;
		margin: 0.5rem 0;
		font-weight: 500 !important;
		text-decoration: underline;
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

	.likes span {
		margin-left: 5px; /* Add space between the icon and the number 23 */
	}
	.fa,
	.fas {
		color: unset !important;
	}

	.likes {
		color: #ff6b6b !important; /* Heart color */
	}

	.share {
		color: #4a90e2 !important; /* Share icon color */
	}
	/* Card Styles for Reviews End */

	/* Reviews about us Section Start */

	.reviews-section {
		background-color: #e7f3ff;
	}
	/* Reviews about us Section End */
</style>
