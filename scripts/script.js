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
            
            // İmleçleri güncelle
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
            
            // Outline için smooth hareket
            outlineX += (mouseX - outlineX) * 0.1;
            outlineY += (mouseY - outlineY) * 0.1;
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
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
    }
    
    // Geometrik çubuk efekti
    function initGeometryEffect() {
        const container = document.querySelector('.geometry-container');
        if (!container) return;
        
        // Mevcut şekilleri temizle
        container.innerHTML = '';
        
        // Çubukları oluştur
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.className = 'geometry-bar';
            
            // Rastgele boyut ve pozisyon
            const width = Math.random() * 100 + 50;
            const height = Math.random() * 10 + 5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const rotation = Math.random() * 360;
            const opacity = Math.random() * 0.3 + 0.1;
            
            bar.style.width = `${width}px`;
            bar.style.height = `${height}px`;
            bar.style.left = `${posX}vw`;
            bar.style.top = `${posY}vh`;
            bar.style.opacity = opacity;
            bar.style.transform = `rotate(${rotation}deg)`;
            bar.style.borderRadius = '2px';
            
            container.appendChild(bar);
        }
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
                
                alert('Mesajınız gönderildi! En kısa sürede sizinle iletişime geçeceğim.');
                contactForm.reset();
            });
        }
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
    
    // Buton tıklama olayları
    function initButtons() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.classList.contains('btn-primary')) {
                    // Projeler butonu
                    document.querySelector('[data-section="skills"]').click();
                } else if (this.classList.contains('btn-secondary')) {
                    // İletişim butonu
                    document.querySelector('[data-section="contact"]').click();
                }
            });
        });
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
        initButtons();
        
        // Sayfa yüklendiğinde ilk section'ı göster
        document.getElementById('home').classList.add('active');
    }
    
    // Uygulamayı başlat
    initApp();
});
