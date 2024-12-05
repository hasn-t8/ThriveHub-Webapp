<script lang="ts">
	
</script>

<footer class="footer has-background-white">
	<div class="container">
		<!-- Top Section -->
		<div class="columns is-variable is-8">
			<!-- First Column (Image) -->
			<div class="columns is-one-third is-flex is-align-items-flex-start">
				<figure class="image is-120x30">
					<img src="/assets/logo.png" alt="Logo" />
				</figure>
			</div>

			<!-- Second Column -->
			<div class="columns is-two-forth is-align-items-center padded-column">
				<div>
					<h4 class="title is-5">Benefits</h4>
					<ul>
						<li><a href="/">For Users</a></li>
						<li><a href="/business/business-home">For Business</a></li>
					</ul>
				</div>
			</div>

			<!-- Third Column -->
			<div class="columns is-two-forth is-flex is-align-items-center padded-column">
				<div>
					<h4 class="title is-5">Resources</h4>
					<ul>
						<li><a href="#">About Us</a></li>
						<li><a href="#">Blog</a></li>
					</ul>
				</div>
			</div>

			<!-- Fourth Column -->
			<div class="columns is-one-forth is-align-items-center padded-column">
				<div>
					<div class="title is-5"></div>
					<ul>
						<li><a href="#">Contact Us</a></li>
						<li><a href="#">Help</a></li>
					</ul>
				</div>
			</div>

			<!-- Fifth Column (Empty) -->
			<div class="columns is-one-fifth padded-column"></div>
		</div>

		<!-- Divider -->
		<hr />

		<!-- Bottom Section (Social Icons at Right) -->
		<div class="is-flex is-justify-content-flex-end">
			<div class="social-icons">
				<a href="#" class="fab fa-facebook" aria-label="Facebook"></a>
				<a href="#" class="fab fa-twitter" aria-label="Twitter"></a>
				<a href="#" class="fab fa-instagram" aria-label="Instagram"></a>
				<a href="#" class="fab fa-linkedin" aria-label="LinkedIn"></a>
				<a href="#" class="fab fa-youtube" aria-label="YouTube"></a>
				<a href="#" class="fab fa-pinterest" aria-label="Pinterest"></a>
			</div>
		</div>
	</div>
</footer>

<style>
	.columns.is-one-third.is-flex.is-align-items-flex-start {
		padding-left: 50px;
		margin-top: 9px;
		margin-right: 12%;
	}

	.columns.is-two-forth.is-align-items-center.padded-column {
		padding: 42px;
		color: #4d4d4d;
		font: Inter;
		font-weight: 500;
		font-size: 20px;
		line-height: 2;
	}

	.title.is-5 {
		font-size: 20px;
		color: gray;
		padding-bottom: 12px;
	}

	ul li a {
		color: black;
		font-family: inherit;
		font-weight: 500;
		font-size: 20px;
		text-decoration: none;
	}

	.columns.is-one-forth.is-align-items-center.padded-column {
		margin-top: 16px;
		padding: 40px;
		line-height: 2;
	}

	/* Style for social icons */
	.social-icons {
		display: flex;
		gap: 16px;
		margin-right: 100px;
		/* Adjust the value as needed */
	}

	.social-icons a {
		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 15%;
		background-color: #8080808c;
		color: #ffffff;
		border: 1px solid #ddd;
		transition:
			transform 0.2s ease,
			background-color 0.2s ease;
	}

	.social-icons a:hover {
		transform: scale(1.1);
		background-color: #555;
		color: #fff;
	}
</style>
