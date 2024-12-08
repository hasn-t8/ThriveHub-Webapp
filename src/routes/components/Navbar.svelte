<script lang="ts">
	import { goto } from '$app/navigation';
	import { logout, loggedInStatus } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let jwtTokenFound = $state(false);

	let menuActive = false;
	function toggleMenu() {
		menuActive = !menuActive;
	}
	onMount(() => {
		jwtTokenFound = localStorage.getItem('authToken') ? true : false;
	});

	function logoutHandler() {
		logout();
		jwtTokenFound = false;
		goto('/user/auth/sign-in');
	}
</script>

    <!-- Header -->
    <header class="navbar is-light is-flex">
        <div class="container navbar-container is-flex-direction-row is-flex">
            <div class="navbar-brand is-flex-grow-1">
                <a class="navbar-item" href="/">
                    <img src="/assets/logo.png" alt="Thrive Hub" width="112" height="28">
                </a>

                <!-- Menu for Search -->
                <a class="navbar-item navbar-icon-mobile mr-0 ml-auto" href="/" aria-label="search">
                    <i class="fas fa-search"></i> <!-- Replace with the desired icon -->
                </a>

                <!-- Hamburger menu -->
                <button class="navbar-burger ml-0" aria-label="menu" aria-expanded="false" data-target="navbarMenu" onclick={() => toggleMenu()}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
                
            </div>
            <div id="navbarMenu" class="navbar-menu">
                <div class="navbar-start">
                </div>
                <div class="navbar-end">
                    <a class="navbar-item" href="/org/explore">Explore</a>
                    <a class="navbar-item" href="/user/settings">Settings</a>
                    {#if $loggedInStatus || jwtTokenFound}
                        <button class="navbar-item button-as-link" onclick={() => logoutHandler()}>Logout</button>
                    {:else if $page.url.pathname === '/business/business-home'}
                        <a class="navbar-item" href="/business/signup">Login</a>
                    {:else}
                        <a class="navbar-item" href="/user/auth/sign-in">Login</a>
                    {/if}
                    {#if $page.url.pathname === '/business/business-home'}
                        <div class="navbar-item">
                            <a class="custom-button" href="/">For Users</a>
                        </div>
                        <a class="navbar-item" href="/">
                            <button class="button is-primary">For Users</button>
                        </a>
                    {:else}
                        <a class="navbar-item" href="/business/business-home">
                            <button class="button is-primary">For business</button>
                        </a>
                    {/if}
                </div>
            </div>
        </div>
    </header>

<style>
/* ========================================
   Header & Navbar CSS Starts Here
======================================== */
.navbar {
    background-color: #ffffff!important;
    min-height: 5.25rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-item img {
    max-height: 2.75rem;
    width: auto;
}

.navbar-item{
    flex-grow: 0;
    flex-shrink: 0;
    margin: 0% 5%;
    font-size: 0.9em;
    font-weight: 500;
}

.navbar-burger span {
    height: 2px;
    
}
.navbar-item button{
    padding-right: 2em;
    padding-left: 2em;
    font-size: 0.9em;
}

.navbar-burger {
    color: #118BF6!important;
}

.navbar-icon-mobile {
    display: none;
    color: #118BF6!important;
}

@media only screen and (max-width: 1023px) {
    .navbar-container {
        flex-direction: column!important;
    }

    .navbar-icon-mobile {
        display: flex;
    }
}


/* ========================================
   General CSS Starts Here
======================================== */
.button.is-primary {
    background-color: #118cf6;
}

.button.is-primary:hover {
    background-color: #ffffff;
    border-color: transparent;
    color: #118cf6;
}


</style>
