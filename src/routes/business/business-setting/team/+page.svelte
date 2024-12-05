<script>
	  function redirectToNewPage() {
    // Redirect to the new page on button click
    window.location.href = "/business-setting/invite"; // Update with your target URL
  }
</script>
<!-- Add Team Member Screen -->
<div class="section is-flex is-justify-content-center is-align-items-center">
	<div class="forget-container">
		<h1 class="title is-4 has-text-centered custom-heading">Add a company member</h1>
		<p class="custom-description has-text-centered">
			Invite a new team member to your company. Enter their details below, and they will receive an
			invitation to join
		</p>
		<form>
			<!-- Full Name Field -->
			<div class="field">
				<label class="label">Full Name</label>
				<div class="control">
					<input class="input rounded" type="text" placeholder="Enter full name" />
				</div>
			</div>
			<!-- Email Address Field -->
			<div class="field">
				<label class="label">Email Address</label>
				<div class="control">
					<input class="input rounded" type="email" placeholder="Enter email address" />
				</div>
			</div>
			<!-- Role Field -->
			<div class="field">
				<label class="label">Role</label>
				<div class="control">
					<input
						class="input rounded"
						type="text"
						placeholder="Enter role (e.g., Admin, Developer)"
					/>
				</div>
			</div>
			<!-- Send Invite Button -->
			<div class="field has-text-centered">
				<button class="is-medium custom-button" on:click={redirectToNewPage}>Send Invite</button>
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
		font-weight: 500;
	}
</style>
