<script lang="ts">
	import { onMount } from 'svelte';
	import Sidemenu from '../components/Sidemenu.svelte';
	import { writable, derived, type Writable } from 'svelte/store';
	import type { SubscriptionData } from '$lib/types/Subscriptions';
	import Spinner from '$lib/components/Spinner.svelte';
	import { getMySubscriptions, createSubscription } from '$lib/stores/subscription/subs';
	import { addToast } from '$lib/stores/toasts';
	import Faqs from './faqs.svelte';
	// import Reviews from './reviews_comp.svelte';

	// States
	let isMonthly: Writable<boolean> = writable(); // Tracks whether the selected plan is monthly
	let mySubs: Writable<SubscriptionData[]> = writable([]); // Store for subscription data
	let error: string | null = null;
	let loading: Writable<boolean> = writable();
	let activeSub: Writable<string> = writable('free');

	// Derived store for filtered subscriptions
	const filteredSubs = () => {
		console.log('Filtering subscriptions...');

		return $mySubs.filter((sub) => {
			if (!sub.plan) {
				return;
			}
			$isMonthly = sub.plan.startsWith('YEARLY') ? false : true;
			console.log('isMonthly:', $isMonthly);

			if (
				sub.plan.endsWith('basic') &&
				$activeSub !== 'monthly-premium' &&
				$activeSub !== 'yearly-premium'
			) {
				$activeSub = $isMonthly ? 'monthly-basic' : 'yearly-basic';
			} else if (sub.plan.endsWith('Premium') && $activeSub !== 'yearly-premium') {
				$activeSub = $isMonthly ? 'monthly-premium' : 'yearly-premium';
			}
			// console.log('Active sub:', $activeSub);
			// console.log('sub.plan:', sub.plan);
		});
	};

	// Toggle between monthly and yearly plans
	const togglePlan = (plan: string) => {
		$isMonthly = plan === 'monthly';
	};

	const isActive = (type: string) => {
		console.log('Checking active:', type, $activeSub);

		return type === $activeSub ? 'active' : '';
	};

	// Fetch user subscriptions
	const fetchMySubscriptions = async () => {
		$loading = true;
		error = null; // Clear previous errors

		try {
			const subscriptions = await getMySubscriptions();
			if (Array.isArray(subscriptions)) {
				mySubs.set(subscriptions);
				filteredSubs();
			} else {
				error = 'Invalid subscription data.';
				console.error(error, subscriptions);
			}
		} catch (err) {
			error = 'Error fetching subscriptions.';
			console.error(error, err);
			$loading = false;
		} finally {
			$loading = false;
		}
	};

	const switchPlan = async (plan: string) => {
		$loading = true;
		await createSubscription(plan);
		await waitForTenSeconds(2000);
		await fetchMySubscriptions();
		$loading = false;
	};

	const waitForTenSeconds = (time: number) => {
		loading.set(true);
		return new Promise((resolve) => {
			setTimeout(() => {
				loading.set(false);
				// resolve('Done! !!!!!!!!!!!!!!!!!');
				$loading = false;
			}, time);
		});
	};
	let result = null;

	onMount(async () => {
		loading.set(true);
		await fetchMySubscriptions();
		await filteredSubs();
		loading.set(false);
		// addToast('Subscriptions loaded successfully.', 'is-warning');
	});
</script>

<Sidemenu />
<div class="main-content" style="height: 100vh;">
	{#if $loading}
		<Spinner />
	{/if}
	{#if error}
		{error}
	{/if}

	<div class="analytics-header">
		<!-- <div class="header-top">
		<h1>Hi, Alex</h1>
	</div> -->
		<hr class="divider" />
		<div class="heading">Choose a Plan</div>

		<!-- Toggle -->
		<div class="toggle-container">
			<div class="toggle-wrapper">
				<div class="toggle">
					<button
						class={`toggle-button ${$isMonthly ? 'active' : ''}`}
						on:click={() => togglePlan('monthly')}
					>
						Monthly
					</button>
					<button
						class={`toggle-button ${!$isMonthly ? 'active' : ''}`}
						on:click={() => togglePlan('annually')}
					>
						Annually
					</button>
				</div>
			</div>
			<div class="muted-text">Save 55%</div>
		</div>

		<!-- ------------------Plans Monthly ------------------ -->
		{#if $isMonthly}
			<div id="monthly-plans" class="flex plans">
				<!-- Monthly plan cards here -->

				<!-- Cards -->
				<div class="columns is-centered">
					<!-- Free Plan -->
					<div class="column is-4">
						<div class="card">
							<div class="card-content">
								<div class="package-name">Free</div>
								<div class="price">$0<span>/m</span></div>
								{#if isActive('free') === 'active'}
									<button class="button active">Your current plan</button>
								{:else}
									<button class="button" on:click={async () => await switchPlan('free')}
										>Get Free</button
									>
								{/if}
								<div class="icons">
									<div class="icon-item">
										<span class="icon"><i class="fas fa-eye"></i></span>
										<strong>Views</strong>
										<div class="info">Unlimited access to view all reviews about your company.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fas fa-star"></i></span>
										<strong>Reviews</strong>
										<div class="info">Ability to respond to 5 reviews per month.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fas fa-bell"></i></span>
										<strong>Notifications</strong>
										<div class="info">
											Receive notifications about new reviews and mentions of the company.
										</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fas fa-chart-line"></i></span>
										<strong>Analytics</strong>
										<div class="info">Access basic analytics about reviews.</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="column is-4">
						<!-- <div class="recommended">
							<div class="h2">Recommended</div> -->

						<!-- Basic Plan -->

						<div class="card">
							<div class="card-content">
								<div class="package-name">Basic</div>
								<div class="price">$15<span>/m</span></div>
								{#if isActive('monthly-basic') === 'active'}
									<button class="button active">Your current plan</button>
								{:else}
									<button class="button" on:click={async () => await switchPlan('basic_monthly')}
										>Get Basic</button
									>
								{/if}
								<div class="icons">
									<div class="icon-item">
										<span class="icon"><i class="fas fa-eye"></i></span>
										<strong>Views</strong>
										<div class="info">Unlimited access to view all reviews about your company.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fas fa-star"></i></span>
										<strong>Reviews</strong>
										<div class="info">Ability to respond to 20 reviews per month.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fas fa-bell"></i></span>
										<strong>Notifications</strong>
										<div class="info">
											Receive notifications about new reviews and mentions of the company.
										</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fas fa-chart-line"></i></span>
										<strong>Analytics</strong>
										<div class="info">Access detailed analytics about reviews.</div>
									</div>
								</div>
							</div>
						</div>
						<!-- </div> -->
					</div>
					<!-- Premium Plan -->
					<div class="column is-4">
						<div class="card">
							<div class="card-content">
								<div class="package-name">Premium</div>
								<div class="price">$40<span>/m</span></div>
								{#if isActive('monthly-premium') === 'active'}
									<button class="button active">Your current plan</button>
								{:else}
									<button class="button" on:click={async () => await switchPlan('premium_monthly')}
										>Get Premium</button
									>
								{/if}
								<div class="icons">
									<div class="icon-item">
										<span class="icon"><i class="fas fa-eye"></i></span>
										<strong>Views</strong>
										<div class="info">Unlimited access to view all reviews about your company.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fas fa-star"></i></span>
										<strong>Reviews</strong>
										<div class="info">Unlimited responses to reviews.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fas fa-bell"></i></span>
										<strong>Notifications</strong>
										<div class="info">
											Receive notifications about new reviews and mentions of the company.
										</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fas fa-chart-line"></i></span>
										<strong>Analytics</strong>
										<div class="info">Access advanced analytics and insights about reviews.</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<!-- ------------------Plans Yearly ------------------ -->
			<div id="annual-plans" class="flex plans">
				<!-- Annual plan cards here -->

				<div class="columns is-centered">
					<!-- Free Plan -->
					<div class="column is-4">
						<div class="card">
							<div class="card-content">
								<div class="package-name">Free</div>
								<div class="price">$0<span>/m</span></div>
								{#if isActive('free') === 'active'}
									<button class="button active">Your current plan1</button>
								{:else}
									<button class="button" on:click={async () => await switchPlan('free')}
										>Get Free</button
									>
								{/if}
								<div class="icons">
									<div class="icon-item">
										<span class="icon"><i class="fas fa-eye"></i></span>
										<strong>Views</strong>
										<div class="info">Unlimited access to view all reviews about your company.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fas fa-star"></i></span>
										<strong>Reviews</strong>
										<div class="info">Ability to respond to 5 reviews per month.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fas fa-bell"></i></span>
										<strong>Notifications</strong>
										<div class="info">
											Receive notifications about new reviews and mentions of the company.
										</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fas fa-chart-line"></i></span>
										<strong>Analytics</strong>
										<div class="info">Access basic analytics about reviews.</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="column is-4">
						<!-- <div class="recommended">
							<div class="h2">Recommended</div> -->

						<!-- Basic Plan -->

						<div class="card">
							<div class="card-content">
								<div class="package-name">Basic</div>
								<div class="price">$149<span>/m</span></div>
								{#if isActive('yearly-basic') === 'active'}
									<button class="button active">Your current plan</button>
								{:else}
									<button class="button" on:click={async () => await switchPlan('basic_yearly')}
										>Get Basic</button
									>
								{/if}
								<div class="icons">
									<div class="icon-item">
										<span class="icon"><i class="fas fa-eye"></i></span>
										<strong>Views</strong>
										<div class="info">Unlimited access to view all reviews about your company.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fas fa-star"></i></span>
										<strong>Reviews</strong>
										<div class="info">Ability to respond to 20 reviews per month.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fas fa-bell"></i></span>
										<strong>Notifications</strong>
										<div class="info">
											Receive notifications about new reviews and mentions of the company.
										</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fas fa-chart-line"></i></span>
										<strong>Analytics</strong>
										<div class="info">Access detailed analytics about reviews.</div>
									</div>
								</div>
							</div>
						</div>
						<!-- </div> -->
					</div>
					<!-- Premium Plan -->
					<div class="column is-4">
						<div class="card">
							<div class="card-content">
								<div class="package-name">Premium</div>
								<div class="price">$160<span>/m</span></div>
								{#if isActive('yearly-premium') === 'active'}
									<button class="button active">Your current plan</button>
								{:else}
									<button class="button" on:click={() => switchPlan('premium_yearly')}
										>Get Premium</button
									>
								{/if}
								<div class="icons">
									<div class="icon-item">
										<span class="icon"><i class="fas fa-eye"></i></span>
										<strong>Views</strong>
										<div class="info">Unlimited access to view all reviews about your company.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fas fa-star"></i></span>
										<strong>Reviews</strong>
										<div class="info">Unlimited responses to reviews.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fas fa-bell"></i></span>
										<strong>Notifications</strong>
										<div class="info">
											Receive notifications about new reviews and mentions of the company.
										</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fas fa-chart-line"></i></span>
										<strong>Analytics</strong>
										<div class="info">Access advanced analytics and insights about reviews.</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<div class="custom-container">
		<h2 class="custom-heading">Need More? Let's Talk Custom</h2>
		<p class="custom-subheading">
			If you have specific needs that aren't met by our standard plans, we offer <b
				>custom solutions</b
			>
			to help you achieve your business goals.
			<br /><br />
			<b>Here's how it works</b>
		</p>
		<div class="custom-boxes">
			<div class="custom-box">
				<div class="icon">
					<img src="/assets/p1.png" alt="Share Your Vision Icon" />
				</div>
				<h3 class="box-title">Share Your Vision</h3>
				<p class="box-description">Tell us about your unique requirements and challenges.</p>
			</div>
			<div class="custom-box">
				<div class="icon">
					<img src="/assets/p2.png" alt="Collaborate with Our Experts Icon" />
				</div>
				<h3 class="box-title">Collaborate with Our Experts</h3>
				<p class="box-description">
					Our team will work closely with you to understand your needs and propose tailored
					solutions.
				</p>
			</div>
			<div class="custom-box">
				<div class="icon">
					<img src="/assets/p3.png" alt="Get a Personalized Quote Icon" />
				</div>
				<h3 class="box-title">Get a Personalized Quote</h3>
				<p class="box-description">
					We'll provide you with a customized quote based on your specific requirements.
				</p>
			</div>
			<div class="custom-box">
				<div class="icon">
					<img src="/assets/p4.png" alt="Contact Sales Team Icon" />
				</div>
				<h3 class="box-title">Ready to discuss your custom needs?</h3>
				<p class="box-description">Contact our sales team today.</p>
			</div>
		</div>
	</div>

	<Faqs />

	<!-- <Reviews /> -->
</div>

<style>
	.main-content {
		margin-left: 200px;
	}
	.plans {
		margin-bottom: 10px;
	}
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
		color: #000;
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
		padding-bottom: 10px;
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
		color: #4d4d4d;
		/* letter-spacing: 0px; */
		/* text-align: justify; */
		/* padding: 14px; */
	}
	.card-content {
		padding: 10px;
	}
	button.button.active {
		background-color: #b7b7b7;
		/* background-color: black; */
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
		height: 100%;
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

	:root {
		--Dark-Gray: #272727;
		--White: #ffffff;
		--Font-Family: 'Inter', sans-serif;
	}

	.custom-container {
		width: 100%;
		height: 657px;
		color: #272727;
		background-color: var(--White);
		margin: 0 auto;
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.custom-heading {
		font-family: var(--Font-Family);
		font-size: 36px;
		font-weight: 700;
		line-height: 43.2px;
		text-align: center;
		margin-bottom: 20px;
		color: #272727;
	}

	.custom-subheading {
		font-family: var(--Font-Family);
		font-size: 24px;
		font-weight: 400;
		line-height: 28.8px;
		text-align: center;
		color: var(--Dark-Gray);
		margin-bottom: 40px;
		padding: 0 70px;
	}

	.custom-boxes {
		display: flex;
		gap: 10px;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap; /* Adjust layout for smaller screens */
	}

	.custom-box {
		width: 282px;
		height: 247px;
		padding: 40px;
		background-color: var(--White);
		box-shadow: 0px 2px 12px 0px rgba(20, 20, 43, 0.08);
		border-radius: 10px;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		text-align: center;
	}

	.icon img {
		width: 48px; /* Adjust icon size */
		height: 48px;
		object-fit: contain;
	}

	.box-title {
		font-family: var(--Font-Family);
		font-size: 18px;
		font-weight: 600;
		/* line-height: 24px; */
		color: var(--Dark-Gray);
	}

	.box-description {
		font-family: var(--Font-Family);
		font-size: 14px;
		font-weight: 400;
		/* line-height: 20px; */
		color: var(--Dark-Gray);
		padding: 0 10px;
	}
</style>
