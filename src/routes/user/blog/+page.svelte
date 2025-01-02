<script>
    import { onMount } from "svelte";

    let activeTab = "All posts"; // Default active tab
    const tabs = ["All posts", "Profile", "Review", "About Thrive Hub", "Privacy"];

    let cards = []; // Array to hold card data fetched from the API
    let currentPage = 1; // Default page
    const cardsPerPage = 6; // Cards to show per page
    let totalPages = 1;

    // Format date function
    function formatDate(dateString) {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // Fetch data from API based on activeTab
    async function fetchCardData() {
        try {
            let apiUrl = `http://localhost:3000/api/posts`;
            if (activeTab !== "All posts") {
                apiUrl += `?filter=${encodeURIComponent(activeTab)}`;
            }
            const response = await fetch(apiUrl); // Replace with actual API URL
            const data = await response.json();
            cards = data;
            totalPages = Math.ceil(cards.length / cardsPerPage);
        } catch (error) {
            console.error("Error fetching card data:", error);
        }
    }

    // Computed function to get visible cards
    $: visibleCards = cards.slice(
        (currentPage - 1) * cardsPerPage,
        currentPage * cardsPerPage
    );

    // Change page function
    function changePage(page) {
        if (page < 1 || page > totalPages) return;
        currentPage = page;
    }

    // Fetch card data on component mount
    onMount(fetchCardData);

    // Watch for changes in activeTab and fetch data
    $: if (activeTab) {
        currentPage = 1; // Reset to first page on tab change
        fetchCardData();
    }
</script>

<section class="category-banner">
    <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li>
                    <a href="/" class="breadcrumb-link">Home</a>
                </li>
                <li class="is-active">
                    <a href="#" aria-current="page" class="breadcrumb-link">Tech Category / Bluehost</a>
                </li>
            </ul>
        </nav>
        <div class="content-center">
            <h1 class="blog-title">Blog</h1>
            <p class="description">
                Stay informed with the latest reviews, tips, and insights to make smarter decisions.
                Our blog provides valuable content to help you navigate the world of products and services.
            </p>
        </div>
    </div>
</section>

<div class="tabs-container">
    <!-- Tabs Navigation -->
    <nav class="tabs">
        {#each tabs as tab}
            <div
                class="tab {activeTab === tab ? 'active' : ''}"
                on:click={() => (activeTab = tab)}
            >
                {tab}
            </div>
        {/each}
    </nav>

    <!-- Grid Layout for Content -->
    <div class="grid">
        {#if visibleCards.length > 0}
            {#each visibleCards as card}
                <div class="card">
                    <div class="card-image">
                        <img src={card.image} alt={card.title} />
                    </div>
                    <div class="card-content">
                        <p class="date">{formatDate(card.created_at)}</p>
                        <h3 class="card-title">{card.title}</h3>
                        <p class="card-description">{card.content}</p>
                    </div>
                </div>
            {/each}
        {:else}
            <p class="no-data">No posts available for the selected tab.</p>
        {/if}
    </div>
</div>

<!-- Pagination -->
<div class="pagination-container has-text-weight-bold">
    <!-- "Go to First" Button -->
    <button
        class="pagination-arrow double-arrow mr-5"
        on:click={() => changePage(1)} >
        &lt;&lt;
    </button>
    <!-- Previous Button -->
    <button
        class="pagination-arrow single-arrow mr-4"
        on:click={() => changePage(currentPage - 1)} >
        &lt;
    </button>

    {#each Array(totalPages) as _, index}
        <button
            class="pagination-link {index + 1 === currentPage ? 'is-current' : ''}"
            on:click={() => changePage(index + 1)} >
            {index + 1}
        </button>
    {/each}

    <!-- Next Button -->
    <button
        class="pagination-arrow single-arrow ml-4"
        on:click={() => changePage(currentPage + 1)} >
        &gt;
    </button>
    <!-- "Go to Last" Button -->
    <button
        class="pagination-arrow double-arrow ml-5"
        on:click={() => changePage(totalPages)} >
        &gt;&gt;
    </button>
</div>

<style>
    
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

    /* General Banner Styles */
	.category-banner {
		background-color: #2196f3;
		color: white;
		padding: 20px;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	/* Breadcrumb Styles */
	.breadcrumb {
		display: flex;
		align-items: center;
		margin: 10px 0;
	}

	.breadcrumb ul {
		list-style: none;
		padding: 0;
		display: flex;
		gap: 5px;
	}

	.breadcrumb li {
		color: white;
	}

	.breadcrumb-link {
		font-family: Inter, sans-serif;
		font-size: 16px;
		font-weight: 500;
		line-height: 25px;
		letter-spacing: 0.38px;
		text-align: left;
		text-decoration: none;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: white;
	}

	.breadcrumb li.is-active .breadcrumb-link {
		color: #ffff;
	}

	/* Centered Content Styles */
	.content-center {
		text-align: center;
		margin-top: 20px;
	}

	.blog-title {
		/* Blog title styling */
		font-family: Inter, sans-serif;
		font-size: 40px;
		font-weight: 700;
		line-height: 48px;
		letter-spacing: 0.41px;
		text-align: center;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		margin: 0 0 10px 0;
	}

	.description {
		/* Description styling */
		font-family: Inter, sans-serif;
		font-size: 16px;
		font-weight: 400;
		line-height: 22px;
		letter-spacing: -0.41px;
		text-align: center;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		max-width: 800px;
		margin: 0 auto;
	}



	/* Tabs Styles */
	.tabs-container {
        
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
        padding: 80px 20px 20px 20px;
        justify-items: center;
	}

	.tabs {
        width: 896px;
        height: 38px;
		display: flex;
		border-bottom: 3px solid #000;
		margin-bottom: 20px;
	}

	.tab {
		padding: 10px 20px;
		font-family: Inter, sans-serif;
		font-size: 14px;
		font-weight: 600;
		color: #000;
		cursor: pointer;
	}

	.tab.active {
		color: white;
		background-color: #2196f3;
		border-radius: 5px;
	}

	/* Grid Styles */
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr); /* 3 boxes per row */
		gap: 24px; 
       
	}

	.card {
		background: rgba(255, 255, 255, 0); /* Transparent background */
		border-radius: 5px;
		/* padding: 15px; */
        
	}

	.card-image {
		width: 100%;
		height: 200px;
		background-color: #ffffff;
		border-radius: 5px;
        overflow: hidden; 
    }
  

    .card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
    }

	.card-content {
		margin-top: 10px;
		text-align: left;
	}

	.date {
		font-family: Inter, sans-serif;
		font-size: 14px;
		color: #757575;
		/* margin-bottom: 5px; */
	}

	.card-title {
		font-family: Inter, sans-serif;
		font-size: 28px;
		font-weight: 700;
		color: #1E1E1E;
		/* margin: 0 0 10px; */
        letter-spacing: 0.38px;
	}

	.card-description {
		font-family: Inter, sans-serif;
		font-size: 14px;
        font-weight: 400;
		color: #4D4D4D;
		line-height: 22px;
	}
</style>
