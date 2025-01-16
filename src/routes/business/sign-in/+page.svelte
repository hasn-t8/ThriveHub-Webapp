<script lang="ts">
	import { goto } from '$app/navigation';
	import { loggedInStatus, login } from '$lib/stores/auth';
	import { API_BASE_URL } from '$lib/config';
	import { get } from 'svelte/store';
	
	let email = '';
	let password = '';
	let isLoginDisabled = true;
	let errorMessage = '';
	let isLoading = false;

	function validateForm() {
		isLoginDisabled = !(email.trim() && password.trim());
	}

	// async function handleLogin() {
	// 	errorMessage = '';
	// 	isLoading = true;

	// 	try {
	// 		const response = await fetch(`${API_BASE_URL}/auth/login`, {
	// 			method: 'POST',
	// 			headers: {
	// 				Accept: 'application/json',
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({ email, password })
	// 		});

	// 		const data = await response.json();

	// 		if (response.ok) {

	// 			login(data.token);
	// 			//goto('/user/settings');

	// 			const previousPath = localStorage.getItem('previousPath') || '/';
	// 			localStorage.removeItem('previousPath'); // Clean up the stored path
	// 			goto(previousPath);



	// 		} else {
	// 			errorMessage = data.message || 'Login failed. Please try again.';
	// 		}
	// 	} catch (error) {
	// 		errorMessage = 'An error occurred while logging in. Please try again later.';
	// 	} finally {
	// 		isLoading = false;
	// 	}
	// }
	async function handleLogin() {
        errorMessage = '';
        isLoading = true;

        try {
			const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login response:', data);

                // Pass the full data object to login
                login(data);

                // Check logged-in status
                console.log('LoggedInStatus after login:', get(loggedInStatus));

                // Navigate to the previous path or a default path
         	const previousPath = localStorage.getItem('previousPath') || '/';
				localStorage.removeItem('previousPath'); // Clean up the stored path
				goto(previousPath);

            } else {
                errorMessage = data.message || 'Login failed. Please try again.';
            }
        } catch (error) {
            console.error('Login error:', error);
            errorMessage = 'An error occurred while logging in. Please try again later.';
        } finally {
            isLoading = false;
        }
    }


</script>

<!-- Main Content -->
<div class="container">
	<div class="columns is-vcentered is-multiline">
		<!-- Left Section -->
		<div class="column is-full-mobile is-half-tablet is-half-desktop info-section is-hidden-mobile">
			<div class="cards">
				{#each [{ icon: '/assets/1.png', title: 'Seamless Search Experience', text: 'Harness the power of AI to uncover top-rated reviews and recommendations with unparalleled ease.' }, { icon: '/assets/2.png', title: 'Authentic User Perspectives', text: 'Gain valuable insights from real users sharing their honest experiences with products and services.' }, { icon: '/assets/3.png', title: 'AI-Driven Review Summaries', text: 'Transform countless reviews into clear, meaningful summaries to simplify your decision-making process.' }, { icon: '/assets/4.png', title: 'Unfiltered and Reliable Feedback', text: 'Make confident choices backed by unbiased, trustworthy reviews from genuine users.' }] as item}
					<div class="info-item">
						<div class="info-icon">
							<img src={item.icon} alt="Icon" />
						</div>
						<div class="info-text">
							<h4>{item.title}</h4>
							<p>{item.text}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Right Section -->
		<div class="column is-full-mobile is-half-tablet is-half-desktop">
			<div class="login-card">
				<h3 class="title is-4">Log in to Thrive Hub</h3>
				<form>
					<div class="field">
						<label class="label has-text-weight-medium" for="email">Email</label>
						<div class="control">
							<input
								class="input custom-input"
								type="email"
								id="email"
								placeholder="Enter your email"
								bind:value={email}
								on:input={validateForm}
							/>
						</div>
					</div>
					<div class="field">
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="label">Password</label>
						<div class="control">
							<input
								class="input custom-input"
								type="password"
								placeholder="Enter your password"
								bind:value={password}
								on:input={validateForm}
							/>
						</div>
						<p class="has-text-right mt-5 "><a href="/user/auth/forgot_password" class="has-text-weight-medium is-underlined">Forgot Password ?</a></p>
					</div>
					<button
						type="button"
						class="button is-primary is-medium is-fullwidth"
						on:click={handleLogin}
						disabled={isLoginDisabled || isLoading}
					>
						{#if isLoading}
							Loading...
						{/if}
						{#if !isLoading}
							Log in
						{/if}
					</button>
					<p class="has-text-danger p-0">{errorMessage}</p>

					<!-- <div class="field has-text-centered">
						<p>Or log in with</p>
						<button class="button is-fullwidth">
							<div class="info-icon">
								<img src="/assets/google.png" alt="Google Icon" />
							</div>
							Continue with Google
						</button>
						<button class="button is-fullwidth">
							<div class="info-icon">
								<img src="/assets/2021_Facebook_icon 1.png" alt="Facebook Icon" />
							</div>
							Continue with Facebook
						</button>
					</div> -->

				</form>
				<p class="has-text-centered mt-5">
					Don’t have an account? <a href="/business/signup">Create account</a>
				</p>
			</div>
		</div>


		<!-- Right Section -->
		<div class="column is-full-mobile is-full-tablet is-full-deskto is-hidden-tablet">
			<div class="login-card mt-0">
				<h3 class="title is-4 has-text-centered">Are you a business?</h3>
				<p class="mb-0 is-6 has-text-centered">Set up your business account on Thrive Hub for free</p>
				<div class="is-flex is-flex-direction-column">
					<button class="button is-primary is-medium">Log in</button>
					<button class="button is-outlined is-medium">Sign up</button>
				</div>
			</div>
		</div>


	</div>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: auto;
		padding: 1rem;
	}

	.custom-input{
		border-radius: 9px;
		height: 3em;
	}


	.info-section {
		margin-top: 2rem;
	}

	.info-item {
		display: flex;
		align-items: center;
		margin-bottom: 1.5rem;
		width: 100%;
	}

	.info-item img {
		max-width: 80px;
		flex-shrink: 0;
	}

	.info-text h4 {
		font-size: 1.2rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}

	.info-text p {
		font-size: 0.9rem;
		color: #6b6b6b;
	}

	.field {
		border-radius: 11px;
	}

	.login-card {
		padding: 2rem;
		background: white;
		border-radius: 19px;
		margin: 2rem auto;
		width: 90%;
	}

	.login-card .button {
		margin-top: 1rem;
	}

	.cards {
		margin-top: 1rem;
	}

	.info-text {
		padding-left: 15px;
	}

	a {
		color: #060606;
		cursor: pointer;
		font-weight: 600;
	}

	.button.is-primary {
		background-color: #118BF6;
		border-color: transparent;
		color: #FFFFFF;
		border-radius: 17px;
		height: 3.7rem!important;
		font-weight: 500;
	}

	.button.is-grayed {
		background-color: #EEEEEE;
		border-color: transparent;
		color: #707070;
		border-radius: 17px;
		height: 3.7rem!important;
		font-weight: 500;
	}

	.button.is-outlined {
		background-color: #FFFFFF;
		border-color: #118BF6;
		color: #118BF6;
		border-radius: 17px;
		height: 3.7rem!important;
		font-weight: 500;
	}

	.button.is-primary:hover {
		background-color: rgb(0, 110, 184);
	}

	.info-icon {
		padding-right: 11px;
	}

	.has-text-right {
		text-align: right !important;
		margin-top: 4px;
	}

	/* Responsive Design */
	@media screen and (max-width: 768px) {
		.info-item {
			flex-direction: column;
			text-align: center;
		}

		.info-text {
			padding-left: 0;
		}
	}
</style>
