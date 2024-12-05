<script>
    let isModalOpen = true;
  
    function closeModal() {
      isModalOpen = false;
    }
  </script>
  
  <style>
    .custom-modal {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f0f0f0;
    }
  
    .modal-content {
      display: flex;
      flex-direction: row;
      background: white;
      border-radius: 15px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      max-width: 900px;
      width: 55%;
    }
  
    .left-section {
      flex: 1;
      background-color: #f9f9f9;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      border-right: 1px solid #ddd;
    }
  
    .left-section img {
      max-width: 134px;
      margin-bottom: 20px;
    }
  
    .left-section h2 {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  
    .left-section .rating {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
  
    .left-section .rating i {
      color: #ffc107;
      margin-right: 5px;
    }
  
    .left-section .reviews {
      color: #007BFF;
      font-size: 14px;
      text-decoration: underline;
      cursor: pointer;
    }
  
    .right-section {
      flex: 1;
      background-color: #118BF6;
      color: white;
      padding: 40px;
      position: relative;
    }
  
    .right-section h1 {
      font-size: 24px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  
    .right-section p {
      font-size: 16px;
      margin-bottom: 20px;
      line-height: 1.5;
    }
  
    .store-buttons {
      display: flex;
      gap: 10px;
    }
  
    .store-buttons img {
      max-width: 140px;
      cursor: pointer;
    }
    
  
    .close-button {
      position: absolute;
      top: 20px;
      right: 20px;
      background: none;
      border: none;
      font-size: 24px;
      color: white;
      cursor: pointer;
    }
  </style>
  
  {#if isModalOpen}
    <div class="custom-modal">
      <div class="modal-content">
        <!-- Left Section -->
        <div class="left-section">
          <img src="assets/image.png" alt="Brand Logo">
          <h2>Bluehost</h2>
  
          <div class="rating">
            <span style="margin-left: 10px; font-size: 16px;">4.8</span>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
          </div>
          <p>See reviews like a user</p>
          <span class="reviews">4,876 Reviews</span>
        </div>
  
        <!-- Right Section -->
        <div class="right-section">
          <button class="close-button" on:click={closeModal}>×</button>
          <h1>Download the App to Respond to Reviews!</h1>
          <p>
            Unlock the full potential of your customer interactions by downloading our app. Engage with reviews, respond to feedback, and stay connected with your audience like never before!
          </p>
          <div class="store-buttons">
            <img src="assets/appstore.png" alt="Download on App Store">
            <img src="assets/googleplay.png" alt="Get it on Google Play">
          </div>
        </div>
      </div>
    </div>
  {/if}
  