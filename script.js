// Configuration
const WEATHER_API_KEY = 'c25e6231fb9dc36d9005eb3f8491eb0f';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// YouTube Video Library
// INSTRUCTIONS: Replace 'YOUR_VIDEO_ID' with your actual YouTube video IDs
// To get the ID: Upload video to YouTube as "Unlisted", then copy the ID from the URL
// Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ -> ID is "dQw4w9WgXcQ"
// 
// start: time in seconds where you want the video to start playing
// end: time in seconds where you want the video to stop (optional - leave blank to play full video)
const VIDEO_LIBRARY = {
    // Sunrise videos (5 AM - 7 AM)
    sunrise_sunny: { 
        id: 'sA90VcBSHmw',
        start: 1,
        end: null  // null means play until the end
    },
    sunrise_cloudy: { 
        id: 'YOUR_VIDEO_ID',
        start: 0,
        end: null
    },
    sunrise_rainy: { 
        id: 'YOUR_VIDEO_ID',
        start: 0,
        end: null
    },
    sunrise_snowy: { 
        id: 'YOUR_VIDEO_ID',
        start: 0,
        end: null
    },
    
    // Morning videos (7 AM - 12 PM)
    morning_sunny: { 
        id: 'YOUR_VIDEO_ID',
        start: 0,
        end: null
    },
    morning_cloudy: { 
        id: 'ns8H-eI5-UA',
        start: 0,
        end: null
    },
    morning_rainy: { 
        id: 'YOUR_VIDEO_ID',
        start: 0,
        end: null
    },
    morning_snowy: { 
        id: 'YOUR_VIDEO_ID',
        start: 0,
        end: null
    },
    
    // Afternoon videos (12 PM - 5 PM)
    afternoon_sunny: { 
        id: 'YOUR_VIDEO_ID',
        start: 0,
        end: null
    },
    afternoon_cloudy: { 
        id: 'tNvbc3ensqM',
        start: 0,
        end: null
    },
    afternoon_rainy: { 
        id: 'ek656V25dJg',
        start: 0,
        end: null
    },
    afternoon_snowy: { 
        id: 'YOUR_VIDEO_ID',
        start: 0,
        end: null
    },
    
    // Sunset videos (5 PM - 7 PM)
    sunset_sunny: { 
        id: 'YOUR_VIDEO_ID',
        start: 0,
        end: null
    },
    sunset_cloudy: { 
        id: 'YOUR_VIDEO_ID',
        start: 0,
        end: null
    },
    sunset_rainy: { 
        id: 'YOUR_VIDEO_ID',
        start: 0,
        end: null
    },
    sunset_snowy: { 
        id: 'YOUR_VIDEO_ID',
        start: 0,
        end: null
    },
    
    // Night videos (7 PM - 5 AM)
    night_clear: { 
        id: 'YOUR_VIDEO_ID',
        start: 0,
        end: null
    },
    night_cloudy: { 
        id: 'I-u52_csCvA',
        start: 0,
        end: null
    },
    night_rainy: { 
        id: 'YOUR_VIDEO_ID',
        start: 0,
        end: null
    },
    night_snowy: { 
        id: 'fyNGfXjGiO4',
        start: 0,
        end: null
    },
    
    // Default fallback
    default: { 
        id: 'sA90VcBSHmw',
        start: 1,
        end: null
    }
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
let player = null;
let currentVideoKey = null;
let isYouTubeAPIReady = false;

// Load YouTube IFrame API
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function is called automatically when YouTube API is ready
function onYouTubeIframeAPIReady() {
    console.log('YouTube API Ready');
    isYouTubeAPIReady = true;
    initializeApp();
}

// Initialize app
function initializeApp() {
    updateTime();
    setInterval(updateTime, 1000);
    getLocation();
}

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
                currentLocation = { lat: 40.7128, lon: -74.0060 };
                getWeather(currentLocation.lat, currentLocation.lon);
            }
        );
    } else {
        console.error('Geolocation is not supported');
        currentLocation = { lat: 40.7128, lon: -74.0060 };
        getWeather(currentLocation.lat, currentLocation.lon);
    }
}

// Get weather data
async function getWeather(lat, lon) {
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
            currentTimezoneOffsetSec = data.timezone ?? 0;
            updateContent();
        } else {
            throw new Error('Weather API error');
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        currentWeather = { main: 'Clear', name: 'Unknown' };
        updateContent();
    }
}

function getLocalDate() {
    const now = Date.now();
    const localOffsetSec = -new Date().getTimezoneOffset() * 60;
    if (typeof currentTimezoneOffsetSec === 'number') {
        const deltaSec = currentTimezoneOffsetSec - localOffsetSec;
        return new Date(now + deltaSec * 1000);
    }
    return new Date(now);
}

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

function updateContent() {
    currentTimeOfDay = getTimeOfDay();
    
    if (!currentWeather) {
        setVideoAndMessage('default', 'default');
        return;
    }
    
    const weatherCategory = getWeatherCategory(currentWeather.main);
    const key = `${currentTimeOfDay}_${weatherCategory}`;
    
    const videoKey = (currentTimeOfDay === 'night' && weatherCategory === 'sunny') 
        ? `${currentTimeOfDay}_clear` 
        : key;
    
    setVideoAndMessage(videoKey, key);
}

function setVideoAndMessage(videoKey, messageKey) {
    const messageElement = document.getElementById('mainMessage');
    const videoData = VIDEO_LIBRARY[videoKey] || VIDEO_LIBRARY.default;
    
    // Only update video if it changed
    if (currentVideoKey !== videoKey && isYouTubeAPIReady) {
        currentVideoKey = videoKey;
        loadYouTubeVideo(videoData);
    }
    
    // Update message
    const message = MESSAGES[messageKey] || MESSAGES.default;
    if (messageElement) {
        messageElement.querySelector('h1').textContent = message;
    }
}

function loadYouTubeVideo(videoData) {
    const container = document.getElementById('backgroundVideo');
    
    if (!container) {
        console.error('Video container not found');
        return;
    }
    
    // Destroy existing player if any
    if (player) {
        player.destroy();
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Create new div for YouTube player
    const playerDiv = document.createElement('div');
    playerDiv.id = 'ytplayer';
    container.appendChild(playerDiv);
    
    // Build player parameters
    const playerVars = {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        cc_load_policy: 0,
        loop: 1,
        playlist: videoData.id,
        start: videoData.start || 0,
        mute: 0,
        enablejsapi: 1
    };
    
    // Only add end parameter if it exists
    if (videoData.end) {
        playerVars.end = videoData.end;
    }
    
    // Create new player
    player = new YT.Player('ytplayer', {
        videoId: videoData.id,
        playerVars: playerVars,
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: onPlayerError
        }
    });
}

function onPlayerReady(event) {
    console.log('Player ready');
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    // If video ended, restart from beginning
    if (event.data === YT.PlayerState.ENDED) {
        const videoData = VIDEO_LIBRARY[currentVideoKey];
        if (videoData) {
            player.seekTo(videoData.start || 0);
            player.playVideo();
        }
    }
}

function onPlayerError(event) {
    console.error('YouTube player error:', event.data);
    console.log('Error codes: 2=Invalid ID, 5=HTML5 error, 100=Video not found, 101/150=Embed disabled');
}

function updateTime() {
    const now = getLocalDate();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    
    const timeDisplay = document.getElementById('timeDisplay');
    if (timeDisplay) {
        timeDisplay.textContent = timeString;
    }
    
    if (currentWeather) {
        const cityDisplay = document.getElementById('cityDisplay');
        const weatherDisplay = document.getElementById('weatherDisplay');
        
        if (cityDisplay) {
            cityDisplay.textContent = currentWeather.name || 'Unknown';
        }
        
        if (weatherDisplay) {
            const weatherText = formatWeather(currentWeather.main);
            weatherDisplay.textContent = weatherText;
        }
    }
    
    const newTimeOfDay = getTimeOfDay();
    if (newTimeOfDay !== currentTimeOfDay) {
        updateContent();
    }
}

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

function leaveWebsite() {
    if (confirm('Are you ready to disconnect and step outside?')) {
        window.close();
    }
}

// If YouTube API is already loaded when this script runs
if (window.YT && window.YT.Player) {
    onYouTubeIframeAPIReady();
}