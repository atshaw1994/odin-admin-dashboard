const themeToggleBtn = document.getElementById('btn-theme-toggle');
const body = document.body;
const toggleIcon = document.getElementById('toggle-icon');

// Function to set the theme based on a user's choice
function setTheme(isDarkMode) {
    if (isDarkMode === true) {
        body.classList.add('dark-mode');
        toggleIcon.textContent = 'dark_mode'; // Moon icon for dark mode
    } else if (isDarkMode === false) {
        body.classList.remove('dark-mode');
        toggleIcon.textContent = 'light_mode'; // Sun icon for light mode
    }
    else if (isDarkMode === 'auto') {
       // If in automatic mode, respect system preferences
       const isSystemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
       setTheme(isSystemDarkMode);
    }
}

// Function to handle the toggle button click
function toggleTheme() {
    const isDarkMode = body.classList.contains('dark-mode');
    setTheme(!isDarkMode);
    // Persist the user's choice in localStorage
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
}

// Initial theme setup on page load
// 1. Check for a saved preference in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme === 'dark');
} else {
    // 2. If no preference is saved, check the system preference
    const isSystemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(isSystemDarkMode);
}

// Add event listener to the toggle button
themeToggleBtn.addEventListener('click', toggleTheme);

// Optional: Listen for system theme changes and update the page
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only update if in automatic mode
    if (toggleIcon.textContent === 'brightness_auto') {
        setTheme(e.matches);
    }
});