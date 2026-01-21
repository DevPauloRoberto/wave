export const initScrollObserver = () => {
    // Garante que só roda no navegador (Client-side)
    if (import.meta.server) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Remove as classes que deixam invisível e deslocado
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    setTimeout(() => {
        // Seleciona apenas os elementos que ainda estão invisíveis (.opacity-0) 
        // para evitar reprocessar os antigos que já animaram.
        const elements = document.querySelectorAll('.animate-on-scroll.opacity-0');
        elements.forEach((el) => observer.observe(el));
    }, 100);
};