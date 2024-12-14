<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from '$lib/stores/auth';
	import { API_BASE_URL } from '$lib/config';
	
	let email = '';
	let password = '';
	let isLoginDisabled = true;
	let errorMessage = '';
	let isLoading = false;

	function validateForm() {
		isLoginDisabled = !(email.trim() && password.trim());
	}

	async function handleLogin() {
		errorMessage = '';
		isLoading = true;

		try {
			const response = await fetch(`${API_BASE_URL}/auth/login`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			const data = await response.json();

			if (response.ok) {

				login(data.token);
				goto('/user/settings');

			} else {
				errorMessage = data.message || 'Login failed. Please try again.';
			}
		} catch (error) {
			errorMessage = 'An error occurred while logging in. Please try again later.';
		} finally {
			isLoading = false;
		}
	}
</script>

<!-- Main Content -->
<div class="container">
	<div class="columns is-vcentered">
		<!-- Left Section -->
		<div class="column is-half info-section">
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
		<div class="column is-half">
			<div class="login-card">
				<h3 class="title is-4">Log in to Thrive Hub</h3>
				<form>
					<div class="field">
						<label class="label">Email</label>
						<div class="control">
							<input
								class="input"
								type="email"
								placeholder="Enter your email"
								bind:value={email}
								on:input={validateForm}
							/>
						</div>
					</div>
					<div class="field">
						<label class="label">Password</label>
						<div class="control">
							<input
								class="input"
								type="password"
								placeholder="Enter your password"
								bind:value={password}
								on:input={validateForm}
							/>
						</div>
						<p class="has-text-right"><a href="#">Forgot Password?</a></p>
					</div>
					<button
						type="button"
						class="button is-fullwidth is-primary"
						style="color: white; background-color: #118BF6;"
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
					<p class="has-text-danger">{errorMessage}</p>

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
				<p class="has-text-centered">
					Don’t have an account? <a href="/user/auth/sign-up">Create account</a>
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: auto;
	}

	.info-section {
		margin-top: 2rem;
	}

	.info-item {
		display: flex;
		align-items: center;
		margin-bottom: 1.5rem;
		width: 80%;
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
		margin: 55px;
		width: 90%;
		margin-top: 100px;
		margin-bottom: 145px;
	}
	.login-card .button {
		margin-top: 1rem;
	}
	.cards {
    margin-top: -10%;
}	
	.info-text {
		padding-left: 15px;
	}
	a {
		color: #060606;
		cursor: pointer;
		font-weight: 600;
		/* text-decoration: none; */
	}
	.button.is-primary {
		background-color: lightgrey;
		border-color: transparent;
		color: gray;
		border-radius: 11px;
	}
	button.button.is-fullwidth {
		font-weight: 600;
		padding: 22px;
		margin-bottom: 20px;
	}

	.info-icon {
		padding-right: 11px;
	}
	.has-text-right {
		text-align: right !important;
		margin-top: 4px;
	}
</style>
