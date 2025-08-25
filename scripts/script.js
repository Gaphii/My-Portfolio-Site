```javascript
document.addEventListener('DOMContentLoaded', function() {

    // --- ÖZEL MOUSE İMLECİ KODU ---
    const cursor = document.querySelector('.custom-cursor');
    const hoverElements = document.querySelectorAll('a, button'); // Üzerine gelince imlecin değişeceği elementler

    // Mouse hareketini takip et
    window.addEventListener('mousemove', e => {
        cursor.style.top = e.pageY + 'px';
        cursor.style.left = e.pageX + 'px';
    });
    
    // Tıklanabilir elementlerin üzerine gelince imleci büyüt
    hoverElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });

    // --- YETENEK ÇUBUĞU ANİMASYONU KODU ---
    const yeteneklerBolumu = document.querySelector('#yetenekler');
    const yetenekSeviyeleri = document.querySelectorAll('.yetenek-seviyesi');

    // Intersection Observer API kullanarak ekrana gelince animasyonu başlat
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                yetenekSeviyeleri.forEach(seviye => {
                    const level = seviye.getAttribute('data-level');
                    seviye.style.width = level;
                });
                observer.unobserve(yeteneklerBolumu); // Animasyon bir kere çalışınca gözlemciyi durdur
            }
        });
    }, { threshold: 0.5 }); // Bölümün %50'si görününce çalış

    observer.observe(yeteneklerBolumu);
});
```
