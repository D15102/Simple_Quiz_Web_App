// Theme Switcher and Scroll to Top
document.addEventListener('DOMContentLoaded', function() {
  // Get the theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // Check if user has a saved theme preference
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Apply the saved theme or default to light
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Update the theme icon based on current theme
  updateThemeIcon(currentTheme);

  // Add click event to theme toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      // Get the current theme
      const currentTheme = document.documentElement.getAttribute('data-theme');

      // Toggle the theme
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      // Update the data-theme attribute
      document.documentElement.setAttribute('data-theme', newTheme);

      // Save the theme preference to localStorage
      localStorage.setItem('theme', newTheme);

      // Update the theme icon
      updateThemeIcon(newTheme);
    });
  }

  // Function to update the theme icon
  function updateThemeIcon(theme) {
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
      } else {
        themeIcon.className = 'fas fa-moon';
      }
    }
  }

  // Scroll to Top functionality
  const scrollTopBtn = document.getElementById('scroll-top');

  if (scrollTopBtn) {
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active');
      } else {
        scrollTopBtn.classList.remove('active');
      }
    });

    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
