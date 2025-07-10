document.querySelector("form").addEventListener("submit", function (e) {

    document.querySelectorAll(".frontend-error-message").forEach(span => span.textContent = "");

    let valid = true;

    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const emailError = document.getElementById('emailError');

    if (email === "") {
        emailError.textContent = "Email is required.";
        valid = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        valid = false;
    }

    const password = document.getElementById('password').value.trim();
    const passwordError = document.getElementById('passwordError');

    if (password === "") {
        passwordError.textContent = "Password is required.";
        valid = false;
    }

    if (!valid) {
        e.preventDefault();
    }
});
