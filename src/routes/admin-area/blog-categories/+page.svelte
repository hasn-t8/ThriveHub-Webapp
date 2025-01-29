<script lang="ts">
	import Sidemenu from '../components/Sidemenu.svelte';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { API_BASE_URL } from '$lib/config';


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
			console.error('Error fetching categories:', error);
		} finally {
			isLoading.set(false);
		}
	}

	async function addCategory(name: string) {
		isLoading.set(true);
		try {
			const response = await fetch(`${API_BASE_URL}/categories`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name })
			});
			if (!response.ok) {
				throw new Error('Failed to add category');
			}
			// Refresh the categories list after adding a new category
			fetchCategories();
		} catch (error) {
			isError.set(true);
			console.error('Error adding category:', error);
		} finally {
			isLoading.set(false);
			isSuccess.set(true);
		}
	}

	let editingCategory: { id: number; name: string } | null = null;

	async function updateCategory(id: number, name: string) {
		isLoading.set(true);
		try {
			const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name })
			});
			if (!response.ok) {
				throw new Error('Failed to update category');
			}
			// Refresh the categories list after updating a category
			fetchCategories();
			editingCategory = null; // Reset editing state
		} catch (error) {
			isError.set(true);
			console.error('Error updating category:', error);
		} finally {
			isLoading.set(false);
			isSuccess.set(true);
		}
	}

	function handleEditCategory(category: { id: number; name: string }) {
		const input = document.querySelector('input[type="text"]') as HTMLInputElement;
		const button = document.querySelector('button.add-button') as HTMLButtonElement;
		const cancelButton = document.querySelector('button.cancel-button') as HTMLButtonElement;
		if (input && button && cancelButton) {
			input.value = category.name;
			editingCategory = category;
			button.textContent = 'Update';
			cancelButton.style.display = 'inline-block'; // Show the cancel button
		}
	}

	function handleCancelEdit() {
		const input = document.querySelector('input[type="text"]') as HTMLInputElement;
		const button = document.querySelector('button.add-button') as HTMLButtonElement;
		const cancelButton = document.querySelector('button.cancel-button') as HTMLButtonElement;
		if (input && button && cancelButton) {
			input.value = '';
			editingCategory = null;
			button.textContent = 'Add Category';
			cancelButton.style.display = 'none'; // Hide the cancel button
		}
	}

	function handleAddOrUpdateCategory() {
		const input = document.querySelector('input[type="text"]') as HTMLInputElement;
		const button = document.querySelector('button.add-button') as HTMLButtonElement;
		const cancelButton = document.querySelector('button.cancel-button') as HTMLButtonElement;
		if (input && input.value.trim()) {
			if (editingCategory) {
				updateCategory(editingCategory.id, input.value.trim());
				button.textContent = 'Add Category'; // Rename button back to "Add Category"
				cancelButton.style.display = 'none'; // Hide the cancel button
			} else {
				addCategory(input.value.trim());
			}
			input.value = '';
		}
	}


	async function deleteCategory(id: number) {
		isLoading.set(true);
		try {
			const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
				method: 'DELETE'
			});
			if (!response.ok) {
				throw new Error('Failed to delete category');
			}
			// Refresh the categories list after deleting a category
			fetchCategories();
		} catch (error) {
			isError.set(true);
			console.error('Error deleting category:', error);
		} finally {
			isLoading.set(false);
			isSuccess.set(true);
		}
	}


	onMount(() => {
		fetchCategories();
	});
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
			<span style="font-size:1.5rem">Blog Categories</span>
		</div>
		<hr class="divider" />
	</div>
	<div class="category-list-container">

		{#if $isSuccess}
			<div class="notification is-success" in:fade={{ duration: 0 }} out:fade={{ duration: 1000 }} on:introend={() => setTimeout(() => isSuccess.set(false), 3000)}>
				Created/Updated category successfully!
			</div>
		{/if}
	
		{#if $isError}
			<div class="notification-error is-danger" in:fade={{ duration: 0 }} out:fade={{ duration: 1000 }} on:introend={() => setTimeout(() => isSuccess.set(false), 3000)}>
				Error Occured!
			</div>
		{/if}

		<div class="header">
			<h1>All Categories</h1>
		</div>

		<div>
			<div class="field has-addons mb-5">
				<div class="control is-expanded">
					<input class="input" type="text" placeholder="New category name">
				</div>
				<div class="control">
					<button class="button add-button is-primary" on:click={handleAddOrUpdateCategory}>Add Category</button>
					<button class="button cancel-button is-danger" on:click={handleCancelEdit}>Cancel</button>
				</div>
			</div>
		</div>

		<div>
		{#if $categories.length > 0}
			<table class="table is-striped is-hoverable is-fullwidth">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th style="width: 12.7rem;">Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each $categories as category (category.id)}
						<tr>
							<td>{category.id}</td>
							<td>{category.name}</td>
							<td class="is-flex is-justify-content-space-between">
								<button class="button is-warning" on:click={() => handleEditCategory(category)}>Update</button>
								<button class="button is-danger" on:click={() => deleteCategory(category.id)}>Delete</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p>No categories available.</p>
		{/if}
		</div>
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
	.category-list-container {
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

	.cancel-button {	
		display: none;
		border-bottom-left-radius: 4px!important;
		border-top-left-radius: 4px!important;
	}

	.category-list {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	.category-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #f9f9f9;
		border-radius: 5px;
		padding: 15px;
		margin-bottom: 10px;
	}

	.category-item img {
		width: 50px;
		height: 50px;
		border-radius: 5px;
		margin-right: 15px;
	}

	.category-info {
		flex-grow: 1;
	}

	.category-name {
		font-weight: bold;
		font-size: 18px;
	}

	.category-category {
		color: gray;
		font-size: 14px;
	}

	.category-actions button {
		margin-left: 10px;
		padding: 8px 12px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-size: 14px;
	}

	.category-actions .edit {
		background-color: #ffc107;
		color: #fff;
	}

	.category-actions .deletebutton {
		background-color: #dc3545;
		color: #fff;
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

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.notification {
	    margin: auto;
    	width: 20rem;
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

</style>
