document.addEventListener('DOMContentLoaded', function() {
    // Yükleniyor ekranını gizle
    function hideLoadingScreen() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    // Sayfa geçişleri
    function initNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('.content-section');
        const buttons = document.querySelectorAll('.btn');
        
        function activateSection(sectionId) {
            // Aktif nav item'ını güncelle
            navItems.forEach(nav => nav.classList.remove('active'));
            document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
            
            // Aktif section'ı göster
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(sectionId).classList.add('active');
            
            // Sayfa başına kaydır
            window.scrollTo(0, 0);
        }
        
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const targetSection = this.getAttribute('data-section');
                activateSection(targetSection);
            });
        });
        
        // Butonlara tıklama olayları
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const targetSection = this.getAttribute('data-section');
                if (targetSection) {
                    activateSection(targetSection);
                }
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
                    setTimeout(() => {
                        entry.target.style.width = level + '%';
                    }, 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    // Projeler filtreleme
    function initProjectsFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Aktif butonu güncelle
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Projeleri filtrele
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Geometrik şekil efekti
    function initGeometryEffect() {
        const container = document.querySelector('.geometry-container');
        if (!container) return;
        
        // Mevcut şekilleri temizle
        container.innerHTML = '';
        
        const barCount = window.innerWidth < 768 ? 10 : 15;
        
        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            bar.className = 'geometry-bar';
            
            const width = Math.random() * 80 + 40;
            const height = Math.random() * 8 + 4;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const rotation = Math.random() * 360;
            const opacity = Math.random() * 0.2 + 0.1;
            
            bar.style.width = `${width}px`;
            bar.style.height = `${height}px`;
            bar.style.left = `${posX}vw`;
            bar.style.top = `${posY}vh`;
            bar.style.opacity = opacity;
            bar.style.transform = `rotate(${rotation}deg)`;
            bar.style.borderRadius = '2px';
            bar.style.backgroundColor = `rgba(187, 134, 252, ${opacity})`;
            bar.style.border = `1px solid rgba(187, 134, 252, ${opacity * 2})`;
            
            container.appendChild(bar);
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

    // Uygulamayı başlat
    function initApp() {
        // Öncelikli işlemler
        hideLoadingScreen();
        initNavigation();
        
        // Sonraki işlemler
        setTimeout(() => {
            initGeometryEffect();
            initProjectsFilter();
            animateSkillBars();
            initForms();
            initCodeAnimation();
        }, 100);
        
        // Sayfa yüklendiğinde ilk section'ı göster
        document.getElementById('home').classList.add('active');
    }

    // Uygulamayı başlat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
});
