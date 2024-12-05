<script>
  let textInput = "";
</script>

<!-- Main Content -->
<div class="container">
  <!-- Slider -->
  <div class="card">
    <div class="slider-container">
      <progress class="progress is-info" value="60" max="100"></progress>
    </div>
  </div>

  <div class="card">
    <!-- Title -->
    <div class="has-text-centered mb-5" style="width: 96%;">
      <h2 class="title is-4">Tell us about your business</h2>
      <p class="subtitle is-6">
        Provide a brief summary of your company, your services, and what makes you unique
      </p>
    </div>
    <div class="columns is-centered is-variable is-8">
      <!-- Category Card -->
      <div class="column is-full">
        <div>
          <textarea
            bind:value={textInput}
            class="input is-primary"
            placeholder="Provide a brief overview of your company. What products or services do you offer? What sets your business apart from the competition? Highlight your mission, values, or anything else that makes your brand unique"
            style="width: 100%; padding: 10px; border-radius: 5px; height: 145px; border: 1px solid #ddd;"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Continue Button -->
    <div class="has-text-centered">
     <a href="/business/business-verify">
      <button
        id="continue-button"
        class="button is-primary"
        style="border-radius: 10px; margin-bottom: 30px; color: white; background-color: #118BF6; width: 214px;"
        on:click={() => alert('Continuing with input: ' + textInput)}
      >
        Continue
      </button>
      </a>
    </div>
  </div>
</div>


<style>

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
    display: flex;
    flex-direction: column;
    align-items: center;
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