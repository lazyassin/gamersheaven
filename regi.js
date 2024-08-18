document.addEventListener('DOMContentLoaded', function() {
    let passwordStrength = 0;

    function togglePassword() {
        const passwordField = document.getElementById('password');
        const togglePasswordButton = document.querySelector('.toggle-password');
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            togglePasswordButton.textContent = 'Hide';
        } else {
            passwordField.type = 'password';
            togglePasswordButton.textContent = 'Show';
        }
    }

    function checkPasswordStrength(password) {
        const strengthBar = document.getElementById('strengthBar');
        passwordStrength = 0;
        if (password.length >= 8) passwordStrength += 1;
        if (/[A-Z]/.test(password)) passwordStrength += 1;
        if (/[a-z]/.test(password)) passwordStrength += 1;
        if (/[0-9]/.test(password)) passwordStrength += 1;
        if (/[\W]/.test(password)) passwordStrength += 1;

        switch (passwordStrength) {
            case 1:
                strengthBar.style.width = '20%';
                strengthBar.style.backgroundColor = '#ff0000';
                break;
            case 2:
                strengthBar.style.width = '40%';
                strengthBar.style.backgroundColor = '#ff8000';
                break;
            case 3:
                strengthBar.style.width = '60%';
                strengthBar.style.backgroundColor = '#ffff00';
                break;
            case 4:
                strengthBar.style.width = '80%';
                strengthBar.style.backgroundColor = '#80ff00';
                break;
            case 5:
                strengthBar.style.width = '100%';
                strengthBar.style.backgroundColor = '#00ff00';
                break;
            default:
                strengthBar.style.width = '0';
                strengthBar.style.backgroundColor = '#ccc';
                break;
        }
    }

    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        let isValid = true;

        // Get username and password values
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validate username
        if (username === '') {
            document.getElementById('usernameError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('usernameError').style.display = 'none';
        }

        // Validate password
        if (password === '') {
            document.getElementById('passwordError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('passwordError').style.display = 'none';
        }

        // Validate password strength
        if (passwordStrength < 3) {
            document.getElementById('strengthError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('strengthError').style.display = 'none';
        }

        // AJAX request to register.php if valid
        if (isValid) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'register.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                const response = JSON.parse(xhr.responseText);
                if (response.status === 'success') {
                    alert('Registration successful! Redirecting to login page.');
                    window.location.href = 'login.html';
                } else {
                    alert(response.message);
                }
            };
            xhr.send(`username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
        }
    });

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const submitButton = document.querySelector('.btn-submit');

    function checkFormValidity() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        if (username !== '' && password !== '' && passwordStrength >= 3) {
            submitButton.disabled = false;
            submitButton.classList.add('active');
        } else {
            submitButton.disabled = true;
            submitButton.classList.remove('active');
        }
    }

    usernameInput.addEventListener('input', function() {
        checkFormValidity();
        if (usernameInput.value.trim() !== '') {
            document.getElementById('usernameError').style.display = 'none';
        }
    });

    passwordInput.addEventListener('input', function() {
        checkFormValidity();
        checkPasswordStrength(passwordInput.value.trim());
        if (passwordInput.value.trim() !== '') {
            document.getElementById('passwordError').style.display = 'none';
        }
    });
});
