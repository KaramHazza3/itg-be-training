document.querySelector("form").addEventListener("submit", function (e) {

  document
    .querySelectorAll(".frontend-error-message")
    .forEach((span) => (span.textContent = ""));

  let valid = true;

  const username = document.querySelector("#username").value.trim();
  const usernameError = document.querySelector("#usernameError");

  if (username === "") {
    usernameError.textContent = "Username is required.";
    valid = false;
  }

  const email = document.querySelector("#email").value.trim();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const emailError = document.querySelector("#emailError");

  if (email === "") {
    emailError.textContent = "Email is required.";
    valid = false;
  } else if (!emailRegex.test(email)) {
    emailError.textContent = "Please enter a valid email address.";
    valid = false;
  }

  const password = document.querySelector("#password").value.trim();
  const passwordError = document.querySelector("#passwordError");

  if (password === "") {
    passwordError.textContent = "Password is required.";
    valid = false;
  } else if (password.length < 6) {
    passwordError.textContent = "Password must be longer than 6 characters.";
    valid = false;
  }

  const password2 = document.querySelector("#password2").value.trim();
  const password2Error = document.querySelector("#password2Error");

  if (password !== password2) {
    password2Error.textContent = "Passwords do not match.";
    valid = false;
  }

  if (!valid) {
    e.preventDefault();
  }
});
