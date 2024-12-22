<script>
  import { onMount } from "svelte";
  	// @ts-ignore
  	import { API_BASE_URL } from '$lib/config'; // Assuming you have this in your config.ts

  let website = "";
  let companyName = "";
  let fullName = "";
  let jobTitle = "";
  let email = "";
  let password = "";
  let isButtonDisabled = true;
  let isLoading = false; // Tracks the loading state
  let errorMessage = ""; // Tracks errors during API call

  function validateForm() {
    isButtonDisabled = !website || !companyName || !fullName || !jobTitle || !email || !password;
  }

  async function createBusinessAccount() {
    // Clear previous error
    errorMessage = "";

    // Set loading state
    isLoading = true;
    const types = ['business-owner'];
     // Redirect to dashboard or another page
     window.location.href = "/business/business-category";
    try {
      // API request payload
      const payload = {
        website,
        companyName,
        fullName,
        jobTitle,
        email,
        password,
        types,
      };
      
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      

      // Handle response
      if (!response.ok) {
        throw new Error("Failed to create account. Please try again.");
      }

      const data = await response.json();

      // Store token in local storage
      if (data.token) {
        localStorage.setItem("authToken", data.token);

        // Redirect to dashboard or another page
        window.location.href = "/dashboard";
      } else {
        throw new Error("Authentication token not found in response.");
      }
    } catch (error) {
      // @ts-ignore
      errorMessage = error.message;
    } finally {
      // Reset loading state
      isLoading = false;
    }
  }

  onMount(() => {
    validateForm();
  });
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
        <h3 class="title is-4">Create Account</h3>
        <form on:submit|preventDefault={createBusinessAccount}>
          <div class="field">
            <label class="label">Business Website URL</label>
            <div class="control">
              <input
                class="input"
                type="url"
                bind:value={website}
                placeholder="Website"
                on:input={validateForm}
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Company Name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                bind:value={companyName}
                placeholder="Enter your company name"
                on:input={validateForm}
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Full Name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                bind:value={fullName}
                placeholder="Enter your full name"
                on:input={validateForm}
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Job Title</label>
            <div class="control">
              <input
                class="input"
                type="text"
                bind:value={jobTitle}
                placeholder="Enter your job title"
                on:input={validateForm}
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Work Email</label>
            <div class="control">
              <input
                class="input"
                type="email"
                bind:value={email}
                id="email"
                placeholder="Enter your email"
                on:input={validateForm}
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                class="input"
                type="password"
                bind:value={password}
                id="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button
            id="login-button"
            class="button is-fullwidth is-primary"
            style="color: white; background-color: #118BF6;"
            disabled={isButtonDisabled || isLoading}
          >
            {#if isLoading}
              <span class="loader"></span>
            {:else}
              Create Business Account
            {/if}
          </button>
        </form>
        {#if errorMessage}
          <p class="has-text-danger">{errorMessage}</p>
        {/if}
        <p class="has-text-centered">
          Already have an account? <a href="/user/auth/sign-in">Log In</a>
        </p>
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
