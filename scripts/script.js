document.addEventListener('DOMContentLoaded', function() {
    // Özel mouse imleci
    function initCustomCursor() {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        if (!cursorDot || !cursorOutline) return;
        
        let mouseX = 0;
        let mouseY = 0;
        let dotX = 0;
        let dotY = 0;
        let outlineX = 0;
        let outlineY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Hover efektleri için tıklanabilir öğeleri bul
        const hoverElements = document.querySelectorAll('a, button, .nav-item, .social-link, input, textarea, .btn');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                cursorDot.classList.add('hover');
                cursorOutline.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', function() {
                cursorDot.classList.remove('hover');
                cursorOutline.classList.remove('hover');
            });
        });
        
        // Animasyon döngüsü
        function animateCursor() {
            // Dot cursor'ı güncelle
            dotX += (mouseX - dotX) * 0.5;
            dotY += (mouseY - dotY) * 0.5;
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';
            
            // Outline cursor'ı güncelle
            outlineX += (mouseX - outlineX) * 0.1;
            outlineY += (mouseY - outlineY) * 0.1;
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
    }
    
    // Sayfa geçişleri
    function initNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('.content-section');
        
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetSection = this.getAttribute('data-section');
                
                // Aktif nav item'ını güncelle
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                // Aktif section'ı göster
                sections.forEach(section => section.classList.remove('active'));
                document.getElementById(targetSection).classList.add('active');
                
                // Sayfa başına kaydır
                window.scrollTo(0, 0);
            });
        });
    }
    
    // Yetenek barlarını animasyonla göster
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const level = entry.target.getAttribute('data-level');
                    entry.target.style.width = level + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    // Form gönderimi
    function initForms() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Burada form verilerini işleyebilirsiniz
                alert('Mesajınız gönderildi! En kısa sürede sizinle iletişime geçeceğim.');
                contactForm.reset();
            });
        }
    }
    
    // Geometrik şekil efekti
    function initGeometryEffect() {
        const container = document.querySelector('.geometry-container');
        if (!container) return;
        
        const shapes = [];
        const shapeTypes = ['circle', 'square', 'triangle', 'hexagon'];
        const colors = ['#bb86fc', '#03dac6', '#cf6679', '#6200ea', '#018786'];
        
        // Şekilleri oluştur
        for (let i = 0; i < 15; i++) {
            const shape = document.createElement('div');
            shape.className = 'geometry-shape';
            
            const size = Math.random() * 40 + 20;
            const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.background = color;
            shape.style.opacity = Math.random() * 0.4 + 0.1;
            shape.style.left = `${Math.random() * 100}vw`;
            shape.style.top = `${Math.random() * 100}vh`;
            
            if (type === 'circle') {
                shape.style.borderRadius = '50%';
            } else if (type === 'triangle') {
                shape.style.background = 'transparent';
                shape.style.borderLeft = `${size/2}px solid transparent`;
                shape.style.borderRight = `${size/2}px solid transparent`;
                shape.style.borderBottom = `${size}px solid ${color}`;
            }
            
            container.appendChild(shape);
            
            shapes.push({
                element: shape,
                x: Math.random() * 100,
                y: Math.random() * 100,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2
            });
        }
        
        // Şekilleri hareket ettir
        function moveShapes() {
            shapes.forEach(shape => {
                shape.x += shape.speedX;
                shape.y += shape.speedY;
                
                // Ekran sınırlarını kontrol et
                if (shape.x < 0 || shape.x > 100) shape.speedX *= -1;
                if (shape.y < 0 || shape.y > 100) shape.speedY *= -1;
                
                shape.element.style.left = `${shape.x}vw`;
                shape.element.style.top = `${shape.y}vh`;
            });
            
            requestAnimationFrame(moveShapes);
        }
        
        moveShapes();
    }
    
    // Kod animasyonu
    function initCodeAnimation() {
        const codeLines = document.querySelectorAll('.code-line');
        if (!codeLines.length) return;
        
        setInterval(() => {
            codeLines.forEach(line => {
                const randomWidth = Math.random() * 80 + 20;
                line.style.width = `${randomWidth}%`;
            });
        }, 2000);
    }
    
    // Uygulamayı başlat
    function initApp() {
        // Sadece mobil olmayan cihazlarda özel imleci etkinleştir
        if (!/Mobi|Android/i.test(navigator.userAgent)) {
            initCustomCursor();
        }
        
        initNavigation();
        animateSkillBars();
        initForms();
        initGeometryEffect();
        initCodeAnimation();
        
        // Sayfa yüklendiğinde ilk section'ı göster
        document.getElementById('home').classList.add('active');
    }
    
    // Uygulamayı başlat
    initApp();
});
