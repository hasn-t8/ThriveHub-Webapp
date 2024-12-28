<script lang="ts">
	import { getProfilesPublic } from '$lib/stores/business';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { ProfileData } from '$lib/types/Profile';
	import { goto } from '$app/navigation';

	let businessProfile: Writable<ProfileData[]> = writable([]);
	let currentPage = 1;
	let itemsPerPage = 10;
	let totalPages = 1;
	let totalResults = 0;

	// Utility function to scroll to top
	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	// Fetch profiles and calculate total pages
	async function fetchProfiles(): Promise<void> {
		try {
			const profiles: ProfileData[] = await getProfilesPublic();
			businessProfile.set(profiles);
			totalResults = profiles.length;
			totalPages = Math.ceil(profiles.length / itemsPerPage);
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
            container.addEventListener("mousedown", (e) => {
                isDragging = true;
                container.classList.add("active");
                startX = e.pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
                container.style.cursor = "grabbing";
            });

            container.addEventListener("mouseleave", () => {
                isDragging = false;
                container.classList.remove("active");
                container.style.cursor = "grab";
            });

            container.addEventListener("mouseup", () => {
                isDragging = false;
                container.classList.remove("active");
                container.style.cursor = "grab";
            });

            // @ts-ignore
            container.addEventListener("mousemove", (e) => {
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
            container.addEventListener("mousedown", (e) => {
                isDragging = true;
                container.classList.add("active");
                startY = e.pageY - container.offsetTop;
                scrollTop = container.scrollTop;
                container.style.cursor = "grabbing";
            });

            container.addEventListener("mouseleave", () => {
                isDragging = false;
                container.classList.remove("active");
                container.style.cursor = "grab";
            });

            container.addEventListener("mouseup", () => {
                isDragging = false;
                container.classList.remove("active");
                container.style.cursor = "grab";
            });

            // @ts-ignore
            container.addEventListener("mousemove", (e) => {
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
        const scrollContainers = document.querySelectorAll(".scroll-container");
        if (scrollContainers[0]) scrollContainers[0].scrollTop = 50;
        if (scrollContainers[1]) scrollContainers[1].scrollTop = 140;
    }










	onMount(() => {
        const horizontalContainers = document.querySelectorAll(
            ".horizontal-scroll-container"
        );
        const verticalContainers = document.querySelectorAll(".scroll-container");

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
</script>

    <!-- Category Section -->
    <section class="category-banner">
        <div class="container">
            <nav class="breadcrumb is-small is-left" aria-label="breadcrumbs">
                <ul>
                <li><a href="/" class="has-text-white">Home</a></li>
                <li class="is-active has-text-white"><a href="#" aria-current="page" class="has-text-white">All Categories</a></li>
                </ul>
            </nav>
            <h1 class="title mt-6 mb-6 has-text-white">All Categories</h1>
        </div>
    </section>

    <section class="section category-content">
        <div class="container">
            <div class="columns">
            <!-- Filter Section -->
            <div class="column">
                <div class="box">
                <aside class="menu">
                    <p class="menu-label">Rating</p>
                    <div class="buttons">
                    <button class="button is-light clear-btn">All <span class="category-star">★</span></button>
                    <button class="button is-light clear-btn">5 <span class="category-star">★</span></button>
                    <button class="button is-light clear-btn">4 <span class="category-star">★</span></button>
                    <button class="button is-light clear-btn">3 <span class="category-star">★</span></button>
                    <button class="button is-light clear-btn">2 <span class="category-star">★</span></button>
                    </div>
    
                    <p class="menu-label mb-0">Category</p>
                    <div class="menu-list is-flex is-flex-wrap-wrap">
                      <a class="is-inline-block mx-1 my-1">Web Hosting Services</a>
                      <a class="is-inline-block mx-1 my-1">VPN Providers</a>
                      <a class="is-inline-block mx-1 my-1">Cloud Storage Providers</a>
                      <a class="is-inline-block mx-1 my-1">E-commerce Platforms</a>
                      <a class="is-inline-block mx-1 my-1">Email Marketing Tools</a>
                      <a class="is-inline-block mx-1 my-1">Security Software Companies</a>
                      <a class="is-inline-block mx-1 my-1">CRM Software</a>
                      <a class="is-inline-block mx-1 my-1">Accounting Software</a>
                      <a class="is-inline-block mx-1 my-1">Graphic Design Software</a>
                      <a class="is-inline-block mx-1 my-1">Video Editing Software</a>
                      <a class="is-inline-block mx-1 my-1">Education & Productivity</a>
                      <a class="is-inline-block mx-1 my-1">Project Management Tools</a>
                      <a class="is-inline-block mx-1 my-1">Customer Service Software</a>
                      <a class="is-inline-block mx-1 my-1">Marketing Automation Software</a>
                    </div>
    
                    <p class="menu-label mb-0">Special Needs</p>
                    <div class="menu-list is-flex is-flex-wrap-wrap mb-3">
                      <a class="is-inline-block mx-1 my-1">Free services</a>
                      <a class="is-inline-block mx-1 my-1">Only with reviews</a>
                    </div>
                    <button class="button is-primary is-fullwidth mb-5 mt-5" style="border-radius: 15px;">Show Results</button>
                </aside>
                </div>
            </div>
    
            <!-- Content Section -->
            <div class="column is-two-thirds">
                <div class="box mb-2">
                <div class="level">
                    <div class="level-left">
                    <p>Showing {totalResults} companies</p>
                    </div>
                    <div class="level-right">
                    <p class="mr-5">Sorting By</p>
                    <div class="select">
                        <select>
                        <option>Most Popular</option>
                        <option>Highest Rated</option>
                        <option>Most Reviewed</option>
                        </select>
                    </div>
                    </div>
                </div>
                </div>
    
                <!-- Companies List -->
				<!-- Render data for the current page -->
				{#each $businessProfile.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as business, index}
					{@render organizationTab(business)}
				{/each}


                <!-- Pagination -->
				<!-- Pagination -->
				<div class="pagination-container has-text-weight-bold">
					
					<!-- "Go to First" Button -->
					<button
						class="pagination-arrow double-arrow mr-5"
						on:click={() => handlePageClick(1)}>
						&lt;&lt;
					</button>
					<!-- Previous Button -->
					<button
						class="pagination-arrow single-arrow mr-4"
						on:click={prevPage}
						disabled={currentPage === 1}>
						&lt;
					</button>




					{#if currentPage > 5}
						<span class="pagination-link">...</span>
					{/if}


					<!-- Interval Page Numbers -->
					{#each getPageNumbers() as page}
						<button
							class="pagination-link {currentPage === page ? 'is-current' : ''}"
							on:click={() => handlePageClick(page)}>
							{page}
						</button>
					{/each}

					<!-- "Go to Last" Button -->



					{#if currentPage < totalPages - 4}
						<span class="pagination-link">...</span>
					{/if}
						<button
							class="pagination-arrow single-arrow ml-4"
							on:click={nextPage}
							disabled={currentPage === totalPages}>
							>
						</button>


					<!-- Next Button -->
					<button
						class="pagination-arrow double-arrow ml-5"
						on:click={() => handlePageClick(totalPages)}>
						>>
					</button>
				</div>



            </div>
            </div>
        </div>
    </section>






    <!-- Review Section -->
    <section class="section review-section pt-0 pb-0">
        <div class="container">

            <div class="columns is-gapless horizontal-reviews">
                <div class="column pt-6" style="width: 100%;">
                    <h3 class="title is-3 has-text-left pt-6">Most popular reviews about all categories</h3>
                    <div class="horizontal-scroll-container">
                        <!-- Add your horizontal review cards here -->
                        <!-- Card 1 -->
                        <div class="card review-card">
                            <div class="card-content review-card-content">
                                <div class="review-header">
                                    <div class="review-user">
                                        <!-- User Avatar -->
                                        <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
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
                                    Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                    for a long time. Good service.
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
                                        <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
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
                                    Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                    for a long time. Good service.
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
                                        <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
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
                                    Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                    for a long time. Good service.
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
                                        <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
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
                                    Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                    for a long time. Good service.
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
                                        <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
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
                                    Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                    for a long time. Good service.
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
                                        <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
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
                                    Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                    for a long time. Good service.
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
                            <h3 class="title is-3 has-text-left pt-6">Most popular reviews about all categories</h3>
                        </div>
                    </div>
                </div>
                <!-- Second Column (Scroll Container 1) -->
                <div class="column">
                    <div class="scroll-container custom-padding-right">
                        <!-- Card 1 -->
                        <div class="card review-card">
                            <div class="card-content review-card-content">
                                <div class="review-header">
                                    <div class="review-user">
                                        <!-- User Avatar -->
                                        <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
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
                                    Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                    for a long time. Good service.
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
                        <!-- Add more cards as needed -->


                        <div class="card review-card">
                            <div class="card-content review-card-content">
                                <div class="review-header">
                                    <div class="review-user">
                                        <!-- User Avatar -->
                                        <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
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
                                    Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                    for a long time. Good service.
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
                                        <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
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
                                    Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                    for a long time. Good service.
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
                                        <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
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
                                    Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                    for a long time. Good service.
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
                    </div>
                </div>
    
                <!-- Third Column (Scroll Container 2) -->
                <div class="column">
                    <div class="scroll-container custom-padding-left">
                        <!-- Card 1 -->
                        <div class="card review-card">
                            <div class="card-content review-card-content">
                                <div class="review-header">
                                    <div class="review-user">
                                        <!-- User Avatar -->
                                        <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
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
                                    Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                    for a long time. Good service.
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
                        <!-- Add more cards as needed -->


                        <div class="card review-card">
                            <div class="card-content review-card-content">
                                <div class="review-header">
                                    <div class="review-user">
                                        <!-- User Avatar -->
                                        <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
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
                                    Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                    for a long time. Good service.
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
                                        <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
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
                                    Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                    for a long time. Good service.
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
                                        <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
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
                                    Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                    for a long time. Good service.
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

                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Reviews Section -->
    <section class="section reviews-section">
        <div class="container">
            <!-- Header Text -->
            <div class="columns is-gapless">
                <div class="column pt-6" style="width: 100%;">
                    <h3 class="title is-3 has-text-left pt-6">Top companies in all categories</h3>
                    <div class="horizontal-scroll-container">
                        <!-- Add your horizontal review cards here -->
                        <!-- Card 1 -->
                        <div class="card review-card">
                            <div class="card-content review-card-content">
                                <div class="review-header">
                                    <div class="review-company">
                                        <!-- User Avatar -->
                                        <img class="company-avatar" src="/assets/image (1).png" alt="Company Avatar" />
                                        <div class="company-info">
                                            <!-- User Name and Rating -->
                                            <h5 class="company-name mb-2">HostGator</h5>
											<p class="company-rating">4.8 <span class="category-star ml-0">★</span>  | 4,876 Reviews</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="is-divider"></div>
                                <!-- Review Text -->
                                <p class="company-review">
                                    Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                    for a long time. Good service.
                                </p>
                                <div class="review-footer">
									<a href="/write-review" class="review-link">Learn More</a>
                                </div>
                            </div>                            
                        </div>

                        <div class="card review-card">
                            <div class="card-content review-card-content">
                                <div class="review-header">
                                    <div class="review-company">
                                        <!-- User Avatar -->
                                        <img class="company-avatar" src="/assets/image (1).png" alt="Company Avatar" />
                                        <div class="company-info">
                                            <!-- User Name and Rating -->
                                            <h5 class="company-name mb-2">HostGator</h5>
											<p class="company-rating">4.8 <span class="category-star ml-0">★</span>  | 4,876 Reviews</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="is-divider"></div>
                                <!-- Review Text -->
                                <p class="company-review">
                                    Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                    for a long time. Good service.
                                </p>
                                <div class="review-footer">
									<a href="/write-review" class="review-link">Learn More</a>
                                </div>
                            </div>                            
                        </div>

                        <div class="card review-card">
                            <div class="card-content review-card-content">
                                <div class="review-header">
                                    <div class="review-company">
                                        <!-- User Avatar -->
                                        <img class="company-avatar" src="/assets/image (1).png" alt="Company Avatar" />
                                        <div class="company-info">
                                            <!-- User Name and Rating -->
                                            <h5 class="company-name mb-2">HostGator</h5>
											<p class="company-rating">4.8 <span class="category-star ml-0">★</span>  | 4,876 Reviews</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="is-divider"></div>
                                <!-- Review Text -->
                                <p class="company-review">
                                    Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                    for a long time. Good service.
                                </p>
                                <div class="review-footer">
									<a href="/write-review" class="review-link">Learn More</a>
                                </div>
                            </div>                            
                        </div>

                        <div class="card review-card">
                            <div class="card-content review-card-content">
                                <div class="review-header">
                                    <div class="review-company">
                                        <!-- User Avatar -->
                                        <img class="company-avatar" src="/assets/image (1).png" alt="Company Avatar" />
                                        <div class="company-info">
                                            <!-- User Name and Rating -->
                                            <h5 class="company-name mb-2">HostGator</h5>
											<p class="company-rating">4.8 <span class="category-star ml-0">★</span>  | 4,876 Reviews</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="is-divider"></div>
                                <!-- Review Text -->
                                <p class="company-review">
                                    Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                    for a long time. Good service.
                                </p>
                                <div class="review-footer">
									<a href="/write-review" class="review-link">Learn More</a>
                                </div>
                            </div>                            
                        </div>


                        <div class="card review-card">
                            <div class="card-content review-card-content">
                                <div class="review-header">
                                    <div class="review-company">
                                        <!-- User Avatar -->
                                        <img class="company-avatar" src="/assets/image (1).png" alt="Company Avatar" />
                                        <div class="company-info">
                                            <!-- User Name and Rating -->
                                            <h5 class="company-name mb-2">HostGator</h5>
											<p class="company-rating">4.8 <span class="category-star ml-0">★</span>  | 4,876 Reviews</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="is-divider"></div>
                                <!-- Review Text -->
                                <p class="company-review">
                                    Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                    for a long time. Good service.
                                </p>
                                <div class="review-footer">
									<a href="/write-review" class="review-link">Learn More</a>
                                </div>
                            </div>                            
                        </div>
                        <!-- Add more review cards as needed -->
                    </div>
                </div>
            </div>
        </div>
    </section>


{#snippet organizationTab(item: ProfileData)}
	<div class="box mb-4">
		<article class="media">
            <div class="media-left media-left-link" on:click="{() => item.id && redirectToBusinessProfile(item.id.toString())}" on:keydown="{(e) => e.key === 'Enter' && item.id && redirectToBusinessProfile(item.id.toString())}">
                <figure class="media-left">
                    <p class="image" style="width: 100%; height: auto; padding:0;">
                        <img style="width: 4rem;" src="{item.logo_url ?? "/assets/no_image.jpg"}?cacheBust=${Date.now()}" alt="Company logo">
                    </p>
                    </figure>
            </div>
			<div class="media-content">
            <div class="content content-link" role="button" tabindex="0" on:click="{() => item.id && redirectToBusinessProfile(item.id.toString())}" on:keydown="{(e) => e.key === 'Enter' && item.id && redirectToBusinessProfile(item.id.toString())}">
				<strong style="font-size: 24px;">{item.org_name}</strong>
				<p style="color: #949494; font-size:1rem;">4.8 <span class="category-star ml-0">★</span>  | 1.2k Reviews</p>
				<p style="font-weight:400;font-size:0.9rem;">{item.about_business ?? "No Data"}</p>
				<div>
					<p class="category-tag">{item.category ?? "No Category"}</p>
					<button class="button is-light clear-btn is-hidden review-btn">Write Review</button>
				</div>
			</div>
			</div>
			<div class="media-right">
				<a href="/user/review" class="review-text-btn">
					Write Review
					<img
						src="/assets/edit.png"
						alt="edit Icon"
						style="width: 19px; height: 19px; margin-left: 10px;"
					/>
				</a>
			</div>
		</article>
	</div>
{/snippet}


<style>
    
    .content-link, .media-left-link{
        cursor: pointer;
    }

/* ========================================
   General CSS Starts Here
======================================== */
.button.is-primary {
    background-color: #118cf6;
	height: 3rem;
}

.button.is-primary.is-hovered, .button.is-primary:hover {
    background-color: #ffffff;
    border-color: transparent;
    color: #118cf6;
}

.button.is-primary.is-outlined {
    background-color: transparent;
    border-color: #118cf6;
    color: #118cf6;
}

.button.is-primary.is-outlined.is-focused, .button.is-primary.is-outlined.is-hovered, .button.is-primary.is-outlined:focus, .button.is-primary.is-outlined:hover {
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

.media-content{
	width: 100%;
}

@media screen and (max-width: 1150px) {
    article.media{
        flex-direction: column;
    }
	article>figure{
		margin-right:0;
		align-self: center;
	}
	.category-tag{
		margin-right:0;
	}
}

@media screen and (max-width: 980px) {
    .hide-mobile {
        display: none!important;
    }
	.reviews-section > div > div > div > h3{
		padding-top:0!important;
	}
}

@media screen and (max-width: 768px) {
    .hide-mobile {
        display: none!important;
    }
}


.media-left{
    align-self: center;
}



/* ========================================
   Review Section Page Styling Starts Here
======================================== */

	.review-section{
		background-color: #fff;
	}

    .custom-padding-left{
        padding-left:2.5%!important;
    }
    .custom-padding-right{
        padding-right:2.5%!important;
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


    .horizontal-reviews{
        display: none!important;
    }

    @media screen and (max-width: 980px) {
        .review-card {
            flex: 0 0 calc(70% - 20px);
        }

        .horizontal-reviews{
            display: flex!important;
        }

    }

    @media screen and (max-width: 768px) {
        .review-card {
            flex: 0 0 calc(70% - 20px);
        }

        .horizontal-reviews{
            display: flex!important;
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

.review-card-content{
    padding:2%!important;
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

.review-company{
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


.is-divider{
    margin:1rem 0!important;
}

.review-title {
    margin: 0.5rem 0;
    color:#1E1E1E!important;
    text-decoration: underline!important;
    font-size: 1rem!important;
    font-weight: 500 !important;
}

.review-text {
    font-size: 16px;
    line-height: 22px;
    color: #3C3C4399;
    margin-bottom: 1rem;
	font-weight: 400;
}

.review-text-btn{
    font-size: 0.9rem;
    line-height: 1.4;
    color: #4D4D4D;
    margin-bottom: 1rem;
	font-weight: 600;
}
.company-review {
    font-size: 18px;
    line-height: 1.4;
    color: #707070;
    margin-bottom: 1rem;
}

.company-name{
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
}

.company-rating{
	font-weight: 400;
	font-size:16px;
	color:#949494;
	line-height: 20.8px;
}

.review-link{
    font-size: 15px;
    line-height: 22px;
    color: #41A2F8;
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

.likes, .share {
    display: flex;
    align-items: center;
    margin-right: 1rem; /* Space between the like and share sections */
}

.likes i, .share i {
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
.category-content{
    background-color: #e7f3ff;
}

.category-star{
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

.clear-btn{
    border-radius: 9px;
    padding-left: 3%;
    padding-right: 3%;
    background-color: transparent!important;
    border-color: #e7f4fd!important;
    color: rgba(0, 0, 0, .7)!important;
}

.outline-btn{
    border-radius: 9px;
    padding-left: 3%;
    padding-right: 3%;
    background-color: transparent!important;
    border-color: #e7f4fd!important;
    color: rgba(0, 0, 0, .7)!important;
}

.menu-list a {
    border-radius: 9px;
    border-width: 1px;
    border: 1px solid transparent;
    background-color: transparent;
    border-color: #e7f4fd !important;
    color: rgba(0, 0, 0, .7);
    padding: 0.7em .75em;
}

.menu-list a:hover {
    background-color: #f5f5f5;
    color: #363636;
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
    .media-right{
        display: none!important;
    }

    .category-tag {
        padding: 0.8rem;
        max-width: 100%;
        border-radius: 11px;
    }

    .review-btn{
        display: inline-flex!important;
        width: 100%;
    }
  }



</style>

