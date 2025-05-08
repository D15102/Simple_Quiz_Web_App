// Initialize input animations
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.input');

    inputs.forEach(input => {
        // Focus event
        input.addEventListener('focus', function() {
            this.parentNode.parentNode.classList.add('focus');
        });

        // Blur event
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentNode.parentNode.classList.remove('focus');
            }
        });

        // Check if input already has value on page load
        if (input.value !== '') {
            input.parentNode.parentNode.classList.add('focus');
        }
    });

    // Add password visibility toggle
    const passwordInput = document.querySelector('input[type="password"]');
    if (passwordInput) {
        // Create toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'password-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';

        // Insert after password input
        passwordInput.parentNode.style.position = 'relative';
        passwordInput.parentNode.appendChild(toggleBtn);

        // Position the toggle button
        toggleBtn.style.position = 'absolute';
        toggleBtn.style.right = '0';
        toggleBtn.style.top = '50%';
        toggleBtn.style.transform = 'translateY(-50%)';
        toggleBtn.style.background = 'none';
        toggleBtn.style.border = 'none';
        toggleBtn.style.color = '#999';
        toggleBtn.style.cursor = 'pointer';
        toggleBtn.style.fontSize = '16px';

        // Toggle password visibility
        toggleBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Toggle icon
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }

    // Form validation
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            const usernameInput = document.querySelector('input[name="username"]');
            const passwordInput = document.querySelector('input[name="password"]');

            if (!usernameInput.value || !passwordInput.value) {
                event.preventDefault();

                if (!usernameInput.value) {
                    createToast('Username is required', 'error');
                }

                if (!passwordInput.value) {
                    createToast('Password is required', 'error');
                }
            }
        });
    }
});
