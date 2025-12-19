document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle Logic
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .btn-nav');

    function toggleMenu() {
        hamburger.classList.toggle('toggle');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // Prevent body scroll when menu open
    }

    hamburger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 2. Scroll Animation (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .fade-in-up').forEach(el => {
        revealObserver.observe(el);
    });

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

    // 4. "Click Pop" Effect for Buttons
    // Memberikan efek 'kempes' sebentar saat diklik agar terasa tactile
    const buttons = document.querySelectorAll('.btn, .service-card, .portfolio-item');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.transform = "scale(0.97)";
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = ""; 
            // Reset style inline agar kembali ke CSS hover state
            setTimeout(() => { this.style.transform = ""; }, 150);
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = "";
        });
    });

    // 5. Simple Tilt Effect for Comic Panel Visual (Hero)
    // Membuat gambar di hero section bergerak sedikit mengikuti mouse
    const heroVisual = document.querySelector('.comic-panel-visual');
    const heroSection = document.querySelector('.hero-section');

    if(heroVisual && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            heroVisual.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroVisual.style.transform = `rotate(3deg)`; // Kembali ke posisi default
        });
    }
});