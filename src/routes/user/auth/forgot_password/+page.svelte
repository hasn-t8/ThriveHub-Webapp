<div class="section is-flex is-justify-content-center is-align-items-center">
  <div class="forget-container">
    <h1 class="title is-4 has-text-centered custom-heading">Forget Password?</h1>
    <p class="custom-description has-text-centered">
      Don’t stress! Enter your email, and we’ll send a verification code and reset link to renew your password securely.
    </p>
    <form>
      <div class="field">
        <label class="label" for="email">Email</label>
        <div class="control">
          <input class="input rounded" type="email" id="email" placeholder="Enter your email">
        </div>
      </div>
      <div class="field has-text-centered">
        <button class="is-medium custom-button" type="submit">Send reset code</button>
      </div>
    </form>
    <p class="has-text-centered back-link mt-4">
      <a href="#login" class="has-text-link" style="text-decoration: underline;">Return to Login</a>
    </p>
  </div>
</div>

<style>
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
.rounded {
  border-radius: 10px;
}  
.back-link {
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #007BFF;
}
.back-link a:hover {
  color: #0056b3;
}
.label {
  font-size: 12px;
  font-weight: 500;
}
</style>
