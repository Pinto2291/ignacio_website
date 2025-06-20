document.addEventListener('DOMContentLoaded', function() {
    // --- Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // --- Language Switcher ---
    const langBtn = document.getElementById('lang-btn');
    const elementsToTranslate = document.querySelectorAll('[data-en]');

    langBtn.addEventListener('click', () => {
        const currentLang = document.documentElement.lang;
        const newLang = currentLang === 'en' ? 'es' : 'en';
        document.documentElement.lang = newLang;
        langBtn.textContent = newLang === 'en' ? 'ES' : 'EN';

        elementsToTranslate.forEach(el => {
            el.textContent = el.dataset[newLang];
        });
    });

    // --- Contact Form ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const fullName = document.getElementById('fullName').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=YOUR_PHONE_NUMBER&text=Name:%20${fullName}%0APhone:%20${phone}%0AMessage:%20${message}`;
        window.open(whatsappUrl, '_blank');
    });

    // --- NEW: Theme Switcher Logic ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

    // Function to apply the saved theme on page load
    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-theme');
            themeSwitcher.textContent = '☀️'; // Sun icon
        } else {
            body.classList.remove('light-theme');
            themeSwitcher.textContent = '🌙'; // Moon icon
        }
    };
    
    // Function to toggle the theme and save preference
    const toggleTheme = () => {
        const isLight = body.classList.toggle('light-theme');
        const newTheme = isLight ? 'light' : 'dark';
        
        themeSwitcher.textContent = isLight ? '☀️' : '🌙';
        localStorage.setItem('theme', newTheme);
        
        // --- Update Vanta.js background color live ---
        if (window.vantaEffect) {
            const newBgColor = isLight ? 0xf4f4f4 : 0x1a1a1a;
            window.vantaEffect.setOptions({
                backgroundColor: newBgColor
            });
        }
    };

    // Check for saved theme in localStorage when the page loads
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark
    applyTheme(savedTheme);

    themeSwitcher.addEventListener('click', toggleTheme);

     // --- NEW: Project Loader Animation Logic ---
    const projectLinks = document.querySelectorAll('.portfolio-grid .card a');
    const loaderOverlay = document.getElementById('loader-overlay');

    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Stop the link from navigating immediately
            
            const destinationUrl = this.href; // Get the URL from the link

            loaderOverlay.classList.add('active'); // Show the loader

            // Wait for the animation to play, then navigate
            setTimeout(() => {
                window.open(destinationUrl, '_blank'); // Open link in a new tab
                loaderOverlay.classList.remove('active'); // Hide loader after navigating
            }, 1500); // 1.5 seconds delay
        });
    });
});