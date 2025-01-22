<div class="spinner-container">
	<div class="spinner"></div>
</div>

<style>
	.cover {
		position: relative;
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f8f9fa;
	}

	.spinner-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(91, 127, 131, 0.5);
		z-index: 10;
	}

	.spinner {
		border: 4px solid rgba(255, 255, 255, 0.3);
		border-top: 4px solid #fff;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		animation: spin 1s linear infinite;
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
