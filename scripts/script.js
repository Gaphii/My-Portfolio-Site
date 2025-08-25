tool-code
```javascript
document.addEventListener('DOMContentLoaded', function() {

    // --- PARTICLES.JS ARKA PLAN AYARLARI ---
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#9f55ff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#9f55ff", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 4, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
    });

    // --- TYPED.JS YAZI ANİMASYONU ---
    new Typed('#typed-text', {
        strings: ['Yazılım Geliştirici', 'Web Tasarımcı', 'Java Uzmanı', 'Öğrenci'],
        typeSpeed: 70,
        backSpeed: 40,
        loop: true
    });

    // --- ÖZEL MOUSE İMLECİ ---
    const cursor = document.querySelector('.custom-cursor');
    const hoverElements = document.querySelectorAll('a, button');
    
    window.addEventListener('mousemove', e => {
        // İmleci mouse pozisyonuna anında ışınlamak yerine,
        // yumuşak bir geçiş için CSS transform kullanacağız.
        // Bu daha iyi performans sağlar.
        cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    });

    hoverElements.forEach(el => {
        el.addEventListener('mouseover', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // --- SCROLL (KAYDIRMA) ANİMASYONLARI ---
    const scrollElements = document.querySelectorAll('.scroll-reveal');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    }

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Sayfa ilk yüklendiğinde görünen elemanları da tetikle
    handleScrollAnimation();
});
```
