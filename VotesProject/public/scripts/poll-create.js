document.querySelector("form").addEventListener("submit", function (e) {

    document.querySelectorAll(".frontend-error-message").forEach(span => span.textContent = "");

    const options = Array.from(document.querySelectorAll(".options input"))
        .map((input) => input.value.trim())
        .filter((value) => value.length > 0);

    const question = document.querySelector('textarea[name="question"]').value.trim();

    if (question === "") {
        document.getElementById("question-error").textContent = "The question field is required.";
        e.preventDefault();
        return;
    }

    if (question.length < 10) {
        document.getElementById("question-error").textContent = "The question must have 10 characters or more.";
        e.preventDefault();
        return;
    }
    const option1 = document.getElementById("option1-error");
    const option2 = document.getElementById("option2-error");
    if (options.length < 2) {
        if(option1.length == 0){
            option1.textContent= "You must provide at least 2 options.";
        }
        else {
            option2.textContent= "You must provide at least 2 options.";
        }
        e.preventDefault();
        return;
    }
});
