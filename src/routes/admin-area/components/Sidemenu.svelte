<script>
	import { goto } from "$app/navigation";

	// import { goto } from "$app/navigation";
	import { logout } from "$lib/stores/auth";

	let isDropdownOpen = false;

	function logoutHandler() {
		logout();
		goto('/');
	}
</script>

<div class="side-menu" style="min-height:100vh">

	<!-- Menu Items -->
	<ul class="menu-list" style="margin-top: 100px;">
		<a href="/" class="menu-item">
			<i class="icon fas fa-home"></i> Home
		</a>
		<!-- <a href="#reviews" class="menu-item">
			<i class="icon fas fa-star"></i> Reviews
		</a>
		<a href="/admin-area/analytics" class="menu-item">
			<i class="icon fas fa-chart-bar"></i> Analytics
		</a>
		<a href="#notifications" class="menu-item">
			<i class="icon fas fa-bell"></i> Notifications
		</a>
		<a href="#support" class="menu-item">
			<i class="icon fas fa-life-ring"></i> Support Center
		</a>
		<hr /> -->
		<a href="/admin-area/business-list" class="menu-item">
			<i class="icon fas fa-briefcase"></i> Business List
		</a>	
		<a href="/admin-area/reviews-list" class="menu-item">
			<i class="icon fas fa-briefcase"></i> Reviews List
		</a>
		<a href="/admin-area/add-company" class="menu-item"
			><i class="icon fas fa-briefcase"></i>Add business</a
		>
		<hr />
		<!-- <a href="/business/business-setting/setting" class="menu-item">
			<i class="icon fas fa-cog"></i> Settings
		</a> -->
		<a href="#" class="menu-item" onclick={logoutHandler}>
			<i class="icon fa fa-door-open"></i> Logout
		</a>
	</ul>

	<!-- Footer -->
	<div class="side-menu-footer">
		<p>Your plan: <strong>Free</strong></p>
		<button class="upgrade-button">Upgrade now</button>
		<div class="logo">
			<img src="/assets/thrivehub-logo.png" alt="Thrive Hub Logo" />
		</div>
	</div>
</div>

<div class="main-content"></div>

<style>
	.icon {
		margin-right: 5px
	}

	.menu-item:hover {
		color: white;
	}

	.side-menu {
		width: 250px;
		height: auto;
		background-color: #007bff;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		color: #fff;
		padding: 20px 10px;
		padding-left: 35px;
	}

	.side-menu-header {
		font-size: 1.2rem;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
		padding-top: 28px;
		padding-bottom: 48px;
		position: relative;
		cursor: pointer;
	}

	.dropdown {
		position: absolute;
		top: 60px;
		left: 0;
		width: 100%;
		display: none;
		background-color: #0056b3;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		z-index: 10;
	}

	.dropdown.open {
		display: block;
	}

	.dropdown a {
		display: block;
		padding: 10px 15px;
		font-size: 0.9rem;
		color: #fff;
		text-decoration: none;
		transition: background-color 0.3s ease;
	}

	.dropdown a:hover {
		background-color: #004494;
	}

	.menu-list {
		list-style: none;
		padding: 0;
		margin: 0;
		margin-left: -23px;
	}

	.menu-list a {
		color: #fff;
	}

	.menu-item {
		display: flex;
		align-items: center;
		padding: 10px 15px;
		border-radius: 5px;
		margin-bottom: 10px;
		font-size: 18px;
		color: #fff;
		text-decoration: none;
		transition: background-color 0.3s ease;
	}

	.menu-item:hover {
		background-color: #0056b3;
	}

	.menu-item i {
		margin-right: 10px;
		font-size: 1.2rem;
	}

	.menu-item.active {
		background-color: #0056b3;
	}

	.side-menu-footer {
		margin-top: auto;
	}

	.side-menu-footer p {
		font-size: 0.9rem;
		color: #cce0ff;
		margin: 10px 0;
	}

	strong {
		color: #ffffff;
		font-weight: 750;
	}

	.side-menu-footer .upgrade-button {
		background-color: #fff;
		color: #007bff;
		border: none;
		border-radius: 5px;
		padding: 8px 15px;
		font-size: 0.9rem;
		font-weight: bold;
		width: 84%;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.side-menu-footer .upgrade-button:hover {
		background-color: #cce0ff;
		color: #0056b3;
	}

	.logo img {
		max-width: 200px;
		margin: 0 auto;
	}
</style>