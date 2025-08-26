// TEMA DEĞİŞTİRME FONKSİYONU
function initThemeSwitcher() {
    const themeToggle = document.getElementById('themeToggle');
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
        
        // Kullanıcıya feedback
        showThemeNotification(newTheme);
    });
    
    // UI güncelleme fonksiyonu
    function updateThemeUI(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Koyu Mod';
        } else {
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Açık Mod';
        }
    }
    
    // Bildirim gösterimi
    function showThemeNotification(theme) {
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.textContent = theme === 'dark' ? 'Koyu tema etkinleştirildi' : 'Açık tema etkinleştirildi';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: var(--surface);
            color: var(--text);
            border-radius: 8px;
            border-left: 4px solid var(--primary);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
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
    
    // Sayfa yüklendiğinde
    document.addEventListener('DOMContentLoaded', function() {
        watchSystemTheme();
        
        // Eğer tema tercihi yoksa sistem temasını kullan
        if (!savedTheme) {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            body.setAttribute('data-theme', systemTheme);
            updateThemeUI(systemTheme);
        }
    });
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', initThemeSwitcher);
