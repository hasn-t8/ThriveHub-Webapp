<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { writable, type Writable } from 'svelte/store';
	import type { ProfileData } from '$lib/types/Profile';
	import { API_BASE_URL } from '$lib/config';

	const slug = Number($page.params.slug);
	const blogs: Writable<any[]> = writable([]);


	let blog = writable({
		id: 0,
		author_id: 0,
		category_id: 0,
		title: '',
		content: '',
		created_at: '',
		updated_at: '',
		is_published: false,
		image_cover: null,
		image_thumbnail: null,
		category_name: ''
	});


	async function fetchBlogPost() {
		try {
			const response = await fetch(`${API_BASE_URL}/posts/${slug}`);
			if (!response.ok) {
				throw new Error('Failed to fetch blog post');
			}
			const data = await response.json();
			console.log('Fetched blog post:', data);
		blog.set(data);
		} catch (error) {
			console.error('Error fetching blog post:', error);
		} finally {
			console.log('Done Fetching Blog Post');
		}
	}


	// Fetch blogs from the API
	async function fetchBlogs() {
		try {
			const response = await fetch(`${API_BASE_URL}/posts`);
			const data = await response.json();
			blogs.set(data);
		} catch (error) {
			console.error('Error fetching blogs:', error);
		} finally {
			console.log('Done Fetching Blog Post');
		}
	}






	onMount(() => {
		fetchBlogPost();
		fetchBlogs();
	});
</script>


<!-- Category Section -->
<section class="category-banner">
	<div class="container">
		<nav class="breadcrumb is-small is-left" aria-label="breadcrumbs">
			<ul>
				<li><a href="/" class="has-text-white">Home</a></li>
				<li><a href="/user/blog/" class="has-text-white">Blog</a></li>
				<li class="is-active has-text-white">
					<a href="#" aria-current="page" class="has-text-white">{$blog.category_name}</a>
				</li>
			</ul>
		</nav>
		<h1 class="title mt-6 mb-6 has-text-white">{$blog.title}</h1>
	</div>
</section>



<div class="container">
	<div class="columns is-variable is-8">
		<!-- About Section -->
		<div class="column is-two-thirds">
			<div class="card">
				<div class="is-flex is-justify-content-center">
					<img style="max-width: 80%;height: 20rem;margin-top: 1rem;margin-bottom: 1rem;object-fit: contain;" src="{$blog.image_cover || '/assets/no_image.jpg'}" alt="{$blog.title}" />
				</div>
				<div class="content">
					{@html $blog.content}
				</div>
			</div>
		</div>

		<!-- Side Section -->
		<div class="column is-one-third">
			<div class="card">
				<h2>Other Related Blogs</h2>
				<ul>
					{#if $blogs.filter(blogItem => blogItem.category_name === $blog.category_name && blogItem.id !== $blog.id).length > 0}
						{#each $blogs.filter(blogItem => blogItem.category_name === $blog.category_name && blogItem.id !== $blog.id).slice(0, 4) as blogItem}
							<li class="is-flex is-flex-direction-column is-align-items-center">
								<img style="max-width: 80%;height: 10rem;margin-top: 1rem;margin-bottom: 1rem;object-fit: contain;" src="{blogItem.image_cover || '/assets/no_image.jpg'}" alt="{blogItem.title}" />
								<a class="title is-5 m-0" href="/user/blog/{blogItem.id}">
									{blogItem.title}
								</a>
								<hr class="is-divider is-light" style="width: 100%;margin-top:1.1rem;">
							</li>
						{/each}
					{:else}
						<p>No other blogs about {$blog.category_name}</p>
					{/if}
			</div>
		</div>
	</div>
</div>

<style>

.content-link,
	.media-left-link {
		cursor: pointer;
	}

    .tab-content {
        display: none;
    }
    .tab-content.is-active {
        display: block;
    }


	/* ========================================
   General CSS Starts Here
======================================== */
	.button.is-primary {
		background-color: #118cf6;
		height: 3rem;
	}

	.button.is-primary.is-hovered,
	.button.is-primary:hover {
		background-color: #ffffff;
		border-color: transparent;
		color: #118cf6;
	}

	.button.is-primary.is-outlined {
		background-color: transparent;
		border-color: #118cf6;
		color: #118cf6;
	}

	.button.is-primary.is-outlined.is-focused,
	.button.is-primary.is-outlined.is-hovered,
	.button.is-primary.is-outlined:focus,
	.button.is-primary.is-outlined:hover {
		background-color: #118cf6;
		border-color: #118cf6;
		color: #fff;
	}

	.pagination-link.is-current {
		background-color: #118cf6;
		border-color: #607af2;
		color: #fff;
	}




	/* ========================================
   Banner Section Page Styling Starts Here
======================================== */
	.breadcrumb {
		margin-top: 10px;
	}
	.category-banner {
		background-color: #2196f3; /* Match the blue shade */
		color: white;
		padding: 20px 10px;
		text-align: center;
	}

</style>