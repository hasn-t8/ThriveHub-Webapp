<script>
	let activeTab = 'Profile'; // Default active tab
	const tabs = ['All posts', 'Profile', 'Review', 'About Thrive Hub', 'Privacy'];
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
		{#each Array(6) as _, i} <!-- Render exactly 6 boxes -->
			<div class="card">
				<div class="card-image"></div>
				<div class="card-content">
					<p class="date">Oct 29, 2024</p>
					<h3 class="card-title">Change or remove your profile picture</h3>
					<p class="card-description">
						Here are our guidelines to consider when you choose a profile picture.
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- Pagination -->
<div class="pagination-container has-text-weight-bold">
	<!-- "Go to First" Button -->
	<button
		class="pagination-arrow double-arrow mr-5">
		&lt;&lt;
	</button>
	<!-- Previous Button -->
	<button
		class="pagination-arrow single-arrow mr-4">
		&lt;
	</button>

	<span class="pagination-link">...</span>

	<!-- Interval Page Numbers -->
	<button class="pagination-link">1</button>
	<button class="pagination-link">2</button>
	<button class="pagination-link is-current">3</button>
	<button class="pagination-link">4</button>

	<span class="pagination-link">...</span>
	
	<!-- "Go to Last" Button -->
	<button
		class="pagination-arrow single-arrow ml-4">
		&gt;
	</button>
	<button
		class="pagination-arrow double-arrow ml-5">
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
		text-decoration: underline;
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
		padding: 20px;
	}

	.tabs {
		display: flex;
		justify-content: space-around;
		border-bottom: 1px solid #ddd;
		margin-bottom: 20px;
	}

	.tab {
		padding: 10px 20px;
		font-family: Inter, sans-serif;
		font-size: 16px;
		font-weight: 500;
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
		gap: 24px; /* Adjusted for better spacing */
	}

	.card {
		background: rgba(255, 255, 255, 0); /* Transparent background */
		border-radius: 5px;
		padding: 15px;
	}

	.card-image {
		width: 100%;
		height: 200px;
		background-color: #ffffff;
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
		margin-bottom: 5px;
	}

	.card-title {
		font-family: Inter, sans-serif;
		font-size: 28px;
		font-weight: 700;
		color: #1E1E1E;
		margin: 0 0 10px;
	}

	.card-description {
		font-family: Inter, sans-serif;
		font-size: 14px;
        font-weight: 400;
		color: #4D4D4D;
		line-height: 22px;
	}
</style>
