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
			  <a style="background-color: #8080808C;" href="#" aria-label="pinterest" class="button is-light">
				<span class="icon">
				  <img src="/assets/pinterest.png" alt="Pinterest">
				</span>
			  </a>
			  <a style="background-color: #8080808C; margin-left: 1rem;" href="#" aria-label="instagram" class="button is-light">
				<span class="icon">
				  <img src="/assets/instagram.png" alt="Instagram">
				</span>
			  </a>
			  <a style="background-color: #8080808C; margin-left: 1rem;" href="#" aria-label="facebook" class="button is-light">
				<span class="icon">
				  <img src="/assets/facebook.png" alt="Facebook">
				</span>
			  </a>
			  <a style="background-color: #8080808C; margin-left: 1rem;" href="#" aria-label="linkedin" class="button is-light">
				<span class="icon">
				  <img src="/assets/linkedin.png" alt="LinkedIn">
				</span>
			  </a>
			  <a style="background-color: #8080808C; margin-left: 1rem;" href="#" aria-label="youtube" class="button is-light">
				<span class="icon">
				  <img src="/assets/youtube.png" alt="YouTube">
				</span>
			  </a>
			  <a style="background-color: #8080808C; margin-left: 1rem;" href="#" aria-label="tiktok" class="button is-light">
				<span class="icon">
				  <img src="/assets/tik_tok.png" alt="TikTok">
				</span>
			  </a>
			  <a style="background-color: #8080808C; margin-left: 1rem;" href="#" aria-label="x" class="button is-light">
				<span class="icon">
				  <img src="/assets/x.png" alt="X">
				</span>
			  </a>
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

	@media screen and (max-width: 768px) {
		footer > div > div.is-flex{
			justify-content: center!important;
		}


		.columns.is-one-forth.is-align-items-center.padded-column {
			margin-top: 16px;
			padding: 0px 40px;
			line-height: 2;
			text-align: center;
		}

		.columns.is-two-forth.is-align-items-center.padded-column {
			padding: 0px 42px;
			text-align: center;
			margin-top:30px;
			justify-content: center;
		}

		.title.is-5{
			margin:0;
		}

		.columns.is-one-third.is-flex.is-align-items-flex-start {
			padding-left: 0;
			margin-top: 0;
			margin-right: 0;
			justify-content: center;
		}

		footer{
			padding: 3rem 1.5rem 3rem;
		}
	}


</style>
