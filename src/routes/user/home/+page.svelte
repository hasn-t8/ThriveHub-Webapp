<script>
	import Review from '../../components/reviews/popular-reviews.svelte';
	import ReviewUS from '../../components/reviews/about-us-reviews.svelte';
	import { goto } from '$app/navigation';

	let query = '';

	function searchReviews() {
		// Redirect to a new page with the query as a URL parameter
		if (query.trim() !== '') {
			goto(`/org/search?query=${encodeURIComponent(query)}`);
		}
	}
</script>

<!-- Hero Section -->
<section class="hero">
	<div class="hero-body p-0 m-0 is-flex is-align-items-stretch">
		<div class="columns is-gapless is-vcentered hero-columns">
			<!-- Left Column -->
			<div
				class="column is-half p-6 is-flex is-flex-direction-column is-justify-content-center custom-gap-5"
			>
				<h1 class="title is-size-1 is-size-3-mobile">
					Trustworthy Brands at Your Fingertips with <span
						style="color: #118BF6;">Thrive Hub</span>
				</h1>
				<p
					class="has-text-grey-dark is-size-5 hide-mobile"
					style="font-weight: 600;"
				>
					Skip the guesswork! Explore top-rated companies and services, get
					AI-driven review summaries, and enjoy exclusive discounts.
				</p>

				<div class="search-box">
					<span class="icon is-info">
						<i class="fas fa-search"></i>
					</span>
					<input
						class="input is-rounded"
						type="text"
						bind:value={query}
						placeholder="Search reviews..."
					/>
					<button class="button is-info" on:click={searchReviews}>Search</button>
				</div>
			</div>

			<!-- Right Column (Mobile Search) -->
			<div
				class="column is-half hero-right-column"
				style="background-color: #118cf6;"
			>
				<div class="image-container">
					
					
					<!-- Main Image -->
					<img
						src="/assets/Hoodie.png"
						alt="Person giving thumbs up"
						class="main-image"
					/>

					<!-- Overlayed Icons -->
					<img
						src="/assets/heart-small.png"
						alt="Heart Small"
						class="icon icon-heart-small"
					/>
					<img
						src="/assets/heart-big.png"
						alt="Heart Big"
						class="icon icon-heart-big"
					/>
					<img
						src="/assets/chat-small.png"
						alt="Chat Small"
						class="icon icon-chat-small"
					/>
					<img
						src="/assets/chat-big.png"
						alt="Chat Big"
						class="icon icon-chat-big"
					/>
					<img
						src="/assets/star-big.png"
						alt="Star Big"
						class="icon icon-star-big"
					/>
					<img
						src="/assets/star-small.png"
						alt="Star Small"
						class="icon icon-star-small"
					/>
					<img
						src="/assets/circles.png"
						alt="Circles"
						class="icon icon-circles"
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Explore Section -->
<section class="section category-section">
	<div class="container">
		<h2 class="title is-3 has-text-left">Category</h2>
		<div class="columns is-multiline is-mobile">
			<div class="column is-6-mobile">
				<div class="category-card">
					<div class="category-card-content is-flex is-align-items-center">
						<img src="/assets/tech.png" alt="Tech Icon" class="category-icon" />
						<div class="is-flex is-flex-direction-column">
							<h3 class="title is-5 m-0">Tech</h3>
							<p
								class="hide-mobile"
								style="font-size: 12px; color:#4a4a4a; width:60%"
							>
								Our goal is to help you achieve a balanced lifestyle.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="column is-three-fifths-desktop is-6-mobile">
				<div class="category-card">
					<div class="category-card-content is-flex is-align-items-center">
						<img
							src="/assets/wellness.png"
							alt="Tech Icon"
							class="category-icon"
						/>
						<div class="is-flex is-flex-direction-column">
							<h4 class="title is-5 m-0">Wellness</h4>
							<p
								class="hide-mobile"
								style="font-size: 12px; color:#4a4a4a; width:60%"
							>
								Our goal is to help you achieve a balanced lifestyle.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class="column is-three-fifths-desktop is-6-mobile">
				<div class="category-card">
					<div class="category-card-content is-flex is-align-items-center">
						<img
							src="/assets/finance.png"
							alt="Tech Icon"
							class="category-icon"
						/>
						<div class="is-flex is-flex-direction-column">
							<h4 class="title is-5 m-0">Finance</h4>
							<p
								class="hide-mobile"
								style="font-size: 12px; color:#4a4a4a; width:60%"
							>
								Our goal is to help you achieve a balanced lifestyle.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="column is-6-mobile">
				<div class="category-card">
					<div class="category-card-content is-flex is-align-items-center">
						<img
							src="/assets/electronics.png"
							alt="Tech Icon"
							class="category-icon"
						/>
						<div class="is-flex is-flex-direction-column">
							<h4 class="title is-5 m-0">Home Electronics</h4>
							<p
								class="hide-mobile"
								style="font-size: 12px; color:#4a4a4a; width:60%"
							>
								Our goal is to help you achieve a balanced lifestyle.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<Review />

<!-- Call to Action Section -->
<section class="section cta-section">
	<div class="container">
		<div class="columns is-vcentered">
			<!-- Left Column for Text -->
			<div class="column is-two-fourth cta-right-padding">
				<h3 class="title is-3">Got a business?</h3>
				<p class="text">
					Join Thrive Hub to gain trust and foster confidence through genuine
					customer reviews.
				</p>
				<button class="button is-primary cta-button"  on:click={goto('/business/signup')}>Build your brand</button>
			</div>

			<!-- Right Column for Testimonials -->
			<div class="column testimonials">
				<div class="testimonial-container">
					<!-- Testimonial 1 -->
					<div class="testimonial-box left">
						<figure class="image is-inline-block">
							<img src="/assets/testimonial1.png" alt="Jan S." />
						</figure>
						<p class="quote">
							"Thrive Hub transformed our online presence! The authentic reviews
							boosted our credibility and helped us build trust with new
							clients. It's been a game-changer for our business growth.""
						</p>
						<p class="name">Sarah M.</p>
						<p class="role">Marketing Specialist</p>
					</div>

					<!-- Testimonial 2 -->
					<div class="testimonial-box testimonial-box2 right">
						<figure class="image is-inline-block">
							<img src="/assets/testimonial2.png" alt="Eric D." />
						</figure>
						<p class="quote">
							"Joining Thrive Hub was the best decision I made. The customer
							reviews helped me stand out in a crowded market and attract more
							clients than ever before!"
						</p>
						<p class="name">John R., </p>
						<p class="role">Entrepreneur</p>
					</div>
				</div>
				<!-- <button class="button is-primary cta-button-mobile">Build your brand</button> -->
			</div>
		</div>
	</div>
</section>

<!-- About Us -->
<section class="section about-section">
	<div class="container">
		<div class="columns is-vcentered is-align-items-stretch is-gapless">
			<!-- Left Column for Text -->
			<div class="column is-half is-flex is-flex-direction-column about1">
				<h2 class="title is-3">About us</h2>
				<p>
					Welcome to Thrive Hub—your one-stop platform for honest reviews,
					real-time feedback, and exclusive deals through trusted affiliate
					links. Powered by AI, we make it easier to sift through reviews and
					make confident, informed choices.
				</p>

				<div class="about-box left is-flex-grow-1 is-align-items-center">
					<p>
						For businesses, Thrive Hub is the ultimate tool for connecting,
						engaging, and growing. It builds trust, boosts your brand, and
						promotes your services—all in one powerful platform. We’re here to
						make reviews smarter and connections stronger!
					</p>
				</div>
			</div>
			<div class="column about2">
				<h2 class="title is-3 is-hidden">About Us</h2>
				<div class="columns is-gapless is-flex is-align-items-stretch">
					<!-- Center Column for Images and Stats -->
					<div
						class="column is-half is-full-mobile is-flex is-flex-direction-column"
					>
						<!-- First Image -->
						<div class="column pl-0">
							<figure class="image is-5by4">
								<img
									src="/assets/young-person-intership 1.png"
									alt="Team working together"
								/>
							</figure>
						</div>
						<div class="column pl-0">
							<div
								class="stat-box is-flex-direction-row is-justify-content-space-around"
							>
								<div class="stat-number">70%</div>
								<p class="stat-label">
									<strong style="color:#ffffff!important">AI</strong> speeds up review
									analysis
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

<!-- App Section -->
<section class="section app-section">
	<div class="container">
		<div class="app-box">
			<div
				class="columns is-vcentered is-align-items-stretch is-gapless app-columns"
			>
				<!-- Left Column for Text -->
				<div
					class="column is-three-fifths is-flex is-flex-direction-column is-justify-content-center"
					style="padding-left: 7%!important;"
				>
					<p
						style="margin-bottom:2%; margin-top: 3%; color:white; font-weight: 500!important; font-size:1.1rem;"
					>
						Join thousands of users discovering trusted reviews!
					</p>
					<h2
						class="title is-3"
						style="color:white; max-width: 500px;font-weight:700;"
					>
						Download the app and sign up today!
					</h2>

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
</section>

<ReviewUS />

<style>
	/* Search Bar Styling  Start */
	.input.is-rounded {
		height: 4.2rem;
		border-radius: 15px;
		padding-left: 3rem !important;
		font-size: 1rem;
		background-color: #e7f3ff;
		border-color: transparent;
		box-shadow: unset;
	}

	.control.has-icons-left .icon.is-left {
		position: absolute;
		left: 10px;
		top: 50%;
		transform: translateY(-50%);
	}

	/* ========================================
   Hero Section Page Styling Starts Here
======================================== */
	.hero {
		background-color: #ffffff; /* Left column light background */
		height: 100%;
		padding: 0; /* Remove padding */
		margin: 0; /* Remove margin */
		display: flex; /* Ensure flex layout */
		align-items: stretch; /* Stretch child elements */
	}

	.hero-right-column {
		display: flex;
		flex-direction: column;
		justify-content: flex-end; /* Align the content to the bottom */
		align-items: center; /* Center the content horizontally */
		height: 100%; /* Ensure it occupies the full height of the parent container */
		position: relative;
		padding: 1rem; /* Ensure padding for mobile layout */
	}

	.mobile-search {
		display: none !important; /* Hidden by default */
		position: absolute; /* Position it at the bottom */
		bottom: 1rem; /* Space from the bottom of the column */
		left: 50%; /* Center horizontally */
		transform: translateX(-50%); /* Center alignment fix */
		width: 90%; /* Make it fit within the column */
		z-index: 10; /* Ensure it appears above other content */
		margin: 0; /* Remove default margin */
		margin-bottom: -10% !important;
	}

	.columns.is-gapless > .custom-gap-5 {
		padding: 6rem !important;
		margin: auto;
	}

	.image-container {
		position: relative;
		text-align: center;
		margin: auto;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		height: 100%;
	}
	.main-image {
		z-index: 1;
		padding-top: 12%;
		max-width: 80% !important;
		margin-left: -10%;
	}
	.icon {
		position: absolute;
	}

	.icon-heart-small {
		top: 6%;
		left: 25%;
		height: auto;
		width: 13%;
		z-index: 2;
	}

	.icon-heart-big {
		top: 58%;
		left: 85%;
		height: auto;
		width: 12%;
		z-index: 2;
	}

	.icon-chat-small {
		top: 10%;
		right: 20%;
		height: auto;
		width: 7%;
		z-index: 2;
	}

	.icon-chat-big {
		top: 35%;
		right: 91%;
		height: auto;
		width: 12%;
		z-index: 2;
	}

	.icon-star-big {
		bottom: 54%;
		right: 10%;
		height: auto;
		width: 12%;
		z-index: 2;
	}

	.icon-star-small {
		bottom: 54%;
		right: 69%;
		height: auto;
		width: 9%;
		z-index: 2;
	}

	.icon-circles {
		bottom: 1%;
		right: 3%;
		height: auto;
		width: 89%;
		z-index: 0;
	}

	@media screen and (max-width: 980px) {
		.hero {
			flex-direction: column;
		}
		.hide-mobile {
			display: none !important;
		}

		.columns.is-gapless > .custom-gap-5 {
			padding: 1rem !important;
			text-align: center !important;
		}

		.title.is-size-1.is-size-3-mobile {
			margin: 0 !important;
		}
	}

	@media screen and (max-width: 768px) {
		.hero {
			flex-wrap: wrap;
		}

		.hero-right-column {
			height: auto; /* Allow flexible height on small screens */
		}

		.mobile-search {
			display: flex !important;
		}

		.input.is-rounded {
			background-color: #ffffff;
			border-color: #dbdbdb;
			box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		}

		.main-image {
			z-index: 1;
			padding-top: 0%;
			max-width: 55% !important;
			margin-left: 0%;
		}

		.icon-chat-big {
			top: 29%;
			right: 75%;
			height: auto;
			width: 20%;
			z-index: 2;
		}

		.icon-chat-small {
			top: 3%;
			right: 17%;
			height: auto;
			width: 13%;
			z-index: 2;
		}

		.icon-star-big {
			bottom: 34%;
			right: 10%;
			height: auto;
			width: 15%;
			z-index: 2;
		}

		.icon-heart-small {
			top: 3%;
			left: 22%;
			height: auto;
			width: 15%;
			z-index: 2;
		}

		.icon-heart-big {
			top: 58%;
			left: 50%;
			height: auto;
			width: 12%;
			z-index: 0;
		}

		.icon-star-small {
			bottom: 28%;
			right: 71%;
			height: auto;
			width: 10%;
			z-index: 2;
		}

		.icon-circles {
			bottom: -49%;
			right: 14%;
			height: auto;
			width: 75%;
			z-index: 0;
		}

		.hide-mobile {
			display: none !important;
		}
		.hide-search {
			display: none !important;
		}
		.columns.is-gapless > .custom-gap-5 {
			padding: 1.5rem !important;
			text-align: center !important;
		}

		.title.is-size-1.is-size-3-mobile {
			margin: 0 !important;
		}

		.column.is-half.hero-right-column {
			padding-top: 1% !important;
		}

		.hero-columns {
			display: flex;
			flex-direction: column;
		}
	}

	/* ========================================
   Category Section Page Styling Starts Here
======================================== */
	.category-section {
		background-color: #e7f3ff;
		padding-top: 5% !important;
		padding-bottom: 5% !important;
		z-index: 1;
		position: relative;
	}

	.category-card {
		background-color: #fff;
		border-radius: 8px;
		padding: 4em 2em;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		display: flex;
		align-items: center; /* Align icon and text vertically */
		height: 100%;
	}

	.category-card:hover {
		transform: scale(1.03);
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
		cursor: pointer;
	}

	.category-icon {
		width: 4.7em; /* Adjust the size as needed */
		height: auto;
		margin-right: 15px; /* Space between the icon and the text */
	}

	@media screen and (max-width: 1023px) {
		.category-card-content {
			flex-direction: column !important;
			text-align: center !important;
		}

		.category-card {
			justify-content: center !important;
			padding: 2em 2em;
		}

		.category-icon {
			margin-right: 0px;
			margin-bottom: 15%;
		}
	}

	@media screen and (max-width: 768px) {
		.category-section {
			padding-top: 15% !important;
		}

		.category-card-content {
			flex-direction: column !important;
			text-align: center !important;
		}
		.category-icon {
			margin-right: 0px;
			margin-bottom: 5%;
		}
	}

	/* ========================================
   CTA Section Page Styling Starts Here
======================================== */
	.cta-section {
		background-color: #e7f3ff;
		padding-top: 3%;
		padding-bottom: 5.5%;
	}

	.cta-section p {
		color: #81858e;
		margin-bottom: 1.5rem;
		font-size: 1em;
		max-width: 450px;
	}

	.cta-section .text {
		font-weight: 600;
	}

	.cta-section .button {
		background-color: #118bf6; /* Bulma primary color */
		color: white;
		border-radius: 7px;
		padding: 0.75rem 1rem;
		font-weight: 500;
	}

	/* Testimonial Container Styling */

	.cta-right-padding {
		padding-right: 0;
		margin-top: 4%;
	}

	.testimonials {
		padding: 0rem 0.7rem;
	}

	.testimonial-container {
		position: relative; /* Enable absolute positioning for child elements */
		display: flex;
		justify-content: flex-start;
		align-items: center; /* Align items vertically */
		gap: 0; /* No gap as we position cards manually */
		margin-top: 2rem;
	}

	/* Left Testimonial Box */
	.testimonial-box.left {
		position: relative;
		background: #f5f8fd;
		border-radius: 25px;
		box-shadow: 10px 6px 10px rgba(0, 0, 0, 0.1);
		padding: 1.5rem;
		width: 55%;
		z-index: 2;
		text-align: center;
		/* padding-bottom: 4%; */
	}

	/* Right Testimonial Box (Appears Behind) */
	.testimonial-box.right {
		position: absolute;
		top: 8%;
		left: 53%;
		background: #f5f8fd;
		border-radius: 25px;
		box-shadow: 10px 6px 10px rgba(0, 0, 0, 0.1);
		height: 84%;
		z-index: 1;
		text-align: center;
		opacity: 0.95;
		padding-bottom: 4%;
		padding: 1.5rem;
		width: 47%;
	}

	.testimonial-box .image {
		width: 55%;
		height: auto;
	}

	.testimonial-box2 .image {
		width: 50%;
		height: auto;
	}

	.testimonial-box img,
	.testimonial-box2 img {
		margin-bottom: 0.5rem;
		width: 100%;
		height: auto;
	}

	.testimonial-box .quote,
	.testimonial-box2 .quote {
		font-size: 16px;
		color: #555;
		line-height: 1.4;
		margin-bottom: 1rem;
	}
	.testimonial-box2 .quote {
		font-size: 13px !important;
	}

	.testimonial-box .name,
	.testimonial-box2 .name {
		font-size: 18px;
		font-weight: 700 !important;
		color: #333;
		margin-top: 1rem;
		margin-bottom: 0.1rem;
	}

	.testimonial-box2 .name {
		font-size: 16px !important;
	}

	.testimonial-box .role {
		font-size: 14px;
		color: #afb2b9;
	}

	@media screen and (max-width: 1407px) {
	}

	@media screen and (max-width: 769px) {
		.testimonial-box .image {
			width: 42%;
			height: auto;
		}

		.testimonial-box2 .image {
			width: 45%;
			height: auto;
		}

		.testimonial-container {
			margin-top: 0%;
		}

		.cta-section p {
			margin-bottom: 1rem;
		}

		.testimonial-box .name,
		.testimonial-box2 .name {
			font-size: 15px;
			margin-top: 5%;
			margin-bottom: 0;
		}

		.testimonial-box2 .name {
			font-size: 13px !important;
		}
		.testimonial-box .quote,
		.testimonial-box2 .quote {
			font-size: 12px;
			color: #555;
			line-height: 1.4;
			margin-bottom: 0;
		}

		.testimonial-box2 .quote {
			font-size: 10px !important;
		}

		.testimonial-box.left {
			width: 58%;
			/* padding: 1rem; */
			/* left: -20%; */
		}

		.testimonial-box.right {
			left: 57%;
			width: 43%;
			top: 9%;
			padding: 0.5rem;
		}

		.cta-button {
			display: none !important;
		}
	}

	/* CTA Section Page Styling End */

	/* ========================================
  App Download Section Page Styling Starts Here
======================================== */
	.app-section {
		padding-bottom: 5% !important;
		background-color: #ffffff;
	}

	.app-box {
		background-color: #469dec;
		border-radius: 30px;
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
		width: 70%;
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

		.app-section
			> div
			> div
			> div
			> div.column.is-three-fifths.is-flex.is-flex-direction-column.is-justify-content-center
			> div
			> div:nth-child(1),
		.app-section
			> div
			> div
			> div
			> div.column.is-three-fifths.is-flex.is-flex-direction-column.is-justify-content-center
			> div
			> div:nth-child(2) {
			display: flex;
			justify-content: center;
		}

		.app-section
			> div
			> div
			> div
			> div.column.is-three-fifths.is-flex.is-flex-direction-column.is-justify-content-center {
			padding-right: 5% !important;
			padding-left: 5% !important;
		}

		.app-figure {
			width: 12rem !important;
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
		font-weight: 600;
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
</style>
