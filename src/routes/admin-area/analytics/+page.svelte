<script>
	import Sidemenu from '../components/Sidemenu.svelte';

	let searchQuery = '';
</script>

<div class="main-content">
	<Sidemenu />
	<!-- Analytics Header -->
	<div class="analytics-header">
		<div class="header-top">
			<h1>Hi, Alex</h1>
			<div class="search-bar">
				<i class="fas fa-search"></i>
				<input
					type="text"
					placeholder="Search reviews, feedback, analytics..."
					bind:value={searchQuery}
				/>
			</div>
		</div>
		<!-- Divider -->
		<hr class="divider" />
		<p>See what’s happening with <strong>bluehost.com</strong></p>
	</div>

	<!-- Stats Section -->
	<div class="stats-section">
		<div class="stat-card">
			<h2>View Profile</h2>
			<div class="stat-value-container">
				<div class="stat-value">12.7k</div>
				<span class="positive"><i class="fas fa-arrow-up"></i> 1.3%</span>
			</div>
			<div class="subtext">from 110 (last 4 weeks)</div>
		</div>
		<div class="stat-card">
			<h2>Follow the affiliate link</h2>
			<div class="stat-value-container">
				<div class="stat-value">111</div>
				<span class="positive"><i class="fas fa-arrow-up"></i> 9%</span>
			</div>
			<div class="subtext">from 20 (last 4 weeks)</div>
		</div>
		<div class="stat-card">
			<h2>Reviews</h2>
			<div class="stat-value-container">
				<div class="stat-value">6</div>
				<span class="negative"><i class="fas fa-arrow-down"></i> -2%</span>
			</div>
			<div class="subtext">from 20 (last 4 weeks)</div>
		</div>
	</div>
</div>

<style>
	.main-content {
		margin-left: 250px;
	}

	.analytics-header {
		padding: 20px;
		background-color: #f4faff;
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

	.search-bar {
		display: flex;
		align-items: center;
		background-color: #fff;
		border: 1px solid #dfe6ed;
		border-radius: 5px;
		padding: 10px 15px;
		width: 100%;
		max-width: 400px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.search-bar input {
		border: none;
		outline: none;
		flex: 1;
		font-size: 1rem;
		color: #333;
	}

	.search-bar i {
		color: #999;
		margin-right: 10px;
	}

	.analytics-header p {
		margin-top: 50px;
		font-size: 1.1rem;
		color: #666;
		margin-bottom: -28px;
	}

	.divider {
		border: none;
		height: 1px;
		background-color: #dfe6ed;
		margin: 20px 0;
	}

	.analytics-header p strong {
		color: #333;
	}

	.stats-section {
		display: flex;
		justify-content: space-between;
		gap: 2px;
		padding: 20px;
		border-radius: 10px;
		background-color: #f4faff;
	}

	.stat-card {
		flex: 1;
		background-color: #fff;
		border-radius: 10px;
		padding: 20px;
		text-align: justify;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.stat-card h2 {
		font-size: 14px;
		font-weight: bold;
		color: #333;
		margin-bottom: 10px;
	}

	.stat-value-container {
		display: flex;
		align-items: center;
		gap: 150px;
		margin-bottom: 10px;
	}

	.stat-value {
		font-size: 24px;
		font-weight: bold;
		color: #333;
	}

	.positive {
		color: #28a745;
		font-size: 1rem;
		font-weight: bolder;
	}

	.negative {
		color: #dc3545;
		font-size: 1rem;
		font-weight: bolder;
	}

	.subtext {
		font-size: 0.8rem;
		color: #666;
		margin-top: 5px;
	}
</style>
