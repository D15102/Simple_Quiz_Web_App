/**
 * Toast notification system
 * Creates toast notifications for success, error, warning, and info messages
 */

// Toast configuration
const TOAST_DURATION = 5000; // Duration in milliseconds
const TOAST_ANIMATION_DURATION = 300; // Animation duration in milliseconds

// Create a toast notification
function createToast(message, type = 'info') {
    // Get the toast container
    const container = document.querySelector('.toast-container');

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} toast-progress`;

    // Create icon based on type
    const icon = document.createElement('i');
    icon.className = 'toast-icon fas';

    switch (type) {
        case 'success':
            icon.classList.add('fa-check-circle');
            break;
        case 'error':
            icon.classList.add('fa-exclamation-circle');
            break;
        case 'warning':
            icon.classList.add('fa-exclamation-triangle');
            break;
        case 'info':
        default:
            icon.classList.add('fa-info-circle');
            break;
    }

    // Create content
    const content = document.createElement('div');
    content.className = 'toast-content';
    content.textContent = message;

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'toast-close';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.addEventListener('click', () => {
        removeToast(toast);
    });

    // Assemble toast
    toast.appendChild(icon);
    toast.appendChild(content);
    toast.appendChild(closeBtn);

    // Add to container
    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Auto-remove after duration
    setTimeout(() => {
        removeToast(toast);
    }, TOAST_DURATION);

    return toast;
}

// Remove a toast notification
function removeToast(toast) {
    if (!toast) return;

    toast.classList.add('hide');

    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, TOAST_ANIMATION_DURATION);
}

// Initialize input animations on page load
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.input');

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.parentNode.classList.add('focus');
        });

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
});
