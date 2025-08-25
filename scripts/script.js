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
// Form doğrulama fonksiyonu
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Input focus olduğunda
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            // Input focus'tan çıktığında
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                validateField(this);
            });
            
            // Input değiştiğinde
            input.addEventListener('input', function() {
                if (this.parentElement.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        // Form gönderimi
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Tüm alanları doğrula
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Form gönderim işlemi
                alert('Mesajınız gönderildi! En kısa sürede sizinle iletişime geçeceğim.');
                contactForm.reset();
                
                // Hata sınıflarını temizle
                inputs.forEach(input => {
                    input.parentElement.classList.remove('error', 'success');
                });
            }
        });
        
        // Alan doğrulama fonksiyonu
        function validateField(field) {
            const value = field.value.trim();
            const formGroup = field.parentElement;
            
            // Önceki hata/success sınıflarını temizle
            formGroup.classList.remove('error', 'success');
            
            // Validasyon kuralları
            if (field.hasAttribute('required') && !value) {
                formGroup.classList.add('error');
                return false;
            }
            
            if (field.type === 'email' && value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(value)) {
                    formGroup.classList.add('error');
                    return false;
                }
            }
            
            formGroup.classList.add('success');
            return true;
        }
    }
}

// Timeline animasyonu
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Uygulamayı başlat fonksiyonuna ekle
function initApp() {
    // Önceki fonksiyonlar...
    initFormValidation();
    initTimelineAnimation();
    // Diğer init fonksiyonları...
}
// Bakım Modu Fonksiyonları
function initMaintenanceMode() {
    const maintenanceBtn = document.getElementById('maintenanceBtn');
    const maintenanceMode = document.getElementById('maintenanceMode');
    const disableMaintenance = document.getElementById('disableMaintenance');
    const adminPanel = document.getElementById('adminPanel');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminCloseBtn = document.getElementById('adminCloseBtn');
    const adminForm = document.getElementById('adminForm');
    
    // Varsayılan şifre (güvenlik için daha sonra değiştirin)
    const ADMIN_PASSWORD = "admin123";
    
    // Sayfa yüklendiğinde bakım durumunu kontrol et
    function checkMaintenanceStatus() {
        const isMaintenance = localStorage.getItem('maintenanceMode') === 'true';
        if (isMaintenance) {
            enableMaintenanceMode();
        }
    }
    
    // Bakım modunu etkinleştir
    function enableMaintenanceMode() {
        maintenanceMode.classList.add('active');
        document.body.style.overflow = 'hidden';
        localStorage.setItem('maintenanceMode', 'true');
    }
    
    // Bakım modunu devre dışı bırak
    function disableMaintenanceMode() {
        maintenanceMode.classList.remove('active');
        document.body.style.overflow = 'auto';
        localStorage.setItem('maintenanceMode', 'false');
    }
    
    // Admin panelini göster
    function showAdminPanel() {
        adminPanel.classList.add('active');
    }
    
    // Admin panelini gizle
    function hideAdminPanel() {
        adminPanel.classList.remove('active');
    }
    
    // Admin girişi doğrula
    function validateAdminLogin(password) {
        return password === ADMIN_PASSWORD;
    }
    
    // Olay dinleyicileri
    if (maintenanceBtn) {
        maintenanceBtn.addEventListener('click', showAdminPanel);
    }
    
    if (disableMaintenance) {
        disableMaintenance.addEventListener('click', function() {
            // Doğrudan kapatma yerine şifre sor
            showAdminPanel();
        });
    }
    
    if (adminCloseBtn) {
        adminCloseBtn.addEventListener('click', hideAdminPanel);
    }
    
    if (adminForm) {
        adminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const passwordInput = document.getElementById('adminPassword');
            const password = passwordInput.value;
            
            if (validateAdminLogin(password)) {
                // Şifre doğruysa bakım modunu kapat
                disableMaintenanceMode();
                hideAdminPanel();
                passwordInput.value = '';
                
                // Başarı mesajı
                showNotification('Bakım modu kapatıldı. Site erişime açıldı.', 'success');
            } else {
                // Şifre yanlışsa hata göster
                passwordInput.classList.add('error');
                setTimeout(() => {
                    passwordInput.classList.remove('error');
                }, 2000);
                
                showNotification('Hatalı şifre! Lütfen tekrar deneyin.', 'error');
            }
        });
    }
    
    // Çift tıklama ile bakım modunu açma (admin paneli olmadan)
    if (maintenanceBtn) {
        let clickCount = 0;
        let clickTimer;
        
        maintenanceBtn.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 1) {
                clickTimer = setTimeout(function() {
                    clickCount = 0;
                }, 500);
            } else if (clickCount === 2) {
                clearTimeout(clickTimer);
                clickCount = 0;
                enableMaintenanceMode();
                showNotification('Bakım modu etkinleştirildi.', 'success');
            }
        });
    }
    
    // Bildirim gösterimi
    function showNotification(message, type) {
        // Basit bir bildirim sistemi
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem;
            border-radius: var(--border-radius);
            color: white;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        if (type === 'success') {
            notification.style.background = 'var(--success)';
        } else {
            notification.style.background = 'var(--error)';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Sayfa yüklendiğinde bakım durumunu kontrol et
    checkMaintenanceStatus();
}

// Uygulamayı başlat fonksiyonuna ekle
function initApp() {
    // Önceki fonksiyonlar...
    initMaintenanceMode();
    // Diğer init fonksiyonları...
}
/* Bildirim Animasyonları */
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem;
    border-radius: var(--border-radius);
    color: white;
    z-index: 10000;
    animation: slideIn 0.3s ease;
}

.notification.success {
    background: var(--success);
}

.notification.error {
    background: var(--error);
}

/* Admin form hata animasyonu */
.admin-form input.error {
    animation: shake 0.5s ease;
    border-color: var(--error);
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}
