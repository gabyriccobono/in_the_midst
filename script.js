// Configuration
// IMPORTANT: Replace with your OpenWeatherMap API key (free at openweathermap.org/api)
const WEATHER_API_KEY = 'c25e6231fb9dc36d9005eb3f8491eb0f';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Video URLs - Replace these with your YouTube links or MP4 file paths
// You can organize videos by: timeOfDay (sunrise, morning, afternoon, sunset, night) and weather (sunny, rainy, cloudy, snowy)
const VIDEO_LIBRARY = {
    // Sunrise videos (5 AM - 7 AM)
    sunrise_sunny: 'videos/forest-sunrise.mp4',
    sunrise_cloudy: 'videos/cloudy-morning.mp4',
    sunrise_rainy: 'videos/rainy-morning.mp4',
    sunrise_snowy: 'videos/snowy-sunrise.mp4',
    
    // Morning videos (7 AM - 12 PM)
    morning_sunny: 'videos/sunny-morning.mp4',
    morning_cloudy: 'videos/cloudy-morning.mp4',
    morning_rainy: 'videos/rainy-morning.mp4',
    morning_snowy: 'videos/snowy-sunrise.mp4',
    
    // Afternoon videos (12 PM - 5 PM)
    afternoon_sunny: 'videos/afternoon-sunny.mp4',
    afternoon_cloudy: 'videos/.mp4',
    afternoon_rainy: 'videos/rainy-day.mp4',
    afternoon_snowy: 'videos/cloudy-snowy-afternoon.mp4',
    
    // Sunset videos (5 PM - 7 PM)
    sunset_sunny: 'videos/.mp4',
    sunset_cloudy: 'videos/Sunset-Beach.mp4',
    sunset_rainy: 'videos/rainy-day.mp4',
    sunset_snowy: 'videos/sunset-snow-drive.mp4',
    
    // Night videos (7 PM - 5 AM)
    night_clear: 'videos/clear-night.mp4',
    night_cloudy: 'videos/cloudy-night.mp4',
    night_rainy: 'videos/rainy-night.mp4',
    night_snowy: 'videos/snowy-night.mp4',
    
    // Default fallback
    default: 'videos/Sunset-Beach.mp4'
};

// Messages based on conditions
const MESSAGES = {
    sunrise_sunny: 'The world is waking up, are you?',
    sunrise_cloudy: 'Even cloudy mornings deserve to be witnessed',
    sunrise_rainy: 'Rain at sunrise means the earth is being reborn',
    sunrise_snowy: 'Fresh snow at dawn is nature\'s reset button',
    
    morning_sunny: 'Reminder that direct sunlight is a natural mood enhancer',
    morning_cloudy: 'Perfect excuse to go outside and pretend you are in a romantic film',
    morning_rainy: 'Even the weather thinks you should take it slow today',
    morning_snowy: "Nothing like the smell of fresh snow",
    
    afternoon_sunny: 'Perfect moment to go touch some grass',
    afternoon_cloudy: 'Perfect time for reflection or an afternoon walk',
    afternoon_rainy: 'It is still acceptable to dance in the rain no matter what anyone else says',
    afternoon_snowy: "You can't see the snowflakes with your phone, go use your eyes",
    
    sunset_sunny: "Golden hour exists for a reason, go witness it",
    sunset_cloudy: "Cloudy sunsets paint the sky in ways sunshine never could",
    sunset_rainy: "The sun is setting whether you see it or not",
    sunset_snowy: "Snow catches the last light like nothing else",
    
    night_clear: 'When was the last time you went stargazing?',
    night_cloudy: 'Can you see the moon behind the clouds? Can you smell the night?',
    night_rainy: 'Nature is giving you a free meditation soundtrack for a reason',
    night_snowy: 'Night snow is the closest you will get to time stopping',
    
    default: "Go see what makes today's sky different than yesterday's"
};

// State
let currentLocation = null;
let currentWeather = null;
let currentTimeOfDay = null;
let currentTimezoneOffsetSec = null;

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
            currentTimezoneOffsetSec = data.timezone ?? 0; // seconds offset from UTC
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

// Get a Date object for the location's local time using the timezone offset (seconds)
function getLocalDate() {
    const now = Date.now();
    // Browser's local offset in minutes; convert to seconds and invert sign to match API style
    const localOffsetSec = -new Date().getTimezoneOffset() * 60;
    if (typeof currentTimezoneOffsetSec === 'number') {
        // Adjust from the browser's timezone to the target timezone
        const deltaSec = currentTimezoneOffsetSec - localOffsetSec;
        return new Date(now + deltaSec * 1000);
    }
    return new Date(now);
}

// Determine time of day - UPDATED to include sunrise and sunset
function getTimeOfDay() {
    const localDate = getLocalDate();
    const hour = localDate.getHours();
    
    if (hour >= 5 && hour < 7) {
        return 'sunrise';
    } else if (hour >= 7 && hour < 12) {
        return 'morning';
    } else if (hour >= 12 && hour < 17) {
        return 'afternoon';
    } else if (hour >= 17 && hour < 19) {
        return 'sunset';
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
    const now = getLocalDate();
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
    const timeOfDay = getTimeOfDay();
    const weatherMap = {
        'Clear': 'Sunny',
        'Clouds': 'Cloudy',
        'Rain': 'Rainy',
        'Drizzle': 'Rainy',
        'Snow': 'Snowy',
        'Thunderstorm': 'Stormy',
        'Mist': 'Misty',
        'Fog': 'Foggy',
        'Haze': 'Haze',
        'Smoke': 'Cloudy',
        'Dust': 'Dusty',
        'Sand': 'Sandy',
        'Ash': 'Ash',
        'Squall': 'Windy',
        'Tornado': 'Windy'
    };
    
    if (weatherMain === 'Clear' && timeOfDay === 'night') {
        return 'Clear night';
    }
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

// Auto-unmute video on load (may still require user gesture on some browsers)
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('backgroundVideo');
    if (video) {
        video.muted = false;
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(err => {
                console.warn('Autoplay with sound was blocked; user interaction needed.', err);
            });
        }
    }
});