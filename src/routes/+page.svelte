<script>
	import Footer from "./components/Footer.svelte";


	import Navbar from "./components/Navbar.svelte";

</script>

<Navbar /> 

<div class="hero-section">
	<!-- Text Content -->
	<div class="text-content">
		<h1>Discover a company you can rely on with <span style="color: #118BF6;">Thrive Hub</span></h1>
		<p>
			Shop smart. Find a company or service and try their product with an exclusive discount from
			us.
		</p>
		<div class="search-box">
			<span class="icon is-info">
				<i class="fas fa-search"></i>
			</span>
			<input type="text" placeholder="Search company or category" />
		</div>
	</div>

	<!-- Image Content -->
	<div class="image-content">
		<img src="/assets/userhome.png" alt="Person giving thumbs up" />
	</div>
</div>

<div class="container">
	<!-- Title -->
	<div class="has-text-centered">
		<h2 class="title is-4">Category</h2>
	</div>

	<!-- Category Cards -->
	<div class="columns is-centered is-variable is-8">
		<div class="column is-two-thirds">
			<div class="category-card">
				<!-- Icon Column -->
				<div class="category-icon-container">
					<img src="/assets/tech.png" alt="Tech Icon" class="category-icon" />
				</div>
				<!-- Content Column -->
				<div class="category-content">
					<h4 class="category-title">Tech</h4>
					<p class="category-description">Our goal is to help you achieve a balanced lifestyle.</p>
				</div>
			</div>
		</div>
		<div class="column is-one-third">
			<div class="category-card">
				<!-- Icon Column -->
				<div class="category-icon-container">
					<img src="/assets/wellness.png" alt="Wellness Icon" class="category-icon" />
				</div>
				<!-- Content Column -->
				<div class="category-content">
					<h4 class="category-title">Wellness</h4>
					<p class="category-description">Our goal is to help you achieve a balanced lifestyle.</p>
				</div>
			</div>
		</div>
	</div>

	<div class="columns is-centered is-variable is-8">
		<div class="column is-one-third">
			<div class="category-card">
				<!-- Icon Column -->
				<div class="category-icon-container">
					<img src="/assets/finance.png" alt="Finance Icon" class="category-icon" />
				</div>
				<!-- Content Column -->
				<div class="category-content">
					<h4 class="category-title">Finance</h4>
					<p class="category-description">Our goal is to help you achieve a balanced lifestyle.</p>
				</div>
			</div>
		</div>
		<div class="column is-two-thirds">
			<div class="category-card">
				<!-- Icon Column -->
				<div class="category-icon-container">
					<img
						src="/assets/home electronics.png"
						alt="Home Electronics Icon"
						class="category-icon"
					/>
				</div>
				<!-- Content Column -->
				<div class="category-content">
					<h4 class="category-title">Home Electronics</h4>
					<p class="category-description">Our goal is to help you achieve a balanced lifestyle.</p>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="container2">
	<div class="columns">
		<!-- Heading Column -->
		<div class="heading-column">
			<h2>Popular reviews</h2>
		</div>

		<!-- Reviews Column -->
		<div class="reviews-column">
			<!-- Review 1 -->
			<div class="review-card">
				<div class="review-header">
					<img src="/assets/Ellipse 41.png" alt="User" />
					<div class="review-details">
						<div class="reviewer-name">Alice Palmer</div>
						<div class="review-rating">4.9 ⭐</div>
						<div class="review-location">USA</div>
					</div>
				</div>
				<div class="review-content">
					<strong>GoDaddy</strong><br />
					Good service. Been looking for a similar one for a long time.
				</div>
				<div class="review-footer">
					<span>1 day ago</span>
					<span>23 ❤️</span>
				</div>
			</div>

			<!-- Review 2 -->
			<div class="review-card">
				<div class="review-header">
					<img src="/assets/Ellipse_41.png" alt="User" />
					<div class="review-details">
						<div class="reviewer-name">John Doe</div>
						<div class="review-rating">4.5 ⭐</div>
						<div class="review-location">Canada</div>
					</div>
				</div>
				<div class="review-content">
					<strong>Shopify</strong><br />
					Excellent platform for e-commerce businesses.
				</div>
				<div class="review-footer">
					<span>2 days ago</span>
					<span>19 ❤️</span>
				</div>
			</div>
			<!-- Review 1 -->
			<div class="review-card">
				<div class="review-header">
					<img src="/assets/Ellipse_41.png" alt="User" />
					<div class="review-details">
						<div class="reviewer-name">Alice Palmer</div>
						<div class="review-rating">4.9 ⭐</div>
						<div class="review-location">USA</div>
					</div>
				</div>
				<div class="review-content">
					<strong>GoDaddy</strong><br />
					Good service. Been looking for a similar one for a long time.
				</div>
				<div class="review-footer">
					<span>1 day ago</span>
					<span>23 ❤️</span>
				</div>
			</div>

			<!-- Review 2 -->
			<div class="review-card">
				<div class="review-header">
					<img src="/assets/Ellipse_41.png" alt="User" />
					<div class="review-details">
						<div class="reviewer-name">John Doe</div>
						<div class="review-rating">4.5 ⭐</div>
						<div class="review-location">Canada</div>
					</div>
				</div>
				<div class="review-content">
					<strong>Shopify</strong><br />
					Excellent platform for e-commerce businesses.
				</div>
				<div class="review-footer">
					<span>2 days ago</span>
					<span>19 ❤️</span>
				</div>
			</div>

			<!-- Add more reviews as needed -->
		</div>
	</div>
</div>

<div class="container">
	<!-- Heading Column -->
	<div class="heading-column">
		<h2>Do you have a business?</h2>
		<p>Join Thrive Hub to build trust and inspire confidence with authentic customer reviews.</p>
		<a href="#" class="cta-button">Launch as a business</a>
	</div>

	<!-- Reviews Column -->
	<div class="company-column">
		<div class="company-card">
			<img src="/assets/Ellipse_41.png" alt="Reviewer" />
			<p>
				Found my dream job thanks to Your Staffing Firm. Exceptional service and support throughout.
				Highly recommended!
			</p>
			<div class="owner-name">Jan S.</div>
			<div class="owner-role">Global Applications Representative</div>
		</div>
		<div class="company-card large">
			<img src="/assets/Ellipse_41.png" alt="Owner" />
			<p>
				Your staffing firm made launching a business easy. Great experience with personalized
				support throughout the process.
			</p>
			<div class="owner-name">Eric D.</div>
			<div class="owner-role">IT Specialist</div>
		</div>
	</div>
</div>
<div class="container-about">
	<!-- Left Column -->
	<div class="left-column">
		<h2>About us</h2>
		<p>
			Thrive Hub is your go-to app for exploring reviews, leaving feedback, and making purchases
			through affiliate links. Powered by AI, it simplifies review analysis, helping users make
			informed decisions.
		</p>
		<div class="highlight-card">
			Businesses can create accounts, engage with customers, and promote their services—all in one
			place. Thrive Hub makes reviews smarter and connections stronger.
		</div>
	</div>

	<!-- Right Column -->
	<div class="right-column">
		<!-- Info Card 1 -->
		<!--  -->
		<img src="/assets/young-person-intership_1.png" alt="User" />
		<!-- </div> -->

		<!-- Blue Widget 1 -->
		<div class="blue-widget">
			<div class="stat-number">10K+</div>
			<div class="stat-text">Happy users</div>
		</div>

		<!-- Blue Widget 2 -->
		<div class="blue-widget">
			<div class="stat-number">70%</div>
			<div class="stat-text">AI speeds up review analysis</div>
		</div>

		<!-- Info Card 2 -->
		<div class="info-card">
			<img src="/assets/medium-shot-woman-holding-device_1.png" alt="User" />
		</div>
	</div>

	<div class="download-container">
		<!-- Left Text Column -->
		<div class="text-column">
			<p>Join thousands of users discovering trusted reviews!</p>
			<h2>Download the app and sign up today!</h2>
			<div class="download-buttons">
				<img src="/src\stories\assets\appstore.png" alt="App Store" />
				<img src="/src\stories\assets\googleplay.png" alt="Google Play" />
			</div>
		</div>

		<!-- Right Image Column -->
		<div class="image-column">
			<img
				src="/assets/person_holding_a_smartphone_1.png"
				alt="Phone Mockup"
				class="phone-image"
			/>
			<div class="stats-widget">
				<img src="/assets/review_1.png" alt="Stats" />
			</div>
			<div class="chart-widget">
				<img src="/assets/Frame_1000002452_1.png" alt="User Chart" />
			</div>
		</div>
	</div>
</div>
<div class="container-reviews">
	<h2>Reviews about us</h2>
	<div class="review-cards">
		<div class="review-card">
			<div class="review-header">
				<img src="/assets/Ellipse_41.png" alt="User" />
				<div class="review-details">
					<div class="reviewer-name">Alice Palmer</div>
					<div class="review-rating">4.9 ⭐</div>
					<div class="review-location">USA</div>
				</div>
			</div>
			<div class="review-content">
				<strong>GoDaddy</strong><br />
				Good service. Been looking for a similar one for a long time.
			</div>
			<div class="review-footer">
				<span>1 day ago</span>
				<span>23 ❤️</span>
			</div>
		</div>
		<div class="review-card">
			<div class="review-header">
				<img src="/assets/Ellipse_41.png" alt="User" />
				<div class="review-details">
					<div class="reviewer-name">Alice Palmer</div>
					<div class="review-rating">4.9 ⭐</div>
					<div class="review-location">USA</div>
				</div>
			</div>
			<div class="review-content">
				<strong>GoDaddy</strong><br />
				Good service. Been looking for a similar one for a long time.
			</div>
			<div class="review-footer">
				<span>1 day ago</span>
				<span>23 ❤️</span>
			</div>
		</div>
		<div class="review-card">
			<div class="review-header">
				<img src="/assets/Ellipse_41.png" alt="User" />
				<div class="review-details">
					<div class="reviewer-name">Alice Palmer</div>
					<div class="review-rating">4.9 ⭐</div>
					<div class="review-location">USA</div>
				</div>
			</div>
			<div class="review-content">
				<strong>GoDaddy</strong><br />
				Good service. Been looking for a similar one for a long time.
			</div>
			<div class="review-footer">
				<span>1 day ago</span>
				<span>23 ❤️</span>
			</div>
		</div>
	</div>
</div>

<style>
	.hero-section {
		display: flex;
		background-color: #ffffff;
		/* max-width: 1340px; */
		/* margin: 50px auto; */
	}

	.text-content {
		flex: 1;
		padding-top: 94px;
		padding-left: 103px;
		padding-bottom: 95px;
	}

	.text-content h1 {
		font-size: 56px;
		font-weight: bold;
		margin-bottom: 20px;
		color: #1a1a1a;
		letter-spacing: -2px;
		line-height: 120%;
	}

	.text-content p {
		font-size: 18px;
		color: #555;
		margin-bottom: 20px;
		line-height: 1.6;
	}

	.text-content .search-box {
		display: flex;
		align-items: center;
		background-color: #f0f0f0;
		border-radius: 8px;
		padding: 10px;
		margin-top: 20px;
	}

	.text-content .search-box input {
		border: none;
		background: none;
		flex: 1;
		padding: 10px;
		font-size: 16px;
		color: #333;
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

	.image-content {
		/* flex: 1; */
		/* display: flex; */
	}

	.image-content img {
		max-width: 100%;
		height: 530px;
	}
	body {
		font-family: 'Arial', sans-serif;
		margin: 0;
		padding: 0;
		background-color: #e7f3fe;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	.has-text-centered {
		text-align: center;
	}

	.title.is-4 {
		font-size: 36px;
		font-weight: bold;
		color: #333;
		margin-bottom: 30px;
	}

	.columns {
		margin-bottom: 20px;
	}

	.category-card {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 30px;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		background-color: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		width: 100%;
		min-height: 200px;
	}

	.category-card:hover {
		transform: scale(1.03);
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
	}

	.category-icon-container {
		flex: 0 0 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.category-icon {
		width: 60px;
		height: 60px;
	}

	.category-content {
		flex: 1;
		padding-left: 20px;
	}

	.category-title {
		font-size: 20px;
		font-weight: bold;
		color: #333;
		margin-bottom: 10px;
	}

	.category-description {
		font-size: 16px;
		color: #666;
		line-height: 1.5;
	}
	.columns {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 20px;
	}
	.container2 {
		background-color: white;
		padding: 3%;
	}
	.heading-column {
		flex: 1;
		margin-top: 90px;
	}

	.heading-column h2 {
		font-size: 24px;
		font-weight: bold;
		color: #333;
	}

	.reviews-column {
		flex: 2;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 20px;
	}

	.review-card {
		background: white;
		border-radius: 8px;
		box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
		padding: 20px;
	}

	.review-card .review-header {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	.review-card .review-header img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 10px;
	}

	.review-card .review-header .review-details {
		font-size: 14px;
		color: #333;
	}

	.review-card .review-header .review-details .reviewer-name {
		font-weight: bold;
		color: #333;
	}

	.review-card .review-header .review-details .review-rating {
		color: #fbc02d;
	}

	.review-card .review-content {
		font-size: 14px;
		color: #555;
		margin-top: 10px;
	}

	.review-card .review-footer {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
		font-size: 12px;
		color: #777;
	}

	.heading-column {
		flex: 1;
		padding: 20px;
		width: 50%;
	}

	.heading-column h2 {
		font-size: 28px;
		font-weight: bold;
		color: #333;
		margin-bottom: 10px;
	}

	.heading-column p {
		font-size: 16px;
		color: #555;
		margin-bottom: 20px;
	}

	.cta-button {
		display: inline-block;
		background-color: #118bf6;
		color: #fff;
		padding: 10px 20px;
		border-radius: 8px;
		text-decoration: none;
		font-size: 16px;
		font-weight: bold;
		transition: background-color 0.3s;
	}

	.cta-button:hover {
		background-color: #0a6ec1;
	}

	.company-column {
		flex: 1.5;
		display: flex;
		position: relative;
	}

	.company-card {
		background: white;
		border-radius: 10px;
		box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
		padding: 20px;
		text-align: center;
		width: 250px;
		position: absolute;
		z-index: 1;
	}

	.company-card.large {
		width: 300px;
		padding: 25px;
		z-index: 2;
		top: 20px;
	}

	.company-card img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		margin-bottom: 10px;
	}

	.company-card p {
		font-size: 14px;
		color: #555;
		margin: 10px 0;
	}

	.company-card .owner-name {
		font-weight: bold;
		color: #333;
		margin-top: 10px;
	}

	.company-card .owner-role {
		font-size: 12px;
		color: #777;
	}

	.company-card:nth-child(1) {
		left: 639px;
		top: -265px;
	}

	.company-card:nth-child(2) {
		left: 870px;
		top: -307px;
	}
	.container-about {
		margin: 50px auto;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		gap: 20px;
		background-color: white;
		padding: 6%;
	}

	.left-column {
		flex: 1;
		max-width: 50%;
	}

	.left-column h2 {
		font-size: 28px;
		font-weight: bold;
		color: #333;
		margin-bottom: 15px;
	}

	.left-column p {
		font-size: 16px;
		color: #555;
		line-height: 1.6;
		margin-bottom: 20px;
	}

	.left-column .highlight-card {
		background-color: #d9ecff;
		padding: 35px;
		border-radius: 8px;
		font-size: 16px;
		color: #333;
		line-height: 1.5;
	}

	.right-column {
		/* flex: 1.5; */
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
	}

	.info-card {
		width: 100%;
		border-radius: 8px;
		height: 100px;
		object-fit: cover;
		margin-bottom: 106px;
		margin-top: -115px;
	}

	.blue-widget {
		background-color: #118bf6;
		color: white;
		border-radius: 8px;
		padding: 55px;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 50%;
		width: 90%;
	}

	.blue-widget .stat-number {
		font-size: 36px;
		font-weight: bold;
	}

	.blue-widget .stat-text {
		font-size: 16px;
		margin-top: 5px;
	}

	.info-card img {
		width: 83%;
		border-radius: 8px;
	}

	.info-card p {
		font-size: 14px;
		color: #555;
		margin-top: 10px;
	}

	.download-container {
		background-color: #449ceb;
		color: white;
		border-radius: 15px;
		padding: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		/* max-width: 1200px; */
		width: 96%;
		/* margin: 50px auto; */
		position: relative;
		overflow: hidden;
	}
	.text-column {
		flex: 1;
		padding-right: 30px;
	}

	.text-column h2 {
		font-size: 28px;
		font-weight: bold;
		width: 75%;
		margin-bottom: 33px;
	}

	.text-column p {
		font-size: 16px;
		margin-bottom: 20px;
	}

	.download-buttons {
		display: flex;
		gap: 10px;
	}

	.download-buttons img {
		width: 150px;
		cursor: pointer;
	}

	.image-column {
		flex: 1;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.phone-image {
		position: relative;
		z-index: 3;
		/* width: 269px; */
		/* height: auto; */
		right: 12%;
	}
	.stats-widget {
		position: absolute;
		top: 32%;
		left: 320px;

		z-index: 29;
	}
	.chart-widget {
		position: absolute;
		z-index: 29;
		top: 50%;
		left: 320px;
	}
	.chart-widget img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.container-reviews {
		padding: 30px;
	}
	.container-reviews h2 {
		font-size: 36px;
		font-weight: bold;
		color: #333;
		margin-bottom: 20px;
	}

	.review-cards {
		display: flex;
		justify-content: space-between;
		gap: 20px;
	}

	.review-card {
		flex: 1;
		background: white;
		border-radius: 8px;
		box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
		padding: 20px;
	}

	.review-card .review-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	.review-header img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 10px;
	}

	.review-details {
		flex: 1;
	}

	.review-details .reviewer-name {
		font-size: 14px;
		font-weight: bold;
		color: #333;
	}

	.review-details .review-location {
		font-size: 12px;
		color: #777;
	}

	.review-content {
		margin-top: 10px;
		font-size: 14px;
		color: #555;
	}

	.review-footer {
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		color: #777;
	}

	.review-footer span {
		display: flex;
		align-items: center;
	}

	.review-footer span img {
		width: 16px;
		height: 16px;
		margin-right: 5px;
	}
</style>

<Footer />
