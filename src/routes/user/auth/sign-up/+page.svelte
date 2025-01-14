<script lang="ts">
    import { goto } from '$app/navigation';
    import { API_BASE_URL } from '$lib/config';
    import { userEmail } from '$lib/stores/auth'; // Assuming this is a writable store
	import { login } from '$lib/stores/auth';

	let email = '';
    let emailError = '';

    function validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        emailError = email && !emailPattern.test(email) ? 'Please enter a valid email address.' : '';
    }

    let fullName = '';
    let password = '';
    let isButtonDisabled = true;
    let message = '';
    let isError = false;

    // Reactive validation for enabling/disabling the submit button
    $: isButtonDisabled = !(fullName.trim() && email.trim() && password.trim());

    // Handle form submission
    async function handleSignUp(event: Event) {
        event.preventDefault();
        console.log('Form submitted:', { fullName, email, password });

        const types = ['registered-user'];

        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, types })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create account.');
            }

            const data = await response.json();
            console.log('Account created:', data);

			login(data.token);

            // Update the userEmail store
            userEmail.set(email);

            // Store the email in localStorage
            localStorage.setItem('email', email);

            isError = false;
            message = data.message || 'Account created successfully!';

            // Clear form fields
            fullName = '';
            email = '';
            password = '';

            // Redirect to the verification page, passing email as a query parameter
            goto(`/user/auth/verify_account?email=${encodeURIComponent(email)}`);
        } catch (error) {
            isError = true;
            message = error instanceof Error ? error.message : 'An unexpected error occurred.';
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
				<h3 class="title is-4">Create Account</h3>
				<form on:submit={handleSignUp}>
					<div class="field">
						<label class="label has-text-weight-medium" for="username">Full Name</label>
						<div class="control">
							<input
								class="input custom-input"
								type="text"
								placeholder="Enter your full name"
								bind:value={fullName}
							/>
						</div>
					</div>

					<div class="field">
						<label class="label has-text-weight-medium" for="email">Email</label>
						<div class="control">
							<input
								class="input custom-input"
								type="email"
								id="email"
								placeholder="Enter your email"
								bind:value={email}
							/>
						</div>
					</div>
					<div class="field mb-0">
						<label class="label has-text-weight-medium" for="password">Password</label>
						<div class="control">
							<input
								class="input custom-input"
								type="password"
								id="password"
								placeholder="Enter your password"
								bind:value={password}
							/>
						</div>
						<p class="has-text-right mt-5 "><a href="/user/auth/forgot_password" class="has-text-weight-medium is-underlined">Forgot Password ?</a></p>
					</div>
					<button
						id="login-button"
						class="button is-primary is-medium is-fullwidth"
						disabled={isButtonDisabled}
					>
						Create Account
					</button>
					{#if message}
						<p class="has-text-centered {isError ? 'has-text-danger' : 'has-text-success'}">
							{message}
						</p>
					{/if}

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
					Already have an account? <a href="/user/auth/sign-in">Log In</a>
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
		margin-top: -185px;
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
		color: gray;
		border-radius: 11px;
	}
	button.button.is-fullwidth {
		font-weight: 600;
		padding: 22px;
		margin-bottom: 20px;
	}
	.button.is-primary :hover {
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
