<script>
	import { onMount } from 'svelte';
	import AboutUsReviews from './ReviewCard_AboutUs.svelte';

	let reviews = [
		{
			name: 'Jessica L.',
			title: 'Frequent Shopper',
			location: 'USA',
			rating: 5,
			date: '2 days ago',
			text: 'Thrive Hub has completely changed how I shop! The AI-powered reviews are so helpful, and I can easily make confident decisions. I trust this app for every purchase.',
			likes: 25,
			avatar: '/assets/avatar.png'
		},
		{
			name: 'Mark T.',
			title: 'Entrepreneur',
			location: 'Canada',
			rating: 5,
			date: '3 days ago',
			text: 'As a business owner, Thrive Hub has been a game-changer. The platform helped me connect with customers and showcase authentic reviews, making my brand more trustworthy.',
			likes: 18,
			avatar: '/assets/avatar.png'
		},
		{
			name: 'David R.',
			title: 'Tech Enthusiast',
			location: 'UK',
			rating: 4.9,
			date: '1 week ago',
			text: "I love how Thrive Hub simplifies the review process. It's so easy to find genuine feedback, and I always feel confident in my decisions. Highly recommend!",
			likes: 22,
			avatar: '/assets/avatar.png'
		},
		{
			name: 'Emily W.',
			title: 'Fitness Enthusiast',
			location: 'Australia',
			rating: 4.5,
			date: '5 days ago',
			text: 'Thrive Hub has made it so easy to find the best products for my fitness goals. The reviews are honest and reliable, saving me so much time and effort.',
			likes: 19,
			avatar: '/assets/avatar.png'
		},
		{
			name: 'Michael B.',
			title: 'Frequent Traveler',
			location: 'Germany',
			rating: 4.8,
			date: '4 days ago',
			text: 'I travel a lot, and Thrive Hub has become my go-to for checking hotel and service reviews. The detailed feedback helps me make better choices every time.',
			likes: 24,
			avatar: '/assets/avatar.png'
		}
	];

	// Function to make horizontal scroll draggable
	// @ts-ignore
	function makeHorizontalDraggable(containers) {
		// @ts-ignore
		containers.forEach((container) => {
			let isDragging = false;
			// @ts-ignore
			let startX;
			// @ts-ignore
			let scrollLeft;

			// @ts-ignore
			container.addEventListener('mousedown', (e) => {
				isDragging = true;
				container.classList.add('active');
				startX = e.pageX - container.offsetLeft;
				scrollLeft = container.scrollLeft;
				container.style.cursor = 'grabbing';
			});

			container.addEventListener('mouseleave', () => {
				isDragging = false;
				container.classList.remove('active');
				container.style.cursor = 'grab';
			});

			container.addEventListener('mouseup', () => {
				isDragging = false;
				container.classList.remove('active');
				container.style.cursor = 'grab';
			});

			// @ts-ignore
			container.addEventListener('mousemove', (e) => {
				if (!isDragging) return;
				e.preventDefault();
				const x = e.pageX - container.offsetLeft;
				// @ts-ignore
				const walk = (x - startX) * 2;
				// @ts-ignore
				container.scrollLeft = scrollLeft - walk;
			});
		});
	}

	// Function to make vertical scroll draggable
	// @ts-ignore
	function makeVerticalDraggable(containers) {
		// @ts-ignore
		containers.forEach((container) => {
			let isDragging = false;
			// @ts-ignore
			let startY;
			// @ts-ignore
			let scrollTop;

			// @ts-ignore
			container.addEventListener('mousedown', (e) => {
				isDragging = true;
				container.classList.add('active');
				startY = e.pageY - container.offsetTop;
				scrollTop = container.scrollTop;
				container.style.cursor = 'grabbing';
			});

			container.addEventListener('mouseleave', () => {
				isDragging = false;
				container.classList.remove('active');
				container.style.cursor = 'grab';
			});

			container.addEventListener('mouseup', () => {
				isDragging = false;
				container.classList.remove('active');
				container.style.cursor = 'grab';
			});

			// @ts-ignore
			container.addEventListener('mousemove', (e) => {
				if (!isDragging) return;
				e.preventDefault();
				const y = e.pageY - container.offsetTop;
				// @ts-ignore
				const walk = (y - startY) * 2;
				// @ts-ignore
				container.scrollTop = scrollTop - walk;
			});
		});
	}

	// Set initial scroll positions
	function setInitialScrollPositions() {
		const scrollContainers = document.querySelectorAll('.scroll-container');
		if (scrollContainers[0]) scrollContainers[0].scrollTop = 50;
		if (scrollContainers[1]) scrollContainers[1].scrollTop = 140;
	}

	// Use onMount lifecycle to initialize
	onMount(() => {
		const horizontalContainers = document.querySelectorAll(
			'.horizontal-scroll-container'
		);
		const verticalContainers = document.querySelectorAll('.scroll-container');

		makeHorizontalDraggable(horizontalContainers);
		makeVerticalDraggable(verticalContainers);
		setInitialScrollPositions();
	});
</script>

<!-- Reviews Section -->
<section class="section reviews-section">
	<div class="container">
		<!-- Header Text -->
		<div class="columns is-gapless">
			<div class="column pt-6" style="width: 100%;">
				<h3 class="title is-3 has-text-left pt-6">Reviews about us</h3>
				<div class="horizontal-scroll-container">
					{#each reviews as review}
						<AboutUsReviews {review} />
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

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
