// Basitleştirilmiş Spotify entegrasyonu
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    
    loginButton.addEventListener('click', function() {
        // Burada gerçek Spotify entegrasyonu yapılacak
        alert('Spotify entegrasyonu yakında eklenecek!');
        
        // Simüle edilmiş şarkı bilgisi (gerçek uygulamada API'den gelecek)
        setTimeout(function() {
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
        }, 1500);
    });
});
