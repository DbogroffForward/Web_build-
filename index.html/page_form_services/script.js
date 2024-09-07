document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phone');
    const form = document.querySelector('.service-form');
    const submitButton = document.querySelector('.service-form button[type="submit"]');
    const verifyCheckbox = document.getElementById('verify-info');

    // Initially hide the submit button
    submitButton.style.display = 'none';

    // Show the submit button when the checkbox is checked
    verifyCheckbox.addEventListener('change', () => {
        if (verifyCheckbox.checked) {
            submitButton.style.display = 'block';
        } else {
            submitButton.style.display = 'none';
        }
    });

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

    // Function to remove an image
    function removeImage(event) {
        const thumbnailContainer = event.target.parentElement;
        thumbnailContainer.parentElement.removeChild(thumbnailContainer);

        // Re-enable the upload button if there are less than 4 images
        const thumbnails = document.querySelectorAll('#uploaded_images img');
        if (thumbnails.length < 4) {
            document.getElementById('upload_widget').disabled = false;
        }
    }

    // Preload Cloudinary widget
    let myWidget = cloudinary.createUploadWidget({
        cloudName: 'dbukckpnp', // Replace with your Cloudinary cloud name
        uploadPreset: 'FMG_photo_uplods', // Replace with your unsigned upload preset
        maxFiles: 4,
        resourceType: "image",
        sources: ['local',], // Limit upload sources as needed
        multiple: true,
        accept: "image/*", 
        maxImageWidth: 1000,
        maxImageHeight: 1000,
        folder: 'user_uploads', // Optional: Store uploads in a specific folder
        resourceType: 'image',
        text: {
            en: {
                intro: {
                    title: 'Upload Your Files',
                    content: 'Please do not upload images of people or pets, or any inappropriate content.'
                }
            }
        }
    }, function(error, result) {
        if (!error && result && result.event === "success") {
            const uploadedImagesContainer = document.getElementById('uploaded_images');
            let thumbnails = Array.from(document.querySelectorAll('#uploaded_images img')).map(img => img.src);

            // Prevent more than 4 images from being uploaded
            if (thumbnails.length < 4) {
                const imgContainer = document.createElement('div');
                imgContainer.style.position = 'relative';
                imgContainer.style.display = 'inline-block';
                imgContainer.style.margin = '5px';

                const imgElement = document.createElement('img');
                imgElement.src = result.info.secure_url;
                imgElement.style.maxWidth = "100px"; // Limit image size for display
                imgElement.style.maxHeight = "100px"; // Limit image size for display
                imgElement.classList.add('thumbnail');

                // Create a delete button
                const deleteButton = document.createElement('span');
                deleteButton.textContent = 'X';
                deleteButton.style.position = 'absolute';
                deleteButton.style.top = '0';
                deleteButton.style.right = '0';
                deleteButton.style.backgroundColor = 'black';
                deleteButton.style.color = 'white';
                deleteButton.style.padding = '2px 5px';
                deleteButton.style.cursor = 'pointer';
                deleteButton.style.fontSize = '12px';

                // Attach event to remove the image
                deleteButton.addEventListener('click', removeImage);

                imgContainer.appendChild(imgElement);
                imgContainer.appendChild(deleteButton);
                uploadedImagesContainer.appendChild(imgContainer);

                thumbnails.push(result.info.secure_url); // Add the new thumbnail
            }

            // Disable the upload button if 4 images are uploaded
            if (thumbnails.length >= 4) {
                document.getElementById('upload_widget').disabled = true;
                alert("You cannot upload more than 4 images.");
            }
        }
    });

    // Open widget when the button is clicked
    document.getElementById('upload_widget').addEventListener('click', function() {
        myWidget.open(); // Open the preloaded widget
    }, false);
});
