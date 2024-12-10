<div class="container">
	<div class="columns is-variable is-8">
		<!-- About Section -->
		<div class="column is-one-third">
			<div class="card">
				<div class="category-filter">
					<div class="category-heading">Rating</div>
					<div class="rating-row">
						<div class="card2">
							<span>All</span>
							<div class="rating-box">★</div>
						</div>
						<div class="card2">
							<span>5</span>
							<div class="rating-box">★</div>
						</div>
						<div class="card2">
							<span>4</span>
							<div class="rating-box">★</div>
						</div>
						<div class="card2">
							<span>3</span>
							<div class="rating-box">★</div>
						</div>
						<div class="card2">
							<span>2</span>
							<div class="rating-box">★</div>
						</div>
					</div>
				</div>

				<!-- <div class="tags"> -->
				<div class="category-heading">Category</div>
				<div class="category-row">
					<div class="category-box">Web Hosting Services</div>
					<div class="category-box">VPN Providers</div>
					<div class="category-box">Cloud Storage Providers</div>
					<div class="category-box">E-commerce Platforms</div>
					<div class="category-box">Email Marketing Tools</div>
					<div class="category-box">Security Software Companies</div>
					<div class="category-box">CRM Software</div>
					<div class="category-box">Accounting Software</div>
					<div class="category-box">Graphic Design Software</div>
					<div class="category-box">Video Editing Software</div>
					<div class="category-box">Education & Productivity</div>
					<div class="category-box">Project Management Tools</div>
					<div class="category-box">Customer Service Software</div>
					<div class="category-box">Marketing Automation Software</div>
					<!-- Special Needs Section -->
					<div class="category-filter">
						<div class="category-heading">Special Needs</div>
						<div class="category-row">
							<div class="category-box">Free services</div>
							<div class="category-box">Only with reviews</div>
						</div>
					</div>
				</div>
				<!-- </div> -->

				<button class="filter-button">Show Results</button>
			</div>
		</div>

		<div class="column is-two-third">
			<div class="card1">
				<!-- Right Side -->
				<div class="right-bar">
					<div class="is-flex is-justify-content-space-between is-align-items-center">
						<div>Showing 41,064 tech companies</div>
						<div class="is-flex is-align-items-center">
							<span class="mr-2">Sorting By:</span>
							<div class="dropdown is-right" id="sortingDropdown">
								<div class="dropdown-trigger">
									<button
										class="button custom-dropdown"
										aria-haspopup="true"
										aria-controls="dropdown-menu"
									>
										<span class="dropdown-label">Most Popular</span>
										<span class="icon is-small">
											<i class="fas fa-angle-down" aria-hidden="true"></i>
										</span>
									</button>
								</div>
								<div class="dropdown-menu" id="dropdown-menu" role="menu">
									<div class="dropdown-content">
										<a href="#" class="dropdown-item" data-value="most-popular">Most Popular</a>
										<a href="#" class="dropdown-item" data-value="price-low-high"
											>Price: Low to High</a
										>
										<a href="#" class="dropdown-item" data-value="price-high-low"
											>Price: High to Low</a
										>
										<a href="#" class="dropdown-item" data-value="new-arrivals">New Arrivals</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Company Section -->
			<div class="container">
				<div class="company-section">
					<img src="/assets/image.png" alt="Company" />
					<div class="company-details">
						<div class="level">
							<h2 class="hoststar-title level-left">HostGator</h2>
							<span class="is-align-items-center level-right review-text">
								<a href="/write-review" class="review-text">
									Write a review
									<img
										src="/src/stories/assets/edit.png"
										alt="edit Icon"
										style="width: 19px; height: 19px; margin-left: 10px;"
									/>
								</a>
							</span>
						</div>
						<p class="rating-info">4.9<span class="rating-box">★</span> | 4876 Reviews</p>
						<p>One answer is that Truth pertains to the possibility that an event will occur...</p>
						<span class="tag is-primary">Tech</span>
					</div>
				</div>
			</div>
			<!-- Container for the repeated sections -->
			<div id="company-sections-container" class="container"></div>

			<div class="container">
				<!-- Page Controller (Pagination) -->
				<div class="pagination-container">
					<nav class="pagination" role="navigation" aria-label="pagination">
						<!-- First Page and Previous Arrows -->
						<span class="pagination-arrow double-arrow" id="first-page">&lt;&lt;</span>
						<span class="pagination-arrow single-arrow" id="previous-page">&lt;</span>
						<!-- Page Numbers with Ellipsis -->
						<div class="page-numbers">
							<a class="pagination-link is-current" href="#">1</a>
							<span class="pagination-link">...</span>
							<a class="pagination-link" href="#">5</a>
							<span class="pagination-link">...</span>
							<a class="pagination-link" href="#">10</a>
						</div>

						<!-- Next Arrows -->
						<span class="pagination-arrow single-arrow" id="next-page">></span>
						<span class="pagination-arrow double-arrow" id="last-page"> >></span>
					</nav>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- top campanies -->
<div class="topcategories has-background-text py-5">
	<div class="container">
		<div class="has-background-text has-text-white">
			<!-- Heading with reduced bottom margin -->
			<h2 class="title is-4 mb-2">Top companies in tech category</h2>

			<div class="columns is-variable is-8">
				<!-- Card 1 -->
				<div class="column is-one-third">
					<div class="card">
						<div class="card-content">
							<div class="media">
								<figure class="media-left">
									<img src="/assets/image (1).png" alt="DreamHost" class="image is-96x97" />
								</figure>
								<div class="media-content">
									<h3 class="title is-5">DreamHost</h3>
									<p class="subtitle is-6">
										4.9 <i class="fas fa-star has-text-warning"></i> | 4,876 Reviews
									</p>
								</div>
							</div>
							<div class="content mt-3">
								Our goal is to help you achieve a balanced lifestyle, improve your overall health,
								and enhance your quality of life.
							</div>
							<a href="#" class="has-text-link mt-3">Learn More</a>
						</div>
					</div>
				</div>

				<!-- Card 2 -->
				<div class="column is-one-third">
					<div class="card">
						<div class="card-content">
							<div class="media">
								<figure class="media-left">
									<img src="/assets/image (1).png" alt="DreamHost" class="image is-96x97" />
								</figure>
								<div class="media-content">
									<h3 class="title is-5">DreamHost</h3>
									<p class="subtitle is-6">
										4.9 <i class="fas fa-star has-text-warning"></i> | 4,876 Reviews
									</p>
								</div>
							</div>
							<div class="content mt-3">
								Our goal is to help you achieve a balanced lifestyle, improve your overall health,
								and enhance your quality of life.
							</div>
							<a href="#" class="has-text-link mt-3">Learn More</a>
						</div>
					</div>
				</div>

				<!-- Card 3 -->
				<div class="column is-one-third">
					<div class="card">
						<div class="card-content">
							<div class="media">
								<figure class="media-left">
									<img src="/assets/image (1).png" alt="DreamHost" class="image is-96x97" />
								</figure>
								<div class="media-content">
									<h3 class="title is-5">DreamHost</h3>
									<p class="subtitle is-6">
										4.9 <i class="fas fa-star has-text-warning"></i> | 4,876 Reviews
									</p>
								</div>
							</div>
							<div class="content mt-3">
								Our goal is to help you achieve a balanced lifestyle, improve your overall health,
								and enhance your quality of life.
							</div>
							<a href="#" class="has-text-link mt-3">Learn More</a>
						</div>
					</div>
				</div>
				<!-- Card 4 -->
				<div class="column is-one-third">
					<div class="card">
						<div class="card-content">
							<div class="media">
								<figure class="media-left">
									<img src="/assets/image (1).png" alt="DreamHost" class="image is-96x97" />
								</figure>
								<div class="media-content">
									<h3 class="title is-5">DreamHost</h3>
									<p class="subtitle is-6">
										4.9 <i class="fas fa-star has-text-warning"></i> | 4,876 Reviews
									</p>
								</div>
							</div>
							<div class="content mt-3">
								Our goal is to help you achieve a balanced lifestyle, improve your overall health,
								and enhance your quality of life.
							</div>
							<a href="#" class="has-text-link mt-3">Learn More</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Global Styles */
	body {
		font-family: 'Inter', sans-serif;
		background-color: #e7f3fe;
		height: auto;
	}

	/* Page Header Section */
	.page-header {
		background-color: #1e90ff;
		color: white;
		padding: 50px 20px;
		text-align: center;
	}

	.page-header h1 {
		font-size: 2.5rem;
		font-weight: 700;
	}

	.columns.is-variable > .column {
		padding: 1%;
	}

	p {
		padding-bottom: 10px;
	}

	.company-details .level {
		margin-bottom: 0; /* Remove the bottom margin between the level and the rating-info */
	}
	/* Card Styling */
	.card {
		background: white;
		border-radius: 8px;
		box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
		margin-bottom: 20px;
		padding: 12px;
		margin-top: 15px;
		width: 100%;
	}

	.card1 {
		background: white;
		border-radius: 8px;
		box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
		margin-bottom: 20px;
		padding: 12px;
		margin-bottom: -14px;
		margin-top: 15px;
		width: 100%;
	}

	/* Category Filter Section */
	.category-row {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 12px;
	}

	.category-heading {
		padding: 1px;
		font-weight: bold;
		font-size: 18px;
		padding-top: 10px;
		padding-bottom: 10px;
	}

	.category-box {
		color: #000000;
		padding: 7px;
		border-radius: 6px;
		border: 1px solid #e7f3fe;
		cursor: pointer;
	}

	.category-box:hover {
		background: #e7f3fe;
		border: 1px solid #0078e9;
	}

	.filter-button {
		width: 343px;
		height: 54px;
		padding: 17px 19px;
		border: none;
		border-radius: 16px;
		background: #118bf6;
		color: white;
		font-size: 16px;
		font-weight: 500;
		text-align: center;
		cursor: pointer;
		margin-top: 28px;
	}

	.filter-button:hover {
		background: #0e7cd3;
	}

	/* Company Section */
	.company-section {
		background: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
		margin-top: 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.company-section img {
		width: 216px;
		height: auto;
		padding: 2%;
	}

	h3.hoststar-title {
		font-weight: 600;
	}

	.tag:not(body).is-primary {
		background-color: #e7f3fe;
		color: #000000;
		padding: 15px;
		border-radius: 6px;
	}

	.rating-row {
		display: flex;
		flex-wrap: nowrap; /* Ensure everything stays in one row */
		gap: 10px;
	}

	.card2 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: white;
		border-radius: 8px;
		box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
		padding: 0px 20px;
		min-width: 55px;
		text-align: center;
	}
	.card2:hover {
		background: #e7f3fe;
		border: 1px solid #0078e9;
	}

	.rating-info {
		font-size: 16px;
		color: #949494;
	}
	.rating-box {
		color: gold;
		font-size: 20px;
		margin-left: 4px;
	}

	.review-text {
		font-weight: 600;
		color: #4d4d4d; /* Text color */
	}

	/* Custom Dropdown Styles */
	.custom-dropdown {
		background-color: #f3f3f3; /* Light gray background */
		color: #000; /* Black text */
		font-weight: bold; /* Bold text */
		border: none; /* Remove button border */
	}

	.custom-dropdown:hover {
		background-color: #e0e0e0; /* Slightly darker gray on hover */
	}

	.custom-dropdown .icon i {
		color: #000; /* Black arrow icon */
	}

	.dropdown-menu {
		min-width: 200px;
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
		background-color: blue;
		color: white;
		border-color: blue;
	}

	.pagination-link.disabled {
		pointer-events: none;
		opacity: 0.5;
	}
</style>

