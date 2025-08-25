document.addEventListener('DOMContentLoaded', function() {
    // Yükleniyor ekranını gizle
    function hideLoadingScreen() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            // Sayfanın tamamen yüklendiğinden emin ol
            if (document.readyState === 'complete') {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            } else {
                window.addEventListener('load', hideLoadingScreen);
            }
        }
    }

    // Optimize edilmiş mouse imleci
    function initCustomCursor() {
        // Sadece desktop için
        if (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent)) {
            document.body.style.cursor = 'auto';
            return;
        }

        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        if (!cursorDot || !cursorOutline) return;
        
        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;
        
        // RAF için optimize
        let rafId = null;
        
        const updateCursor = () => {
            // Outline için smooth hareket
            outlineX += (mouseX - outlineX) * 0.1;
            outlineY += (mouseY - outlineY) * 0.1;
            
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
            
            rafId = requestAnimationFrame(updateCursor);
        };
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // RAF başlatılmadıysa başlat
            if (!rafId) {
                updateCursor();
            }
        });
        
        // Hover efektleri
        const hoverElements = document.querySelectorAll('a, button, .nav-item, .social-link, input, textarea, .btn, .project-card');
        
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
        
        // Temizleme
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });
    }

    // Optimize edilmiş geometrik şekiller
    function initGeometryEffect() {
        const container = document.querySelector('.geometry-container');
        if (!container) return;
        
        // Mevcut şekilleri temizle
        container.innerHTML = '';
        
        const barCount = window.innerWidth < 768 ? 10 : 15; // Mobilde daha az bar
        
        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            bar.className = 'geometry-bar';
            
            // Performans için basit çubuklar
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
                            card.classList.add('visible');
                        }, 10);
                    } else {
                        card.classList.remove('visible');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Lazy Loading
    function initLazyLoading() {
        const lazyElements = document.querySelectorAll('.project-card, .skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        lazyElements.forEach(el => {
            el.classList.add('lazy-load');
            observer.observe(el);
        });
    }

    // Daha fazla proje göster
    function initShowMoreProjects() {
        const showMoreBtn = document.getElementById('showMoreProjects');
        const hiddenProjects = document.querySelectorAll('.project-card:nth-child(n+7)');
        
        if (showMoreBtn && hiddenProjects.length > 0) {
            hiddenProjects.forEach(project => {
                project.style.display = 'none';
            });
            
            showMoreBtn.addEventListener('click', function() {
                hiddenProjects.forEach(project => {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.classList.add('visible');
                    }, 10);
                });
                
                this.style.display = 'none';
                this.previousElementSibling.style.display = 'none';
            });
        }
    }

    // Optimize edilmiş animasyonlar
    function initOptimizedAnimations() {
        // RequestAnimationFrame ile optimize edilmiş animasyonlar
        let lastScrollY = window.scrollY;
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Scroll performansını optimize et
            if (Math.abs(currentScrollY - lastScrollY) > 50) {
                lastScrollY = currentScrollY;
                // Gerekli scroll animasyonları burada
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Uygulamayı başlat
    function initApp() {
        // Öncelikli işlemler
        hideLoadingScreen();
        initNavigation();
        initLazyLoading();
        
        // Sonraki işlemler
        setTimeout(() => {
            initCustomCursor();
            initGeometryEffect();
            initProjectsFilter();
            initShowMoreProjects();
            initOptimizedAnimations();
            animateSkillBars();
            initForms();
            initCodeAnimation();
            initButtons();
            initCVDownload();
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
