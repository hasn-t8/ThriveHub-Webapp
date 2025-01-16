<script>
	import { goto } from '$app/navigation';
	// import { isBusinessOwner, isAdmin } from '$lib/stores/auth';
	import AboutUsReviews from '../../components/reviews/about-us-reviews.svelte';

	let query = '';
	let error = '';
	// Function to handle the search button click
	function searchReviews() {
				// Redirect to a new page with the query as a URL parameter
		goto(`/business/reviews?query=${encodeURIComponent(query)}`);
	}
	// Redirect to signup page
	function redirectToSignup() {
		goto('/business/signup');
	}
</script>

<div class="hero-section">
	<div class="text-content">
		<h1>
			Grow your business and build trust with real customer reviews with
			<span style="color: #118BF6;">Thrive Hub</span>
		</h1>
		<p>Authentic reviews from genuine customers.</p>
		<div class="search-box">
			<span class="icon is-info">
				<i class="fas fa-search"></i>
			</span>
			<input type="text" bind:value={query} placeholder="Search reviews..." />
			<button on:click={searchReviews}>Search</button>
		</div>

		{#if error}
			<p style="color: blue;">
				<span>{error}</span>
				<span
					style="color: blue; cursor: pointer; text-decoration: underline;"
					on:click={() => redirectToSignup()}
				>
					Create your account</span
				>
			</p>
		{/if}
	</div>
</div>

<div class="container-info">
	<div class="has-text-centered mb-5">
		<h2 class="title is-4">Why Trive Hub?</h2>
	</div>

	<div class="columns is-centered">
		<div class="column is-half">
			<div class="box is-flex is-align-items-center mb-4">
				<div class="info-icon mr-4">
					<figure class="image is-84x84">
						<img src="/assets/1.png" alt="Search Icon" />
					</figure>
				</div>
				<div class="info-text">
					<h4 class="title is-6">Find Your Reviews</h4>
					<p>Easily discover what real customers are saying about your business.</p>
				</div>
			</div>

			<div class="box is-flex is-align-items-center mb-4">
				<div class="info-icon mr-4">
					<figure class="image is-84x84">
						<img src="/assets/2.png" alt="Star Icon" />
					</figure>
				</div>
				<div class="info-text">
					<h4 class="title is-6">AI-Driven Insights</h4>
					<p>Our AI analyzes thousands of reviews to provide actionable insights.</p>
				</div>
			</div>
		</div>

		<div class="column is-half">
			<div class="box is-flex is-align-items-center mb-4">
				<div class="info-icon mr-4">
					<figure class="image is-84x84">
						<img src="/assets/3.png" alt="Cogs Icon" />
					</figure>
				</div>
				<div class="info-text">
					<h4 class="title is-6">Build Trust, Boost Your Brand</h4>
					<p>Earn customer loyalty and drive business growth with honest reviews.</p>
				</div>
			</div>

			<div class="box is-flex is-align-items-center mb-4">
				<div class="info-icon mr-4">
					<figure class="image is-84x84">
						<img src="/assets/4.png" alt="Shield Icon" />
					</figure>
				</div>
				<div class="info-text">
					<h4 class="title is-6">Stay Ahead of the Competition</h4>
					<p>Make data-driven decisions to stay ahead of the curve.</p>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- App Section -->
<div class="container">
	<div class="app-box">
		<div class="columns is-vcentered is-align-items-stretch is-gapless app-columns">
			<!-- Left Column for Text -->
			<div
				class="column is-three-fifths is-flex is-flex-direction-column is-justify-content-center"
				style="padding-left: 7%!important;"
			>
				<h2 class="title is-3" style="color:white; padding-right: 15%;">
					Ready to Elevate your business?
				</h2>
				<p
					style="margin-bottom:2%; margin-top: 3%;     width: 70%;color:white; font-weight: 500!important;"
				>
					Download the Thrive Hub app today and unlock the power of genuine reviews!
				</p>
				<p
					style="margin-bottom:2%; margin-top: 3%;     width: 70%;color:white; font-weight: 500!important;"
				>
					Join thousands of businesses transforming their customer experience. Don't miss out—get
					started now!
				</p>
				<div class="columns is-vcentered app-box-1">
					<!-- First Image -->
					<div class="column">
						<figure class="image app-figure">
							<img src="/assets/appstore.png" alt="Apple Store" />
						</figure>
					</div>

					<!-- Second Image -->
					<div class="column">
						<figure class="image app-figure">
							<img src="/assets/googleplay.png" alt="Google Playstore" />
						</figure>
					</div>
				</div>
			</div>

			<div class="column is-flex">
				<figure
					class="image-download is-flex is-align-items-center is-justify-content-center is-align-self-flex-end"
				>
					<img src="/assets/Hand with Phone.png" alt="Illustration" />
				</figure>
			</div>
		</div>
	</div>
</div>

<div>
	<AboutUsReviews />
</div>

<!-- About Us -->
<section class="section about-section">
	<div class="container">
		<div class="columns is-vcentered is-align-items-stretch is-gapless">
			<!-- Left Column for Text -->
			<div class="column is-half is-flex is-flex-direction-column about1">
				<h2 class="title is-3">About Us</h2>
				<p>
					Thrive Hub is your go-to app for exploring reviews, leaving feedback, and making purchases
					through affiliate links. Powered by AI, it simplifies review analysis, helping users make
					informed decisions.
				</p>

				<div class="about-box left is-flex-grow-1 is-align-items-center">
					<p>
						Businesses can create accounts, engage with customers, and promote their services—all in
						one place. Thrive Hub makes reviews smarter and connections stronger.
					</p>
				</div>
			</div>
			<div class="column about2">
				<h2 class="title is-3 is-hidden">About Us</h2>
				<div class="columns is-gapless is-flex is-align-items-stretch">
					<!-- Center Column for Images and Stats -->
					<div class="column is-half is-full-mobile is-flex is-flex-direction-column">
						<!-- First Image -->
						<div class="column pl-0">
							<figure class="image is-5by4">
								<img src="/assets/young-person-intership 1.png" alt="Team working together" />
							</figure>
						</div>
						<div class="column pl-0">
							<div class="stat-box is-flex-direction-row is-justify-content-space-around">
								<div class="stat-number">70%</div>
								<p class="stat-label">
									<strong style="color:#ffffff!important">AI</strong> speeds up review analysis
								</p>
							</div>
						</div>
					</div>

					<!-- Center Column for Images and Stats -->
					<div class="column is-half is-full-mobile">
						<!-- Stat Box -->
						<div class="column pr-0">
							<div class="stat-box has-text-centered">
								<!-- Smiley Icon -->
								<h3 class="stat-value">
									<img
										src="/assets/smiley.png"
										alt="Smiley Icon"
										style="width: 25px; height: auto; margin-right: 10%; margin-left:-50%;"
									/>
									10k+
								</h3>
								<p class="stat-label">Happy Users</p>
							</div>
						</div>

						<!-- First Image -->
						<div class="column pr-0">
							<figure class="image is-5by4">
								<img
									src="/assets/medium-shot-woman-holding-device 1.png"
									alt="Team working together"
								/>
							</figure>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<div class="container">
	<div class="mb-5">
		<h2 class="title is-4">Blog for business</h2>
	</div>

	<div class="columns is-variable is-8 is-centered">
		<div class="column is-7">
			<figure class="image is-16by9">
				<!-- svelte-ignore a11y_img_redundant_alt -->
				<img src="/assets/Image (2).png" alt="Large Blog Image" />
			</figure>
			<h4 class="title is-6">Change or remove your profile picture</h4>
			<p>Here are our guidelines to consider when you choose a profile picture.</p>
		</div>

		<div class="column is-5">
			<div class="box is-flex is-align-items-center mb-4">
				<div class="info-icon mr-3">
					<figure class="image">
						<!-- svelte-ignore a11y_img_redundant_alt -->
						<img src="/assets/Image (3).png" alt="Card Image 1" />
					</figure>
				</div>
				<div>
					<h4 class="title is-6">Change or remove your profile picture</h4>
					<p>Here are our guidelines to consider when you choose a profile picture.</p>
				</div>
			</div>
			<div class="box is-flex is-align-items-center mb-4">
				<div class="info-icon mr-3">
					<figure class="image">
						<!-- svelte-ignore a11y_img_redundant_alt -->
						<img src="/assets/Image (4).png" alt="Card Image 1" />
					</figure>
				</div>
				<div>
					<h4 class="title is-6">Change or remove your profile picture</h4>
					<p>Here are our guidelines to consider when you choose a profile picture.</p>
				</div>
			</div>
			<div class="box is-flex is-align-items-center mb-4">
				<div class="info-icon mr-3">
					<figure class="image">
						<!-- svelte-ignore a11y_img_redundant_alt -->
						<img src="/assets/Image (5).png" alt="Card Image 1" />
					</figure>
				</div>
				<div>
					<h4 class="title is-6">Change or remove your profile picture</h4>
					<p>Here are our guidelines to consider when you choose a profile picture.</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.text-content {
		display: flex;
		flex-direction: column; /* Stack the items vertically */
		align-items: center; /* Center items horizontally */
		justify-content: center; /* Center items vertically */
		text-align: center; /* Center text content */
		/* height: 100vh; */
	}

	.text-content h1 {
		margin: 0 0 1rem; /* Add spacing between items */
		font-size: 2rem;
		width: 80%;
	}

	.text-content p {
		margin: 0 0 1.5rem; /* Add spacing between items */
	}

	.search-box {
		display: flex;
		align-items: center; /* Align search box items horizontally */
		background-color: #f1f1f1;
		padding: 0.5rem;
		border-radius: 5px;
		width: 80%; /* Adjust width as needed */
		max-width: 500px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.search-box .icon {
		margin-right: 0.5rem;
	}

	.search-box input {
		border: none;
		outline: none;
		width: 100%;
		padding: 0.5rem;
		font-size: 1rem;
		background: none;
	}

	.hero-section {
		display: flex;
		background-color: #ffffff;
		background-image: url('/assets/Mask_group.png'); /* Replace with your image path */
		background-size: cover; /* Ensures the image covers the entire section */
		background-position: center; /* Centers the image */
		background-repeat: no-repeat; /* Prevents the image from repeating */
	}
	.columns.is-variable > .column {
		width: 50%;
	}

	.text-content {
		flex: 1;
		padding-top: 94px;
		padding-bottom: 95px;
	}

	.text-content h1 {
		font-size: 56px;
		font-weight: bold;
		margin-bottom: 20px;
		color: #1a1a1a;
		letter-spacing: -2px;
		line-height: 120%;
		text-align: center;
	}

	.text-content p {
		font-size: 18px;
		text-align: center;
		color: #555;
		margin-bottom: 20px;
		line-height: 1.6;
	}

	.text-content .search-box {
		display: flex;
		align-items: center;
		background-color: #f0f0f0;
		border-radius: 50px;
		text-align: center;
		width: 50%;
	}
	.text-content .search-box input {
		border: none;
		background: none;
		flex: 1;
		padding: 10px;
		font-size: 16px;
		color: #98c8df;
	}

	.text-content .search-box input:focus {
		outline: none;
	}

	.text-content .search-box .icon {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		color: #555;
		cursor: pointer;
	}

	.container {
		max-width: 1340px;
		margin: 0 auto;
		padding: 30px;
	}

	.container-info {
		max-width: 80%;
		margin: 0 auto;
		/* padding: 30px; */
		padding-top: 64px;
	}

	.has-text-centered {
		text-align: center;
	}

	.title.is-4 {
		font-size: 36px;
		text-align: justify;
		font-weight: bold;
		color: #333;
		margin-bottom: 30px;
		padding-left: 4%;
	}
	.title.is-6 {
		font-size: 1rem;
		margin-bottom: 8px;
	}
	.columns {
		margin-bottom: 20px;
	}

	.columns {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 20px;
	}

	.box.is-flex.is-align-items-center.mb-4 {
		background-color: transparent;
		box-shadow: none;
	}

	/* ========================================
  About Section Page Styling Starts Here
======================================== */
	.about1 {
		margin-right: 1% !important;
	}

	.about2 {
		margin-left: 1% !important;
	}

	.about-section {
		background: #ffffff;
	}

	.about-section p {
		color: #81858e;
		font-size: 1em;
		width: 90%;
		line-height: 1.5;
	}

	.about-box {
		display: flex;
		background: #e8f5fe;
		border-radius: 10px;
		padding: 2rem;
		padding-top: 3%;
		padding-bottom: 3%;
		margin-bottom: 2%;
		margin-top: 3%;
		text-align: justify;
		color: #555;
	}

	.stat-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		background: #118cf6;
		border-radius: 15px;
		color: #ffffff;
		height: 100%; /* Make the box fill its parent height */
	}
	.stat-number {
		font-size: 36px;
		font-weight: bold;
	}

	.stat-box p,
	.stat-box h3 {
		margin: 0;
		color: #ffffff;
		width: 50%;
	}

	@media (max-width: 768px) {
		.about2 {
			margin-left: 0% !important;
		}
		.about-section {
			padding-bottom: 0%;
		}
		.about-section > div > div > div.column.about2 > h2 {
			margin: 0;
			display: block !important;
		}
		.about-section > div > div > div.column.about2 > div {
			flex-direction: column;
		}
		.about2
			> div
			> div.column.is-half.is-full-mobile.is-flex.is-flex-direction-column
			> div:nth-child(1) {
			padding-right: 0% !important;
		}
		.about2
			> div
			> div.column.is-half.is-full-mobile.is-flex.is-flex-direction-column
			> div:nth-child(2) {
			padding-right: 0% !important;
		}
		.about2 > div > div:nth-child(2) > div:nth-child(1) {
			padding-left: 0% !important;
		}
		.about2 > div > div:nth-child(2) > div:nth-child(2) {
			display: none !important;
			padding-left: 0% !important;
		}
		.section.about-section > div > div {
			display: flex !important;
			flex-direction: column-reverse;
		}
		.is-half.is-flex.is-flex-direction-column.about1 > h2 {
			display: none;
		}
		.is-half.is-flex.is-flex-direction-column.about1 {
			margin-right: 0% !important;
		}
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: bold;
		color: #333;
		width: 70%;
	}

	.stat-label {
		font-size: 1rem;
		color: #555;
	}

	/* About Section Page Styling End */

	/* ========================================
  App Download Section Page Styling Starts Here
======================================== */

	.app-box {
		background-color: #469dec;
		/* border-radius: 30px; */
		padding: 23px;
		padding-top: 70px;
	}

	.app-figure {
		width: 190px !important;
		margin-top: 3% !important;
		margin-bottom: 10%;
	}

	.app-box-1 {
		width: 60%;
	}

	.image-download img {
		border-radius: 15px;
		object-fit: cover;
		width: 80%;
		height: auto;
		margin-top: 8%;
		margin-right: 2%;
	}

	@media (max-width: 768px) {
		.app-columns {
			display: flex;
			flex-direction: column-reverse; /* Stack elements on smaller screens */
		}
		.image-download img {
			margin-right: 0%;
		}

		.app-box-1 {
			width: 100%;
		}

		.app-figure {
			width: 85% !important;
			margin-bottom: 0% !important;
			margin-top: 0% !important;
		}
		.column.is-three-fifths.is-flex.is-flex-direction-column.is-justify-content-center
			> div
			> div:nth-child(2) {
			margin-bottom: 8%;
		}
	}

	/* App Download Section Page Styling End */
</style>
