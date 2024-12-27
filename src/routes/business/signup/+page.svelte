<script lang="ts">
  import { goto } from '$app/navigation';
  import { API_BASE_URL } from '$lib/config';
  import { Email } from '$lib/stores/business';



  let fullName = '';
  let companyName = '';
  let website = '';
  let jobTitle = '';
  let email = '';
  let password = '';
  let isButtonDisabled = true;
  let message = '';
  let isError = false;

  // Reactive validation for enabling/disabling the submit button
  $: isButtonDisabled = !(fullName.trim() && companyName.trim() && website.trim() && jobTitle.trim() && email.trim() && password.trim());

  // Handle form submission
  async function handleBusinessSignUp(event: Event) {
      event.preventDefault();
      console.log('Form submitted:', { fullName, companyName, website, jobTitle, email, password });

      const types = ['business-owner'];

      try {
          const response = await fetch(`${API_BASE_URL}/auth/register`, {
              method: 'POST',
              headers: {
                  accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  email,
                  password,
                  types,
                  full_name: fullName,
                  org_name: companyName,
                  job_title: jobTitle,
                  business_website_url: website
              })
          });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Failed to create account.');
          }

          const data = await response.json();
          console.log('Business account created:', data);

          isError = false;
          message = data.message || 'Business account created successfully!';

          // Clear form fields
          fullName = '';
          companyName = '';
          website = '';
          jobTitle = '';
          // email = '';
          password = '';
// Update the writable store
Email.set(email);
goto('/business/business-verify');
          // Redirect to the business dashboard
          // goto('/business/business-otp');
      } catch (error) {
          isError = true;
          message = error instanceof Error ? error.message : 'An unexpected error occurred.';
      }
  }
</script>


<!-- Main Content -->
<div class="container">
  <div class="columns is-vcentered">
    <!-- Left Section -->
    <div class="column is-half info-section">
      <div class="cards">
        {#each [
          {
            icon: "/assets/1.png",
            title: "Seamless Search Experience",
            text: "Harness the power of AI to uncover top-rated reviews and recommendations with unparalleled ease.",
          },
          {
            icon: "/assets/2.png",
            title: "Authentic User Perspectives",
            text: "Gain valuable insights from real users sharing their honest experiences with products and services.",
          },
          {
            icon: "/assets/3.png",
            title: "AI-Driven Review Summaries",
            text: "Transform countless reviews into clear, meaningful summaries to simplify your decision-making process.",
          },
          {
            icon: "/assets/4.png",
            title: "Unfiltered and Reliable Feedback",
            text: "Make confident choices backed by unbiased, trustworthy reviews from genuine users.",
          },
        ] as item}
          <div class="info-item">
            <div class="info-icon">
              <img src={item.icon} alt="Icon" />
            </div>
            <div class="info-text">
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
    <!-- Right Section -->
    <div class="column is-half">
      <div class="login-card">
        <h3 class="title is-4">Create Business Account</h3>
        <form on:submit={handleBusinessSignUp}>
            <div class="field">
                <label class="label has-text-weight-medium" for="fullName">Full Name</label>
                <div class="control">
                    <input
                        class="input custom-input"
                        type="text"
                        id="fullName"
                        placeholder="Enter your full name"
                        bind:value={fullName}
                    />
                </div>
            </div>
            <div class="field">
                <label class="label has-text-weight-medium" for="companyName">Company Name</label>
                <div class="control">
                    <input
                        class="input custom-input"
                        type="text"
                        id="companyName"
                        placeholder="Enter your company name"
                        bind:value={companyName}
                    />
                </div>
            </div>
            <div class="field">
                <label class="label has-text-weight-medium" for="website">Website</label>
                <div class="control">
                    <input
                        class="input custom-input"
                        type="url"
                        id="website"
                        placeholder="Enter your business website"
                        bind:value={website}
                    />
                </div>
            </div>
            <div class="field">
                <label class="label has-text-weight-medium" for="jobTitle">Job Title</label>
                <div class="control">
                    <input
                        class="input custom-input"
                        type="text"
                        id="jobTitle"
                        placeholder="Enter your job title"
                        bind:value={jobTitle}
                    />
                </div>
            </div>
            <div class="field">
                <label class="label has-text-weight-medium" for="email">Email</label>
                <div class="control">
                    <input
                        class="input custom-input"
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        bind:value={email}
                    />
                </div>
            </div>
            <div class="field">
                <label class="label has-text-weight-medium" for="password">Password</label>
                <div class="control">
                    <input
                        class="input custom-input"
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        bind:value={password}
                    />
                </div>
            </div>
            <button
                class="button is-primary is-medium is-fullwidth"
                disabled={isButtonDisabled}
            >
                Create Business Account
            </button>
            {#if message}
                <p class="has-text-centered {isError ? 'has-text-danger' : 'has-text-success'}">
                    {message}
                </p>
            {/if}
        </form>
    </div>
    </div>
  </div>
</div>


<style>
 .loader {
    border: 3px solid #f3f3f3;
    border-radius: 50%;
    border-top: 3px solid #118BF6;
    width: 14px;
    height: 14px;
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
/* Global Styles */

  .container {
    max-width: 1200px;
    margin: auto;
  }
  .info-section {
    margin-top: 2rem;
  }
  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    width: 80%;
  }
  .info-text h4 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  .info-text p {
    font-size: large;
    color: #6b6b6b;
  }
  .field {
    border-radius: 11px;
  }
  .login-card {
    padding: 2rem;
    background: white;
    border-radius: 19px;
    margin: 55px;
    width: 90%;
    margin-top: 100px;
    margin-bottom: 145px;
  }
  .login-card .button {
    margin-top: 1rem;
  }
  .cards {
    margin-top: -39%;
  }
  .info-text {
    padding-left: 15px;
  }
  img {
    height: auto;
    max-width: 122%;
  }
  a {
    color: #060606;
    cursor: pointer;
    font-weight: 600;
  }
  .button.is-primary {
    background-color: lightgrey;
    border-color: transparent;
    color: gray;
    border-radius: 11px;
  }
  button.button.is-fullwidth {
    font-weight: 600;
    padding: 22px;
    margin-bottom: 20px;
  }
  .button.is-primary :hover {
    background-color: rgb(0, 110, 184);
  }
  .info-icon {
    padding-right: 11px;
  }
 
</style>
