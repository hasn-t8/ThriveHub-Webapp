<script lang="ts">
	let isMonthly = true;

	const togglePlan = (plan: string) => {
		isMonthly = plan === 'monthly';
	};
    let faqs = [
        {
            question: "What is included in the Free plan?",
            description: "The Free plan offers basic features like limited review responses and basic analytics. It's perfect for small businesses just starting out.",
            isOpen: false
        },
        {
            question: "How do I upgrade or downgrade my plan?",
            description: "You can easily upgrade or downgrade your plan from your account settings. Changes will take effect immediately.",
            isOpen: false
        },
        {
            question: "What happens if I exceed my review response limit?",
            description: "If you exceed your monthly review response limit, you can either upgrade your plan or purchase additional response credits.",
            isOpen: false
        },
        {
            question: "How do I access advanced analytics and insights?",
            description: "Advanced analytics and insights are available in the Premium plan. You can access them through the 'Analytics' section of your dashboard.",
            isOpen: false
        },
        {
            question: "What is the difference between Basic and Premium plans?",
            description: "The Basic plan offers essential features like advanced analytics and increased review response limits. The Premium plan provides additional benefits such as priority support, custom branding, and advanced analytics.",
            isOpen: false
        },
        {
            question: "Can I cancel my subscription at any time?",
            description: "Yes, you can cancel your subscription at any time. However, please note that refunds are not available for unused portions of your subscription.",
            isOpen: false
        },
        {
            question: "How do I contact support?",
            description: "You can contact our support team by submitting a ticket through your account or by emailing us at info@thrivehub.ai",
            isOpen: false
        }
    ];

    const toggleFaq = (index: number) => {
        faqs = faqs.map((faq, i) => ({
            ...faq,
            isOpen: i === index ? !faq.isOpen : faq.isOpen
        }));
    };


    
</script>

<div class="analytics-header">
	<!-- <hr class="divider" /> -->
	<div class="heading">Choose a Plan</div>

	<!-- Toggle -->
	<div class="toggle-container">
		<div class="toggle-wrapper">
			<div class="toggle">
				<button
					class={`toggle-button ${isMonthly ? 'active' : ''}`}
					on:click={() => togglePlan('monthly')}
				>
					Monthly
				</button>
				<button
					class={`toggle-button ${!isMonthly ? 'active' : ''}`}
					on:click={() => togglePlan('annually')}
				>
					Annually
				</button>
			</div>
		</div>
		<div class="muted-text">Save 55%</div>
	</div>

	{#if isMonthly}
		<div id="monthly-plans" class="flex">
			<!-- Monthly plan cards here -->

			<!-- Cards -->
			<div class="columns is-centered">
				<!-- Free Plan -->
				<div class="column is-4">
					<div class="card">
						<div class="card-content">
							<div class="package-name">Free</div>
							<div class="price">$0<span>/m</span></div>
							<!-- <div class="description">Let's open up more opportunities for your business</div> -->
							<button class="button active">Your current plan</button>
							<div class="icons">
								
								<div class="icon-item">
									<span class="icon"><i class="far fa-star"></i></span>
									<strong>Reviews</strong>
									<div class="info">Up to 5 review responses/month.</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="fa fa-chart-bar"></i></span>
									<strong>Reviews management</strong>
									<div class="info">Basic analytics.</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="far fa-bell"></i></span>
									<strong>Notifications</strong>
									<div class="info">
										Basic notifications
									</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="fa fa-paint-brush"></i></span>
									<strong>Custom Branding</strong>
									<div class="info">Limited.</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="column is-4">
				<div class="recommended">
					<div class="h2">Recommended</div>

					<!-- Basic Plan -->
					
						<div class="card">
							<!-- <div class="recommended-badge">Recommended</div> -->
							<div class="card-content">
								<div class="package-name">Basic</div>
								<div class="price">$15<span>/m</span></div>
								<!-- <div class="description">Let's open up more opportunities for your business</div> -->
								<button class="button">Get Basic</button>
								<div class="icons">
									
									<div class="icon-item">
										<span class="icon"><i class="far fa-star"></i></span>
										<strong>Reviews</strong>
										<div class="info">Up to 10 review responses/month.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fa fa-chart-bar"></i></span>
										<strong>Reviews management</strong>
										<div class="info">Advanced analytics and insights.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="far fa-bell"></i></span>
										<strong>Notifications</strong>
										<div class="info">
											Basic notifications.
										</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fa fa-paint-brush"></i></span>
										<strong>Custom Branding</strong>
										<div class="info">Basic.</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- Premium Plan -->
				<div class="column is-4">
					<div class="card">
						<div class="card-content">
							<div class="package-name">Premium</div>
							<div class="price">$40<span>/m</span></div>
							<!-- <div class="description">Let's open up more opportunities for your business</div> -->
							<button class="button">Get Premium</button>
							<div class="icons">
								
								<div class="icon-item">
									<span class="icon"><i class="far fa-star"></i></span>
									<strong>Reviews</strong>
									<div class="info">Unlimited review responses</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="fa fa-chart-bar"></i></span>
									<strong>Review management</strong>
									<div class="info">Advanced analytics, custom reports, and trend forecasting.</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="far fa-bell"></i></span>
									<strong>Notifications</strong>
									<div class="info">
										Priority notifications and alerts.
									</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="fa fa-paint-brush"></i></span>
									<strong>Custom Branding</strong>
									<div class="info">Advanced.</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div id="annual-plans" class="flex">
			<!-- Annual plan cards here -->

			<div class="columns is-centered">
				<!-- Free Plan -->
				<div class="column is-4">
					<div class="card">
						<div class="card-content">
							<div class="package-name">Free</div>
							<div class="price">$0<span>/m</span></div>
							<!-- <div class="description">Let's open up more opportunities for your business</div> -->
							<button class="button active">Your current plan</button>
							<div class="icons">
								
								<div class="icon-item">
									<span class="icon"><i class="far fa-star"></i></span>
									<strong>Reviews</strong>
									<div class="info">Up to 5 review responses/month.</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="fa fa-chart-bar"></i></span>
									<strong>Reviews management</strong>
									<div class="info">Basic analytics.</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="far fa-bell"></i></span>
									<strong>Notifications</strong>
									<div class="info">
										Basic notifications
									</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="fa fa-paint-brush"></i></span>
									<strong>Custom Branding</strong>
									<div class="info">Limited.</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="column is-4">
				<div class="recommended">
					<div class="h2">Recommended</div>

					<!-- Basic Plan -->
					
						<div class="card">
							<!-- <div class="recommended-badge">Recommended</div> -->
							<div class="card-content">
								<div class="package-name">Basic</div>
								<div class="price">$149<span>/m</span></div>
								<!-- <div class="description">Let's open up more opportunities for your business</div> -->
								<button class="button">Get Basic</button>
								<div class="icons">
									
									<div class="icon-item">
										<span class="icon"><i class="far fa-star"></i></span>
										<strong>Reviews</strong>
										<div class="info">Up to 10 review responses/month.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fa fa-chart-bar"></i></span>
										<strong>Reviews management</strong>
										<div class="info">Advanced analytics and insights.</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="far fa-bell"></i></span>
										<strong>Notifications</strong>
										<div class="info">
											Basic notifications.
										</div>
									</div>
									<div class="icon-item">
										<span class="icon"><i class="fa fa-paint-brush"></i></span>
										<strong>Custom Branding</strong>
										<div class="info">Basic.</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- Premium Plan -->
				<div class="column is-4">
					<div class="card">
						<div class="card-content">
							<div class="package-name">Premium</div>
							<div class="price">$160<span>/m</span></div>
							<!-- <div class="description">Let's open up more opportunities for your business</div> -->
							<button class="button">Get Premium</button>
							<div class="icons">
								
								<div class="icon-item">
									<span class="icon"><i class="far fa-star"></i></span>
									<strong>Reviews</strong>
									<div class="info">Unlimited review responses</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="fa fa-chart-bar"></i></span>
									<strong>Review management</strong>
									<div class="info">Advanced analytics, custom reports, and trend forecasting.</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="far fa-bell"></i></span>
									<strong>Notifications</strong>
									<div class="info">
										Priority notifications and alerts.
									</div>
								</div>
								<div class="icon-item">
									<span class="icon"><i class="fa fa-paint-brush"></i></span>
									<strong>Custom Branding</strong>
									<div class="info">Advanced.</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>



<div class="custom-container">
    <h2 class="custom-heading">Need More? Let's Talk Custom</h2>
    <p class="custom-subheading">
        If you have specific needs that aren't met by our standard plans, we offer <b>custom solutions</b>  to help you achieve your business goals.
        <br /><br />
       <b>Here's how it works</b>
    </p> 
    <div class="custom-boxes">
        <div class="custom-box">
            <div class="icon">
                <img src="/assets/p1.png" alt="Share Your Vision Icon" />
            </div>
            <h3 class="box-title">Share Your Vision</h3>
            <p class="box-description">Tell us about your unique requirements and challenges.</p>
        </div>
        <div class="custom-box">
            <div class="icon">
                <img src="/assets/p2.png" alt="Collaborate with Our Experts Icon" />
            </div>
            <h3 class="box-title">Collaborate with Our Experts</h3>
            <p class="box-description">Our team will work closely with you to understand your needs and propose tailored solutions.</p>
        </div>
        <div class="custom-box">
            <div class="icon">
                <img src="/assets/p3.png" alt="Get a Personalized Quote Icon" />
            </div>
            <h3 class="box-title">Get a Personalized Quote</h3>
            <p class="box-description">We'll provide you with a customized quote based on your specific requirements.</p>
        </div>
        <div class="custom-box">
            <div class="icon">
                <img src="/assets/p4.png" alt="Contact Sales Team Icon" />
            </div>
            <h3 class="box-title">Ready to discuss your custom needs?</h3>
            <p class="box-description">Contact our sales team today.</p>
        </div>
    </div>
</div>



<div class="faq-container">
    <h2 class="faq-heading">FAQ</h2>
    {#each faqs as faq, index}
        <div>
            <div class="faq-item" on:click={() => toggleFaq(index)}>
                <div class="faq-question">{faq.question}</div>
                <span class="icon {faq.isOpen ? 'rotate' : ''}">+</span>
            </div>
            {#if faq.isOpen}
                <div class="faq-description">
                    {faq.description}
                </div>
            {/if}
        </div>
    {/each}
</div>
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
.analytics-header {
		padding: 20px;
		/* background-color: #f4faff; */
	}

	.header-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	
	.heading {
		font-size: 36px;
		font-weight: 700;
		text-align: center;
		margin-bottom: 15px;
		color: #000
	}

	.toggle-wrapper {
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
		margin: auto;
	}

	.toggle {
		background-color: #e7f3fe; /* Matches the background color */
		border: 2px solid #000; /* Black border */
		border-radius: 25px;
		display: flex;
		align-items: center; /* Centers the button vertically inside the border */
		justify-content: space-between; /* Spreads the toggle buttons evenly */
		width: 250px;
		height: 35px; /* Slightly increased height for better spacing */
		position: relative;
		cursor: pointer;
		box-sizing: border-box; /* Includes padding and border in total dimensions */
	}

	.toggle-button {
		flex: 1;
		background-color: transparent;
		text-align: center;
		line-height: 30px; /* Vertically centers the text */
		font-size: 0.9rem;
		color: #000; /* Black text */
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
		border-radius: 25px; 
		padding: 0; /* Removes padding for exact centering */
	}

	.toggle-button.active {
		background-color: #000; /* Black inside the active toggle */
		color: #fff; /* White text for contrast */
		border-radius: 25px; /* Ensures a smooth rounded appearance */
	}

	.toggle-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: fit-content;
		margin: auto;
		padding-bottom: 100px;
	}

	@media print, screen and (min-width: 769px) {
		.column.is-4,
		.column.is-4-tablet {
			flex: none;
			width: 29.333333%;
		}
	}
	/* Muted shaded text */
	.muted-text {
		background-color: #f0f0f0; /* Light gray muted background */
		color: #555; /* Muted text color */
		padding: 0.3rem 0.7rem; /* Smaller padding for a compact look */
		font-size: 0.85rem; /* Slightly smaller font size */
		font-weight: bold;
		border-radius: 3px; /* Subtle rounded edges */
		text-align: center;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Light shadow */
		align-self: center; /* Ensures it's vertically aligned with the toggle */
		margin-bottom: 3px; /* Slight padding from the bottom */
	}
	.info {
		padding-left: 30px;
		padding-bottom: -3px;
		color: #4D4D4D;
		/* letter-spacing: 0px; */
		/* text-align: justify; */
		/* padding: 14px; */
	}
	.card-content {
		padding: 10px;
	}
	button.button.active {
		background-color: #B7B7B7;
	}

	.recommended {
		background-color: #118bf6;
		border-radius: 18px;
		/* height: auto;
		margin-bottom: 177px; */
		color: white;
		margin-top: -54px;
	}
	.card {
		position: relative;
		width: 445px;
		height: 500px;
		border-radius: 18px;
		color: #000;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}
	.card1 {
		position: relative;
		width: 355px;
		height: 625px;
		border-radius: 18px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
		background-color: white;
		color: #000;
		/* margin-top: 53px; */
	}
	.hidden {
		display: none;
	}

	.h2 {
		font-size: 28px;
		text-align: center;
		font-weight: 600;
		margin-top: 10px;
	}

	.package-name {
		text-align: center;
		font-size: 24px;
		font-weight: 600;
		padding: 16px;
	}

	.card:hover {
		transform: scale(1.02);
	}

	.price {
		font-size: 40px;
		font-weight: bold;
		text-align: center;
		/* margin: 10px 0; */
		margin-top: -12px;
		margin-bottom: 11px;
	}
	.description {
		padding-left: 30px;
		text-align: center;
		padding-bottom: 22px;
		color: darkgray;
	}

	.button {
		width: 95%;
		border-radius: 13px;
		padding: 0.6rem 1rem;
		background-color: #3273dc;
		color: white;
		font-size: 16px;
		transition: background-color 0.3s ease;
		margin-left: 10px;

		padding: 12px;
		/* padding-left: 13px; */
		/* align-content: center; */
	}

	.button:hover {
		background-color: #285ba1;
	}

	.icons {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.description {
		padding-left: 30px;
	}

	.icon {
		color: #000000;
	}

	strong {
		font-weight: bold;
	}



    :root {
        --Main-Blue: #118BF6;
        --White: #FFFFFF;
        --Text-Gray: #555555;
    }

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
        margin-left:100px ;
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




    .faq-container {
        background-color: #E7F3FE;
        width: 1440px;
        height: auto;
        margin: 0 auto;
        padding: 20px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    .faq-heading {
        text-align: center;
        font-family: Inter, sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 28.8px;
        margin-bottom: 20px;
    }

    .faq-item {
        width: 800px;
        height: 62px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: transparent;
        border-top: 4px solid #fff;
        border-bottom: 2px solid #fff;
        padding: 0 20px;
        /* margin: 5px 0; */
        cursor: pointer;
    }

    .faq-question {
        font-family: Inter, sans-serif;
        font-size: 18px;
        font-weight: 700;
        line-height: 21.6px;
        text-align: left;
        color: #000;
    }

    .icon {
        font-size: 24px;
        transition: transform 0.3s ease-in-out;
    }

    .icon.rotate {
        transform: rotate(45deg);
    }

    .faq-description {
        width: 800px;
        font-family: Inter, sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 22.4px;
        text-align: left;
        color: #555;
        margin-top: 10px;
    }

    :root {
        --Dark-Gray: #272727;
        --White: #ffffff;
        --Font-Family: 'Inter', sans-serif;
    }

    .custom-container {
        width: 100%;
        height: 657px;
        color: #272727;
        background-color: var(--White);
        margin: 0 auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .custom-heading {
        font-family: var(--Font-Family);
        font-size: 36px;
        font-weight: 700;
        line-height: 43.2px;
        text-align: center;
        margin-bottom: 20px;
        color: #272727;
    }

    .custom-subheading {
        font-family: var(--Font-Family);
        font-size: 24px;
        font-weight: 400;
        line-height: 28.8px;
        text-align: center;
        color: var(--Dark-Gray);
        margin-bottom: 40px;
        padding: 0 70px;
    }

    .custom-boxes {
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap; /* Adjust layout for smaller screens */
    }

    .custom-box {
        width: 282px;
        height: 247px;
        padding: 40px;
        background-color: var(--White);
        box-shadow: 0px 2px 12px 0px rgba(20, 20, 43, 0.08);
        border-radius: 10px;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        text-align: center;
    }

    .icon img {
        width: 48px; /* Adjust icon size */
        height: 48px;
        object-fit: contain;
    
    }

    .box-title {
        font-family: var(--Font-Family);
        font-size: 18px;
        font-weight: 600;
        /* line-height: 24px; */
        color: var(--Dark-Gray);
    }

    .box-description {
        font-family: var(--Font-Family);
        font-size: 14px;
        font-weight: 400;
        /* line-height: 20px; */
        color: var(--Dark-Gray);
        padding: 0 10px;
    }
</style>
