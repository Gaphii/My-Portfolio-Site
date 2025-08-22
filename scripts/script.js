document.addEventListener('DOMContentLoaded', function() {
    // Geometrik şekil efekti oluştur
    function createGeometryEffect() {
        const geometryContainer = document.querySelector('.geometry-container');
        const shapeCount = 15;
        const shapes = [];
        
        // Şekil tipleri: circle, square, triangle, hexagon
        const shapeTypes = ['circle', 'square', 'triangle', 'hexagon'];
        const colors = ['#bb86fc', '#03dac6', '#cf6679', '#6200ea', '#018786'];
        
        for (let i = 0; i < shapeCount; i++) {
            const shape = document.createElement('div');
            shape.classList.add('geometry-shape');
            
            // Rastgele özellikler
            const size = Math.random() * 40 + 20;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const rotation = Math.random() * 360;
            const opacity = Math.random() * 0.4 + 0.3;
            
            // Şekil özelliklerini ayarla
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.left = `${posX}vw`;
            shape.style.top = `${posY}vh`;
            shape.style.opacity = opacity;
            shape.style.transform = `rotate(${rotation}deg)`;
            shape.style.backgroundColor = color;
            
            // Şekil tipine göre stiller
            if (type === 'circle') {
                shape.style.borderRadius = '50%';
            } else if (type === 'triangle') {
                shape.style.width = '0';
                shape.style.height = '0';
                shape.style.backgroundColor = 'transparent';
                shape.style.borderLeft = `${size/2}px solid transparent`;
                shape.style.borderRight = `${size/2}px solid transparent`;
                shape.style.borderBottom = `${size}px solid ${color}`;
            } else if (type === 'hexagon') {
                shape.style.backgroundColor = 'transparent';
                shape.style.position = 'relative';
                shape.style.width = `${size}px`;
                shape.style.height = `${size * 0.866}px`;
                shape.style.backgroundColor = color;
                shape.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
            }
            
            geometryContainer.appendChild(shape);
            shapes.push({
                element: shape,
                speedX: (Math.random() - 0.5) * 0.8,
                speedY: (Math.random() - 0.5) * 0.8,
                rotationSpeed: (Math.random() - 0.5) * 0.8
            });
        }
        
        // Mouse hareketini takip et
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Şekilleri mouse pozisyonuna göre hareket ettir
            shapes.forEach(shape => {
                const rect = shape.element.getBoundingClientRect();
                const shapeX = rect.left + rect.width / 2;
                const shapeY = rect.top + rect.height / 2;
                
                const distanceX = mouseX - shapeX;
                const distanceY = mouseY - shapeY;
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                
                if (distance < 200) {
                    const force = 1 - (distance / 200);
                    shape.element.style.transform = `translate(${distanceX * force * 0.1}px, ${distanceY * force * 0.1}px) rotate(${shape.rotationSpeed * Date.now() / 20}deg)`;
                    shape.element.style.opacity = 0.8;
                } else {
                    shape.element.style.transform = `rotate(${shape.rotationSpeed * Date.now() / 20}deg)`;
                    shape.element.style.opacity = 0.3;
                }
            });
        });
        
        // Şekilleri hareket ettir
        function animateShapes() {
            shapes.forEach(shape => {
                const rect = shape.element.getBoundingClientRect();
                
                // Ekran sınırlarını kontrol et
                if (rect.left < 0 || rect.right > window.innerWidth) {
                    shape.speedX *= -1;
                }
                if (rect.top < 0 || rect.bottom > window.innerHeight) {
                    shape.speedY *= -1;
                }
                
                // Yeni pozisyonu hesapla
                const currentX = parseFloat(shape.element.style.left || 0);
                const currentY = parseFloat(shape.element.style.top || 0);
                
                shape.element.style.left = `${currentX + shape.speedX}px`;
                shape.element.style.top = `${currentY + shape.speedY}px`;
            });
            
            requestAnimationFrame(animateShapes);
        }
        
        animateShapes();
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
    createGeometryEffect();
});
