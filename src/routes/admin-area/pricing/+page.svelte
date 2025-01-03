<script lang="ts">
	let isMonthly = true;

	const togglePlan = (plan: string) => {
		isMonthly = plan === 'monthly';
	};
</script>

<div class="analytics-header">
	<div class="header-top">
		<h1>Hi, Alex</h1>
	</div>
	<hr class="divider" />
	<div class="heading">Choose a Plan</div>

	<!-- Toggle -->
	<div class="toggle-container">
		<div class="toggle-wrapper">
			<div class="toggle">
				<button
					class={`toggle-button ${isMonthly ? 'active' : ''}`}
					on:click={() => togglePlan('monthly')}
				>
					Monthly
				</button>
				<button
					class={`toggle-button ${!isMonthly ? 'active' : ''}`}
					on:click={() => togglePlan('annually')}
				>
					Annually
				</button>
			</div>
		</div>
		<div class="muted-text">Save 55%</div>
	</div>

	{#if isMonthly}
		<div id="monthly-plans" class="flex">
			<!-- Monthly plan cards here -->

			<!-- Cards -->
			<div class="columns is-centered">
				<!-- Free Plan -->
				<div class="column is-4">
					<div class="card">
						<div class="card-content">
							<div class="package-name">Free</div>
							<div class="price">$0<span>/m</span></div>
							<!-- <div class="description">Let's open up more opportunities for your business</div> -->
							<button class="button active">Your current plan</button>
							<div class="icons">
								
								<div class="icon-item">
									<span class="icon"><i class="far fa-star"></i></span>
									<strong>Reviews</strong>
									<div class="info">Up to 5 review responses/month.</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="fa fa-chart-bar"></i></span>
									<strong>Reviews management</strong>
									<div class="info">Basic analytics.</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="far fa-bell"></i></span>
									<strong>Notifications</strong>
									<div class="info">
										Basic notifications
									</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="fa fa-paint-brush"></i></span>
									<strong>Custom Branding</strong>
									<div class="info">Limited.</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="column is-4">
				<div class="recommended">
					<div class="h2">Recommended</div>

					<!-- Basic Plan -->
					
						<div class="card">
							<!-- <div class="recommended-badge">Recommended</div> -->
							<div class="card-content">
								<div class="package-name">Basic</div>
								<div class="price">$15<span>/m</span></div>
								<!-- <div class="description">Let's open up more opportunities for your business</div> -->
								<button class="button">Get Basic</button>
								<div class="icons">
									
									<div class="icon-item">
										<span class="icon"><i class="far fa-star"></i></span>
										<strong>Reviews</strong>
										<div class="info">Up to 10 review responses/month.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fa fa-chart-bar"></i></span>
										<strong>Reviews management</strong>
										<div class="info">Advanced analytics and insights.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="far fa-bell"></i></span>
										<strong>Notifications</strong>
										<div class="info">
											Basic notifications.
										</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fa fa-paint-brush"></i></span>
										<strong>Custom Branding</strong>
										<div class="info">Basic.</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- Premium Plan -->
				<div class="column is-4">
					<div class="card">
						<div class="card-content">
							<div class="package-name">Premium</div>
							<div class="price">$40<span>/m</span></div>
							<!-- <div class="description">Let's open up more opportunities for your business</div> -->
							<button class="button">Get Premium</button>
							<div class="icons">
								
								<div class="icon-item">
									<span class="icon"><i class="far fa-star"></i></span>
									<strong>Reviews</strong>
									<div class="info">Unlimited review responses</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="fa fa-chart-bar"></i></span>
									<strong>Review management</strong>
									<div class="info">Advanced analytics, custom reports, and trend forecasting.</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="far fa-bell"></i></span>
									<strong>Notifications</strong>
									<div class="info">
										Priority notifications and alerts.
									</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="fa fa-paint-brush"></i></span>
									<strong>Custom Branding</strong>
									<div class="info">Advanced.</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div id="annual-plans" class="flex">
			<!-- Annual plan cards here -->

			<div class="columns is-centered">
				<!-- Free Plan -->
				<div class="column is-4">
					<div class="card">
						<div class="card-content">
							<div class="package-name">Free</div>
							<div class="price">$0<span>/m</span></div>
							<!-- <div class="description">Let's open up more opportunities for your business</div> -->
							<button class="button active">Your current plan</button>
							<div class="icons">
								
								<div class="icon-item">
									<span class="icon"><i class="far fa-star"></i></span>
									<strong>Reviews</strong>
									<div class="info">Up to 5 review responses/month.</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="fa fa-chart-bar"></i></span>
									<strong>Reviews management</strong>
									<div class="info">Basic analytics.</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="far fa-bell"></i></span>
									<strong>Notifications</strong>
									<div class="info">
										Basic notifications
									</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="fa fa-paint-brush"></i></span>
									<strong>Custom Branding</strong>
									<div class="info">Limited.</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="column is-4">
				<div class="recommended">
					<div class="h2">Recommended</div>

					<!-- Basic Plan -->
					
						<div class="card">
							<!-- <div class="recommended-badge">Recommended</div> -->
							<div class="card-content">
								<div class="package-name">Basic</div>
								<div class="price">$149<span>/m</span></div>
								<!-- <div class="description">Let's open up more opportunities for your business</div> -->
								<button class="button">Get Basic</button>
								<div class="icons">
									
									<div class="icon-item">
										<span class="icon"><i class="far fa-star"></i></span>
										<strong>Reviews</strong>
										<div class="info">Up to 10 review responses/month.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fa fa-chart-bar"></i></span>
										<strong>Reviews management</strong>
										<div class="info">Advanced analytics and insights.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="far fa-bell"></i></span>
										<strong>Notifications</strong>
										<div class="info">
											Basic notifications.
										</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fa fa-paint-brush"></i></span>
										<strong>Custom Branding</strong>
										<div class="info">Basic.</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- Premium Plan -->
				<div class="column is-4">
					<div class="card">
						<div class="card-content">
							<div class="package-name">Premium</div>
							<div class="price">$160<span>/m</span></div>
							<!-- <div class="description">Let's open up more opportunities for your business</div> -->
							<button class="button">Get Premium</button>
							<div class="icons">
								
								<div class="icon-item">
									<span class="icon"><i class="far fa-star"></i></span>
									<strong>Reviews</strong>
									<div class="info">Unlimited review responses</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="fa fa-chart-bar"></i></span>
									<strong>Review management</strong>
									<div class="info">Advanced analytics, custom reports, and trend forecasting.</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="far fa-bell"></i></span>
									<strong>Notifications</strong>
									<div class="info">
										Priority notifications and alerts.
									</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="fa fa-paint-brush"></i></span>
									<strong>Custom Branding</strong>
									<div class="info">Advanced.</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	
	.analytics-header {
		padding: 20px;
		/* background-color: #f4faff; */
	}

	.header-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.analytics-header h1 {
		font-size: 2rem;
		font-weight: bold;
		color: #333;
		margin: 0;
	}
	.divider {
		border: none;
		height: 1px;
		background-color: #dfe6ed;
		margin: 20px 0;
	}
	.heading {
		font-size: 36px;
		font-weight: 700;
		text-align: center;
		margin-bottom: 15px;
		color: #000
	}

	.toggle-wrapper {
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
		margin: auto;
	}

	.toggle {
		background-color: #e7f3fe; /* Matches the background color */
		border: 2px solid #000; /* Black border */
		border-radius: 25px;
		display: flex;
		align-items: center; /* Centers the button vertically inside the border */
		justify-content: space-between; /* Spreads the toggle buttons evenly */
		width: 250px;
		height: 35px; /* Slightly increased height for better spacing */
		position: relative;
		cursor: pointer;
		box-sizing: border-box; /* Includes padding and border in total dimensions */
	}

	.toggle-button {
		flex: 1;
		background-color: transparent;
		text-align: center;
		line-height: 30px; /* Vertically centers the text */
		font-size: 0.9rem;
		color: #000; /* Black text */
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
		border-radius: 25px; 
		padding: 0; /* Removes padding for exact centering */
	}

	.toggle-button.active {
		background-color: #000; /* Black inside the active toggle */
		color: #fff; /* White text for contrast */
		border-radius: 25px; /* Ensures a smooth rounded appearance */
	}

	.toggle-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: fit-content;
		margin: auto;
		padding-bottom: 100px;
	}

	@media print, screen and (min-width: 769px) {
		.column.is-4,
		.column.is-4-tablet {
			flex: none;
			width: 29.333333%;
		}
	}
	/* Muted shaded text */
	.muted-text {
		background-color: #f0f0f0; /* Light gray muted background */
		color: #555; /* Muted text color */
		padding: 0.3rem 0.7rem; /* Smaller padding for a compact look */
		font-size: 0.85rem; /* Slightly smaller font size */
		font-weight: bold;
		border-radius: 3px; /* Subtle rounded edges */
		text-align: center;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Light shadow */
		align-self: center; /* Ensures it's vertically aligned with the toggle */
		margin-bottom: 3px; /* Slight padding from the bottom */
	}
	.info {
		padding-left: 30px;
		padding-bottom: -3px;
		color: #4D4D4D;
		/* letter-spacing: 0px; */
		/* text-align: justify; */
		/* padding: 14px; */
	}
	.card-content {
		padding: 10px;
	}
	button.button.active {
		background-color: #B7B7B7;
	}

	.recommended {
		background-color: #118bf6;
		border-radius: 18px;
		/* height: auto;
		margin-bottom: 177px; */
		color: white;
		margin-top: -54px;
	}
	.card {
		position: relative;
		width: 445px;
		height: 500px;
		border-radius: 18px;
		color: #000;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}
	.card1 {
		position: relative;
		width: 355px;
		height: 625px;
		border-radius: 18px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
		background-color: white;
		color: #000;
		/* margin-top: 53px; */
	}
	.hidden {
		display: none;
	}

	.h2 {
		font-size: 28px;
		text-align: center;
		font-weight: 600;
		margin-top: 10px;
	}

	.package-name {
		text-align: center;
		font-size: 24px;
		font-weight: 600;
		padding: 16px;
	}

	.card:hover {
		transform: scale(1.02);
	}

	.price {
		font-size: 40px;
		font-weight: bold;
		text-align: center;
		/* margin: 10px 0; */
		margin-top: -12px;
		margin-bottom: 11px;
	}
	.description {
		padding-left: 30px;
		text-align: center;
		padding-bottom: 22px;
		color: darkgray;
	}

	.button {
		width: 95%;
		border-radius: 13px;
		padding: 0.6rem 1rem;
		background-color: #3273dc;
		color: white;
		font-size: 16px;
		transition: background-color 0.3s ease;
		margin-left: 10px;

		padding: 12px;
		/* padding-left: 13px; */
		/* align-content: center; */
	}

	.button:hover {
		background-color: #285ba1;
	}

	.icons {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.description {
		padding-left: 30px;
	}

	.icon {
		color: #000000;
	}

	strong {
		font-weight: bold;
	}
</style>
