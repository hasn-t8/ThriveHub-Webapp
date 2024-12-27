<script>
	import { onMount } from 'svelte';
	import ReviewCard from './ReviewCard.svelte';

	
	let reviews_one = [
	{
		name: 'Jessica Garcia',
		rating: 4.5,
		location: 'USA',
		date: '2 days ago',
		title: 'Microsoft OneDrive',
		text: 'OneDrive has been a lifesaver for my productivity. The automatic syncing across my devices ensures I always have the latest version of my files. The integration with Microsoft Office is fantastic, making collaboration with colleagues a breeze.',
		likes: 25,
		avatar: '/assets/avatars/a-avatar-fc.png'
	},
	{
		name: 'Sarah Jones',
		rating: 5.0,
		location: 'USA',
		date: '1 day ago',
		title: 'Norton',
		text: "I've been using Norton for years now, and I've never had a virus or any other problems. They continue to add and update their systems and offer better coverage and better protection.",
		likes: 30,
		avatar: '/assets/avatar.png'
	},
	{
		name: 'William Lee',
		rating: 4.8,
		location: 'Canada',
		date: '3 days ago',
		title: 'McAfee',
		text: 'McAfee has been my go-to antivirus software for years. It keeps my devices safe from viruses and malware, and I appreciate the real-time protection feature. The customer support has also been helpful whenever I\'ve needed assistance.',
		likes: 28,
		avatar: '/assets/avatars/a-avatar-fm.png'
	},
	{
		name: 'Lisa Rodriguez',
		rating: 4.9,
		location: 'USA',
		date: '1 week ago',
		title: 'Bitdefender',
		text: 'Bitdefender has been my go-to antivirus software for years. It consistently ranks high in independent testing, and I\'ve never had a virus infection on any of my devices protected by Bitdefender. Their customer support is also excellent.',
		likes: 35,
		avatar: '/assets/avatar.png'
	}
];

let reviews_two = [
	{
		name: 'Ella Simmons',
		rating: 4.7,
		location: 'UK',
		date: '5 days ago',
		title: 'Kaspersky',
		text: 'Kaspersky has been my go-to antivirus software for years. It consistently detects and blocks threats, keeping my devices safe and my mind at ease.',
		likes: 22,
		avatar: '/assets/avatars/a-avatar-fc.png'
	},
	{
		name: 'Sebastian Adams',
		rating: 4.8,
		location: 'Germany',
		date: '3 days ago',
		title: 'ExpressVPN',
		text: 'ExpressVPN has been a game-changer for me. The user-friendly interface, blazing-fast speeds, and robust security features allow me to browse and stream content freely and securely.',
		likes: 27,
		avatar: '/assets/avatars/a-avatar-m.png'
	},
	{
		name: 'Isabella Foster',
		rating: 4.9,
		location: 'USA',
		date: '2 weeks ago',
		title: 'NordVPN',
		text: 'NordVPN has been a lifesaver for my online privacy. The advanced security features, user-friendly apps, and excellent customer support give me peace of mind.',
		likes: 33,
		avatar: '/assets/avatars/a-avatar-fc.png'
	},
	{
		name: 'Savannah Clark',
		rating: 4.6,
		location: 'USA',
		date: '1 week ago',
		title: 'Trello',
		text: 'Trello has been a lifesaver for my personal organization. The visual board interface makes it easy for me to manage tasks and stay on top of my goals.',
		likes: 20,
		avatar: '/assets/avatars/a-avatar-fm.png'
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

<!-- Review Section -->
<section class="section review-section pt-0 pb-0">
	<div class="container">
		<div class="columns is-gapless horizontal-reviews">
			<div class="column pt-6" style="width: 100%;">
				<h3 class="title is-3 has-text-left pt-6">Popular reviews</h3>
				<div class="horizontal-scroll-container">
					<!-- Add your horizontal review cards here -->
					<!-- Card 1 -->
					<div class="card review-card">
						<div class="card-content review-card-content">
							<div class="review-header">
								<div class="review-user">
									<!-- User Avatar -->
									<img
										class="avatar"
										src="/assets/avatar.png"
										alt="User Avatar"
									/>
									<div class="user-info">
										<!-- User Name and Rating -->
										<h5 class="name">Alice Palmer</h5>
										<p class="rating">
											4.9 <span class="star">★</span>
										</p>
									</div>
								</div>
								<div class="meta-info">
									<!-- Location Icon -->
									<i class="fa fa-map-marker-alt location-icon"></i>
									<span class="meta-location">USA</span>
									<!-- Date Below -->
									<p class="meta-date">1 day ago</p>
								</div>
							</div>
							<div class="is-divider"></div>
							<!-- Review Title -->
							<h4 class="review-title">GoDaddy</h4>
							<!-- Review Text -->
							<p class="review-text">
								Good service. Been looking for a similar one for a long time.
								Good service. Been looking for a similar one for a long time.
								Good service.
							</p>
							<div class="review-footer">
								<p class="likes">
									<i class="fas fa-heart"></i>
									<span>23</span>
								</p>
								<p class="share">
									<i class="fas fa-share-alt"></i>
								</p>
							</div>
						</div>
					</div>

					<div class="card review-card">
						<div class="card-content review-card-content">
							<div class="review-header">
								<div class="review-user">
									<!-- User Avatar -->
									<img
										class="avatar"
										src="/assets/avatar.png"
										alt="User Avatar"
									/>
									<div class="user-info">
										<!-- User Name and Rating -->
										<h5 class="name">Alice Palmer</h5>
										<p class="rating">
											4.9 <span class="star">★</span>
										</p>
									</div>
								</div>
								<div class="meta-info">
									<!-- Location Icon -->
									<i class="fa fa-map-marker-alt location-icon"></i>
									<span class="meta-location">USA</span>
									<!-- Date Below -->
									<p class="meta-date">1 day ago</p>
								</div>
							</div>
							<div class="is-divider"></div>
							<!-- Review Title -->
							<h4 class="review-title">GoDaddy</h4>
							<!-- Review Text -->
							<p class="review-text">
								Good service. Been looking for a similar one for a long time.
								Good service. Been looking for a similar one for a long time.
								Good service.
							</p>
							<div class="review-footer">
								<p class="likes">
									<i class="fas fa-heart"></i>
									<span>23</span>
								</p>
								<p class="share">
									<i class="fas fa-share-alt"></i>
								</p>
							</div>
						</div>
					</div>

					<div class="card review-card">
						<div class="card-content review-card-content">
							<div class="review-header">
								<div class="review-user">
									<!-- User Avatar -->
									<img
										class="avatar"
										src="/assets/avatar.png"
										alt="User Avatar"
									/>
									<div class="user-info">
										<!-- User Name and Rating -->
										<h5 class="name">Alice Palmer</h5>
										<p class="rating">
											4.9 <span class="star">★</span>
										</p>
									</div>
								</div>
								<div class="meta-info">
									<!-- Location Icon -->
									<i class="fa fa-map-marker-alt location-icon"></i>
									<span class="meta-location">USA</span>
									<!-- Date Below -->
									<p class="meta-date">1 day ago</p>
								</div>
							</div>
							<div class="is-divider"></div>
							<!-- Review Title -->
							<h4 class="review-title">GoDaddy</h4>
							<!-- Review Text -->
							<p class="review-text">
								Good service. Been looking for a similar one for a long time.
								Good service. Been looking for a similar one for a long time.
								Good service.
							</p>
							<div class="review-footer">
								<p class="likes">
									<i class="fas fa-heart"></i>
									<span>23</span>
								</p>
								<p class="share">
									<i class="fas fa-share-alt"></i>
								</p>
							</div>
						</div>
					</div>

					<div class="card review-card">
						<div class="card-content review-card-content">
							<div class="review-header">
								<div class="review-user">
									<!-- User Avatar -->
									<img
										class="avatar"
										src="/assets/avatar.png"
										alt="User Avatar"
									/>
									<div class="user-info">
										<!-- User Name and Rating -->
										<h5 class="name">Alice Palmer</h5>
										<p class="rating">
											4.9 <span class="star">★</span>
										</p>
									</div>
								</div>
								<div class="meta-info">
									<!-- Location Icon -->
									<i class="fa fa-map-marker-alt location-icon"></i>
									<span class="meta-location">USA</span>
									<!-- Date Below -->
									<p class="meta-date">1 day ago</p>
								</div>
							</div>
							<div class="is-divider"></div>
							<!-- Review Title -->
							<h4 class="review-title">GoDaddy</h4>
							<!-- Review Text -->
							<p class="review-text">
								Good service. Been looking for a similar one for a long time.
								Good service. Been looking for a similar one for a long time.
								Good service.
							</p>
							<div class="review-footer">
								<p class="likes">
									<i class="fas fa-heart"></i>
									<span>23</span>
								</p>
								<p class="share">
									<i class="fas fa-share-alt"></i>
								</p>
							</div>
						</div>
					</div>

					<div class="card review-card">
						<div class="card-content review-card-content">
							<div class="review-header">
								<div class="review-user">
									<!-- User Avatar -->
									<img
										class="avatar"
										src="/assets/avatar.png"
										alt="User Avatar"
									/>
									<div class="user-info">
										<!-- User Name and Rating -->
										<h5 class="name">Alice Palmer</h5>
										<p class="rating">
											4.9 <span class="star">★</span>
										</p>
									</div>
								</div>
								<div class="meta-info">
									<!-- Location Icon -->
									<i class="fa fa-map-marker-alt location-icon"></i>
									<span class="meta-location">USA</span>
									<!-- Date Below -->
									<p class="meta-date">1 day ago</p>
								</div>
							</div>
							<div class="is-divider"></div>
							<!-- Review Title -->
							<h4 class="review-title">GoDaddy</h4>
							<!-- Review Text -->
							<p class="review-text">
								Good service. Been looking for a similar one for a long time.
								Good service. Been looking for a similar one for a long time.
								Good service.
							</p>
							<div class="review-footer">
								<p class="likes">
									<i class="fas fa-heart"></i>
									<span>23</span>
								</p>
								<p class="share">
									<i class="fas fa-share-alt"></i>
								</p>
							</div>
						</div>
					</div>

					<div class="card review-card">
						<div class="card-content review-card-content">
							<div class="review-header">
								<div class="review-user">
									<!-- User Avatar -->
									<img
										class="avatar"
										src="/assets/avatar.png"
										alt="User Avatar"
									/>
									<div class="user-info">
										<!-- User Name and Rating -->
										<h5 class="name">Alice Palmer</h5>
										<p class="rating">
											4.9 <span class="star">★</span>
										</p>
									</div>
								</div>
								<div class="meta-info">
									<!-- Location Icon -->
									<i class="fa fa-map-marker-alt location-icon"></i>
									<span class="meta-location">USA</span>
									<!-- Date Below -->
									<p class="meta-date">1 day ago</p>
								</div>
							</div>
							<div class="is-divider"></div>
							<!-- Review Title -->
							<h4 class="review-title">GoDaddy</h4>
							<!-- Review Text -->
							<p class="review-text">
								Good service. Been looking for a similar one for a long time.
								Good service. Been looking for a similar one for a long time.
								Good service.
							</p>
							<div class="review-footer">
								<p class="likes">
									<i class="fas fa-heart"></i>
									<span>23</span>
								</p>
								<p class="share">
									<i class="fas fa-share-alt"></i>
								</p>
							</div>
						</div>
					</div>

					<!-- Add more review cards as needed -->
				</div>
			</div>
		</div>

		<div class="columns is-gapless hide-mobile">
			<!-- First Column (Header Text Only) -->
			<div class="column">
				<div class="columns">
					<div class="column pt-6">
						<h3 class="title is-3 has-text-left pt-6">Popular reviews</h3>
					</div>
				</div>
			</div>
			<!-- Second Column (Scroll Container 1) -->
			<div class="column">
				<div class="scroll-container custom-padding-right">
					{#each reviews_one as review}
						<ReviewCard {review} />
					{/each}
				</div>
			</div>

			<!-- Third Column (Scroll Container 2) -->
			<div class="column">
				<div class="scroll-container custom-padding-left">
					{#each reviews_two as review}
						<ReviewCard {review} />
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

	.custom-padding-left {
		padding-left: 2.5% !important;
	}
	.custom-padding-right {
		padding-right: 2.5% !important;
	}

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

	.horizontal-scroll-container.active {
		user-select: none; /* Disable text selection while dragging */
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

	.horizontal-reviews {
		display: none !important;
	}

	@media screen and (max-width: 980px) {
		.review-card {
			flex: 0 0 calc(70% - 20px);
		}

		.horizontal-reviews {
			display: flex !important;
		}

		.hide-mobile {
			display: none !important;
		}
	}

	@media screen and (max-width: 768px) {
		.review-card {
			flex: 0 0 calc(70% - 20px);
		}

		.horizontal-reviews {
			display: flex !important;
		}

		.hide-mobile {
			display: none !important;
		}
	}

	/* Scroll Container */
	.scroll-container {
		max-height: 700px; /* Adjust as needed */
		overflow-y: scroll; /* Enable vertical scrolling */
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE 10+ */
		cursor: grab; /* Change cursor to indicate draggable */
		user-select: none;
	}

	.scroll-container::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera */
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
		margin-bottom: 0;
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
		font-size: 1rem;
		margin: 0;
		color: #1e1e1e;
	}

	.user-info .rating {
		font-size: 1rem;
		color: #949494;
		margin: 0;
	}
	.user-info .star {
		font-size: 1rem;
		color: #ffd342;
		margin: 0;
	}

	.meta-info {
		text-align: right;
	}

	.location-icon {
		font-size: 0.9rem;
		color: #949494;
		margin-right: 5px;
	}

	.meta-location {
		font-size: 0.9rem;
		font-weight: normal;
		color: #949494;
	}

	.meta-date {
		font-size: 0.8rem;
		color: #999;
		margin-top: 2px;
	}

	.is-divider {
		margin: 0.7rem 0 !important;
	}

	.review-title {
		font-size: 1rem;
		margin: 0.5rem 0;
		font-weight: 500 !important;
		text-decoration: underline;
	}

	.review-text {
		font-size: 0.9rem;
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

	.review-section {
		background-color: #ffffff;
	}

	.reviews-container {
		display: flex;
		flex-wrap: nowrap;
		overflow-x: hidden;
	}

	/* Reviews about us Section End */
</style>
