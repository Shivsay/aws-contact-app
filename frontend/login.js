document.addEventListener('DOMContentLoaded', () => {
    // User Credentials
    const USER_CREDENTIALS = { username: 'user', password: 'password' };

    // Page Elements
    const loginContainer = document.getElementById('loginContainer');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    // Handle Login
    /*loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === USER_CREDENTIALS.username && password === USER_CREDENTIALS.password) {
            window.location.href = 'index1.html';  // Redirect to main contact management page
        } else {
            loginError.textContent = 'Invalid username or password.';
        }
    });*/
});
