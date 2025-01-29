<script lang="ts">
	import Sidemenu from '../components/Sidemenu.svelte';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { loggedInStatus, setUserAndType } from '$lib/stores/auth';
	import { API_BASE_URL } from '$lib/config';

    import 'quill/dist/quill.snow.css';
    import type Quill from 'quill';
	import { quillHTML } from '$lib/stores/quillStore';
	//import ImageResize from 'quill-image-resize-module';
	//import QuillResizeImage from 'quill-resize-image';
    let quillEditor:Quill;
    let editorDiv:Writable<HTMLDivElement | null> = writable(null);


    async function addEditor() {
        const { default: quillModule } = await import("quill/quill");
        const Quill = quillModule;
        
        if ($editorDiv) {
            $editorDiv.innerHTML = $quillHTML;
			//Quill.register('modules/imageResize', ImageResize);
			quillEditor = new Quill($editorDiv, {
				modules: {
				toolbar: [
					["bold", "italic", "underline", "strike"],        // toggled buttons
					["image", 'link'],                                // insert image tool
					[{ 'list': 'ordered'}, { 'list': 'bullet' }],
					[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
					[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
					[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
					[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
					[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
					[{ 'font': [] }],
					[{ 'align': [] }],
				],
/* 				imageResize: {
					displaySize: true
				} */
				},
				placeholder: "Blog content here...",
				theme: "snow"
			});
			$editorDiv.style.height = '400px'; // Adjust the height as needed
            
            quillEditor.on('text-change', handleQuillInput);
        }
    }
    
    function handleQuillInput () {
        $quillHTML = quillEditor!.getSemanticHTML();
    }


	const categories: Writable<{ id: number; name: string }[]> = writable([]);
	let isLoading = writable(false);
	const isSuccess = writable(false);
	const isError = writable(false);

	async function fetchCategories() {
		isLoading.set(true);
		try {
			const response = await fetch(`${API_BASE_URL}/categories`);
			if (!response.ok) {
				throw new Error('Failed to fetch categories');
			}
			const data = await response.json();
			categories.set(data);
		} catch (error) {
			isError.set(true);
			console.error('Error fetching categories:', error);
		} finally {
			isLoading.set(false);
		}
	}

	async function createBlogPost(category_id: number, title: string, content: string, is_published: boolean, image_cover: File | null, image_thumbnail: File | null) {
		isLoading.set(true);
		isSuccess.set(false);
		try {
			const formData = new FormData();
			formData.append('category_id', category_id.toString());
			formData.append('title', title);
			formData.append('content', content);
			formData.append('is_published', is_published.toString());
			if (image_cover) {
				formData.append('image_cover', image_cover);
			}
			if (image_thumbnail) {
				formData.append('image_thumbnail', image_thumbnail);
			}

			const response = await fetch(`${API_BASE_URL}/posts`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('authToken')}`
				},
				body: formData
			});
			if (!response.ok) {
				console.log(response);
				throw new Error('Failed to create blog post');
			}
			const data = await response.json();
			isSuccess.set(true);
			clearForm();
			console.log('Blog post created successfully:', data);
		} catch (error) {
			isError.set(true);
			console.error('Error creating blog post:', error);
		} finally {
			isLoading.set(false);
		}
	}

	function handleSubmit(event: Event) {
		event.preventDefault();
		console.log('handleSubmit called');
		console.log('JWT Token:', localStorage.getItem('authToken'));
		const form = event.target as HTMLFormElement;
		const titleInput = form.querySelector('input[type="text"]') as HTMLInputElement;
		const categorySelect = form.querySelector('select') as HTMLSelectElement;
		const contentTextarea = form.querySelector('textarea') as HTMLTextAreaElement;
		const coverImageInput = form.querySelector('#blog-cover-image') as HTMLInputElement;
		const thumbnailImageInput = form.querySelector('#blog-thumbnail-image') as HTMLInputElement;
		if (titleInput && categorySelect && quillEditor) {
			console.log('Form elements found!');
			const title = titleInput.value;
			console.log('Title:', title);
			const category_id = parseInt(categorySelect.value);
			console.log('Category ID:', category_id);
			const content = quillEditor.root.innerHTML;
			console.log('Content:', content);
			const image_cover = coverImageInput.files ? coverImageInput.files[0] : null;
			console.log(image_cover);
			const image_thumbnail = thumbnailImageInput.files ? thumbnailImageInput.files[0] : null;
			console.log(image_thumbnail);

			createBlogPost(category_id, title, content, true, image_cover, image_thumbnail);
		} else {
			console.error('Form elements not found!');
		}
	}

	function clearForm() {
		const form = document.querySelector('form');
		if (form) {
			form.reset();
		}
		coverImagePreview = null;
		thumbnailImagePreview = null;
		if (quillEditor) {
			quillEditor.setContents([]);
		}
	}


	onMount(async () => {
		setUserAndType();	
		fetchCategories();
		addEditor();
		clearForm();
	});

	let coverImagePreview: string | null = null;
	let thumbnailImagePreview: string | null = null;

	function handleCoverImageChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const reader = new FileReader();
			reader.onload = () => {
				coverImagePreview = reader.result as string;
			};
			reader.readAsDataURL(input.files[0]);
		}
	}

	function handleThumbnailImageChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const reader = new FileReader();
			reader.onload = () => {
				thumbnailImagePreview = reader.result as string;
			};
			reader.readAsDataURL(input.files[0]);
		}
	}	
</script>

{#if $isLoading}
	<div class="spinner-overlay">
		<div class="spinner"></div>
	</div>
{/if}

<div class="main-content" style="height: 100%;">
	<Sidemenu />

	<div class="analytics-header">
		<div class="header-top">
			<span style="font-size:1.5rem">Add Blog</span>
		</div>
		<hr class="divider" />
	</div>

	<div class="stats-section">
	{#if $isSuccess}
		<div class="notification is-success" in:fade={{ duration: 0 }} out:fade={{ duration: 1000 }} on:introend={() => setTimeout(() => isSuccess.set(false), 3000)}>
			Blog post created successfully!
		</div>
	{/if}

	{#if $isError}
		<div class="notification-error is-danger" in:fade={{ duration: 0 }} out:fade={{ duration: 1000 }} on:introend={() => setTimeout(() => isSuccess.set(false), 3000)}>
			Error Occured!
		</div>
	{/if}

		<div class="card">
			<form on:submit|preventDefault={handleSubmit}>
				<div class="columns is-multiline">
					<div class="column is-half">
						<label class="label" for="blog-title">Blog Title</label>
						<input
							class="input"
							type="text"
							id="blog-title"
							placeholder="Enter blog title"
							required
						/>
					</div>

					<div class="column is-half">
						<label class="label" for="blog-category">Blog Category</label>
						<select class="input" id="blog-category" required>
							<option value="" disabled selected>Select a category</option>
							{#each $categories as category}
								<option value={category.id}>{category.name}</option>
							{/each}
						</select>
					</div>

					<div class="column is-full">
						<label class="label" for="blog-content">Content</label>
						<div id="quill-editor-wrapper">
							<div bind:this={$editorDiv} id="quill-summary-editor"></div>
						</div>
						<textarea style="display:none"
							class="textarea"
							id="blog-content"
							placeholder="Enter blog content"
						></textarea>
					</div>

					<div class="column is-full">
						<label class="label" for="blog-cover-image">Cover Image</label>
						<input
							class="input"
							type="file"
							id="blog-cover-image"
							accept="image/*"
							on:change={handleCoverImageChange}
						/>
						{#if coverImagePreview}
							<div class="image-preview-container is-flex is-flex-direction-column">
								<img src={coverImagePreview} alt="Cover Image Preview" class="image-preview" style="margin:auto"/>
								<button style="width: 20%; margin:auto; margin-top:1%;" type="button" class="button is-danger is-small" on:click={() => { 
									coverImagePreview = null; 
									const coverImageInput = document.getElementById('blog-cover-image') as HTMLInputElement;
									if (coverImageInput) {
										coverImageInput.value = '';
									}
								}}>Remove</button>
							</div>
						{/if}
					</div>

					<div class="column is-full">
						<label class="label" for="blog-thumbnail-image">Thumbnail Image</label>
						<input
							class="input"
							type="file"
							id="blog-thumbnail-image"
							accept="image/*"
							on:change={handleThumbnailImageChange}
						/>
						{#if thumbnailImagePreview}
							<div class="image-preview-container is-flex is-flex-direction-column">
								<img src={thumbnailImagePreview} alt="Thumbnail Image Preview" class="image-preview" style="margin:auto"/>
								<button style="width: 20%; margin:auto; margin-top:1%;" type="button" class="button is-danger is-small" on:click={() => { 
									thumbnailImagePreview = null; 
									const thumbnailImageInput = document.getElementById('blog-thumbnail-image') as HTMLInputElement;
									if (thumbnailImageInput) {
										thumbnailImageInput.value = '';
									}
								}}>Remove</button>
							</div>
						{/if}
					</div>

					<div class="column is-full is-flex is-justify-content-flex-end">
						<button type="button" class="button is-light mr-5" on:click={() => { clearForm();}}>Cancel</button>
						<button type="submit" class="button is-primary add-button">Save Blog</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	.main-content {
		margin-left: 250px;
	}

	.analytics-header {
		padding: 20px;
		background-color: #f4faff;
	}

	.analytics-header h1 {
		font-size: 2rem;
		font-weight: bold;
		color: #333;
		margin: 0;
	}

	.add-button {
		cursor: pointer;
		background-color: #118bf6;
	}
	.add-button:hover {
		background-color: #0056b3; /* Darker blue on hover */
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Adds a shadow effect */
	}
	.add-button:active {
		background-color: #004080; /* Even darker blue on click */
	}

	.divider {
		border: none;
		height: 1px;
		background-color: #dfe6ed;
		margin: 20px 0;
	}

	.stats-section {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2px;
		padding: 20px;
		border-radius: 10px;
		background-color: #f4faff;
		margin-top: -40px;
	}

	.notification {
		margin: auto;
		width: 16rem;
		padding: 15px;
		background-color: #48c774;
		color: white;
		border-radius: 5px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.notification-error {
		margin: auto;
		width: 9rem;
		padding: 15px;
		background-color: #f14668;
		color: white;
		border-radius: 5px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.spinner-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.spinner {
		border: 4px solid rgba(0, 0, 0, 0.1);
		width: 36px;
		height: 36px;
		border-radius: 50%;
		border-left-color: #09f;
		animation: spin 1s ease infinite;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.image-preview {
		max-width: 20%;
		height: auto;
		margin-top: 1%!important;
	}
</style>
