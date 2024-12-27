<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { API_BASE_URL } from '$lib/config';
	import { userEmail } from '$lib/stores/auth'; // Assuming this is a writable store

	let timer = '00:59';
	let timeLeft = 59;
	let countdown: NodeJS.Timeout;
	let showTimerSection = true;
	let isError = false;
	let message = '';
	let email: string = '';
	let codeInputs = ['', '', '', ''];

	let jwtToken = '';

	// Subscribe to the userEmail store
	userEmail.subscribe((value) => {
		email = value;
	});

	const startTimer = () => {
		clearInterval(countdown);
		timeLeft = 59;

		countdown = setInterval(() => {
			timeLeft--;
			const minutes = Math.floor(timeLeft / 60);
			const seconds = timeLeft % 60;

			timer = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

			if (timeLeft <= 0) {
				clearInterval(countdown);
				timer = 'Expired';
				showTimerSection = false;
			}
		}, 1000);
	};

	const handleInput = (index: number, value: string) => {
		codeInputs[index] = value;

		if (value.length === 1 && index < codeInputs.length - 1) {
			const nextInput = document.getElementById(`code-${index + 2}`);
			if (nextInput) nextInput.focus();
		}
	};

	const handleBackspace = (index: number, value: string) => {
		if (value === '' && index > 0) {
			const prevInput = document.getElementById(`code-${index}`);
			if (prevInput) prevInput.focus();
		}
	};

	const changeEmail = () => {
		alert('Change email functionality will be implemented here.');
	};

	const resendCode = async () => {
		startTimer();
		showTimerSection = true;
		try {
			const response = await fetch(
				`${API_BASE_URL}/auth/activate-account/get-code`,
				{
					method: 'POST',
					headers: {
						accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ email })
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.error || 'Failed to resend verification code.'
				);
			}

			const data = await response.json();
			message = data.message || 'Verification code resent successfully!';
			isError = false;
		} catch (error) {
			isError = true;
			message =
				error instanceof Error
					? error.message
					: 'An unexpected error occurred.';
		}
	};

	const handleVerifyAccount = async (event: Event) => {
		event.preventDefault();

		const code = codeInputs.join('');
		if (code.length < 4) {
			alert('Please enter the verification code.');
			return;
		}

		console.log('Verification code:', code);
		console.log('Email being sent:', email); // Debug log

		if (!email) {
			alert('Email is not set. Please return to the sign-up page.');
			return;
		}

		try {
			const response = await fetch(
				`${API_BASE_URL}/auth/activate-account/verify`,
				{
					method: 'POST',
					headers: {
						accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ email, code })
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to verify account.');
			}

			const data = await response.json();
			console.log('Account verified:', data);
			isError = false;
			message = data.message || 'Account verified successfully!';
			goto('/user/home');
		} catch (error) {
			isError = true;
			message =
				error instanceof Error
					? error.message
					: 'An unexpected error occurred.';
		}
	};

	onMount(() => {
		startTimer();
		jwtToken = localStorage.getItem('authToken') || '';
		console.log('JWT_token:', jwtToken);

		try {
			const data = decodeJWT(jwtToken);
			console.log('Decoded JWT Payload:', data.email);
			email = data.email || email; // Use email from JWT if not already set
		} catch (error) {
			console.error('Error decoding JWT:', (error as any)?.message);
		}
	});

	// Function to decode JWT
	function decodeJWT(token: string) {
		const parts = token.split('.');

		if (parts.length !== 3) {
			throw new Error('Invalid JWT token');
		}

		const payload = parts[1];
		const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
		return JSON.parse(decodedPayload);
	}
</script>

<div class="section is-flex is-justify-content-center is-align-items-center">
	<div class="forget-container">
		<h1 class="title is-4 has-text-centered custom-heading">Verify Account</h1>
		<p class="custom-description has-text-centered mb-5">
			A verification code has been sent to <span class="has-text-weight-bold"
				>{email}</span
			>. Enter the code to verify your account.
		</p>

		<!-- <h2 class="subtitle is-6 has-text-centered custom-subheading">
			<a
				id="change-email-link"
				role="button"
				href="javascript:void(0)"
				class="has-text-black"
				style="text-decoration: underline;"
				on:click={changeEmail}>Change Email</a
			>
		</h2> -->

		<form id="verify-form">
			<div class="field is-flex is-justify-content-center mb-4">
				{#each codeInputs as input, index}
					<input
						id="code-{index + 1}"
						class="input custom-rounded is-small mx-1"
						type="text"
						maxlength="1"
						bind:value={codeInputs[index]}
						on:input={(e) =>
							e.target &&
							handleInput(index, (e.target as HTMLInputElement).value)}
						on:keydown={(e) =>
							e.key === 'Backspace' &&
							handleBackspace(index, (e.target as HTMLInputElement).value)}
					/>
				{/each}
			</div>

			{#if showTimerSection}
				<p class="has-text-centered mb-4" id="timer-section">
					Code expires in <span id="timer">{timer}</span>
				</p>
			{/if}
			<div class="field has-text-centered mb-4">
				<button on:click={handleVerifyAccount} class="is-medium custom-button"
					>Submit</button
				>
			</div>
			<div class="field has-text-centered">
				<p>
					Didn't receive the code?
					<a class="has-text-link" on:click|preventDefault={resendCode}
						>Resend now</a
					>
				</p>
			</div>

			{#if message}
				<p class={isError ? 'error' : 'success'}>{message}</p>
			{/if}
		</form>
	</div>
</div>

<style>
	.forget-container {
		background-color: #ffffff;
		width: 484px;
		padding: 40px 20px;
		border-radius: 20px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
	.custom-heading {
		font-size: 24px;
		font-weight: 700;
		line-height: 25px;
		letter-spacing: 0.38px;
	}
	.custom-description {
		text-align: center;
		padding: 15px;
		max-width: 430px;
		font-size: 12px;
		font-weight: 400;
		color: #707070;
	}
	.custom-subheading {
		font-weight: bold;
		margin-bottom: 20px;
	}
	.input.custom-rounded {
		width: 40px;
		height: 40px;
		text-align: center;
		font-size: 20px;
		padding: 0;
	}
	#timer {
		/* font-weight: bold; */
		/* color: red; */
	}
	#timer-section.hidden {
		visibility: hidden;
		height: 0;
		margin: 0;
	}
	#change-email-link {
		cursor: pointer;
		font-weight: bold;
	}
	body {
		background-color: #e7f3fe;
		font-family: 'Inter', sans-serif;
	}
	.has-text-danger {
		color: #e74c3c;
	}
	.is-hidden {
		display: none;
	}
</style>
