document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('snow');
    const ctx = canvas.getContext('2d');
    
    // Canvas boyutunu ayarla
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Kar taneleri
    const flakes = [];
    const flakeCount = 150;
    const flakeSpeed = 1.5;
    
    // Kar tanesi nesnesi
    function Flake() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * flakeSpeed + 0.5;
        this.wind = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
    }
    
    // Kar tanelerini başlat
    for (let i = 0; i < flakeCount; i++) {
        flakes.push(new Flake());
    }
    
    // Kar tanelerini çiz
    function drawFlakes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        
        for (let i = 0; i < flakeCount; i++) {
            const flake = flakes[i];
            ctx.moveTo(flake.x, flake.y);
            ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        }
        
        ctx.fill();
        moveFlakes();
    }
    
    // Kar tanelerini hareket ettir
    function moveFlakes() {
        for (let i = 0; i < flakeCount; i++) {
            const flake = flakes[i];
            
            flake.y += flake.speed;
            flake.x += flake.wind;
            
            if (flake.y > canvas.height) {
                flakes[i] = new Flake();
                flakes[i].y = 0;
            }
            
            if (flake.x > canvas.width || flake.x < 0) {
                flakes[i] = new Flake();
                flakes[i].y = Math.random() * canvas.height;
            }
        }
    }
    
    // Animasyonu başlat
    function animateSnow() {
        drawFlakes();
        requestAnimationFrame(animateSnow);
    }
    
    animateSnow();
});