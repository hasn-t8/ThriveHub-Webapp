<script lang="ts">
	import { fade } from 'svelte/transition';
	import { toasts, removeToast } from '../stores/toasts';
	import type { Toast } from '../stores/toasts';

	// Subscribe to the toasts store
	let notifications: Toast[] = [];
	$: notifications = $toasts;
</script>

<div class="toasts-container">
	{#each notifications as { id, message, type }}
		<div class="notification {type}" in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
      <button class="delete" on:click={() => removeToast(id)} aria-label="Close notification"></button>
			{message}
		</div>
	{/each}
</div>

<style>
	.toasts-container {
		position: fixed;
		top: 1rem;
		right: 1rem;
		z-index: 1050; /* Higher than most other elements */
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
