document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded');

    // Check if the privacy policy has been acknowledged and hide the cookie banner if true
    const privacyAcknowledged = sessionStorage.getItem('privacyAcknowledged') === 'true';
    if (privacyAcknowledged) {
        document.getElementById('cookie-banner').style.display = 'none';
        document.body.classList.remove('disable-interaction');
    } else {
        // Disable all interaction on the site initially if not acknowledged
        document.body.classList.add('disable-interaction');
    }

    // Expandable list functionality
    document.getElementById('expandButton').addEventListener('click', function() {
        const list = document.getElementById('expandableList');
        if (list.style.display === 'block') {
            list.style.display = 'none';
        } else {
            list.style.display = 'block';
        }
    });

    // Cookie Banner functionality
    const privacyCheckbox = document.getElementById('privacy-checkbox');
    const acceptCookiesButton = document.getElementById('accept-cookies');

    // Function to check if privacy policy checkbox is checked
    function checkPrivacyPolicyAcknowledgment() {
        if (!privacyCheckbox.checked) {
            // Show message if privacy policy checkbox is not checked
            alert("Please read the Privacy Policy to proceed.");
            return false; // Prevent further action
        }
        return true; // Allow action if checkbox is checked
    }

    // Hide the banner and re-enable interactions when the user clicks OK
    acceptCookiesButton.onclick = function() {
        if (checkPrivacyPolicyAcknowledgment()) {
            document.getElementById('cookie-banner').style.display = 'none';
            document.body.classList.remove('disable-interaction'); // Re-enable all interactions
            // Save that the privacy policy has been acknowledged in session storage
            sessionStorage.setItem('privacyAcknowledged', 'true');
        }
    };
});
