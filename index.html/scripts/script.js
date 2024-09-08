document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded');
    
    // Disable all interaction on the site
    function disableInteraction(disable) {
        const body = document.querySelector('body');

        if (disable) {
            // Add the 'disable' class to prevent interactions
            body.classList.add('disable-interaction');
        } else {
            // Remove the 'disable' class to restore interactions
            body.classList.remove('disable-interaction');
        }
    }

    // Initially disable all interactions
    disableInteraction(true);

    // Expandable list functionality
    document.getElementById('expandButton').addEventListener('click', function() {
        const list = document.getElementById('expandableList');
        if (list.style.display === 'block') {
            list.style.display = 'none';
        } else {
            list.style.display = 'block';
        }
    });

    // Cookie banner functionality
    document.getElementById('accept-cookies').onclick = function() {
        document.getElementById('cookie-banner').style.display = 'none';
        disableInteraction(false);  // Re-enable all interactions
    };
});
