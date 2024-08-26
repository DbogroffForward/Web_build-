document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector("form");
    var formMessage = document.getElementById("form-message");

    form.addEventListener("submit", function (event) {
        var isValid = true;
        var inputs = form.querySelectorAll('input, select');

        inputs.forEach(function (input) {
            if (!input.checkValidity()) {
                isValid = false;
            }
        });

        if (!isValid) {
            event.preventDefault();
            formMessage.style.display = 'block';
            formMessage.textContent = "Please make sure all fields are filled out correctly.";
        } else {
            formMessage.style.display = 'none';
        }
    }, false);
});
