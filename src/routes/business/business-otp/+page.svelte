<script>
// @ts-nocheck

    import { onMount } from 'svelte';
  
    let timer = "00:59";
    let timeLeft = 59;
    let countdown;
    let showTimerSection = true;
  
    let codeInputs = ["", "", "", ""];
  
    const startTimer = () => {
      clearInterval(countdown);
      timeLeft = 59;
  
      countdown = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
  
        timer = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
        if (timeLeft <= 0) {
          clearInterval(countdown);
          timer = "Expired";
          showTimerSection = false;
        }
      }, 1000);
    };
  
    const handleInput = (index, value) => {
      codeInputs[index] = value;
  
      if (value.length === 1 && index < codeInputs.length - 1) {
        document.getElementById(`code-${index + 2}`).focus();
      }
    };
  
    const handleBackspace = (index, value) => {
      if (value === "" && index > 0) {
        document.getElementById(`code-${index}`).focus();
      }
    };
  
    const changeEmail = () => {
      alert('Change email functionality will be implemented here.');
    };
  
    const resendCode = () => {
      startTimer();
      showTimerSection = true;
    };
  
    onMount(() => {
      startTimer();
    });
  </script>
  <div class="container">
    <!-- Slider -->
   <div class="card">
        <div class="slider-container">
            <progress class="progress is-info" value="100" max="100"></progress>
        </div>
    </div>
  <div class="section is-flex is-justify-content-center is-align-items-center">
    <div class="forget-container">
      <h1 class="title is-4 has-text-centered custom-heading">Verify Account</h1>
      <p class="custom-description has-text-centered mb-5">
        A verification code has been sent to <span class="has-text-weight-bold">victoriamurrey@gmail.com</span>. Enter the code to verify your account.
      </p>
  
      <h2 class="subtitle is-6 has-text-centered custom-subheading">
        <a
          id="change-email-link"
          role="button"
          href="javascript:void(0)"
          class="has-text-black"
          style="text-decoration: underline;"
          on:click={changeEmail}
          >Change Email</a
        >
      </h2>
  
      <form id="verify-form">
        <div class="field is-flex is-justify-content-center mb-4">
          {#each codeInputs as input, index}
            <input
              id="code-{index + 1}"
              class="input custom-rounded is-small mx-1"
              type="text"
              maxlength="1"
              bind:value={codeInputs[index]}
              on:input={(e) => handleInput(index, e.target.value)}
              on:keydown={(e) => e.key === "Backspace" && handleBackspace(index, e.target.value)}
            />
          {/each}
        </div>
  
        {#if showTimerSection}
          <p class="has-text-centered mb-4" id="timer-section">
            Code expires in <span id="timer">{timer}</span>
          </p>
        {/if}
  
        <div class="field has-text-centered mb-4">
          <button type="submit" class="is-medium custom-button">Submit</button>
        </div>
  
        <div class="field has-text-centered">
          <p>
            Didn't receive the code? 
            <a class="has-text-link" style="text-decoration: underline;" on:click|preventDefault={resendCode}>Resend now</a>
          </p>
        </div>
      </form>
    </div>
  </div>
  </div>
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

    .forget-container {
      background-color: #FFFFFF;
      width: 484px;
      padding: 40px 20px;
      border-radius: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .custom-heading {
      font-size: 24px;
      font-weight: 700;
      line-height: 25px;
      letter-spacing: 0.38px;
    }
    .custom-description {
      text-align: center;
      padding: 15px;
      max-width: 430px;
      font-size: 12px;
      font-weight: 400;
      color: #707070;
    }
    .custom-subheading {
      font-weight: bold;
      margin-bottom: 20px;
    }
    .input.custom-rounded {
      width: 40px;
      height: 40px;
      text-align: center;
      font-size: 20px;
      padding: 0;
    }
    #timer {
      font-weight: bold;
      color: red;
    }
    #timer-section.hidden {
      visibility: hidden;
      height: 0;
      margin: 0;
    }
    #change-email-link {
      cursor: pointer;
      font-weight: bold;
    }
    body {
      background-color: #E7F3FE;
      font-family: 'Inter', sans-serif;
    }
    .has-text-danger {
      color: #e74c3c;
    }
    .is-hidden {
      display: none;
    }
  </style>
  