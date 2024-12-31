<script lang="ts">
	import { goto } from '$app/navigation';
	import { logout, loggedInStatus, setUserAndType, isAdmin  } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let jwtTokenFound = $state(false);

	let menuActive = false;
	function toggleMenu() {
		menuActive = !menuActive;
	}
	onMount(() => {
		setUserAndType();		
		jwtTokenFound = localStorage.getItem('authToken') ? true : false;
		if (jwtTokenFound) {
			if($page.url.pathname === '/user/auth/sign-in'){
				goto('/org/explore');
			}
		} else {
			console.log('User is not logged in.');
		}

	});

	function navigateToLogin() {
		// Save the current path before navigating to the login screen
		localStorage.setItem('previousPath', $page.url.pathname);
		goto('/user/auth/sign-in'); // Navigate to the login screen
	}

	function logoutHandler() {
		logout();
		jwtTokenFound = false;
		goto('/user/auth/sign-in');
	}
</script>

<!-- Navbar -->
<nav class="navbar has-shadow">
	<div class="container">
		<div class="navbar-brand">
			<a class="navbar-item" href="/">
				<img class="navbar-logo" src="/assets/logo.png" alt="Logo" style="max-height: 80px;" />
			</a>
			<!-- svelte-ignore a11y_missing_attribute -->
			<a
				role="button"
				class="navbar-burger"
				aria-label="menu"
				aria-expanded="false"
				data-target="navbarMenu"
			>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>
		<div id="navbarMenu" class="navbar-menu">
			<div class="navbar-end">
				<a class="navbar-item" href="/org/explore">Explore</a>
				<!-- <a class="navbar-item" href="#blog">Blog</a>
				<a class="navbar-item" href="#help">Help</a> -->
				<a class="navbar-item" href="/user/settings">Settings</a>
				{#if $isAdmin}
					<a class="navbar-item" href="/admin-area/business-list">Dashboard</a>
				{/if}
				{#if $loggedInStatus || jwtTokenFound}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_missing_attribute -->
					<a class="navbar-item" onclick={() => logoutHandler()}>Logout</a>
				{:else if $page.url.pathname === '/business/business-home'}
					<a class="navbar-item" href="/business/signup">Login</a>
				{:else}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_missing_attribute -->
					<a class="navbar-item" onclick={() => navigateToLogin()}>Login</a>
				{/if}
				{#if $page.url.pathname === '/business/business-home'}
					<div class="navbar-item">
						<a class="custom-button" href="/">For Users</a>
					</div>
				{:else}
					<div class="navbar-item">
						<a class="custom-button" href="/business/business-home">For Business</a>
					</div>
				{/if}
				<!-- <div class="navbar-item">
					<button class="custom-button">For Business</button>
				</div> -->
			</div>
		</div>
	</div>
</nav>

<style>
	/* Navbar styling */
	.navbar {
		height: 112px;
		background-color: white;
	}

	.navbar-burger {
		color: #000;
	}

	/* Logo styling */
	.navbar-logo {
		width: 193px;
		/* height: 51px; */
		padding: 0px 0 0 0;
		gap: 0;
	}

	/* Navigation item styling */
	.navbar-menu .navbar-item {
		font-family: 'Inter', sans-serif;
		font-size: 16px;
		font-weight: 500;
		line-height: 25px;
		letter-spacing: 0.38px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: black;
		margin-left: 20px;
	}

	/* Button styling */
	.custom-button {
		width: 180px;
		height: 44px;
		border-radius: 8px;
		border: 1px solid #6366f1;
		background-color: #118bf6;
		font-family: 'Inter', sans-serif;
		font-size: 16px;
		font-weight: 500;
		line-height: 18px;
		text-align: center;
		color: white;
		opacity: 1;
	}

	a.custom-button {
		padding-top: 11px;
	}

	.custom-button:hover {
		background-color: #0d6fca;
	}
</style>
