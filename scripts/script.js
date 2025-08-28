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
// Back to Top Fonksiyonu
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Çağır
initBackToTop();
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");

  if (saved === "light") root.setAttribute("data-theme", "light");

  btn.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    if (isLight) {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });
});
// === Cookie Consent ===
document.addEventListener("DOMContentLoaded", () => {
  const consentBox = document.getElementById("cookieConsent");
  const acceptBtn = document.getElementById("acceptCookies");

  // Daha önce kabul edildiyse gösterme
  const accepted = localStorage.getItem("cookiesAccepted");
  if (!accepted) {
    consentBox.style.display = "block";
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    consentBox.style.display = "none";
  });
});
/* ========================
   ÇOK DİLLİ DESTEK
======================== */
const translations = {
  tr: {
    title: "Gürkan Kabasakal | Kişisel Portfolio",
    loading: "Yükleniyor...",
    role: "Full Stack Developer",
    exp: "Yıl Deneyim",
    projects: "Proje",
    companies: "İş Yeri",
    nav_home: "Ana Sayfa",
    nav_about: "Hakkımda",
    nav_skills: "Yetenekler",
    nav_projects: "Projelerim",
    nav_experience: "Deneyim",
    nav_contact: "İletişim",
    hero_title: "Merhaba, Ben <span class='text-gradient'>Gürkan Kabasakal</span>",
    hero_subtitle: "Full Stack Developer & UI/UX Tasarımcı",
    hero_desc: "3 yılı aşkın süredir web teknolojileri üzerine çalışıyorum. Modern, fonksiyonel ve estetik web çözümleri üretmeye tutkuluyum.",
    btn_projects: "Projelerimi Gör",
    btn_contact: "İletişime Geç",
    about_title: "Hakkımda",
    about_sub: "Beni daha yakından tanıyın",
    about_p1: "Merhaba, ben Gürkan Kabasakal. Bursa'da yaşıyorum ve Lise Son öğrencisiyim. Web geliştirme ve tasarım konusunda tutkulu bir yazılım geliştiricisiyim.",
    about_p2: "Teknolojiye olan ilgim küçük yaşlarda başladı ve zaman içinde kendimi front-end ve back-end teknolojilerinde geliştirdim.",
    cookie_text: "Web sitemizde çerezler kullanılmaktadır. <a href='#'>Detaylı bilgi</a>",
    cookie_accept: "Kabul Et"
  },
  en: {
    title: "Gürkan Kabasakal | Personal Portfolio",
    loading: "Loading...",
    role: "Full Stack Developer",
    exp: "Years Experience",
    projects: "Projects",
    companies: "Companies",
    nav_home: "Home",
    nav_about: "About",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_experience: "Experience",
    nav_contact: "Contact",
    hero_title: "Hello, I'm <span class='text-gradient'>Gürkan Kabasakal</span>",
    hero_subtitle: "Full Stack Developer & UI/UX Designer",
    hero_desc: "I have been working on web technologies for over 3 years. I'm passionate about creating modern, functional and aesthetic web solutions.",
    btn_projects: "See My Projects",
    btn_contact: "Contact Me",
    about_title: "About Me",
    about_sub: "Get to know me better",
    about_p1: "Hello, I'm Gürkan Kabasakal. I live in Bursa and I'm a high school senior. I am a passionate software developer in web development and design.",
    about_p2: "My interest in technology started at an early age and over time I developed myself in front-end and back-end technologies.",
    cookie_text: "Cookies are used on our website. <a href='#'>More info</a>",
    cookie_accept: "Accept"
  },
  de: {
    title: "Gürkan Kabasakal | Persönliches Portfolio",
    loading: "Wird geladen...",
    role: "Full Stack Entwickler",
    exp: "Jahre Erfahrung",
    projects: "Projekte",
    companies: "Firmen",
    nav_home: "Startseite",
    nav_about: "Über mich",
    nav_skills: "Fähigkeiten",
    nav_projects: "Projekte",
    nav_experience: "Erfahrung",
    nav_contact: "Kontakt",
    hero_title: "Hallo, Ich bin <span class='text-gradient'>Gürkan Kabasakal</span>",
    hero_subtitle: "Full Stack Entwickler & UI/UX Designer",
    hero_desc: "Seit über 3 Jahren arbeite ich an Webtechnologien. Ich bin leidenschaftlich daran interessiert, moderne, funktionale und ästhetische Weblösungen zu entwickeln.",
    btn_projects: "Meine Projekte ansehen",
    btn_contact: "Kontaktiere mich",
    about_title: "Über mich",
    about_sub: "Lerne mich besser kennen",
    about_p1: "Hallo, ich bin Gürkan Kabasakal. Ich lebe in Bursa und bin Gymnasiast im letzten Jahr. Ich bin ein leidenschaftlicher Entwickler in Webentwicklung und Design.",
    about_p2: "Mein Interesse an Technologie begann in jungen Jahren und mit der Zeit habe ich mich in Frontend- und Backend-Technologien weiterentwickelt.",
    cookie_text: "Auf unserer Website werden Cookies verwendet. <a href='#'>Mehr Infos</a>",
    cookie_accept: "Akzeptieren"
  },
  fr: {
    title: "Gürkan Kabasakal | Portfolio Personnel",
    loading: "Chargement...",
    role: "Développeur Full Stack",
    exp: "Années d'expérience",
    projects: "Projets",
    companies: "Entreprises",
    nav_home: "Accueil",
    nav_about: "À propos",
    nav_skills: "Compétences",
    nav_projects: "Projets",
    nav_experience: "Expérience",
    nav_contact: "Contact",
    hero_title: "Bonjour, je suis <span class='text-gradient'>Gürkan Kabasakal</span>",
    hero_subtitle: "Développeur Full Stack & Designer UI/UX",
    hero_desc: "Je travaille sur les technologies web depuis plus de 3 ans. Je suis passionné par la création de solutions web modernes, fonctionnelles et esthétiques.",
    btn_projects: "Voir mes projets",
    btn_contact: "Me Contacter",
    about_title: "À propos",
    about_sub: "Apprenez à mieux me connaître",
    about_p1: "Bonjour, je suis Gürkan Kabasakal. J'habite à Bursa et je suis en terminale. Je suis un développeur passionné de développement et de conception web.",
    about_p2: "Mon intérêt pour la technologie a commencé très jeune et au fil du temps je me suis perfectionné dans les technologies front-end et back-end.",
    cookie_text: "Des cookies sont utilisés sur notre site Web. <a href='#'>Plus d'infos</a>",
    cookie_accept: "Accepter"
  }
};

// Dil seçici
function setLanguage(lang) {
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  localStorage.setItem("lang", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "tr";
  setLanguage(savedLang);

  const langSelector = document.querySelector(".language-selector");
  const toggleBtn = document.querySelector(".lang-toggle");
  const items = document.querySelectorAll(".lang-menu li");

  toggleBtn.add
