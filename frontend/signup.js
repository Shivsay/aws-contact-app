document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const signupError = document.getElementById('signupError');

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        // Simple validation for demonstration purposes
        if (!newUsername || !newPassword) {
            signupError.textContent = 'All fields are required.';
            return;
        }

        // Ideally, you would handle storing the new user credentials here
        // For now, redirecting to the login page as a placeholder
        window.location.href = 'login.html';  // Redirect to login page
    });
});
