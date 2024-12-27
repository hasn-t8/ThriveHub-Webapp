<script lang="ts">
	import { goto } from '$app/navigation';
  import { API_BASE_URL } from '$lib/config';

  let email = '';
  let emailError = '';

  function validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      emailError = email && !emailPattern.test(email) ? 'Please enter a valid email address.' : '';
  }

  async function sendCode() {
      if (!email) {
          emailError = 'Email is required.';
          return;
      }

      if (emailError) {
          return;
      }

      try {
          const response = await fetch(`${API_BASE_URL}/auth/activate-account/get-code`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email }),
          });

          if (response.ok) {
              const data = await response.json();
              alert(`Verification code sent successfully! Code: ${data.verificationCode}`);
              // Store the email for the next step
              localStorage.setItem('email', email);
              goto('/business/business-otp');

          } else {
              const errorData = await response.json();
              emailError = errorData.errors?.[0]?.msg || 'An error occurred.';
          }
      } catch (error) {
          console.error('Error:', error);
          emailError = 'Failed to send verification code.';
      }
  }
</script>



<style>
    /* Global Styles */
    body {
        font-family: 'Inter', sans-serif;
        background-color: #E7F3FE;
        height: auto;
    }

    .slider-container {
        width: 60%;
        margin: 0 auto;
    }

    .progress {
        height: 5px;
    }

    .title.is-4 {
        margin-bottom: 47px;
    }

    .card {
        background: white;
        border-radius: 8px;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        padding: 20px;
        margin-top: 15px;
        width: 60%;
    }

    .container {
        justify-items: center;
    }

    .category-card {
        border: 2px dashed #ddd;
        border-radius: 10px;
        padding: 20px;
        text-align: center;
        cursor: pointer;
        height: 110px;
        justify-content: center;
        transition: border-color 0.3s;
    }

    .category-card:hover {
        border-color: #118BF6;
    }

    .category-card input[type="file"] {
        display: none;
    }

    .category-card .icon {
        font-size: 24px;
        margin-bottom: 10px;
        color: #888;
    }

    .category-card span {
        display: block;
        color: #555;
        font-size: 14px;
    }

    .button-container {
        background-color: #118BF6;
        color: white;
        border-radius: 8px;
        font-weight: 500;
        border: none;
        padding: 10px 20px;
    }

    .button-container .button {
        width: 50%;
        background-color: #118BF6;
        color: white;
    }
</style>  
  <div class="container">
    <!-- Slider -->
    <div class="card">
      <div class="slider-container">
        <progress class="progress is-info" value="80" max="100"></progress>
      </div>
    </div>
  
    <div class="card">
      <!-- Title -->
      <div class="has-text-centered mb-5" style="width: 96%;">
        <h2 class="title is-4">Verify your email</h2>
        <p class="subtitle is-6">
          Please verify your email to secure your account and unlock full access.
          Check your inbox for a verification link and click it to confirm your email address.
        </p>
      </div>
  
      <div class="columns is-centered is-variable is-8">
        <div class="column is-full">
          <label class="label">Email</label>
          <div class="control">
            <input
              class="input"
              type="email"
              placeholder="Enter your email"
              bind:value={email}
              on:input={validateEmail}
            />
            {#if emailError}
              <p class="error-message">{emailError}</p>
            {/if}
          </div>
        </div>
      </div>
  
      <!-- Continue Button -->
      <div class="has-text-centered">
         <a href="/business/business-otp">
        <button
          class="button is-primary"
          style="border-radius: 10px; margin-bottom: 30px; color: white; background-color: #118BF6; width: 214px;"
          on:click={sendCode}
        >
          Send code
        </button>
    </a>
      </div>
      <p class="has-text-centered"><a href="#">Return to login</a></p>
    </div>
  </div>
  