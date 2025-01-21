<script lang="ts">
	import Toast from '../lib/components/Toasts.svelte';

	let { children }: { children: any } = $props();

</script>
 
<Toast />

<main>
	{@render children()}
</main>
