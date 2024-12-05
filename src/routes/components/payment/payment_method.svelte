<script>
    let selectedOption = "monthly";
    let paymentMethod = "credit-card";
  
    const selectOption = (option) => {
      selectedOption = option;
    };
  </script>
  
  <style>
    :global(body) {
      background-color: #f0f0f0;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
  
    .custom-modal {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
  
    .modal-content {
      background: white;
      border-radius: 15px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      width: 70%;
      max-width: 900px;
      display: flex;
      padding: 20px 30px;
      gap: 20px;
    }
  
    .payment-methods,
    .billing-options {
      flex: 1;
    }
  
    .billing-options {
      padding-top: 11%;
    }
  
    h1 {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  
    h2 {
      font-size: 14px;
      color: #666;
      margin-bottom: 20px;
      font-weight: 600;
    }
  
    .input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-bottom: 15px;
      font-size: 14px;
    }
  
    .radio-group label {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      font-size: 14px;
      margin-bottom: 15px;
    }
  
    .radio-group input[type="radio"] {
      accent-color: #118BF6;
    }
  
    .billing-options .option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 10px 15px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: all 0.3s;
    }
  
    .billing-options .option.selected {
      border-color: #118BF6;
      background: #e6f4ff;
    }
  
    .billing-options .option .save-badge {
      background: #118BF6;
      color: white;
      font-size: 12px;
      padding: 2px 6px;
      border-radius: 3px;
    }
  
    .price {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      margin: 20px 0;
    }
  
    .upgrade-button {
      background: #118BF6;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      width: 100%;
      text-align: center;
    }
  
    .upgrade-button:hover {
      background: #0d7cd4;
    }
  
    .icons-row img {
      height: 20px;
      margin-left: 5px;
    }
  </style>
  
  <div class="custom-modal">
    <div class="modal-content">
      <!-- Payment Methods Section -->
      <div class="payment-methods">
        <h1>Upgrade to Basic</h1>
        <h2>Let’s open up more opportunities for your business</h2>
  
        <h2>Payment Methods</h2>
  
        <div class="radio-group">
          <label>
            <input
              type="radio"
              name="payment-method"
              bind:group={paymentMethod}
              value="credit-card"
            />
            <div>
              <strong>Credit/Debit Cards</strong>
              <p style="font-size: 12px; color: #777;">
                Pay with your Credit / Debit Card
              </p>
            </div>
            <div class="icons-row">
              <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" />
              <img
                src="https://img.icons8.com/color/48/mastercard.png"
                alt="Mastercard"
              />
              <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" />
            </div>
          </label>
  
          {#if paymentMethod === "credit-card"}
            <input type="text" class="input" placeholder="Card number" />
            <div style="display: flex; gap: 10px;">
              <input type="text" class="input" placeholder="MM / YY" style="flex: 1;" />
              <input type="text" class="input" placeholder="CVV" style="flex: 1;" />
            </div>
          {/if}
  
          <label>
            <input
              type="radio"
              name="payment-method"
              bind:group={paymentMethod}
              value="other-methods"
            />
            <div>
              <strong>Other Payment Methods</strong>
              <p style="font-size: 12px; color: #777;">
                Make payment through GPay, PayPal, Paytm etc.
              </p>
            </div>
            <div class="icons-row">
              <img
                src="https://img.icons8.com/color/48/google-pay.png"
                alt="Google Pay"
              />
              <img src="https://img.icons8.com/color/48/paypal.png" alt="Paypal" />
              <img src="https://img.icons8.com/ios/50/paytm.png" alt="Paytm" />
            </div>
          </label>
        </div>
      </div>
  
      <!-- Billing Options Section -->
      <div class="billing-options">
        <h2>Billing options</h2>
  
        <div
          class="option {selectedOption === 'monthly' ? 'selected' : ''}"
          on:click={() => selectOption("monthly")}
        >
          <div>
            <p style="font-weight: bold; margin: 0;">Pay monthly</p>
            <p style="margin: 0; font-size: 14px; color: #666;">$10 / month / member</p>
          </div>
        </div>
  
        <div
          class="option {selectedOption === 'annually' ? 'selected' : ''}"
          on:click={() => selectOption("annually")}
        >
          <div>
            <p style="font-weight: bold; margin: 0;">Pay annually</p>
            <p style="margin: 0; font-size: 14px; color: #666;">$8 / month / member</p>
          </div>
          <div class="save-badge">Save 55%</div>
        </div>
  
        <p class="price">{selectedOption === "monthly" ? "$20 / month" : "$192 / year"}</p>
        <button class="upgrade-button">Upgrade to Basic</button>
      </div>
    </div>
  </div>
  