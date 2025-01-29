<script lang="ts">
	import Sidemenu from '../components/Sidemenu.svelte';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { API_BASE_URL } from '$lib/config';
	
	let blogs: Writable<any[]> = writable([]);
	let isLoading = writable(false);

	function editBlog(id: number | undefined) {
		if (!id) {
			console.error('Blog ID is undefined');
			alert('Failed to edit: Blog ID is missing.');
			return;
		}
		window.location.href = `/admin-area/edit-blog/${id}`;
	}


	async function fetchBlogs() {
		isLoading.set(true);
		try {
			const response = await fetch(`${API_BASE_URL}/posts`);
			const data = await response.json();
			blogs.set(data);
			isLoading.set(false);
		} catch (error) {
			isLoading.set(false);
			console.error('Error fetching blogs:', error);
		}
	}

	onMount(() => {
		fetchBlogs();
	});
	
	function addBlog(): void {
		window.location.href = '/admin-area/add-blog';
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
			<span style="font-size:1.5rem">Blog List</span>
		</div>
		<hr class="divider" />
	</div>
	<div class="blog-list-container">
		<div class="header">
			<h1>All Blogs</h1>
			<button class="custom-button add-button" on:click={addBlog}>Add Blog</button>
		</div>

		<ul class="blog-list">
			<div class="blog-item">
				<div class="blog-info">
				{#each $blogs as blog}
					<li class="blog-item">
						<div class="blog-image">
							<img src={blog.image_thumbnail} alt="blog image" />
						</div>
						<div class="blog-info">
							<div class="blog-name">{blog.title}</div>
							<div class="blog-category">Category: {blog.category_name}</div>
							<div class="blog-status">Blog Status: {blog.is_published ? 'Published' : 'Unpublished'}</div>
						</div>
						<div class="blog-actions">
							<button class="custom-button edit" on:click={() => editBlog(blog.id)}>Edit Blog</button>
						</div>
						<hr>
					</li>
				{/each}
				</div>

			</div>
		</ul>
	</div>
</div>





<style>
	.main-content {
		margin-left: 200px;
	}
	.analytics-header {
		margin-left: 50px;
		padding: 20px;
		background-color: transparent;
	}
	.header-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.analytics-header h1 {
		font-size: 2rem;
		font-weight: bold;
		color: #333;
		margin: 0;
	}
	.divider {
		border: none;
		height: 1px;
		background-color: #dfe6ed;
		margin: 20px 0;
	}
	.blog-list-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.header .add-button {
		cursor: pointer;
	}
	.header .add-button:hover {
		background-color: #0056b3; /* Darker blue on hover */
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Adds a shadow effect */
	}
	.header .add-button:active {
		background-color: #004080; /* Even darker blue on click */
	}

	.blog-list {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	.blog-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #f9f9f9;
		border-radius: 5px;
		padding: 15px;
		margin-bottom: 10px;
	}

	.blog-item img {
		width: 15rem;
		height: auto;
		border-radius: 5px;
		margin-right: 15px;
	}

	.blog-info {
		flex-grow: 1;
	}

	.blog-name {
		font-weight: bold;
		font-size: 18px;
	}

	.blog-category {
		color: gray;
		font-size: 14px;
	}

	.blog-actions button {
		margin-left: 10px;
		padding: 8px 12px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-size: 14px;
	}

	.blog-actions .edit {
		background-color: #ffc107;
		color: #fff;
	}

	.blog-actions .deletebutton {
		background-color: #dc3545;
		color: #fff;
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

</style>
