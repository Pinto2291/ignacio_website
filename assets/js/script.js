document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

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

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const fullName = document.getElementById('fullName').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=YOUR_PHONE_NUMBER&text=Name:%20${fullName}%0APhone:%20${phone}%0AMessage:%20${message}`;
        window.open(whatsappUrl, '_blank');
    });
});