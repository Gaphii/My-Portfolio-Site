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
        alert('Discord: GürkanK#1234');
    });
    
    // Navigasyon butonları
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aktif butonu güncelle
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Sayfa adını al
            const pageName = this.textContent;
            alert(`${pageName} sayfasına yönlendiriliyorsunuz...`);
        });
    });
    
    // Spotify giriş butonu
    document.getElementById('loginButton').addEventListener('click', function() {
        alert('Spotify bağlantısı henüz kurulmadı. Yakında eklenecek!');
    });
});
