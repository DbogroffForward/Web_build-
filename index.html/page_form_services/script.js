document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phone');
    const form = document.querySelector('.service-form');

    // Key validation logic for phone number input
    function validatePhoneInput(event) {
        const key = event.key;
        const isNumber = /\d/.test(key);
        const isControlKey = key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight';
        const isAllowedCharacter = key === '-' || key === '(' || key === ')' || key === ' ';

        // Allow digits, control keys, and certain formatting characters
        if (!isNumber && !isControlKey && !isAllowedCharacter) {
            event.preventDefault();
        }
    }

    document.getElementById('phone').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove all non-numeric characters
        if (value.length > 3 && value.length <= 6) {
            value = value.replace(/(\d{3})(\d+)/, '$1-$2');
        } else if (value.length > 6) {
            value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
        }
        e.target.value = value;
    });

    // Apply the key validation
    phoneInput.addEventListener('keydown', validatePhoneInput);

    // Logic for styling the input based on validity
    phoneInput.addEventListener('input', () => {
        const digits = phoneInput.value.replace(/\D/g, ''); // Remove non-digit characters

        // Check if the input has exactly 10 digits
        if (digits.length === 10) {
            phoneInput.style.borderColor = 'springgreen';
            phoneInput.style.borderWidth = '2px'; // Optional: make the green border more visible
        } else {
            phoneInput.style.borderColor = 'red';
            phoneInput.style.borderWidth = '0px'; // Optional: customize the red border
        }
    });

    // Additional enhancement for resetting styles when the field is cleared
    phoneInput.addEventListener('blur', () => {
        if (phoneInput.value === '') {
            phoneInput.style.borderColor = ''; // Reset to default
            phoneInput.style.backgroundColor = ''; // Reset to default
        }
    });

    // Prevent form submission if the phone number is not valid
    form.addEventListener('submit', (event) => {
        const digits = phoneInput.value.replace(/\D/g, ''); // Remove non-digit characters

        // If the phone number is not exactly 10 digits, prevent form submission
        if (digits.length !== 10) {
            event.preventDefault();
            alert('Please enter a 10-digit phone number');
        }
    });
});
