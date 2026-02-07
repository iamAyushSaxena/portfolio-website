// 1. Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggleBtn.querySelector('i');

// FORCE LIGHT MODE DEFAULT:
// We only check Local Storage. If it's null, we default to 'light'.
// We purposely ignore window.matchMedia to satisfy your "Force Light" requirement.
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateIcon(currentTheme);

themeToggleBtn.addEventListener('click', () => {
    let theme = body.getAttribute('data-theme');
    let newTheme = theme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// 2. Mobile Menu Logic
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

/* --- ADD THIS TO THE BOTTOM OF script.js --- */

// 3. Active Link Highlighter
// This automatically highlights the Nav button for the page you are currently on.
const currentPath = window.location.pathname;
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(link => {
    // Get the href value (e.g., "about.html")
    const linkPath = link.getAttribute('href');

    // Check if the current URL contains the link's path
    // We use 'includes' to handle cases like "/portfolio/about.html"
    if (currentPath.includes(linkPath) && linkPath !== "#") {
        link.classList.add('active');
    }
    
    // Special handling for the "Home" page (index.html)
    // If the path is just "/" (root), highlight Home
    if (currentPath.endsWith('/') && linkPath === 'index.html') {
        link.classList.add('active');
    }
});

/* --- SCROLL SPY FOR TABLE OF CONTENTS (CENTER LINE TRIGGER) --- */

// 1. Get all the links in the TOC
const tocLinks = document.querySelectorAll('.toc-menu a');

// 2. Get ALL elements that act as sections (Headings, Sections, Divs)
const sections = document.querySelectorAll('section[id], header[id], div[id], h1[id], h2[id], h3[id]'); 

// 3. The Function that checks scroll position
function onScroll() {
    // Calculate the "Center Line" of the viewport
    // We want to trigger when the section top crosses the middle of the screen
    const scrollPosition = window.scrollY + (window.innerHeight / 2); 

    let currentSection = "";

    // Loop through each section to find which one is currently active
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;

        // If the section's top has crossed above the center line...
        if (scrollPosition >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    // Loop through links and add/remove the 'active' class
    tocLinks.forEach((link) => {
        link.classList.remove('active');
        
        // Check if the link's href matches the current section ID
        if (link.getAttribute('href').includes(currentSection) && currentSection !== "") {
            link.classList.add('active');
        }
    });
}

// 4. Listen for the scroll event
window.addEventListener('scroll', onScroll);
// 5. Run once on load to highlight the correct section immediately
onScroll();