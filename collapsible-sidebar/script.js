// Get DOM elements
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
const mainContent = document.getElementById('mainContent');
const overlay = document.getElementById('overlay');
const navLinks = document.querySelectorAll('.nav-link');

// Check if we're on mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Toggle sidebar function
function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
    toggleBtn.classList.toggle('collapsed');
    
    if (isMobile()) {
        overlay.classList.toggle('active');
    } else {
        mainContent.classList.toggle('expanded');
    }
}

// Event listener for toggle button
toggleBtn.addEventListener('click', toggleSidebar);

// Event listener for overlay (close sidebar when clicking outside on mobile)
overlay.addEventListener('click', toggleSidebar);

// Handle window resize
window.addEventListener('resize', () => {
    if (!isMobile()) {
        overlay.classList.remove('active');
        if (!sidebar.classList.contains('collapsed')) {
            mainContent.classList.remove('expanded');
        } else {
            mainContent.classList.add('expanded');
        }
    } else {
        mainContent.classList.remove('expanded');
        if (!sidebar.classList.contains('collapsed')) {
            overlay.classList.add('active');
        }
    }
});

// Initialize on mobile - start with sidebar collapsed
if (isMobile()) {
    sidebar.classList.add('collapsed');
    toggleBtn.classList.add('collapsed');
}

// Active link highlighting
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Close sidebar on mobile after clicking a link
        if (isMobile()) {
            toggleSidebar();
        }
    });
});