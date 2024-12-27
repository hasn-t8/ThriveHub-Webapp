<script lang="ts">
	import { changePassword } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let email = ''; // Extract email from query params
	let token = ''; // Extract token from query params
	let code = ''; // Code entered by the user
	let newPassword = '';
	let confirmPassword = '';
	let showNewPassword = false;
	let showConfirmPassword = false;
	let passwordError = false;
	let message = '';
	let isError = false;

	// Function to toggle visibility of the new password
	const toggleNewPasswordVisibility = () => {
		showNewPassword = !showNewPassword;
	};

	// Function to toggle visibility of the confirm password
	const toggleConfirmPasswordVisibility = () => {
		showConfirmPassword = !showConfirmPassword;
	};

	// Extract query parameters on component mount
	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		email = params.get('email') || '';
		token = params.get('token') || '';
	});

	// Function to handle form submission
	const handleSubmit = async (event: Event) => {
		event.preventDefault();

		if (newPassword !== confirmPassword) {
			passwordError = true;
			return;
		}

		passwordError = false;

		try {
			message = await changePassword(email, code, newPassword );
			isError = false;
			alert('Password reset sucessfully');

			// Redirect to login page after successful password change
			goto('/user/auth/sign-in');
		} catch (error) {
			isError = true;
			message = error instanceof Error ? error.message : 'An unexpected error occurred.';
		}
	};
</script>

<div class="section is-flex is-justify-content-center is-align-items-center">
	<div class="forget-container">
		<h1 class="title is-4 has-text-centered custom-heading">Create New Password</h1>
		<p class="custom-description has-text-centered mb-5">
			Please enter and confirm your new password. After the reset is complete, you will need to log
			in.
		</p>
		<form on:submit={handleSubmit}>
			<div class="field">
				<label class="label">Code</label>
				<div class="control">
					<input
						bind:value={code}
						class="input rounded"
						type="text"
						placeholder="Enter the code sent to your email"
						required
					/>
				</div>
			</div>
			<div class="field">
				<label class="label">Password</label>
				<div class="control has-icons-right">
					<input
						bind:value={newPassword}
						class="input rounded"
						type={showNewPassword ? 'text' : 'password'}
						placeholder="Enter your new password"
						required
					/>
					<span class="icon is-small is-right" on:click={toggleNewPasswordVisibility}>
						<i
							class={showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}
							style="pointer-events: auto; cursor: pointer; color: black;"
						></i>
					</span>
				</div>
			</div>
			<div class="field">
				<label class="label">Confirm Password</label>
				<div class="control has-icons-right">
					<input
						bind:value={confirmPassword}
						class="input rounded"
						type={showConfirmPassword ? 'text' : 'password'}
						placeholder="Confirm your new password"
						required
					/>
					<span class="icon is-small is-right" on:click={toggleConfirmPasswordVisibility}>
						<i
							class={showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}
							style="pointer-events: auto; cursor: pointer; color: black;"
						></i>
					</span>
				</div>
			</div>
			{#if passwordError}
				<p class="has-text-danger pb-4">Passwords do not match</p>
			{/if}
			{#if message}
				<p class={isError ? 'has-text-danger' : 'has-text-success'}>{message}</p>
			{/if}
			<div class="field has-text-centered">
				<button type="submit" class="is-medium custom-button">Create New Password</button>
			</div>
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
	.rounded {
		border-radius: 10px;
	}
	.label {
		font-size: 12px;
		font-weight: 500px;
	}
	.icon.is-small {
		cursor: pointer;
	}
	.has-text-danger {
		color: #e74c3c;
	}
</style>
