// DOM Yüklendikten Sonra
document.addEventListener('DOMContentLoaded', function() {
    // Dil seçici
    const langToggle = document.querySelector('.lang-toggle');
    const langMenu = document.querySelector('.lang-menu');
    
    // Sidebar toggle - DÜZELTİLDİ
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Yükleniyor ekranı
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Navigasyon
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Dil verileri
    const translations = {
        // ... (dil çevirileri aynı kalacak)
    };

    // Mevcut dil
    let currentLang = 'tr';

    // Dil değiştirme
    function changeLanguage(lang) {
        currentLang = lang;
        const elements = document.querySelectorAll('[data-key]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang][key]) {
                if (element.placeholder) {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
        
        // Menüyü kapat
        langMenu.classList.remove('show');
        
        // Seçilen dili localStorage'a kaydet
        localStorage.setItem('selectedLanguage', lang);
    }

    // Dil seçici toggle
    langToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        langMenu.classList.toggle('show');
    });

    // Dil seçeneklerine tıklama
    document.querySelectorAll('.lang-menu li').forEach(item => {
        item.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });

    // Sayfa dışına tıklanınca menüyü kapat
    document.addEventListener('click', function(e) {
        if (!langToggle.contains(e.target) && !langMenu.contains(e.target)) {
            langMenu.classList.remove('show');
        }
    });

    // Yükleniyor ekranını gizle
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);

    // SIDEBAR TOGGLE DÜZELTMESİ - YENİ KOD
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        
        // Ana içeriğin margin ayarını güncelle
        if (sidebar.classList.contains('collapsed')) {
            mainContent.style.marginLeft = '0';
        } else {
            mainContent.style.marginLeft = '300px';
        }
    });
    
    // Responsive davranış için pencere boyutu değişikliği
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 1024) {
            // Mobil görünümde sidebar varsayılan olarak kapalı
            sidebar.classList.add('collapsed');
            mainContent.style.marginLeft = '0';
        } else {
            // Masaüstü görünümde sidebar varsayılan olarak açık
            sidebar.classList.remove('collapsed');
            mainContent.style.marginLeft = '300px';
        }
    });
    
    // Sayfa yüklendiğinde responsive kontrolü
    if (window.innerWidth <= 1024) {
        sidebar.classList.add('collapsed');
        mainContent.style.marginLeft = '0';
    }

    // Navigasyon
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Aktif sınıflarını kaldır
            navItems.forEach(nav => nav.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Yeni aktif sınıfını ekle
            this.classList.add('active');
            
            // İlgili içerik bölümünü göster
            const targetSection = this.getAttribute('data-section');
            document.getElementById(targetSection).classList.add('active');
            
            // Mobilde sidebar'ı kapat
            if (window.innerWidth <= 1024) {
                sidebar.classList.add('collapsed');
                mainContent.style.marginLeft = '0';
            }
        });
    });

    // Hero butonları
    document.querySelectorAll('.hero-actions .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Aktif sınıflarını kaldır
            navItems.forEach(nav => nav.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Yeni aktif sınıfını ekle
            document.querySelector(`[data-section="${targetSection}"]`).classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });

    // Back to top butonu
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Tema değiştirme
    const themeToggle = document.getElementById('themeToggle');
    let isDarkMode = true;
    
    themeToggle.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            document.documentElement.style.setProperty('--background', '#0a0418');
            document.documentElement.style.setProperty('--surface', '#1a1a2e');
            document.documentElement.style.setProperty('--surface-light', '#2d2d4d');
            document.documentElement.style.setProperty('--text', '#e6e6e6');
            document.documentElement.style.setProperty('--text-secondary', '#a0a0a0');
            themeToggle.innerHTML = '🌙';
        } else {
            document.documentElement.style.setProperty('--background', '#f5f5f7');
            document.documentElement.style.setProperty('--surface', '#ffffff');
            document.documentElement.style.setProperty('--surface-light', '#f0f0f0');
            document.documentElement.style.setProperty('--text', '#333333');
            document.documentElement.style.setProperty('--text-secondary', '#666666');
            themeToggle.innerHTML = '☀️';
        }
        
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // Cookie bildirimi
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieConsent.style.display = 'flex';
        }, 2000);
    }
    
    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.style.display = 'none';
    });

    // Proje filtreleme
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aktif sınıfını güncelle
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtre uygula
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Yetenek çubukları animasyonu
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillProgressBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
        });
    }
    
    // Sayfa yüklendiğinde animasyonları başlat
    setTimeout(animateSkills, 1000);

    // Geometrik çubuklar oluştur
    function createGeometryBars() {
        const geometryContainer = document.querySelector('.geometry-container');
        const barCount = 15;
        
        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            bar.className = 'geometry-bar';
            
            // Rastgele boyut ve konum
            const width = Math.random() * 200 + 50;
            const height = Math.random() * 4 + 1;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const rotation = Math.random() * 360;
            
            bar.style.width = `${width}px`;
            bar.style.height = `${height}px`;
            bar.style.left = `${left}%`;
            bar.style.top = `${top}%`;
            bar.style.transform = `rotate(${rotation}deg)`;
            bar.style.opacity = Math.random() * 0.1 + 0.05;
            
            geometryContainer.appendChild(bar);
            
            // Hareket animasyonu
            animateBar(bar);
        }
    }
    
    function animateBar(bar) {
        const moveX = (Math.random() - 0.5) * 100;
        const moveY = (Math.random() - 0.5) * 100;
        const rotate = (Math.random() - 0.5) * 180;
        
        bar.style.transition = `transform ${Math.random() * 10 + 10}s ease-in-out, opacity ${Math.random() * 5 + 5}s ease-in-out`;
        bar.style.transform += ` translate(${moveX}px, ${moveY}px) rotate(${rotate}deg)`;
        bar.style.opacity = Math.random() * 0.1;
        
        setTimeout(() => {
            animateBar(bar);
        }, Math.random() * 5000 + 10000);
    }
    
    createGeometryBars();

    // Fare hareketi ile etkileşim
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.geometry-bar').forEach(bar => {
            const speed = parseFloat(bar.style.width) / 300;
            bar.style.transform += ` translate(${x * speed * 10}px, ${y * speed * 10}px)`;
        });
    });

    // Sayfa yüklendiğinde kayıtlı temayı ve dili yükle
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        isDarkMode = false;
        document.documentElement.style.setProperty('--background', '#f5f5f7');
        document.documentElement.style.setProperty('--surface', '#ffffff');
        document.documentElement.style.setProperty('--surface-light', '#f0f0f0');
        document.documentElement.style.setProperty('--text', '#333333');
        document.documentElement.style.setProperty('--text-secondary', '#666666');
        themeToggle.innerHTML = '☀️';
    }
    
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        changeLanguage(savedLanguage);
    }
});
