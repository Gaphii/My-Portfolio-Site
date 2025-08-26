// TEMA DEĞİŞTİRME FONKSİYONU
function initThemeSwitcher() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Elementleri kontrol et
    if (!themeToggle) {
        console.error('Tema butonu bulunamadı!');
        return;
    }
    
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('.theme-text');
    const body = document.body;
    
    // Yerel depolamadan tema tercihini yükle
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeUI(savedTheme);
    }
    
    // Tema değiştirme butonuna tıklama
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Temayı değiştir
        body.setAttribute('data-theme', newTheme);
        
        // Yerel depolamaya kaydet
        localStorage.setItem('theme', newTheme);
        
        // UI'ı güncelle
        updateThemeUI(newTheme);
    });
    
    // UI güncelleme fonksiyonu
    function updateThemeUI(theme) {
        if (!themeIcon || !themeText) return;
        
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Koyu Mod';
        } else {
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Açık Mod';
        }
    }
    
    // Sistem temasını takip et
    function watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Sistem teması değiştiğinde
        mediaQuery.addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) { // Kullanıcı tercihi yoksa
                const newTheme = e.matches ? 'dark' : 'light';
                body.setAttribute('data-theme', newTheme);
                updateThemeUI(newTheme);
            }
        });
    }
    
    // Eğer tema tercihi yoksa sistem temasını kullan
    if (!savedTheme) {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        body.setAttribute('data-theme', systemTheme);
        updateThemeUI(systemTheme);
    }
    
    watchSystemTheme();
}

// Hata yakalama
function safeInitTheme() {
    try {
        initThemeSwitcher();
    } catch (error) {
        console.error('Tema yükleyici hatası:', error);
    }
}

// Sayfa yüklendiğinde çalıştır
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeInitTheme);
} else {
    safeInitTheme();
}
