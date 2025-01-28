<script lang="ts">
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';

	let { children }: { children: any } = $props();

</script>
 
<Navbar /> 

<main>
	{@render children()}
</main>

<Footer />
