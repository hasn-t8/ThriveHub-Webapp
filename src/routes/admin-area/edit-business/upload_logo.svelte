<script lang="ts">
	import { uploadBusinessLogo } from '$lib/stores/business';
	let {
		value = $bindable(),
		businessProfileId = null,
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

			// Validate file type (only images)
			if (!file.type.startsWith('image/')) {
				alert('Please select a valid image file!');
				resetFileInput();
				return;
			}

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

	function resetFileInput() {
		selectedFileName = 'No file selected';
		companyLogoPreview = null;
		value = null;
	}

	// Simulate upload action
	async function uploadLogo() {
		if (companyLogoPreview) {
			// alert(`Logo "${selectedFileName}" uploaded successfully!`);
			const inputFile = document.querySelector(
				'input[type="file"]'
			) as HTMLInputElement;
			const file = inputFile?.files?.[0];

			if (!file) {
				alert('Please select a file first!');
				return;
			}

			const success = await uploadBusinessLogo(file, businessProfileId);
			//TODO: Handle success and error
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

			{#if value}
				<img style="width: 100px;" src="{value}?cacheBust=${Date.now()}"/>
				<hr />
			{/if}

			<!-- File Input -->
			<div class="file has-name is-boxed">
				<label class="file-label">
					<input
						class="file-input"
						type="file"
						accept="image/*"
						on:change={handleLogoUpload}
					/>
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
						src={typeof companyLogoPreview === 'string'
							? companyLogoPreview
							: ''}
						alt="Logo Preview"
					/>
				</figure>
				<div class="buttons mt-3">
					<button class="button is-primary" on:click={uploadLogo}
						>Upload Logo</button
					>
					<button class="button is-danger" on:click={removeLogo}
						>Remove Image</button
					>
				</div>
			{/if}
		</div>
	</div>
</div>
