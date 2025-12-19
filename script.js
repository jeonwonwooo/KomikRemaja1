document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    function toggleMenu() {
        hamburger.classList.toggle('toggle');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    hamburger.addEventListener('click', toggleMenu);
    document.querySelectorAll('.nav-link, .btn-nav').forEach(link => {
        link.addEventListener('click', () => {
            if(navMenu.classList.contains('active')) toggleMenu();
        });
    });

    // 2. Unified Intersection Observer
    const createObserver = (selector, callback, threshold = 0.1) => {
        const observer = new IntersectionObserver(callback, { threshold });
        document.querySelectorAll(selector).forEach(el => observer.observe(el));
    };

    // Scroll reveal animation
    createObserver('.reveal, .fade-in-up', (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, 0.1);

    // Count-up animation
    const animateCountUp = (el, end, duration = 1500) => {
        let start = 0, startTime = null;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            el.textContent = Math.floor(progress * end);
            if (progress < 1) requestAnimationFrame(animate);
            else el.textContent = end;
        };
        requestAnimationFrame(animate);
    };

    createObserver('.statistic-count', (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCountUp(entry.target, parseInt(entry.target.dataset.count, 10));
                entry.target.classList.add('counted');
            }
        });
    }, 0.5);

    // Section reveal
    createObserver('.section, .card, .reason-highlight, .discussion-footer-cta', (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
        });
    }, 0.12);

    // 3. Navbar Sticky Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = "0 4px 0 rgba(31, 34, 51, 0.1)";
            navbar.style.padding = "10px 0";
        } else {
            navbar.style.boxShadow = "none";
            navbar.style.padding = "16px 0";
        }
    });

    // 4. Click Pop Effect
    document.querySelectorAll('.btn, .service-card, .portfolio-item').forEach(btn => {
        btn.addEventListener('mousedown', () => btn.style.transform = "scale(0.97)");
        btn.addEventListener('mouseup', () => btn.style.transform = "");
        btn.addEventListener('mouseleave', () => btn.style.transform = "");
    });

    // 5. Tilt Effect for Hero
    const heroVisual = document.querySelector('.comic-panel-visual');
    const heroSection = document.querySelector('.hero-section');

    if(heroVisual && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            heroVisual.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        heroSection.addEventListener('mouseleave', () => {
            heroVisual.style.transform = `rotate(3deg)`;
        });
    }
});
