const WEATHER_API_KEY = 'c25e6231fb9dc36d9005eb3f8491eb0f';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const VIDEO_LIBRARY = {
    morning_sunny: 'videos/forest-sunrise.mp4',
    morning_cloudy: 'videos/cloudy-morning.mp4',
    morning_rainy: 'videos/rainy-morning.mp4',
    morning_snowy: 'videos/snowy-sunrise.mp4',
    
    afternoon_sunny: 'videos/Sunny-forest.mp4',
    afternoon_cloudy: 'videos/.mp4',
    afternoon_rainy: 'videos/rainy-day.mp4',
    afternoon_snowy: 'videos/cloudy-snow-walk.mp4',

    evening_sunny: 'videos/windy-meadow.mp4',
    evening_cloudy: 'videos/Sunset-Beach.mp4',
    evening_rainy: 'videos/Sunset-Beach.mp4',
    evening_snowy: 'videos/snowy-sunset.mp4',

    night_clear: 'videos/clear-night.mp4',
    night_cloudy: 'videos/cloudy-night.mp4',
    night_rainy: 'videos/rainy night.mp4',
    night_snowy: 'videos/snowy-night.mp4',
    
    default: 'videos/Sunset-Beach.mp4'
};

const MESSAGES = {
    morning_sunny: 'Breaking news: sunlight is a free mood enhancer',
    morning_cloudy: "Perfect day to pretend you're in a romance film, go outside to find love",
    morning_rainy: 'Even the weather is thinking you should take it easy today',
    morning_snowy: "The snowflakes won't be captured through your camera, go use your eyes",
    
    afternoon_sunny: "The chaos can wait, the sun won't",
    afternoon_cloudy: 'Perfect hour for reflection or a dramatic walk',
    afternoon_rainy: 'It is always acceptable to dance in the rain',
    afternoon_snowy: 'Go outside and let the cold bully you into feeling alive',
    
    evening_sunny: 'Perfect moment to go touch grass and reboot',
    evening_cloudy: 'Time to avoid the evening slump and reconnect with nature',
    evening_rainy: '',
    evening_snowy: 'If you are mad at the cold,',
    
    night_clear: 'When was the last time you went stargazing?',
    night_cloudy: 'Can you notice the moon under the clouds? Can you smell the night?',
    night_rainy: 'Nature is giving you a meditation soundtrack for a reason',
    night_snowy: 'Night snow is the closest you will get to time stopping',
    
    default: "Go check what makes today's sky different than yesterday's"
};

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

