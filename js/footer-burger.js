export function initFooterBurger() {
    const footerSections = document.querySelectorAll('.footer-container > section:not(.social-block)');

    footerSections.forEach(section => {
        const heading = section.querySelector('h3');
        if (heading) {
            heading.addEventListener('click', function() {
                const wasActive = section.classList.contains('active');
                section.classList.toggle('active', !wasActive);
            });
        }
    });
}