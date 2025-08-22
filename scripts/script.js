document.addEventListener('DOMContentLoaded', function() {
    // Yazı yazma efekti
    const typingElement = document.querySelector('.typing-effect');
    const originalText = typingElement.textContent;
    typingElement.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            typingElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        }
    }
    
    setTimeout(typeWriter, 1000);
    
    // Yetenek seviyelerini animasyonla göster
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
        });
    }
    
    // Sayfa yüklendikten sonra animasyonu başlat
    setTimeout(animateSkills, 1800);
    
    // Spotify bağlantısı
    document.getElementById('spotifyAuth').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('loginButton').click();
    });
    
    // Discord butonu için
    document.querySelector('.discord-btn').addEventListener('click', function() {
        alert('Discord bağlantısı henüz ayarlanmadı. Kısa sürede eklenecek!');
    });
    
    // Sayfa geçişleri
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
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.textContent;
            alert(`${platform} sayfam yakında eklenecek!`);
        });
    });
});
// Discord butonuna tıklayınca sunucu daveti aç
document.querySelector(".discord-btn").addEventListener("click", function() {
    window.open("https://discord.gg/RH24rgjJ", "_blank"); 
    // 👆 kendi davet linkinle değiştir
});
// Spotify butonuna tıklayınca listeyi aç
document.querySelector(".spotify-btn").addEventListener("click", function() {
    window.open("https://open.spotify.com/playlist/37i9dQZF1DWWY64wDtewQt?si=06ce5fe29fa64cfd", "_blank"); 
});
