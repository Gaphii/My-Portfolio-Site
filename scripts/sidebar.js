document.addEventListener('DOMContentLoaded', function() {
    // Elementleri seçme
    const sidebar = document.querySelector('.mac-sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarClose = document.querySelector('.sidebar-close');
    const mainContent = document.querySelector('.main-content');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Sidebar'ı açma fonksiyonu
    function openSidebar() {
        sidebar.classList.add('active');
        mainContent.classList.add('shifted');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Sidebar'ı kapatma fonksiyonu
    function closeSidebar() {
        sidebar.classList.remove('active');
        mainContent.classList.remove('shifted');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Olay dinleyicileri
    sidebarToggle.addEventListener('click', openSidebar);
    sidebarClose.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
    
    // Klavye desteği (ESC tuşu ile kapatma)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
    
    // Pencere boyutu değiştiğinde kontrol et
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768 && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
});
