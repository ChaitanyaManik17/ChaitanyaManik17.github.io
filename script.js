document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.nav-link');

    // --- Functional Mobile Menu Toggle ---
    if (menuButton && sidebar) {
        menuButton.addEventListener('click', () => {
            // Toggles an 'is-open' class on the sidebar to show/hide it
            sidebar.classList.toggle('is-open'); 
        });
    }

    // --- Close Mobile Menu When a Link is Clicked ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar.classList.contains('is-open')) {
                sidebar.classList.remove('is-open');
            }
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const animatedElements = document.querySelectorAll('.content-section, .project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
    });
    animatedElements.forEach(el => observer.observe(el));
    
    // --- Active Navigation Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('.content-section');
    const onScroll = () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', onScroll);
});
