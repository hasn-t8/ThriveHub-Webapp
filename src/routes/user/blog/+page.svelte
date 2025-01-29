<script lang="ts">
	import { getProfilesPublic } from '$lib/stores/business';
	import { onMount } from 'svelte';
	import { writable, get, type Writable, derived } from 'svelte/store';
	import type { ProfileData } from '$lib/types/Profile';
	import { goto } from '$app/navigation';
	import { API_BASE_URL } from '$lib/config';

	// Stores
	let blogs = writable([]);
	let isLoading = writable(false);
	let currentPage = writable(1);
	const itemsPerPage = 6;

	// Utility function to format dates
	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function viewBlog(id: number | undefined) {
		if (!id) {
			console.error('Blog ID is undefined');
			alert('Failed to edit: Blog ID is missing.');
			return;
		}
		window.location.href = `/user/blog/${id}`;
	}


	// Fetch blogs from the API
	async function fetchBlogs() {
		isLoading.set(true);
		try {
			const response = await fetch(`${API_BASE_URL}/posts`);
			const data = await response.json();
			blogs.set(data);
		} catch (error) {
			console.error('Error fetching blogs:', error);
		} finally {
			isLoading.set(false);
		}
	}

	onMount(() => {
		fetchBlogs();
	});

	let activeTab: Writable<string> = writable("all-posts"); // Default active tab

	const tabs = [
		{ id: "all-posts", label: "All posts" },
		{ id: "profile", label: "Profile" },
		{ id: "review", label: "Review" },
		{ id: "about", label: "About Thrive Hub" },
		{ id: "privacy", label: "Privacy" }
	];

	// Derived store to filter blogs by the active tab
	const filteredBlogs = derived([blogs, activeTab], ([$blogs, $activeTab]: [any[], string]) => {
		if ($activeTab === "all-posts") return $blogs;
		return $blogs.filter(blog => blog.category_name.toLowerCase() === $activeTab);
	});

	// Derived store for paginated blogs
	const currentBlogs = derived([filteredBlogs, currentPage], ([$filteredBlogs, $currentPage]) => {
		const start = ($currentPage - 1) * itemsPerPage;
		return $filteredBlogs.slice(start, start + itemsPerPage);
	});

	// Total pages calculation
	const totalPages = derived(filteredBlogs, $filteredBlogs => Math.ceil($filteredBlogs.length / itemsPerPage));

	// Function to change pages
	function changePage(delta: number) {
		currentPage.update(page => {
			const newPage = page + delta;
			return newPage >= 1 && newPage <= get(totalPages) ? newPage : page;
		});
	}
</script>

<!-- Loading Spinner -->
{#if $isLoading}
	<div class="spinner-overlay">
		<div class="spinner"></div>
	</div>
{/if}

<!-- Category Section -->
<section class="category-banner">
	<div class="container">
		<nav class="breadcrumb is-small is-left" aria-label="breadcrumbs">
			<ul>
				<li><a href="/" class="has-text-white">Home</a></li>
				<li class="is-active has-text-white">
					<a href="#" aria-current="page" class="has-text-white">Blog</a>
				</li>
			</ul>
		</nav>
		<h1 class="title mt-6 mb-3 has-text-white">Blog</h1>
		<p class="mb-6" style="width: 50%; margin:auto;">
			Stay informed with the latest reviews, tips, and insights to make smarter decisions. Our blog provides valuable content to help you navigate the world of products and services.
		</p>
	</div>
</section>

<!-- Tabs Section -->
<section class="section" style="padding-bottom: 1.5rem;">
	<div class="container">
		<div class="tabs is-centered">
			<ul class="is-justify-content-space-evenly">
				{#each tabs as tab}
					<li
						class:is-active={$activeTab === tab.id}
						on:click={() => {
							activeTab.set(tab.id);
							currentPage.set(1); // Reset to first page on tab change
						}}
					>
						<a>{tab.label}</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<!-- Blog Content Section -->
<section class="section" style="padding-top: 0;">
	<div class="container">
		<div class="columns is-multiline">


			{#each $currentBlogs as blog}
				<div class="column is-one-third">
					<div>
						<button class="card" on:click={() => viewBlog(blog.id)} aria-label="View Blog">
							<div class="card-content">
								<img src="{blog.image_thumbnail || '/assets/no_image.jpg'}" alt="{blog.title}" />
							</div>
						</button>
						<div>
							<p class="has-text-grey-light">{formatDate(blog.created_at)}</p>
							<button class="title is-5" on:click={() => viewBlog(blog.id)}>{blog.title}</button>
							<p class="subtitle is-6">{blog.excerpt}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Pagination -->
		<nav class="pagination is-centered" role="navigation" aria-label="pagination">
			<button
				class="pagination-previous"
				on:click={() => changePage(-1)}
				disabled={get(currentPage) === 1}
			>
				Previous
			</button>
			<button
				class="pagination-next"
				on:click={() => changePage(1)}
				disabled={get(currentPage) === get(totalPages)}
			>
				Next
			</button>
		</nav>
	</div>
</section>

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



	.pagination-container {
		display: flex;
		justify-content: center;
		padding-top: 20px;
		padding-bottom: 20px;
	}

	.pagination-arrow {
		font-size: 18px;
		cursor: pointer;
		color: black;
		all: unset;
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		color: inherit;
		cursor: pointer;
	}

	.pagination-arrow.double-arrow {
		color: #b08888; /* Light black */
	}

	.pagination {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.pagination-link {
		padding: 5px 10px;
		cursor: pointer;
		user-select: none;
		color: black;
		border: 1px solid rgb(193, 193, 193);
		border-radius: 5px;
		background-color: transparent;
		transition:
			background-color 0.3s,
			border-color 0.3s;
	}

	.pagination-link:hover,
	.pagination-link.is-current {
		background-color: #118cf6;
		color: white;
		border-color: #118cf6;
	}

	.pagination-link.disabled {
		pointer-events: none;
		opacity: 0.5;
	}

	@media screen and (max-width: 768px) {
		.media-right {
			display: none !important;
		}

		.category-tag {
			padding: 0.8rem;
			max-width: 100%;
			border-radius: 11px;
		}

		.review-btn {
			display: inline-flex !important;
			width: 100%;
		}
	}

	.card {
		border-color: transparent!important;
		cursor: pointer!important;
	}

	.card-content {
		padding: 0;
		display:flex;
		justify-content: center;
		max-height: 13rem;
		height: 13rem;
	}

	.card-content img {
		object-fit: contain;
	}


	.title{
		background-color: transparent;
		border: none;
		cursor: pointer!important;
		padding:0!important;
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
