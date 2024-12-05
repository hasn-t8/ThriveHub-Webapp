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
  
    .image-section {
      flex: 1;
      background-color: #118BF6;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .content-section {
      flex: 1;
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }
  
    .content-section h1 {
      font-size: 24px;
      margin-bottom: 10px;
      font-weight: 600;
    }
  
    .content-section p {
      font-size: 16px;
      color: #555;
      margin-bottom: 20px;
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
      font-size: 18px;
      color: blue;
      cursor: pointer;
    }
  </style>
  
  {#if isModalOpen}
    <div class="custom-modal">
      <div class="modal-content">
        <!-- Image Section -->
        <div class="image-section">
          <img src="assets/banner1.png" alt="App Preview">
        </div>
  
        <!-- Content Section -->
        <div class="content-section">
          <button class="close-button" on:click={closeModal}>×</button>
          <h1>Write reviews easily!</h1>
          <p>Want to share your thoughts and experiences?</p>
          <p>
            Download our app now to write reviews effortlessly! Enjoy a smooth
            and user-friendly interface designed just for you.
          </p>
          <div class="store-buttons">
            <img src="assets/appstore.png" alt="Download on App Store">
            <img src="assets/googleplay.png" alt="Get it on Google Play">
          </div>
        </div>
      </div>
    </div>
  {/if}
  