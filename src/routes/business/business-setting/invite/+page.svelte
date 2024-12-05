<script>
    export let imageUrl = "/assets/invite.png"; // Replace with your image URL
    export let title = "Invite Friends";
    export let description = "As soon as your colleague accepts the invitation, you will be able to see it in the list!";
  </script>
  
  <div class="outer-container">
    <div class="inner-container">
      <figure class="image-container">
        <img src={imageUrl} alt="Invite Image" />
      </figure>
      <h2 class="custom-title">{title}</h2>
      <p class="custom-description">{description}</p>
    </div>
  </div>
  
  <style>
    /* Outer container to center the content on the screen */
    .outer-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 70vh;
      border-radius: 16px;
    }
  
    /* Inner container styling */
    .inner-container {
      width: 545px;
      height: 431px;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }
  
    /* Image styling */
    .image-container img {
      width: 233px;
      height: 181px;
    }
  
    /* Title styling */
    .custom-title {
      font-family: Inter, sans-serif;
      font-size: 28px;
      font-weight: 700;
      line-height: 34px;
      letter-spacing: 0.34px;
      text-align: left;
      text-underline-position: from-font;
      text-decoration-skip-ink: none;
      margin-top: 20px;
    }
  
    /* Description styling */
    .custom-description {
      font-family: Inter, sans-serif;
      font-size: 18px;
      font-weight: 400;
      line-height: 20px;
      text-align: center;
      text-underline-position: from-font;
      text-decoration-skip-ink: none;
      color: #707070;
      margin-top: 10px;
      max-width: 430px;
    }
  </style>
  