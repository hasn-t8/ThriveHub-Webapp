<script lang="ts">
	let faqs = [
		{
			question: 'What is included in the Free plan?',
			description:
				"The Free plan offers basic features like limited review responses and basic analytics. It's perfect for small businesses just starting out.",
			isOpen: false
		},
		{
			question: 'How do I upgrade or downgrade my plan?',
			description:
				'You can easily upgrade or downgrade your plan from your account settings. Changes will take effect immediately.',
			isOpen: false
		},
		{
			question: 'What happens if I exceed my review response limit?',
			description:
				'If you exceed your monthly review response limit, you can either upgrade your plan or purchase additional response credits.',
			isOpen: false
		},
		{
			question: 'How do I access advanced analytics and insights?',
			description:
				"Advanced analytics and insights are available in the Premium plan. You can access them through the 'Analytics' section of your dashboard.",
			isOpen: false
		},
		{
			question: 'What is the difference between Basic and Premium plans?',
			description:
				'The Basic plan offers essential features like advanced analytics and increased review response limits. The Premium plan provides additional benefits such as priority support, custom branding, and advanced analytics.',
			isOpen: false
		},
		{
			question: 'Can I cancel my subscription at any time?',
			description:
				'Yes, you can cancel your subscription at any time. However, please note that refunds are not available for unused portions of your subscription.',
			isOpen: false
		},
		{
			question: 'How do I contact support?',
			description:
				'You can contact our support team by submitting a ticket through your account or by emailing us at info@thrivehub.ai',
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

<style>
	/* @media print, screen and (min-width: 769px) {
		.column.is-4,
		.column.is-4-tablet {
			flex: none;
			width: 29.333333%;
		}
	} */

	.icon {
		color: #000000;
	}

	:root {
		--Main-Blue: #118bf6;
		--White: #ffffff;
		--Text-Gray: #555555;
	}

	.faq-container {
		background-color: #e7f3fe;
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

</style>