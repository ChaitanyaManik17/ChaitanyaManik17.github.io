document.addEventListener('DOMContentLoaded', () => {

    // --- Lucide Icons Initialization ---
    // This call is in the HTML, but if you move it here, ensure this script runs before it.
    // lucide.createIcons();

    // --- Intersection Observer for Scroll Animations ---
    const animatedElements = document.querySelectorAll('.content-section, .project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after the element is visible
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // --- Active Navigation Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');

    const onScroll = () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) { // Adjust offset as needed
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


    // --- Mobile Menu Toggle (Bonus Functionality) ---
    const menuButton = document.getElementById('menu-button');
    const sidebar = document.querySelector('.sidebar');

    if (menuButton) {
        // This is a placeholder. A real implementation would involve creating a mobile menu
        // or making the existing sidebar appear. For this example, we'll just log it.
        menuButton.addEventListener('click', () => {
            alert('Mobile menu functionality would be implemented here.');
            // Example: sidebar.classList.toggle('is-open');
        });
    }

});
