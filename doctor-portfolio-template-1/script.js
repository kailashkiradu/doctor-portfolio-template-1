// Basic interactivity: hamburger, smooth scroll, typing, reveal, swiper init, back-to-top

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    hamburger && hamburger.addEventListener('click', () => {
        nav.classList.toggle('open');
        hamburger.classList.toggle('open');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const el = document.querySelector(href);
                if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); if (nav.classList.contains('open')) { nav.classList.remove('open'); hamburger.classList.remove('open') } }
            }
        })
    });

    // Typing animation in hero (shorter phrases on small screens)
    const typingEl = document.getElementById('hero-typing');
    if (typingEl) {
        const isSmall = window.innerWidth && window.innerWidth < 480;
        const phrases = isSmall ? ['Compassionate Healthcare', 'Personalized Care', 'Trusted Expertise'] : ['Providing Compassionate and Professional Healthcare', 'Dedicated to Personalized Care', 'Experienced & Trusted Medical Expertise'];
        let pIndex = 0, charIndex = 0, deleting = false; const typeSpeed = 40, pause = 1500;
        function tick() {
            const current = phrases[pIndex];
            if (!deleting) { typingEl.textContent = current.slice(0, ++charIndex); if (charIndex === current.length) { deleting = true; setTimeout(tick, pause); return } }
            else { typingEl.textContent = current.slice(0, --charIndex); if (charIndex === 0) { deleting = false; pIndex = (pIndex + 1) % phrases.length } }
            setTimeout(tick, deleting ? typeSpeed / 2 : typeSpeed);
        }
        tick();
    }

    // Scroll-reveal
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const ro = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); ro.unobserve(e.target) } }) }, { threshold: 0.12 });
        reveals.forEach(r => ro.observe(r));
    } else { reveals.forEach(r => r.classList.add('show')) }

    // Stagger mobile nav links
    if (hamburger) { const navListItems = document.querySelectorAll('.nav ul li'); hamburger.addEventListener('click', () => { if (nav.classList.contains('open')) { navListItems.forEach(li => li.classList.remove('show')) } else { navListItems.forEach((li, i) => setTimeout(() => li.classList.add('show'), 60 * i + 60)) } }) }

    // Back to top
    const backTop = document.getElementById('backTop');
    window.addEventListener('scroll', () => { backTop.style.display = (window.scrollY > 300) ? 'block' : 'none' });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Swiper for testimonials
    if (typeof Swiper !== 'undefined') {
        new Swiper('.mySwiper', { slidesPerView: 1, loop: true, spaceBetween: 18, autoplay: { delay: 4500, disableOnInteraction: false }, pagination: { el: '.swiper-pagination', clickable: true }, breakpoints: { 768: { slidesPerView: 2, spaceBetween: 20 } } });
    }

    // accessibility: hamburger keyboard
    hamburger && hamburger.addEventListener('keydown', (e) => { if (e.key === 'Enter') hamburger.click() });
});
