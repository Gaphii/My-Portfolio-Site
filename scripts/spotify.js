// Spotify entegrasyonu için gerekli ayarlar
const clientId = 'YOUR_SPOTIFY_CLIENT_ID'; // Spotify Developer Dashboard'dan alın
const redirectUri = 'http://localhost:5500/callback.html'; // Spotify'da kayıtlı URI

// Rastgele state oluştur (CSRF koruması için)
function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// Spotify giriş sayfasına yönlendir
function loginWithSpotify() {
    const state = generateRandomString(16);
    localStorage.setItem('spotify_auth_state', state);
    
    const scope = 'user-read-private user-read-email user-read-currently-playing';
    
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(clientId);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirectUri);
    url += '&state=' + encodeURIComponent(state);
    
    window.location = url;
}

// URL'den access token al
function getAccessTokenFromUrl() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    
    const accessToken = params.get('access_token');
    const tokenType = params.get('token_type');
    const expiresIn = params.get('expires_in');
    const state = params.get('state');
    
    const storedState = localStorage.getItem('spotify_auth_state');
    
    if (accessToken && (state === null || state !== storedState)) {
        console.error('State mismatch error');
        return null;
    }
    
    localStorage.removeItem('spotify_auth_state');
    
    if (accessToken) {
        localStorage.setItem('spotify_access_token', accessToken);
        localStorage.setItem('spotify_token_type', tokenType);
        localStorage.setItem('spotify_expires_in', expiresIn);
        
        // Token'ın süresi dolunca sil
        setTimeout(() => {
            localStorage.removeItem('spotify_access_token');
            localStorage.removeItem('spotify_token_type');
            localStorage.removeItem('spotify_expires_in');
        }, expiresIn * 1000);
        
        return accessToken;
    }
    
    return null;
}

// Şu an çalan şarkıyı getir
async function getCurrentlyPlayingTrack(accessToken) {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    
    if (response.status === 200) {
        const data = await response.json();
        return data;
    } else if (response.status === 204) {
        // Şu an bir şarkı çalmıyor
        return null;
    } else {
        console.error('Error fetching currently playing track');
        return null;
    }
}

// Çalan şarkıyı göster
function displayCurrentlyPlayingTrack(track) {
    const playerElement = document.getElementById('spotifyPlayer');
    
    if (track && track.item) {
        const trackName = track.item.name;
        const artistName = track.item.artists[0].name;
        const albumImage = track.item.album.images[0].url;
        
        playerElement.innerHTML = `
            <div class="track-info">
                <div class="track-image">
                    <img src="${albumImage}" alt="${trackName}">
                </div>
                <div class="track-details">
                    <div class="track-name">${trackName}</div>
                    <div class="track-artist">${artistName}</div>
                </div>
            </div>
        `;
    } else {
        playerElement.innerHTML = '<p>Şu anda herhangi bir şarkı çalmıyor</p>';
    }
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', loginWithSpotify);
    
    // URL'den token almayı dene
    const accessToken = getAccessTokenFromUrl();
    
    if (accessToken) {
        // Token varsa, çalan şarkıyı getir
        getCurrentlyPlayingTrack(accessToken)
            .then(track => {
                displayCurrentlyPlayingTrack(track);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});