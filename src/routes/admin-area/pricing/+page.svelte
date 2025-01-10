<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, derived, type Writable } from 'svelte/store';
	import type { SubscriptionData } from '$lib/types/Subscriptions';
	import Spinner from '$lib/components/Spinner.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import { getMySubscriptions, createSubscription } from '$lib/stores/subscription/subs';

	// States
	let isMonthly: Writable<boolean> = writable(); // Tracks whether the selected plan is monthly
	let mySubs: Writable<SubscriptionData[]> = writable([]); // Store for subscription data
	let error: string | null = null;
	let loading: Writable<boolean> = writable();
	let activeSub: Writable<strubg> = writable('free');

	let toastMessage = '';

	// Derived store for filtered subscriptions
	const filteredSubs = () => {
		console.log('Filtering subscriptions...');

		return $mySubs.filter((sub) => {
			// console.log('-------');
			// console.log('Sub.id:', sub.id, ' - sub.end_date:', sub.end_date);

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
			console.log('Active sub:', $activeSub);
			console.log('sub.plan:', sub.plan);
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
		toastMessage = 'Plan is changed successfully! ';
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
	});
</script>

{#if $loading}
	<Spinner />
{/if}
{#if error}
	{error}
{/if}

{#if toastMessage}
	<Toast message={toastMessage} />
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

	<!-- {#each $filteredSubs as sub}
		{sub.plan}
	{/each} -->

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
								<button class="button" on:click={switchPlan('free')}>Get Free</button>
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
					<div class="recommended">
						<div class="h2">Recommended</div>

						<!-- Basic Plan -->

						<div class="card">
							<!-- <div class="recommended-badge">Recommended</div> -->
							<div class="card-content">
								<div class="package-name">Basic</div>
								<div class="price">$15<span>/m</span></div>
								{#if isActive('monthly-basic') === 'active'}
									<button class="button active">Your current plan</button>
								{:else}
									<button class="button" on:click={switchPlan('basic_monthly')}>Get Basic</button>
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
					</div>
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
								<button class="button" on:click={switchPlan('premium_monthly')}>Get Premium</button>
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
								<button class="button" on:click={switchPlan('free')}>Get Free</button>
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
					<div class="recommended">
						<div class="h2">Recommended</div>

						<!-- Basic Plan -->

						<div class="card">
							<!-- <div class="recommended-badge">Recommended</div> -->
							<div class="card-content">
								<div class="package-name">Basic</div>
								<div class="price">$149<span>/m</span></div>
								{#if isActive('yearly-basic') === 'active'}
									<button class="button active">Your current plan</button>
								{:else}
									<button class="button" on:click={switchPlan('basic_yearly')}>Get Basic</button>
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
					</div>
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
								<button class="button" on:click={switchPlan('premium_yearly')}>Get Premium</button>
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

<style>
	.plans {
		margin-bottom: 200px;
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
</style>
