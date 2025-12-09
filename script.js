// Configuration
// IMPORTANT: Replace with your OpenWeatherMap API key (free at openweathermap.org/api)
const WEATHER_API_KEY = 'YOUR_API_KEY_HERE';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Video URLs - Replace these with your YouTube links or MP4 file paths
// You can organize videos by: timeOfDay (morning, afternoon, evening, night) and weather (sunny, rainy, cloudy, snowy)
const VIDEO_LIBRARY = {
    // Morning videos
    morning_sunny: 'https://example.com/videos/morning-sunny.mp4',
    morning_cloudy: 'https://example.com/videos/morning-cloudy.mp4',
    morning_rainy: 'https://example.com/videos/morning-rainy.mp4',
    morning_snowy: 'https://example.com/videos/morning-snowy.mp4',
    
    // Afternoon videos
    afternoon_sunny: 'https://example.com/videos/afternoon-sunny.mp4',
    afternoon_cloudy: 'https://example.com/videos/afternoon-cloudy.mp4',
    afternoon_rainy: 'https://example.com/videos/afternoon-rainy.mp4',
    afternoon_snowy: 'https://example.com/videos/afternoon-snowy.mp4',
    
    // Evening videos
    evening_sunny: 'https://example.com/videos/evening-sunny.mp4',
    evening_cloudy: 'https://example.com/videos/evening-cloudy.mp4',
    evening_rainy: 'https://example.com/videos/evening-rainy.mp4',
    evening_snowy: 'https://example.com/videos/evening-snowy.mp4',
    
    // Night videos
    night_clear: 'https://example.com/videos/night-clear.mp4',
    night_cloudy: 'https://example.com/videos/night-cloudy.mp4',
    night_rainy: 'https://example.com/videos/night-rainy.mp4',
    night_snowy: 'https://example.com/videos/night-snowy.mp4',
    
    // Default fallback
    default: 'https://example.com/videos/default.mp4'
};

// Messages based on conditions
const MESSAGES = {
    morning_sunny: 'The morning sun invites you to step outside',
    morning_cloudy: 'A gentle morning awaits beyond your screen',
    morning_rainy: 'The rain calls you to feel its touch',
    morning_snowy: 'Fresh snow blankets the world outside',
    
    afternoon_sunny: 'The afternoon light beckons you outdoors',
    afternoon_cloudy: 'Nature waits for you in the afternoon breeze',
    afternoon_rainy: 'The rain refreshes everything around you',
    afternoon_snowy: 'The world is quiet and white outside',
    
    evening_sunny: 'The evening sky paints colors just for you',
    evening_cloudy: 'Dusk settles gently, calling you outside',
    evening_rainy: 'Evening rain creates a peaceful rhythm',
    evening_snowy: 'The evening snow glows in the twilight',
    
    night_clear: 'The stars are waiting for you to look up',
    night_cloudy: 'The night holds mysteries beyond your screen',
    night_rainy: 'Listen to the night rain from your window',
    night_snowy: 'The night snow sparkles under the moon',
    
    default: 'Step outside and breathe'
};

// State
let currentLocation = null;
let currentWeather = null;
let currentTimeOfDay = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    setInterval(updateTime, 1000);
    getLocation();
});

// Get user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                currentLocation = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };
                getWeather(currentLocation.lat, currentLocation.lon);
            },
            error => {
                console.error('Error getting location:', error);
                // Fallback to default location (New York)
                currentLocation = { lat: 40.7128, lon: -74.0060 };
                getWeather(currentLocation.lat, currentLocation.lon);
            }
        );
    } else {
        console.error('Geolocation is not supported');
        // Fallback
        currentLocation = { lat: 40.7128, lon: -74.0060 };
        getWeather(currentLocation.lat, currentLocation.lon);
    }
}

// Get weather data
async function getWeather(lat, lon) {
    if (WEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
        console.warn('Please add your OpenWeatherMap API key in script.js');
        // Use mock data for development
        currentWeather = { main: 'Clear', name: 'Unknown' };
        updateContent();
        return;
    }

    try {
        const response = await fetch(
            `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const data = await response.json();
        
        if (data.cod === 200) {
            currentWeather = {
                main: data.weather[0].main,
                description: data.weather[0].description,
                name: data.name,
                country: data.sys.country
            };
            updateContent();
        } else {
            throw new Error('Weather API error');
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        // Fallback
        currentWeather = { main: 'Clear', name: 'Unknown' };
        updateContent();
    }
}

// Determine time of day
function getTimeOfDay() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
        return 'morning';
    } else if (hour >= 12 && hour < 17) {
        return 'afternoon';
    } else if (hour >= 17 && hour < 21) {
        return 'evening';
    } else {
        return 'night';
    }
}

// Map weather condition to simple category
function getWeatherCategory(weatherMain) {
    const weather = weatherMain.toLowerCase();
    
    if (weather.includes('rain') || weather.includes('drizzle')) {
        return 'rainy';
    } else if (weather.includes('snow')) {
        return 'snowy';
    } else if (weather.includes('cloud')) {
        return 'cloudy';
    } else {
        return 'sunny';
    }
}

// Update video and message based on conditions
function updateContent() {
    currentTimeOfDay = getTimeOfDay();
    
    if (!currentWeather) {
        // Use default if weather not loaded yet
        setVideoAndMessage('default', 'default');
        return;
    }
    
    const weatherCategory = getWeatherCategory(currentWeather.main);
    const key = `${currentTimeOfDay}_${weatherCategory}`;
    
    // Special case for night - use 'clear' instead of 'sunny'
    const videoKey = (currentTimeOfDay === 'night' && weatherCategory === 'sunny') 
        ? `${currentTimeOfDay}_clear` 
        : key;
    
    setVideoAndMessage(videoKey, key);
}

// Set video source and message
function setVideoAndMessage(videoKey, messageKey) {
    const video = document.getElementById('backgroundVideo');
    const messageElement = document.getElementById('mainMessage');
    
    // Get video URL
    const videoUrl = VIDEO_LIBRARY[videoKey] || VIDEO_LIBRARY.default;
    
    // Update video
    if (video.src !== videoUrl) {
        video.src = videoUrl;
        video.load();
        video.play().catch(error => {
            console.error('Error playing video:', error);
        });
    }
    
    // Update message
    const message = MESSAGES[messageKey] || MESSAGES.default;
    messageElement.querySelector('h1').textContent = message;
}

// Update time display
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    document.getElementById('timeDisplay').textContent = timeString;
    
    // Update city and weather if available
    if (currentWeather) {
        document.getElementById('cityDisplay').textContent = currentWeather.name || 'Unknown';
        
        const weatherText = formatWeather(currentWeather.main);
        document.getElementById('weatherDisplay').textContent = weatherText;
    }
    
    // Check if time of day changed and update content
    const newTimeOfDay = getTimeOfDay();
    if (newTimeOfDay !== currentTimeOfDay) {
        updateContent();
    }
}

// Format weather for display
function formatWeather(weatherMain) {
    const weatherMap = {
        'Clear': 'Sunny',
        'Clouds': 'Cloudy',
        'Rain': 'Rainy',
        'Drizzle': 'Rainy',
        'Snow': 'Snowy',
        'Thunderstorm': 'Stormy',
        'Mist': 'Misty',
        'Fog': 'Foggy'
    };
    
    return weatherMap[weatherMain] || weatherMain;
}

// Leave website function
function leaveWebsite() {
    // You can customize this to redirect to a specific URL or close the window
    if (confirm('Are you ready to disconnect and step outside?')) {
        // Option 1: Close the window/tab
        window.close();
        
        // Option 2: Redirect to a specific URL (uncomment and modify as needed)
        // window.location.href = 'https://example.com';
        
        // Option 3: Just hide the button and show a message
        // document.getElementById('leaveButton').style.display = 'none';
        // document.getElementById('mainMessage').querySelector('h1').textContent = 'Go outside and be present.';
    }
}

// Handle YouTube video conversion
// If you have YouTube links, you can use a service like youtube-dl or convert them to MP4
// For YouTube embeds, you would need to use iframe instead of video tag
// Here's a helper function if you want to use YouTube URLs:
function convertYouTubeToEmbed(url) {
    // This would require using iframe for YouTube videos
    // For now, we recommend converting YouTube videos to MP4 format
    return url;
}

