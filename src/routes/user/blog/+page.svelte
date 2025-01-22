<script lang="ts">
	import { getProfilesPublic } from '$lib/stores/business';
	import { onMount } from 'svelte';
	import { writable, get, type Writable } from 'svelte/store';
	import type { ProfileData } from '$lib/types/Profile';
	import { goto } from '$app/navigation';

	let businessProfile: Writable<ProfileData[]> = writable([]);
	let currentPage = 1;
	let itemsPerPage = 10;
	let totalPages = 1;
	let totalResults = 0;

	let categories = [
		{ text: "Technology", value: "tech" },
		{ text: "E-Commerce", value: "e-commerce" },
		{ text: "Wellness", value: "wellness" },
		{ text: "Education", value: "education" },
		{ text: "Finance", value: "finance" },
		{ text: "Home Electronics", value: "home-electronics" }
	];

    // Store to keep track of selected categories
	const selectedFilters: Writable<string[]> = writable([]);

	// Store for selected ratings
	const selectedRatings: Writable<string[]> = writable([]); 

    // Function to toggle a category
	function toggleFilter(category: string) {
		selectedFilters.update((filters) => {
			let updatedFilters;

            if (filters.includes(category)) {
				updatedFilters = filters.filter((filter) => filter !== category); // Remove if already selected
            } else {
				updatedFilters = [...filters, category]; // Add if not selected
            }
			return updatedFilters;
		});
    }

	// Function to toggle a rating
	function toggleRating(rating: string) {
		selectedRatings.update((ratings) => {
			let updatedRatings;
			if (rating === "all") {
				// If "All" is selected, clear all other ratings
				updatedRatings = ["all"];
			} else {
				if (ratings.includes(rating)) {
					updatedRatings = ratings.filter((r) => r !== rating);
				} else {
					// If "All" was previously selected, remove it
					updatedRatings = ratings.includes("all")
						? [rating]
						: [...ratings, rating];
				}
			}
			return updatedRatings;
		});
	}


	// Utility function to scroll to top
	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	// Fetch profiles and calculate total pages
	async function fetchProfiles(): Promise<void> {
		try {
			const profiles: ProfileData[] = await getProfilesPublic();

			// Apply category filter
			const filters = get(selectedFilters);
			const filteredByCategory =
				filters.length > 0
					? profiles.filter((profile) =>
							filters.includes((profile.category ?? "").toLowerCase())
					  )
					: profiles;

			// Apply rating filter
			const ratings = get(selectedRatings);
			const filteredByRating =
				ratings.includes("all") || ratings.length === 0
					? filteredByCategory // Show all if "All" is selected or no ratings are selected
					: filteredByCategory.filter((profile) =>
							profile.avg_rating && ratings.includes(String(profile.avg_rating).charAt(0))
					  );

			console.log("Filtered Profiles:", filteredByRating);
			businessProfile.set(filteredByRating);
			console.log(filteredByRating);
			totalResults = filteredByRating.length;
			totalPages = Math.ceil(filteredByRating.length / itemsPerPage);
		} catch (error) {
			console.error('Error fetching profiles:', error);
		}
	}

	function redirectToBusinessProfile(id: string) {
		goto(`/business/${id}`);
	}

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

	onMount(() => {
		const horizontalContainers = document.querySelectorAll(
			'.horizontal-scroll-container'
		);
		const verticalContainers = document.querySelectorAll('.scroll-container');

		makeHorizontalDraggable(horizontalContainers);
		makeVerticalDraggable(verticalContainers);
		setInitialScrollPositions();

		fetchProfiles();
	});

	// Handle page click
	function handlePageClick(pageNumber: number) {
		currentPage = pageNumber;
		scrollToTop();
	}

	// Calculate the visible page numbers (intervals of 5)
	function getPageNumbers(): number[] {
		const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
		const endPage = Math.min(startPage + 4, totalPages);
		const pageNumbers = [];
		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}
		return pageNumbers;
	}

	// Handle Next and Previous buttons
	function nextPage() {
		if (currentPage < totalPages) currentPage++;
		scrollToTop();
	}

	function prevPage() {
		if (currentPage > 1) currentPage--;
		scrollToTop();
	}





    let activeTab = "profile"; // Default active tab

    const tabs = [
    { id: "all-posts", label: "All posts" },
    { id: "profile", label: "Profile" },
    { id: "review", label: "Review" },
    { id: "about", label: "About Thrive Hub" },
    { id: "privacy", label: "Privacy" },
    ];

    const tabContents = {
    "all-posts": "All posts content goes here.",
    "profile": `
        <div class="columns is-multiline">
        <div class="column is-one-third">
            <div class="card">
            <div class="card-content">
                <p class="has-text-grey-light">Oct 29, 2024</p>
                <p class="title is-5">Change or remove your profile picture</p>
                <p class="subtitle is-6">Here are our guidelines to consider when you choose a profile picture.</p>
            </div>
            </div>
        </div>
        <!-- Add more cards here -->
        </div>
    `,
    "review": "Review content goes here.",
    "about": "About Thrive Hub content goes here.",
    "privacy": "Privacy content goes here.",
    };


</script>

<!-- Category Section -->
<section class="category-banner">
	<div class="container">
		<nav class="breadcrumb is-small is-left" aria-label="breadcrumbs">
			<ul>
				<li><a href="/" class="has-text-white">Home</a></li>
				<li class="is-active has-text-white">
					<a href="#" aria-current="page" class="has-text-white"
						>Blog</a
					>
				</li>
			</ul>
		</nav>
		<h1 class="title mt-6 mb-3 has-text-white">Blog</h1>
        <p class="mb-6" style="width: 50%; margin:auto;">Stay informed with the latest reviews, tips, and insights to make smarter decisions. Our blog provides valuable content to help you navigate the world of products and services.</p>
	</div>
</section>

<!-- Tabs -->
<section class="section">
    <div class="container">
      <div class="tabs is-centered">
        <ul class="is-justify-content-space-evenly">
          {#each tabs as tab}
            <li
			  class:is-active={activeTab === tab.id}
              on:click={() => (activeTab = tab.id)}
            >
              <a>{tab.label}</a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </section>
  
  <!-- Tab Contents -->
  <section class="section">
    <div class="container">
      {#each Object.entries(tabContents) as [id, content]}
        <div class="tab-content {activeTab === id ? 'is-active' : ''}" id={id}>
          {@html content}
        </div>
      {/each}
    </div>
  </section>
  
  <!-- Pagination -->
  <section class="section">
    <div class="container has-text-centered">
      <nav class="pagination is-centered" role="navigation" aria-label="pagination">
		<button class="pagination-previous" disabled>Previous</button>
        <a class="pagination-next">Next</a>
        <ul class="pagination-list">
          <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
          <li><span class="pagination-ellipsis">&hellip;</span></li>
          <li><a class="pagination-link" aria-label="Goto page 5">5</a></li>
          <li><a class="pagination-link is-current" aria-label="Page 10">10</a></li>
        </ul>
      </nav>
    </div>
  </section>

<style>
	.content-link,
	.media-left-link {
		cursor: pointer;
	}

    .tab-content {
        display: none;
    }
    .tab-content.is-active {
        display: block;
    }


	/* ========================================
   General CSS Starts Here
======================================== */
	.button.is-primary {
		background-color: #118cf6;
		height: 3rem;
	}

	.button.is-primary.is-hovered,
	.button.is-primary:hover {
		background-color: #ffffff;
		border-color: transparent;
		color: #118cf6;
	}

	.button.is-primary.is-outlined {
		background-color: transparent;
		border-color: #118cf6;
		color: #118cf6;
	}

	.button.is-primary.is-outlined.is-focused,
	.button.is-primary.is-outlined.is-hovered,
	.button.is-primary.is-outlined:focus,
	.button.is-primary.is-outlined:hover {
		background-color: #118cf6;
		border-color: #118cf6;
		color: #fff;
	}

	.pagination-link.is-current {
		background-color: #118cf6;
		border-color: #607af2;
		color: #fff;
	}

	.menu-label {
		color: black;
		font-size: 18px;
		text-transform: none;
		font-weight: 500 !important;
		letter-spacing: unset;
	}

	.media-content {
		width: 100%;
	}

	@media screen and (max-width: 1150px) {
		article.media {
			flex-direction: column;
		}
		article > figure {
			margin-right: 0;
			align-self: center;
		}
		.category-tag {
			margin-right: 0;
		}
	}

	@media screen and (max-width: 980px) {
		.hide-mobile {
			display: none !important;
		}
		.reviews-section > div > div > div > h3 {
			padding-top: 0 !important;
		}
	}

	@media screen and (max-width: 768px) {
		.hide-mobile {
			display: none !important;
		}
	}

	.media-left {
		align-self: center;
	}

	/* ========================================
   Review Section Page Styling Starts Here
======================================== */

	.review-section {
		background-color: #fff;
	}

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
	}

	.horizontal-scroll-container {
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
	}

	@media screen and (max-width: 768px) {
		.review-card {
			flex: 0 0 calc(70% - 20px);
		}

		.horizontal-reviews {
			display: flex !important;
		}
	}

	/* Reviews about us Section Start */

	.reviews-section {
		background-color: #e7f3ff;
	}

	/* Reviews about us Section End */

	/* Scroll Container */
	.scroll-container {
		max-height: 700px; /* Adjust as needed */
		overflow-y: scroll; /* Enable vertical scrolling */
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE 10+ */
		cursor: grab; /* Change cursor to indicate draggable */
	}

	.scroll-container {
		user-select: none; /* Disable text selection while dragging */
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
		margin-bottom: 1rem;
	}

	.review-user {
		display: flex;
		align-items: center;
	}

	.review-company {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 0.8rem;
	}

	.company-avatar {
		width: 25%;
		height: auto;
		border-radius: 50%;
		margin-right: 8%;
	}

	.user-info .name {
		font-size: 1rem;
		margin: 0;
		font-weight: 700 !important;
	}

	.user-info .rating {
		font-size: 1rem;
		color: #949494;
		margin: 0;
		font-weight: 400;
	}

	.user-info .rating > span {
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
		font-size: 0.8rem;
		font-weight: 500;
		color: #949494;
	}

	.meta-date {
		font-size: 0.8rem;
		color: #999;
		margin-top: 2px;
	}

	.is-divider {
		margin: 1rem 0 !important;
	}

	.review-title {
		margin: 0.5rem 0;
		color: #1e1e1e !important;
		text-decoration: underline !important;
		font-size: 1rem !important;
		font-weight: 500 !important;
	}

	.review-text {
		font-size: 16px;
		line-height: 22px;
		color: #3c3c4399;
		margin-bottom: 1rem;
		font-weight: 400;
	}

	.review-text-btn {
		font-size: 0.9rem;
		line-height: 1.4;
		color: #4d4d4d;
		margin-bottom: 1rem;
		font-weight: 600;
	}
	.company-review {
		font-size: 18px;
		line-height: 1.4;
		color: #707070;
		margin-bottom: 1rem;
	}

	.company-name {
		font-weight: 700;
		font-size: 20px;
		line-height: 24px;
	}

	.company-rating {
		font-weight: 400;
		font-size: 16px;
		color: #949494;
		line-height: 20.8px;
	}

	.review-link {
		font-size: 15px;
		line-height: 22px;
		color: #41a2f8;
		margin-bottom: 1rem;
		font-weight: 400;
		text-decoration: underline;
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

	.likes {
		color: #ff6b6b; /* Heart color */
	}

	.share {
		color: #4a90e2; /* Share icon color */
	}
	/* Card Styles for Reviews End */

	/* ========================================
   Banner Section Page Styling Starts Here
======================================== */
	.breadcrumb {
		margin-top: 10px;
	}
	.category-banner {
		background-color: #2196f3; /* Match the blue shade */
		color: white;
		padding: 20px 10px;
		text-align: center;
	}

	/* ========================================
   Category Content Section Page Styling Starts Here
======================================== */
	.category-content {
		background-color: #e7f3ff;
	}

	.category-star {
		font-size: 1rem;
		color: #ffd342;
		margin: 0;
		margin-left: 10%;
	}

	.icon-text {
		display: inline-flex;
		align-items: center;
	}
	.icon-text .icon {
		margin-right: 5px;
	}

	.clear-btn {
		border-radius: 9px;
		padding-left: 3%;
		padding-right: 3%;
		background-color: transparent !important;
		border-color: #e7f4fd !important;
		color: rgba(0, 0, 0, 0.7) !important;
	}

	.outline-btn {
		border-radius: 9px;
		padding-left: 3%;
		padding-right: 3%;
		background-color: transparent !important;
		border-color: #e7f4fd !important;
		color: rgba(0, 0, 0, 0.7) !important;
	}

	.menu-list a {
		border-radius: 9px;
		border-width: 1px;
		border: 1px solid transparent;
		background-color: transparent;
		border-color: #e7f4fd !important;
		color: rgba(0, 0, 0, 0.7);
		padding: 0.7em 0.75em;
	}

	.menu-list a:hover {
		background-color: #f5f5f5;
		color: #363636;
	}

	.menu-list button {
		font-size: 1rem;
		border-radius: 9px;
		border-width: 1px;
		border: 1px solid transparent;
		background-color: transparent;
		border-color: #e7f4fd !important;
		color: rgba(0, 0, 0, 0.7);
		padding: 0.7em 0.75em;
	}

	.menu-list button:hover {
		background-color: #f5f5f5;
		color: #363636;
		cursor: pointer;
	}

    .filter-button.selected {
        background-color: #118cf6!important;
        color: #fff!important;
        border-color: #118cf6!important;
    }


	.category-tag {
		width: auto;
		background-color: #e7f3ff;
		padding: 0.8em;
		text-align: center;
		max-width: 115px;
		border-radius: 15px;
		font-size: 0.8em;
		user-select: none;
	}

	.stars .icon {
		margin-right: 10px;
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

	@media screen and (max-width: 768px) {
		.media-right {
			display: none !important;
		}

		.category-tag {
			padding: 0.8rem;
			max-width: 100%;
			border-radius: 11px;
		}

		.review-btn {
			display: inline-flex !important;
			width: 100%;
		}
	}
</style>
