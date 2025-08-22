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
});