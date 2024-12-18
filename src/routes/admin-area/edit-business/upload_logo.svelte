<script lang="ts">
	let {
		value = $bindable(),
		selectedFileName = 'No file selected',
		companyLogoPreview,
		...props
	} = $props();
	// let selectedFileName = "No file selected";
	// let companyLogoPreview: string | ArrayBuffer | null = null;

	// Handle file input change
	function handleLogoUpload(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input && input.files ? input.files[0] : null;
		if (file) {
			selectedFileName = file.name;

			// Create a preview of the image
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target) {
					companyLogoPreview = e.target.result;
				}
			};
			reader.readAsDataURL(file);
		} else {
			selectedFileName = 'No file selected';
			companyLogoPreview = null;
		}
	}

	// Simulate upload action
	function uploadLogo() {
		if (companyLogoPreview) {
			alert(`Logo "${selectedFileName}" uploaded successfully!`);
			// Add actual upload logic here (e.g., API call)
		} else {
			alert('Please select a file first!');
		}
	}

	// Remove the logo preview
	function removeLogo() {
		selectedFileName = 'No file selected';
		companyLogoPreview = null;
	}
</script>

<div class="stats-section">
	<div class="box">
		<div class="column is-half">
			<h1 class="title">Logo</h1>

			<!-- <input bind:value={value} {...props} /> -->

			<!-- File Input -->
			<div class="file has-name is-boxed">
				<label class="file-label">
					<input class="file-input" type="file" accept="image/*" on:change={handleLogoUpload} />
					<span class="file-cta">
						<span class="file-icon">
							<i class="fas fa-upload"></i>
						</span>
						<span class="file-label">Choose a file…</span>
					</span>
					<span class="file-name">{selectedFileName}</span>
				</label>
			</div>

			<!-- Image Preview and Buttons -->
			{#if companyLogoPreview}
				<figure class="image is-128x128 mt-3">
					<img
						src={typeof companyLogoPreview === 'string' ? companyLogoPreview : ''}
						alt="Logo Preview"
					/>
				</figure>
				<div class="buttons mt-3">
					<button class="button is-primary" on:click={uploadLogo}>Upload Logo</button>
					<button class="button is-danger" on:click={removeLogo}>Remove Image</button>
				</div>
			{/if}
		</div>
	</div>
</div>
