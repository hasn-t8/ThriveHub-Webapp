<script lang="ts">
	import { onMount } from 'svelte';
	import { getProfileById } from '$lib/stores/business';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import type { ProfileData } from '$lib/types/Profile';
	
	let theProfile = writable<ProfileData>({
		org_name: '',
		job_title: '',
		work_email: '',
		about_business: '',
		full_name: '',
		industry: '',
		business_website_url: '',
		business_website_title: '',
		business_profile_id: null,
		profile_type: '',
		category: '',
		id: '',
		logo_url: ''
	});

	async function fetchProfile(): Promise<void> {
		try {
			const slug = Number($page.params.slug);
			const profile: ProfileData = await getProfileById(slug);
			theProfile.set(profile);
		} catch (error) {
			console.error('Error fetching profiles:', error);
		}
	}

	onMount(() => {
		
		fetchProfile()
	});
</script>

<section class="page-header">
	<h1>Bluehost</h1>
</section>

<div class="container">
	<div class="columns is-variable is-8">
		<!-- About Section -->
		<div class="column is-two-thirds">
			<div class="card">
				<h2>About {$theProfile.org_name}</h2>
				<p>
					{$theProfile.about_business}
				</p>
			</div>
			<div class="card">
				<h2>Employee Reviews</h2>
				<div class="review-stars"></div>
			</div>
		</div>

		<!-- Contact Information and Map Section -->
		<div class="column is-one-third">
			<div class="card">
				<h3>Contact Information</h3>
				<p class="contact-item">
					<span class="link-container">
						<img
							src="/assets/internet-icon.png"
							alt="WWW Icon"
							class="www-icon"
						/>
						<a href="{$theProfile.business_website_url}" target="_blank" class="website-link"
							>Go to Website</a
						>
						<span class="arrow">↗</span>
					</span>
				</p>

				<p class="contact-item">
					<img src="/assets/mail.png" alt="Email Icon" class="icon" />
					<a href="mailto:support@bluehost.com">support@bluehost.com</a>
				</p>
				<p class="contact-item">
					<img src="/assets/phone.png" alt="Phone Icon" class="icon" />
					+1 123-456-7890
				</p>
				<p class="contact-item">
					<img
						src="/assets/Frame 1321316461.png"
						alt="Address Icon"
						class="icon"
					/>
					123 Example St, Suite 22, Los Angeles, CA 90001
				</p>
				<div class="map-container">
					<!-- svelte-ignore a11y_missing_attribute -->
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094103!2d144.9559283158441!3d-37.817209979751554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43b091d3b1%3A0xbbf63a5d6fbe0e3e!2s123%20Example%20St%2C%20Los%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1632713282110!5m2!1sen!2sus"
					></iframe>
				</div>
				<h3>Industries</h3>
				<div class="tags">
					<span class="tag is-primary">Tech</span>
					<span class="tag is-primary">Web Hosting Services</span>
				</div>
				<h3>Company Size</h3>
				<p>1K - 5K Employees</p>
				<h3>Funding</h3>
				<p>Series C: 22 Million</p>
			</div>
		</div>
	</div>
</div>
