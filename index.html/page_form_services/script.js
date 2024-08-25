document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector("form");

    // Adding event listener for form submission
    form.addEventListener("submit", function(event) {
        // Prevent default form submission
        event.preventDefault();

        // Check form validity
        if (!form.checkValidity()) {
            event.stopPropagation(); // Stop the form from submitting if invalid
        } else {
            // If the form is valid, proceed with the redirection after 3 seconds
            setTimeout(function() {
                form.submit(); // You can change this to redirect to another page as needed
                // window.location.href = "another-page.html";
            }, 3000);
        }

        // Add class indicating validation was triggered
        form.classList.add('was-validated');
    }, false);
});
