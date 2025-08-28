// DOM Yüklendikten Sonra
document.addEventListener('DOMContentLoaded', function() {
    // Dil seçici
    const langToggle = document.querySelector('.lang-toggle');
    const langMenu = document.querySelector('.lang-menu');
    
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    // Yükleniyor ekranı
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Navigasyon
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Dil verileri
    const translations = {
        tr: {
            loading: "Yükleniyor...",
            home: "Ana Sayfa",
            about: "Hakkımda",
            skills: "Yetenekler",
            myProjects: "Projelerim",
            experience: "Deneyim",
            contact: "İletişim",
            jobTitle: "Full Stack Developer",
            experienceYears: "Yıl Deneyim",
            projects: "Proje",
            workplaces: "İş Yeri",
            hello: "Merhaba, Ben",
            jobDesc: "Full Stack Developer & UI/UX Tasarımcı",
            heroDesc: "3 yılı aşkın süredir web teknolojileri üzerine çalışıyorum. Modern, fonksiyonel ve estetik web çözümleri üretmeye tutkuluyum.",
            viewProjects: "Projelerimi Gör",
            contactMe: "İletişime Geç",
            aboutSub: "Beni daha yakından tanıyın",
            aboutDesc1: "Merhaba, ben Gürkan Kabasakal. Bursa'da yaşıyorum ve Lise Son öğrencisiyim. Web geliştirme ve tasarım konusunda tutkulu bir yazılım geliştiricisiyim. Kullanıcı deneyimini ön planda tutarak modern, fonksiyonel ve estetik web çözümleri üretmeyi seviyorum.",
            aboutDesc2: "Teknolojiye olan ilgim küçük yaşlarda başladı ve zaman içinde kendimi front-end ve back-end teknolojilerinde geliştirdim. Sürekli öğrenmeye ve kendimi güncel teknolojilerle geliştirmeye devam ediyorum.",
            age: "Yaş:",
            city: "Şehir:",
            education: "Eğitim:",
            highSchool: "Lise Son",
            experience: "Deneyim:",
            phone: "Telefon:",
            skillsSub: "Teknolojik yeterliliklerim",
            frontend: "Frontend",
            backend: "Backend",
            tools: "Araçlar",
            projectsSub: "Yaptığım çalışmalardan öne çıkanlar",
            all: "Tümü",
            web: "Web",
            mobile: "Mobil",
            design: "Tasarım",
            ecommerceProject: "E-Ticaret Platformu",
            ecommerceDesc: "React ve Node.js ile geliştirdiğim modern e-ticaret çözümü.",
            financeProject: "Finans Dashboard",
            financeDesc: "Gerçek zamanlı veri görselleştirme için dashboard uygulaması.",
            fitnessProject: "Fitness Uygulaması",
            fitnessDesc: "Kişisel antrenman takibi için React Native uygulaması.",
            uiuxProject: "UI/UX Tasarım Seti",
            uiuxDesc: "Modern arayüzler için tasarım sistemi ve component kütüphanesi.",
            blogProject: "Kişisel Blog",
            blogDesc: "Next.js ve GraphQL ile geliştirdiğim kişisel blog platformu.",
            recipeProject: "Yemek Tarifleri",
            recipeDesc: "Yemek tarifleri paylaşımı için Flutter uygulaması.",
            experienceSub: "Kariyer yolculuğum",
            seniorFrontend: "Senior Frontend Developer",
            jobDesc1: "React ve Vue.js kullanarak kurumsal web uygulamaları geliştirdim. Ekip liderliği yaparak proje yönetimi ve kod incelemelerinden sorumlu oldum.",
            webDeveloper: "Web Geliştirici",
            jobDesc2: "Çeşitli müşteriler için responsive web siteleri ve e-ticaret platformları geliştirdim. JavaScript ve PHP tabanlı projelerde yer aldım.",
            juniorDeveloper: "Junior Developer",
            jobDesc3: "HTML, CSS ve JavaScript kullanarak arayüz geliştirme çalışmaları yaptım. Müşteri projelerinde front-end kodlaması yaptım.",
            now: "Şimdi",
            contactSub: "Bana ulaşın",
            location: "Konum",
            namePlaceholder: "Adınız Soyadınız",
            emailPlaceholder: "Email Adresiniz",
            messagePlaceholder: "Mesajınız",
            sendMessage: "Mesaj Gönder",
            cookieText: "Web sitemizde çerezler kullanılmaktadır.",
            cookieDetails: "Detaylı bilgi",
            cookieAccept: "Kabul Et"
        },
        en: {
            loading: "Loading...",
            home: "Home",
            about: "About",
            skills: "Skills",
            myProjects: "My Projects",
            experience: "Experience",
            contact: "Contact",
            jobTitle: "Full Stack Developer",
            experienceYears: "Years Experience",
            projects: "Projects",
            workplaces: "Workplaces",
            hello: "Hello, I'm",
            jobDesc: "Full Stack Developer & UI/UX Designer",
            heroDesc: "I've been working on web technologies for over 3 years. I'm passionate about creating modern, functional and aesthetic web solutions.",
            viewProjects: "View Projects",
            contactMe: "Contact Me",
            aboutSub: "Get to know me better",
            aboutDesc1: "Hello, I'm Gürkan Kabasakal. I live in Bursa and I'm a High School Senior. I'm a software developer passionate about web development and design. I love creating modern, functional and aesthetic web solutions with user experience in mind.",
            aboutDesc2: "My interest in technology started at a young age and over time I developed myself in front-end and back-end technologies. I continue to learn and improve myself with current technologies.",
            age: "Age:",
            city: "City:",
            education: "Education:",
            highSchool: "High School Senior",
            experience: "Experience:",
            phone: "Phone:",
            skillsSub: "My technological competencies",
            frontend: "Frontend",
            backend: "Backend",
            tools: "Tools",
            projectsSub: "Some of my standout works",
            all: "All",
            web: "Web",
            mobile: "Mobile",
            design: "Design",
            ecommerceProject: "E-Commerce Platform",
            ecommerceDesc: "Modern e-commerce solution I developed with React and Node.js.",
            financeProject: "Finance Dashboard",
            financeDesc: "Dashboard application for real-time data visualization.",
            fitnessProject: "Fitness App",
            fitnessDesc: "React Native application for personal workout tracking.",
            uiuxProject: "UI/UX Design Kit",
            uiuxDesc: "Design system and component library for modern interfaces.",
            blogProject: "Personal Blog",
            blogDesc: "Personal blog platform I developed with Next.js and GraphQL.",
            recipeProject: "Recipe App",
            recipeDesc: "Flutter application for sharing food recipes.",
            experienceSub: "My career journey",
            seniorFrontend: "Senior Frontend Developer",
            jobDesc1: "I developed corporate web applications using React and Vue.js. I was responsible for project management and code reviews as a team leader.",
            webDeveloper: "Web Developer",
            jobDesc2: "I developed responsive websites and e-commerce platforms for various clients. I worked on JavaScript and PHP based projects.",
            juniorDeveloper: "Junior Developer",
            jobDesc3: "I did interface development work using HTML, CSS and JavaScript. I did front-end coding for client projects.",
            now: "Now",
            contactSub: "Get in touch",
            location: "Location",
            namePlaceholder: "Your Name",
            emailPlaceholder: "Your Email",
            messagePlaceholder: "Your Message",
            sendMessage: "Send Message",
            cookieText: "Our website uses cookies.",
            cookieDetails: "Details",
            cookieAccept: "Accept"
        },
        de: {
            loading: "Wird geladen...",
            home: "Startseite",
            about: "Über mich",
            skills: "Fähigkeiten",
            myProjects: "Meine Projekte",
            experience: "Erfahrung",
            contact: "Kontakt",
            jobTitle: "Full Stack Entwickler",
            experienceYears: "Jahre Erfahrung",
            projects: "Projekte",
            workplaces: "Arbeitsplätze",
            hello: "Hallo, ich bin",
            jobDesc: "Full Stack Entwickler & UI/UX Designer",
            heroDesc: "Ich arbeite seit über 3 Jahren an Webtechnologien. Ich bin leidenschaftlich daran interessiert, moderne, funktionale und ästhetische Weblösungen zu schaffen.",
            viewProjects: "Projekte ansehen",
            contactMe: "Kontakt aufnehmen",
            aboutSub: "Lernen Sie mich besser kennen",
            aboutDesc1: "Hallo, ich bin Gürkan Kabasakal. Ich lebe in Bursa und bin ein High School Senior. Ich bin ein Softwareentwickler, der leidenschaftlich gerne Webentwicklung und Design betreibt. Ich liebe es, moderne, funktionale und ästhetische Weblösungen mit Fokus auf Benutzererfahrung zu erstellen.",
            aboutDesc2: "Mein Interesse an Technologie begann in jungen Jahren und mit der Zeit habe ich mich in Frontend- und Backend-Technologien weiterentwickelt. Ich lerne ständig weiter und verbessere mich mit aktuellen Technologien.",
            age: "Alter:",
            city: "Stadt:",
            education: "Bildung:",
            highSchool: "High School Senior",
            experience: "Erfahrung:",
            phone: "Telefon:",
            skillsSub: "Meine technologischen Kompetenzen",
            frontend: "Frontend",
            backend: "Backend",
            tools: "Werkzeuge",
            projectsSub: "Einige meiner herausragenden Arbeiten",
            all: "Alle",
            web: "Web",
            mobile: "Mobil",
            design: "Design",
            ecommerceProject: "E-Commerce-Plattform",
            ecommerceDesc: "Moderne E-Commerce-Lösung, die ich mit React und Node.js entwickelt habe.",
            financeProject: "Finanz-Dashboard",
            financeDesc: "Dashboard-Anwendung für Echtzeit-Datenvisualisierung.",
            fitnessProject: "Fitness-App",
            fitnessDesc: "React Native Anwendung zur persönlichen Trainingsverfolgung.",
            uiuxProject: "UI/UX Design Kit",
            uiuxDesc: "Designsystem und Komponentenbibliothek für moderne Schnittstellen.",
            blogProject: "Persönlicher Blog",
            blogDesc: "Persönliche Blog-Plattform, die ich mit Next.js und GraphQL entwickelt habe.",
            recipeProject: "Rezepte-App",
            recipeDesc: "Flutter-Anwendung zum Teilen von Food-Rezepten.",
            experienceSub: "Mein Karriereweg",
            seniorFrontend: "Senior Frontend Entwickler",
            jobDesc1: "Ich habe Unternehmens-Webanwendungen mit React und Vue.js entwickelt. Ich war als Teamleiter für Projektmanagement und Code-Reviews verantwortlich.",
            webDeveloper: "Web Entwickler",
            jobDesc2: "Ich entwickelte responsive Websites und E-Commerce-Plattformen für verschiedene Kunden. Ich arbeitete an JavaScript- und PHP-basierten Projekten.",
            juniorDeveloper: "Junior Entwickler",
            jobDesc3: "Ich habe Interface-Entwicklungsarbeiten mit HTML, CSS und JavaScript durchgeführt. Ich habe Frontend-Coding für Kundenprojekte durchgeführt.",
            now: "Jetzt",
            contactSub: "Kontakt aufnehmen",
            location: "Standort",
            namePlaceholder: "Ihr Name",
            emailPlaceholder: "Ihre E-Mail",
            messagePlaceholder: "Ihre Nachricht",
            sendMessage: "Nachricht senden",
            cookieText: "Unsere Website verwendet Cookies.",
            cookieDetails: "Details",
            cookieAccept: "Akzeptieren"
        },
        fr: {
            loading: "Chargement...",
            home: "Accueil",
            about: "À propos",
            skills: "Compétences",
            myProjects: "Mes Projets",
            experience: "Expérience",
            contact: "Contact",
            jobTitle: "Développeur Full Stack",
            experienceYears: "Années d'expérience",
            projects: "Projets",
            workplaces: "Lieux de travail",
            hello: "Bonjour, je suis",
            jobDesc: "Développeur Full Stack & Designer UI/UX",
            heroDesc: "Je travaille sur les technologies web depuis plus de 3 ans. Je suis passionné par la création de solutions web modernes, fonctionnelles et esthétiques.",
            viewProjects: "Voir les projets",
            contactMe: "Me contacter",
            aboutSub: "Apprenez à mieux me connaître",
            aboutDesc1: "Bonjour, je suis Gürkan Kabasakal. Je vis à Bursa et je suis en Terminale. Je suis un développeur de logiciels passionné par le développement web et le design. J'aime créer des solutions web modernes, fonctionnelles et esthétiques en gardant l'expérience utilisateur à l'esprit.",
            aboutDesc2: "Mon intérêt pour la technologie a commencé à un jeune âge et avec le temps, je me suis développé dans les technologies front-end et back-end. Je continue d'apprendre et de m'améliorer avec les technologies actuelles.",
            age: "Âge:",
            city: "Ville:",
            education: "Éducation:",
            highSchool: "Terminale",
            experience: "Expérience:",
            phone: "Téléphone:",
            skillsSub: "Mes compétences technologiques",
            frontend: "Frontend",
            backend: "Backend",
            tools: "Outils",
            projectsSub: "Quelques-uns de mes travaux remarquables",
            all: "Tous",
            web: "Web",
            mobile: "Mobile",
            design: "Design",
            ecommerceProject: "Plateforme E-Commerce",
            ecommerceDesc: "Solution e-commerce moderne que j'ai développée avec React et Node.js.",
            financeProject: "Tableau de bord financier",
            financeDesc: "Application de tableau de bord pour la visualisation de données en temps réel.",
            fitnessProject: "Application Fitness",
            fitnessDesc: "Application React Native pour le suivi d'entraînement personnel.",
            uiuxProject: "Kit de design UI/UX",
            uiuxDesc: "Système de design et bibliothèque de composants pour interfaces modernes.",
            blogProject: "Blog Personnel",
            blogDesc: "Plateforme de blog personnelle que j'ai développée avec Next.js et GraphQL.",
            recipeProject: "Application de Recettes",
            recipeDesc: "Application Flutter pour partager des recettes de cuisine.",
            experienceSub: "Mon parcours professionnel",
            seniorFrontend: "Développeur Frontend Senior",
            jobDesc1: "J'ai développé des applications web d'entreprise en utilisant React et Vue.js. J'étais responsable de la gestion de projet et des revues de code en tant que chef d'équipe.",
            webDeveloper: "Développeur Web",
            jobDesc2: "J'ai développé des sites web responsives et des plateformes e-commerce pour divers clients. J'ai travaillé sur des projets basés sur JavaScript et PHP.",
            juniorDeveloper: "Développeur Junior",
            jobDesc3: "J'ai effectué des travaux de développement d'interface en utilisant HTML, CSS et JavaScript. J'ai fait du codage front-end pour des projets clients.",
            now: "Maintenant",
            contactSub: "Entrer en contact",
            location: "Localisation",
            namePlaceholder: "Votre nom",
            emailPlaceholder: "Votre email",
            messagePlaceholder: "Votre message",
            sendMessage: "Envoyer le message",
            cookieText: "Notre site web utilise des cookies.",
            cookieDetails: "Détails",
            cookieAccept: "Accepter"
        }
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

    // Sidebar toggle
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
    });

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
                sidebar.classList.remove('show');
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
