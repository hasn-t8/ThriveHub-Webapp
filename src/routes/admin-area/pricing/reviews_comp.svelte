<div class="reviews-container">
	<h2 class="reviews-title">Reviews about us</h2>
	<div class="reviews-boxes">
		<div class="review-box">
			<div class="review-header">
				<div class="review-left">
					<img src="https://via.placeholder.com/40" alt="Alice Palmer" class="review-image" />
					<div>
						<p class="review-name">Alice Palmer</p>
						<p class="review-rating">4.9 <span>⭐</span></p>
					</div>
				</div>
				<div class="review-right">
					<p class="review-time">1 day ago</p>
					<p class="review-location">USA</p>
				</div>
			</div>
			<h3 class="review-title">GoDaddy</h3>
			<p class="review-description">
				Good service. Been looking for a similar one for a long time. Good service. Been looking...
			</p>
			<div class="review-footer">
				<div class="review-actions">
					<span>❤️ 23</span>
					<span>🔗 Share</span>
				</div>
			</div>
		</div>

		<div class="review-box">
			<div class="review-header">
				<div class="review-left">
					<img src="https://via.placeholder.com/40" alt="Alice Palmer" class="review-image" />
					<div>
						<p class="review-name">Alice Palmer</p>
						<p class="review-rating">4.9 <span>⭐</span></p>
					</div>
				</div>
				<div class="review-right">
					<p class="review-time">1 day ago</p>
					<p class="review-location">USA</p>
				</div>
			</div>
			<h3 class="review-title">GoDaddy</h3>
			<p class="review-description">
				Good service. Been looking for a similar one for a long time. Good service. Been looking...
			</p>
			<div class="review-footer">
				<div class="review-actions">
					<span>❤️ 23</span>
					<span>🔗 Share</span>
				</div>
			</div>
		</div>

		<div class="review-box">
			<div class="review-header">
				<div class="review-left">
					<img src="https://via.placeholder.com/40" alt="Alice Palmer" class="review-image" />
					<div>
						<p class="review-name">Alice Palmer</p>
						<p class="review-rating">4.9 <span>⭐</span></p>
					</div>
				</div>
				<div class="review-right">
					<p class="review-location">USA</p>
					<p class="review-time">1 day ago</p>
				</div>
			</div>
			<h3 class="review-title">GoDaddy</h3>
			<p class="review-description">
				Good service. Been looking for a similar one for a long time. Good service. Been looking...
			</p>
			<div class="review-footer">
				<div class="review-actions">
					<span>❤️ 23</span>
					<span>🔗 Share</span>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.reviews-container {
		width: 1440px;
		height: 504px;
		background: var(--Main-Blue);
		margin: 0 auto;
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.reviews-title {
		color: var(--White);
		font-family: Arial, sans-serif;
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 20px;
		align-self: start;
		margin-left: 100px;
	}

	.reviews-boxes {
		display: flex;
		gap: 20px;
		justify-content: center;
		align-items: center;
	}

	.review-box {
		width: 386px;
		height: 256px;
		background: var(--White);
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.review-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.review-left {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.review-right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		font-size: 12px;
		color: var(--Text-Gray);
	}

	.review-time {
		margin: 0;
	}

	.review-location {
		margin: 0;
	}

	.review-image {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.review-name {
		font-size: 16px;
		font-weight: bold;
		margin: 0;
	}

	.review-rating {
		font-size: 14px;
		color: var(--Text-Gray);
		margin: 0;
	}

	.review-title {
		font-size: 16px;
		font-weight: bold;
		margin: 10px 0 5px;
	}

	.review-description {
		font-size: 14px;
		color: var(--Text-Gray);
		margin: 0;
	}

	.review-footer {
		display: flex;
		justify-content: flex-start;
		font-size: 14px;
		color: var(--Text-Gray);
	}

	.review-actions span {
		margin-left: 10px;
		cursor: pointer;
	}
</style>
