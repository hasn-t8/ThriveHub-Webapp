<!-- <script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Sidemenu from '../../admin-area/components/Sidemenu.svelte';
	import { getProfiles, saveProfile } from '$lib/stores/profile';

	// Writable store for user profile
	let profile = writable({
		fullName: '',
		email: '',
		dob: '',
		phone: '',
		location: '',
		address: '',
		city: '',
		postalCode: '',
		profileImage: ''
	});

	// Utility function to format date to "yyyy-MM-dd"
	/**
	 * @param {string | number | Date} dateString
	 */
	function formatDateToYMD(dateString) {
		if (!dateString) return ''; // Handle null or undefined dates
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	// Fetch profile from backend
	async function fetchProfile() {
		try {
			// Fetch the profiles for the logged-in user
			const response = await getProfiles();
			console.log('Fetched profiles:', response);

			// Handle cases where the response might have different formats
			const profiles = Array.isArray(response) ? response : response?.profiles || response?.data;

			if (!profiles || !Array.isArray(profiles)) {
				throw new Error('Invalid profiles data structure');
			}

			// Find the personal profile (if necessary)
			const personalProfile = profiles.find((profile) => profile.profile_type === 'personal');
			console.log('Personal profile:', personalProfile);

			if (!personalProfile) {
				console.warn('No personal profile found for the current user.');
				// Set empty default values if no profile is found
				profile.set({
					fullName: '',
					email: '',
					dob: '',
					phone: '',
					location: '',
					address: '',
					city: '',
					postalCode: '',
					profileImage: ''
				});
				return;
			}

			// Update the writable store with the fetched profile data
			const updatedProfile = {
				fullName: personalProfile.full_name || '',
				email: personalProfile.email || '',
				dob: formatDateToYMD(personalProfile.date_of_birth),
				phone: personalProfile.phone_number || '',
				location: personalProfile.address_line_1 || '',
				address: personalProfile.address_line_2 || '',
				city: personalProfile.address_city || '',
				postalCode: personalProfile.address_zip_code || '',
				profileImage: personalProfile.img_profile_url || ''
			};

			// Save to localStorage
			localStorage.setItem('profile', JSON.stringify(updatedProfile));
			profile.set(updatedProfile);

			console.log('Updated profile store:', updatedProfile);
		} catch (error) {
			console.error('Error fetching profile data:', error);
		}
	}

	// Save the user's profile information
	async function handleSaveProfile() {
		try {
			const currentProfile = $profile;
			console.log('Saving profile:', currentProfile);

			// Save profile to backend
			const result = await saveProfile(currentProfile);
			console.log('Profile saved successfully:', result);

			// Save the updated profile in localStorage
			localStorage.setItem('profile', JSON.stringify(currentProfile));
			alert('Profile saved successfully!');
		} catch (error) {
			console.error('Error saving profile:', error);
			alert('Failed to save profile. Please try again.');
		}
	}

	// Load profile from localStorage on component mount
	onMount(() => {
		const savedProfile = localStorage.getItem('profile');
		if (savedProfile) {
			console.log('Loaded profile from localStorage:', savedProfile);
			profile.set(JSON.parse(savedProfile));
		} else {
			// Fetch from backend if no cached data exists
			fetchProfile();
		}
	});
</script> -->

<section class="section user-profile">
<!-- <div class="main-content"> -->
	<div class="analytics-header">
		<div class="header-top">
			<h1>Terms and Conditions Preview</h1> <!-- Correctly displays the full name -->
		</div>
    </div>
		<!-- Divider -->
		<hr class="divider" />


		<div class="container">
			<h1 class="title">TERMS OF USE</h1>
			<div class="field">
				<label class="label">Last updated January 22, 2025    </label>
            </div>

            <h1 class="headings">AGREEMENT TO OUR LEGAL TERMS</h1>
            
            <section class="content">
                <p>
                  We are Thrive Hub <strong> ("Company," "we," "us," "our").</strong>
                </p>
          
                <p class="content">
                  We operate the website <a href="https://www.thrivehub.ai">https://www.thrivehub.ai</a>(the <strong> "Site" </strong>) , the mobile
                  application Thrive Hub (the <strong> "App" </strong>), as well as any other related products and services that refer or link to these legal terms (the <strong> "Legal Terms" </strong>)
                  (collectively, the <strong>  "Services"</strong>).
                </p>
          
                <p class="content">
                  You can contact us by phone at (+1)4084202526, email at <a href="mailto:Ops@thrivehub.ai">Ops@thrivehub.ai</a>,
                  or by mail to 2600 Michelson Dr #1500, Irvine, CA 92612, United States.
                </p>
          
                <p class="content">
                  These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (<strong> "you" </strong>), and Thrive Hub,
                  concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING
                  THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                </p>
          
                <p class="content">
                  We will provide you with prior notice of any scheduled changes to the Services you are using. The modified Legal Terms will become effective upon
                  posting or notifying you by <a href="mailto:Ops@thrivehub.ai">Ops@thrivehub.ai</a>, as stated in the email
                  message. By continuing to use the Services after the effective date of any changes, you agree to be bound by the modified terms.
                </p>
          
                <p class="content">
                  The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
                </p>
          
                <p class="content">
                  We recommend that you print a copy of these Legal Terms for your records.
                </p>

       
      <h1 class="headings">TABLE OF CONTENTS</h1>
      <div class="table-of-contents">
        <a href="#our-services">1. OUR SERVICES</a><br>
        <a href="#intellectual-property-rights">2. INTELLECTUAL PROPERTY RIGHTS</a><br>
        <a href="#user-representations">3. USER REPRESENTATIONS</a><br>
        <a href="#user-registration">4. USER REGISTRATION</a><br>
        <a href="#products">5. PRODUCTS</a><br>
        <a href="#purchases-and-payment">6. PURCHASES AND PAYMENT</a><br>
        <a href="#subscriptions">7. SUBSCRIPTIONS</a><br>
        <a href="#return-refunds-policy">8. RETURN/REFUNDS POLICY</a><br>
        <a href="#software">9. SOFTWARE</a><br>
        <a href="#prohibited-activities">10. PROHIBITED ACTIVITIES</a><br>
        <a href="#user-generated-contributions">11. USER GENERATED CONTRIBUTIONS</a><br>
        <a href="#contribution-license">12. CONTRIBUTION LICENSE</a><br>
        <a href="#guidelines-for-reviews">13. GUIDELINES FOR REVIEWS</a><br>
        <a href="#mobile-application-license">14. MOBILE APPLICATION LICENSE</a><br>
        <a href="#social-media">15. SOCIAL MEDIA</a><br>
        <a href="#third-party-websites-and-content">16. THIRD-PARTY WEBSITES AND CONTENT</a><br>
        <a href="#advertisers">17. ADVERTISERS</a><br>
        <a href="#services-management">18. SERVICES MANAGEMENT</a><br>
        <a href="#privacy-policy">19. PRIVACY POLICY</a><br>
        <a href="#term-and-termination">20. TERM AND TERMINATION</a><br>
        <a href="#modifications-and-interruptions">21. MODIFICATIONS AND INTERRUPTIONS</a><br>
        <a href="#governing-law">22. GOVERNING LAW</a><br>
        <a href="#dispute-resolution">23. DISPUTE RESOLUTION</a><br>
        <a href="#corrections">24. CORRECTIONS</a><br>
        <a href="#disclaimer">25. DISCLAIMER</a><br>
        <a href="#limitations-of-liability">26. LIMITATIONS OF LIABILITY</a><br>
        <a href="#indemnification">27. INDEMNIFICATION</a><br>
        <a href="#user-data">28. USER DATA</a><br>
        <a href="#electronic-communications">29. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND</a><br>
        <a href="#sms-text-messaging">30. SMS TEXT MESSAGING</a><br>
        <a href="#california-users-and-residents">31. CALIFORNIA USERS AND RESIDENTS</a><br>
        <a href="#miscellaneous">32. MISCELLANEOUS</a><br>
        <a href="#contact-us">33. CONTACT US</a>
      </div>
      <h2 id="our-services">1. OUR SERVICES</h2>
      <p class="content">
        The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
      </p>
      <p class="content">
        The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).
      </p>

     
      <h2 id="intellectual-property-rights">2. INTELLECTUAL PROPERTY RIGHTS</h2>
      <p class="content">
        <strong>Our intellectual property</strong>
      </p>
      <p class="content">
        We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").
      </p>
      <p class="content">
        Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.
      </p>
      <p class="content">
        The Content and Marks are provided in or through the Services "AS IS" for your internal business purpose only.
      </p>
      <p class="content">
        <strong>Your use of our Services</strong>
      </p>
      <p class="content">
        Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES" section below, we grant you a non-exclusive, non-transferable, revocable license to:
        <ul>
          <li>Access the Services; and</li>
          <li>Download or print a copy of any portion of the Content to which you have properly gained access, solely for your internal business purpose.</li>
        </ul>
    
      <p class="content">
        Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
      </p>
      <p class="content">
        If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to: <a href="mailto:Ops@thrivehub.ai">Ops@thrivehub.ai</a>. If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content.
      </p>
      <p class="content">
        We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.
      </p>
      <p class="content">
        Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.
      </p>
      <h3>Your submissions and contributions</h3>
      <p class="content">
        Please review this section and the "PROHIBITED ACTIVITIES" section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.
      </p>
      <h4>Submissions:</h4>
      <p class="content">
        By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services ("Submissions"), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.
      </p>
      <h4>Contributions:</h4>
      <p class="content">
        The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality during which you may create, submit, post, display, transmit, publish, distribute, or broadcast content and materials to us or through the Services, including but not limited to text, writings, video, audio, photographs, music, graphics, comments, reviews, rating suggestions, personal information, or other material ("Contributions"). Any Submission that is publicly posted shall also be treated as a Contribution.
      </p>
      <p class="content">
        You understand that Contributions may be viewable by other users of the Services and possibly through third-party websites.
      </p>
      <h4>When you post Contributions, you grant us a license (including use of your name, trademarks, and logos):</h4>
      <p class="content">
        By posting any Contributions, you grant us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to: use, copy, reproduce, distribute, sell, resell, publish, broadcast, retitle, store, publicly perform, publicly display, reformat, translate, excerpt (in whole or in part), and exploit your Contributions (including, without limitation, your image, name, and voice) for any purpose, commercial, advertising, or otherwise, to prepare derivative works of, or incorporate into other works, your Contributions, and to sublicense the licenses granted in this section. Our use and distribution may occur in any media formats and through any media channels.
      </p>
      <p class="content">
        This license includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide.
      </p>
      <h4>You are responsible for what you post or upload:</h4>
      <p class="content">
        By sending us Submissions and/or posting Contributions through any part of the Services or making Contributions accessible through the Services by linking your account through the Services to any of your social networking accounts, you:
        <ul>
          <li>Confirm that you have read and agree with our "PROHIBITED ACTIVITIES" and will not post, send, publish, upload, or transmit through the Services any Submission nor post any Contribution that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading;</li>
          <li>To the extent permissible by applicable law, waive any and all moral rights to any such Submission and/or Contribution;</li>
          <li>Warrant that any such Submission and/or Contributions are original to you or that you have the necessary rights and licenses to submit such Submissions and/or Contributions and that you have full authority to grant us the above-mentioned rights in relation to your Submissions and/or Contributions; and</li>
          <li>Warrant and represent that your Submissions and/or Contributions do not constitute confidential information.</li>
        </ul>
    
      <p class="content">
        You are solely responsible for your Submissions and/or Contributions and you expressly agree to reimburse us for any and all losses that we may suffer because of your breach of (a) this section, (b) any third party’s intellectual property rights, or (c) applicable law.
      </p>      <h4>We may remove or edit your Content:</h4>

      <p class="content">
        Although we have no obligation to monitor any Contributions, we shall have the right to remove or edit any Contributions at any time without notice if in our reasonable opinion we consider such Contributions harmful or in breach of these Legal Terms. If we remove or edit any such Contributions, we may also suspend or disable your account and report you to the authorities.
      </p>
      <h2 id="user-representations">3. USER REPRESENTATIONS</h2>
      <p class="content">By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Legal Terms; (4) you are not a minor in the jurisdiction in which you reside; (5) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (6) you will not use the Services for any illegal or unauthorized purpose; and (7) your use of the Services will not violate any applicable law or regulation.</p>
      <p class="content">If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).</p>
      <h2 id="user-registration">4. USER REGISTRATION</h2>
      <p class="content">You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.</p>
      <h2 id="products">5. PRODUCTS</h2>
      <p class="content">We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Services. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products. All products are subject to availability, and we cannot guarantee that items will be in stock. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.</p>
      <h2 id="purchases-and-payment">6. PURCHASES AND PAYMENT</h2>
      <p class="content">We accept the following forms of payment:</p>
      <ul>
        <li>Visa</li>
        <li>Mastercard</li>
        <li>Discover</li>
        <li>American Express</li>
        <li>PayPal</li>
      </ul>
      <p class="content">
        You agree to provide current, complete, and accurate purchase and account
        information for all purchases made via the Services. You further agree to
        promptly update account and payment information, including email address,
        payment method, and payment card expiration date, so that we can complete
        your transactions and contact you as needed. Sales tax will be added to the
        price of purchases as deemed required by us. We may change prices at any
        time. All payments shall be in US dollars.
      </p>
      <p class="content">
        You agree to pay all charges at the prices then in effect for your purchases
        and any applicable shipping fees, and you authorize us to charge your
        chosen payment provider for any such amounts upon placing your order. We
        reserve the right to correct any errors or mistakes in pricing, even if we have
        already requested or received payment.
      </p>
      <p class="content">
        We reserve the right to refuse any order placed through the Services. We
        may, in our sole discretion, limit or cancel quantities purchased per person,
        per household, or per order. These restrictions may include orders placed by
        or under the same customer account, the same payment method, and/or
        orders that use the same billing or shipping address. We reserve the right to
        limit or prohibit orders that, in our sole judgment, appear to be placed by
        dealers, resellers, or distributors.
      </p>

      <h2 id="subscriptions">7. SUBSCRIPTIONS</h2>
      <h3>Billing and Renewal</h3>
      <p class="content">
        Your subscription will continue and automatically renew unless canceled. You
        consent to our charging your payment method on a recurring basis without
        requiring your prior approval for each recurring charge, until such time as you
        cancel the applicable order. The length of your billing cycle is monthly.
      </p>
      <h3>Free Trial</h3>
      <p class="content">
        We offer a 30-day free trial to new users who register with the Services. The
        account will be charged according to the user's chosen subscription at the
        end of the free trial.
      </p>
      <h3>Cancellation</h3>
      <p class="content">
        You can cancel your subscription at any time by logging into your account.
        Your cancellation will take effect at the end of the current paid term. If you
        have any questions or are unsatisfied with our Services, please email us at
        <a href="mailto:Ops@thrivehub.ai">Ops@thrivehub.ai</a>.
      </p>
      <h3>Fee Changes</h3>
      <p class="content">
        We may, from time to time, make changes to the subscription fee and will
        communicate any price changes to you in accordance with applicable law.
      </p>

      <h2 id="return-refunds-policy">8. RETURN/REFUNDS POLICY</h2>
      <p class="content">All sales are final and no refund will be issued.</p>

      <h2 id="software">9. SOFTWARE</h2>
      <p class="content">
        We may include software for use in connection with our Services. If such
        software is accompanied by an end user license agreement ("EULA"), the
        terms of the EULA will govern your use of the software. If such software is
        not accompanied by a EULA, then we grant to you a non-exclusive,
        revocable, personal, and non-transferable license to use such software solely
        in connection with our services and in accordance with these Legal Terms.
      </p>
      <p class="content">
        Any software and any related documentation is provided "AS IS" without
        warranty of any kind, either express or implied, including, without limitation,
        the implied warranties of merchantability, fitness for a particular purpose, or
        non-infringement. You accept any and all risk arising out of use or
        performance of any software. You may not reproduce or redistribute any
        software except in accordance with the EULA or these Legal Terms.
      </p>

      <h2 id="prohibited-activities">10. PROHIBITED ACTIVITIES</h2>
      <p class="content">
        You may not access or use the Services for any purpose other than that for
        which we make the Services available. The Services may not be used in
        connection with any commercial endeavors except those that are specifically
        endorsed or approved by us.
      </p>
      <h3>As a user of the Services, you agree not to:</h3>
      <ul>
        <li>Systematically retrieve data or other content from the Services to
          create or compile, directly or indirectly, a collection, compilation,
          database, or directory without written permission from us.</li>
        <li>Trick, defraud, or mislead us and other users, especially in any attempt
          to learn sensitive account information such as user passwords.</li>
        <li>Circumvent, disable, or otherwise interfere with security-related
          features of the Services, including features that prevent or restrict the
          use or copying of any Content or enforce limitations on the use of the
          Services and/or the Content contained therein.</li>
        <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the
          Services.</li>
        <li>Use any information obtained from the Services in order to harass,
          abuse, or harm another person.</li>
        <li>Make improper use of our support services or submit false reports of
          abuse or misconduct.</li>
        <li>Use the Services in a manner inconsistent with any applicable laws or
          regulations.</li>
        <li>Engage in unauthorized framing of or linking to the Services.</li>
        <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan
          horses, or other material, including excessive use of capital letters and
          spamming (continuous posting of repetitive text), that interferes with
          any party’s uninterrupted use and enjoyment of the Services or
          modifies, impairs, disrupts, alters, or interferes with the use, features,
          functions, operation, or maintenance of the Services.</li>
        <li>Engage in any automated use of the system, such as using scripts to
          send comments or messages, or using any data mining, robots, or
          similar data gathering and extraction tools.</li>
        <li>Delete the copyright or other proprietary rights notice from any
          Content.</li>
        <li>Attempt to impersonate another user or person or use the username of
          another user.</li>
        <li>Upload or transmit (or attempt to upload or to transmit) any material
          that acts as a passive or active information collection or transmission
          mechanism, including without limitation, clear graphics interchange
          formats ("gifs"), 1×1 pixels, web bugs, cookies, or other similar devices
          (sometimes referred to as "spyware" or "passive collection
          mechanisms" or "pcms").</li>
        <li>Interfere with, disrupt, or create an undue burden on the Services or
          the networks or services connected to the Services.</li>
        <li>Harass, annoy, intimidate, or threaten any of our employees or agents
          engaged in providing any portion of the Services to you.</li>
        <li>Attempt to bypass any measures of the Services designed to prevent
          or restrict access to the Services, or any portion of the Services.</li>
        <li>Copy or adapt the Services' software, including but not limited to
          Flash, PHP, HTML, JavaScript, or other code.</li>
        <li>Except as permitted by applicable law, decipher, decompile,
          disassemble, or reverse engineer any of the software comprising or in
          any way making up a part of the Services.</li>
        <li>Except as may be the result of standard search engine or Internet
          browser usage, use, launch, develop, or distribute any automated
          system, including without limitation, any spider, robot, cheat utility,
          scraper, or offline reader that accesses the Services, or use or launch
          any unauthorized script or other software.</li>
        <li>Use a buying agent or purchasing agent to make purchases on the
          Services.</li>
        <li>Make any unauthorized use of the Services, including collecting
          usernames and/or email addresses of users by electronic or other
          means for the purpose of sending unsolicited email, or creating user
          accounts by automated means or under false pretenses.</li>
        <li>Use the Services as part of any effort to compete with us or otherwise
          use the Services and/or the Content for any revenue-generating
          endeavor or commercial enterprise.</li>
        <li>Use the Services to advertise or offer to sell goods and services.</li>
        <li>Sell or otherwise transfer your profile.</li>
      </ul>
    </div>

</section>

            
<style>

  
    .header-top {
      text-align: center;
      font-size: 24px;
      font-family: Arial, sans-serif;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 20px;
    }
      .header-top h1{
        text-align: center;
      font-size: 28px;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 20px;

      }
  
    .divider {
      border: none;
      height: 1px;
      background-color: #dfe6ed;
      margin: 20px 0;
    }
  .headings{
    /* text-align: center; */
      font-size: 20px;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 20px;
      margin-top: 40px;
  }
    .container {
      background: #fff;
      padding: 50px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      line-height: 1.6;
      width: 70%;
    }
  
    .intro {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }
  
    .content {
      margin-bottom: 15px;
      font-size: 16px;
    }
  
    a {
      color: #007bff;
      text-decoration: none;
    }
  .title{
    margin-top: 40px;

  }
    a:hover {
      text-decoration: underline;
    }
</style>
