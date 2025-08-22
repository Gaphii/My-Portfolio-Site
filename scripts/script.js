document.addEventListener('DOMContentLoaded', function() {
    // Kar efekti oluştur
    function createSnow() {
        const snowContainer = document.querySelector('.snow-container');
        const snowflakeCount = 100;
        
        for (let i = 0; i < snowflakeCount; i++) {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            
            // Rastgele boyut ve pozisyon
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const delay = Math.random() * 20;
            const duration = Math.random() * 10 + 10;
            
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;
            snowflake.style.left = `${posX}vw`;
            snowflake.style.animationDelay = `${delay}s`;
            snowflake.style.animationDuration = `${duration}s`;
            snowflake.style.opacity = Math.random() * 0.6 + 0.4;
            
            snowContainer.appendChild(snowflake);
        }
    }
    
    // Yazı yazma efekti - Önce "GAPHI" yazıp sonra silecek ve "GÜRKAN KABASAKAL" yazacak
    const typingElement = document.querySelector('.typing-effect');
    const finalText = "GÜRKAN KABASAKAL";
    const tempText = "GAPHI";
    typingElement.textContent = '';
    
    let step = 0;
    function advancedTypeWriter() {
        if (step === 0) {
            // Önce GAPHI yaz
            if (typingElement.textContent.length < tempText.length) {
                typingElement.textContent += tempText.charAt(typingElement.textContent.length);
                setTimeout(advancedTypeWriter, 150);
            } else {
                step = 1;
                setTimeout(advancedTypeWriter, 1000); // 1 saniye bekle
            }
        } else if (step === 1) {
            // GAPHI'yi sil
            if (typingElement.textContent.length > 0) {
                typingElement.textContent = typingElement.textContent.slice(0, -1);
                setTimeout(advancedTypeWriter, 100);
            } else {
                step = 2;
                setTimeout(advancedTypeWriter, 500); // 0.5 saniye bekle
            }
        } else if (step === 2) {
            // GÜRKAN KABASAKAL yaz
            if (typingElement.textContent.length < finalText.length) {
                typingElement.textContent += finalText.charAt(typingElement.textContent.length);
                setTimeout(advancedTypeWriter, 150);
            } else {
                // Yazma işlemi bittikten sonra imleci kaldır
                typingElement.style.animation = 'none';
            }
        }
    }
    
    // Yetenek seviyelerini animasyonla göster
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
        });
    }
    
    // Spotify bağlantısı
    document.getElementById('spotifyAuth').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('loginButton').click();
    });
    
    // Discord butonu için
    document.querySelector('.discord-btn').addEventListener('click', function() {
        alert('Discord: GürkanK#1234');
    });
    
    // Navigasyon butonları
    const navButtons = document.querySelectorAll('.nav-btn');
    const pageContents = document.querySelectorAll('.page-content');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            
            // Aktif butonu güncelle
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Aktif sayfayı göster
            pageContents.forEach(page => page.classList.remove('active'));
            document.getElementById(`${targetPage}-page`).classList.add('active');
        });
    });
    
    // Spotify giriş butonu
    document.getElementById('loginButton').addEventListener('click', function() {
        // Şarkı bilgisini göster
        const playerElement = document.querySelector('.spotify-player');
        playerElement.innerHTML = `
            <div class="track-info">
                <div class="track-details">
                    <div class="track-name">Sevdim Seni Bir Kere</div>
                    <div class="track-artist">Mithat Körler</div>
                </div>
            </div>
            <p>Şu an çalıyor</p>
        `;
    });
    
    // İletişim formu
    const contactForm = document.getElementById('messageForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mesajınız gönderildi! En kısa sürede sizinle iletişime geçeceğim.');
            contactForm.reset();
        });
    }
    
    // Sosyal medya butonları
    const socialButtons = document.querySelectorAll('.social-contact .social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.textContent;
            alert(`${platform} sayfam yakında eklenecek!`);
        });
    });
    
    // Sayfa yüklendikten sonra animasyonları başlat
    setTimeout(advancedTypeWriter, 1000);
    setTimeout(animateSkills, 4000); // İsim yazımı bittikten sonra
    createSnow();
});
