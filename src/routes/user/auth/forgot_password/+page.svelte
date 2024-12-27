
<script lang="ts">
	import { goto } from '$app/navigation';
	import { forgotPassword } from '$lib/stores/auth';
	// import { goto } from 'svelte-routing'; // Adjust import based on your routing library

	let email = '';
	let message = '';
	let isError = false;

	async function submitForgotPassword(event: Event) {
		event.preventDefault(); // Prevent default form submission

		try {
			message = await forgotPassword(email);
			isError = false;

			// Redirect to change password screen on success
			goto(`/user/auth/change_password?email=${encodeURIComponent(email)}`);
		} catch (error) {
			isError = true;
			message = error instanceof Error ? error.message : 'An unexpected error occurred.';
		}
	}
</script>

<div class="section is-flex is-justify-content-center is-align-items-center">
	<div class="forget-container">
		<h1 class="title is-4 has-text-centered custom-heading">Forget Password?</h1>
		<p class="custom-description has-text-centered">
			Don’t stress! Enter your email, and we’ll send a verification code and reset link to renew your password securely.
		</p>
		<!-- Bind the form to the submitForgotPassword function -->
		<form id="forgetPasswordForm" on:submit={submitForgotPassword}>
			<div class="field">
				<label class="label" for="email">Email</label>
				<div class="control">
					<!-- Bind the input value to the email variable -->
					<input
						class="input rounded"
						type="email"
						id="email"
						placeholder="Enter your email"
						bind:value={email}
						required
					/>
				</div>
			</div>
			<div class="field has-text-centered">
				<button class="is-medium custom-button" type="submit">Send reset code</button>
			</div>
		</form>
		<!-- Display success or error message -->
		{#if message}
			<p class="has-text-centered mt-4" class:is-error={isError}>
				{message}
			</p>
		{/if}
		<p class="has-text-centered back-link mt-4">
			<a href="#login" class="has-text-link" style="text-decoration: underline;">Return to Login</a>
		</p>
	</div>
</div>


<style>
.forget-container {
  background-color: #FFFFFF;
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
.back-link {
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #007BFF;
}
.back-link a:hover {
  color: #0056b3;
}
.label {
  font-size: 12px;
  font-weight: 500;
}
</style>

