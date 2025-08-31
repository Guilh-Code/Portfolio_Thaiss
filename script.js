document.addEventListener('DOMContentLoaded', () => {

    // Lógica para o menu Hambúrguer
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active'); // Adicione esta linha
        navLinks.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });


    // Lógica para o Carrossel de Avaliações
    const testimonialContainer = document.querySelector('.testimonial-carousel-container');
    const testimonialSlide = document.querySelector('.testimonial-slide');

    if (testimonialSlide && testimonialContainer) {
        const testimonials = [...testimonialSlide.querySelectorAll('.testimonial-card')];
        const prevTestimonialBtn = document.querySelector('.prev-testimonial-btn');
        const nextTestimonialBtn = document.querySelector('.next-testimonial-btn');
        const navContainer = document.querySelector('.testimonial-nav');

        let testimonialCounter = 0;
        const totalTestimonials = testimonials.length;
        let autoPlayInterval;

        // Criar os pontos de navegação
        for (let i = 0; i < totalTestimonials; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                testimonialCounter = i;
                updateTestimonialSlide();
            });
            navContainer.appendChild(dot);
        }
        const dots = [...navContainer.querySelectorAll('.dot')];

        const updateTestimonialSlide = () => {
            testimonialSlide.style.transform = `translateX(-${testimonialCounter * 100}%)`;
            // Atualizar ponto ativo
            dots.forEach(dot => dot.classList.remove('active'));
            dots[testimonialCounter].classList.add('active');
        };

        const moveToNext = () => {
            testimonialCounter++;
            if (testimonialCounter >= totalTestimonials) {
                testimonialCounter = 0;
            }
            updateTestimonialSlide();
        };

        const moveToPrev = () => {
            testimonialCounter--;
            if (testimonialCounter < 0) {
                testimonialCounter = totalTestimonials - 1;
            }
            updateTestimonialSlide();
        };

        // Iniciar Autoplay
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(moveToNext, 5000); // Passa a cada 5 segundos
        };

        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        nextTestimonialBtn.addEventListener('click', moveToNext);
        prevTestimonialBtn.addEventListener('click', moveToPrev);

        // Pausar ao passar o mouse
        testimonialContainer.addEventListener('mouseenter', stopAutoPlay);
        testimonialContainer.addEventListener('mouseleave', startAutoPlay);

        // Inicialização
        updateTestimonialSlide();
        startAutoPlay();
    }

});