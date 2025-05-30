document.addEventListener('DOMContentLoaded', function() {
    const htmlEl = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const moonIcon = '<i class="fas fa-moon text-xl"></i>';
    const sunIcon = '<i class="fas fa-sun text-xl"></i>';

    function setTheme(isDark) {
        if (isDark) {
            htmlEl.classList.add('dark');
            if (themeToggleBtn) themeToggleBtn.innerHTML = sunIcon;
            localStorage.setItem('theme', 'dark');
        } else {
            htmlEl.classList.remove('dark');
            if (themeToggleBtn) themeToggleBtn.innerHTML = moonIcon;
            localStorage.setItem('theme', 'light');
        }
    }

    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'dark'); // Define o tema na carga inicial

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            const isCurrentlyDark = htmlEl.classList.contains('dark');
            setTheme(!isCurrentlyDark);
        });
    }

    // --- CARROSSEL ---
    const carouselSlides = document.querySelectorAll('.carousel-slide-item');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let slideInterval;
    let indicators = [];

    function createIndicators() {
        if (!indicatorsContainer) return;
        indicatorsContainer.innerHTML = '';
        indicators = [];
        carouselSlides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator', 'w-2.5', 'h-2.5','sm:w-3', 'sm:h-3', 'rounded-full', 'bg-gray-400', 'dark:bg-gray-600', 'cursor-pointer');
            if (index === currentSlide) {
                indicator.classList.add('active');
                indicator.classList.remove('bg-gray-400', 'dark:bg-gray-600');
            }
            indicator.addEventListener('click', () => { goToSlide(index); });
            indicatorsContainer.appendChild(indicator);
            indicators.push(indicator);
        });
    }

    function initCarousel() {
        if (carouselSlides.length === 0) return;
        createIndicators();
        showSlide(currentSlide);
        startSlideShow();
        if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); restartSlideShow(); });
        if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); restartSlideShow(); });
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', pauseSlideShow);
            carouselContainer.addEventListener('mouseleave', startSlideShow);
        }
    }

    function showSlide(index) {
        carouselSlides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
            slide.style.zIndex = i === index ? '10' : '0';
        });
        if (indicators.length > 0) {
            indicators.forEach((indicator, i) => {
                indicator.classList.remove('active', 'w-3', 'h-3', 'sm:w-4', 'sm:h-4'); // Reset active specific size
                indicator.classList.add('bg-gray-400', 'dark:bg-gray-600', 'w-2.5', 'h-2.5','sm:w-3', 'sm:h-3'); // Default size
                if (i === index) {
                    indicator.classList.add('active');
                    indicator.classList.remove('bg-gray-400', 'dark:bg-gray-600');
                }
            });
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
            indicators[index].classList.remove('bg-gray-400', 'dark:bg-gray-600');
            indicators[index].style.backgroundColor = 'var(--primary, #ff4300)';
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        showSlide(currentSlide);
    }

    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
        restartSlideShow();
    }

    function startSlideShow() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    function restartSlideShow() {
        pauseSlideShow();
        startSlideShow();
    }

    function pauseSlideShow() {
        clearInterval(slideInterval);
    }

    initCarousel();

    const fadeElements = document.querySelectorAll('.fade-in-custom');
    function checkScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 50) {
                element.classList.add('visible');
            }
        });
    }
    checkScroll();
    window.addEventListener('scroll', checkScroll);

    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    const particleContainer = document.body;
    const numParticles = 25;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const endX = startX + (Math.random() - 0.5) * 80;
        const endY = startY + (Math.random() - 0.5) * 80;
        const duration = 15 + Math.random() * 15;
        const midOpacity = 0.2 + Math.random() * 0.4;
        particle.style.setProperty('--x-start', `${startX}vw`);
        particle.style.setProperty('--y-start', `${startY}vh`);
        particle.style.setProperty('--x-end', `${endX}vw`);
        particle.style.setProperty('--y-end', `${endY}vh`);
        particle.style.setProperty('--duration', `${duration}s`);
        particle.style.setProperty('--opacity-mid', `${midOpacity}`);
        particle.style.animationDelay = `-${Math.random() * duration}s`;
        particle.style.transform = `translate(${startX}vw, ${startY}vh)`;
        particleContainer.appendChild(particle);
    }
});