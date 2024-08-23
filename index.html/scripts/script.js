document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded');
});

document.getElementById('expandButton').addEventListener('click', function() {
    const list = document.getElementById('expandableList');
    if (list.style.display === 'block') {
        list.style.display = 'none';
    } else {
        list.style.display = 'block';
    }
});

