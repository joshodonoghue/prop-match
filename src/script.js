document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', function (event) {
        const firstName = form.elements['firstName'].value.trim();
        const lastName = form.elements['lastName'].value.trim();
        const email = form.elements['email'].value.trim();
        const username = form.elements['username'].value.trim();
        const password = form.elements['password'].value.trim();
        // Basic validation
        if (!firstName || !lastName || !email || !username || !password) {
            alert('Please fill out all fields.');
            event.preventDefault(); // Prevent form submission
            return;
        }

        // Email validation
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            event.preventDefault(); // Prevent form submission
            return;
        }
        if (password.length < 8) { // Example: check if password is at least 8 characters
            alert('Password must be at least 8 characters long.');
            event.preventDefault(); // Prevent form submission
            return;
        }
        // Add more validations as needed
    });
});

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}
