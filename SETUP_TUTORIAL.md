# Step-by-Step Setup Tutorial
## "In the Midst" Website Setup Guide

This tutorial will walk you through setting up your website step by step. Don't worry if you're a beginner - we'll explain everything in detail!

---

## 📋 Table of Contents
1. [What You Need](#what-you-need)
2. [Step 1: Get a Weather API Key](#step-1-get-a-weather-api-key)
3. [Step 2: Add Your API Key to the Website](#step-2-add-your-api-key-to-the-website)
4. [Step 3: Prepare Your Videos](#step-3-prepare-your-videos)
5. [Step 4: Add Video URLs to Your Website](#step-4-add-video-urls-to-your-website)
6. [Step 5: Customize Your Messages (Optional)](#step-5-customize-your-messages-optional)
7. [Step 6: Test Your Website](#step-6-test-your-website)
8. [Troubleshooting](#troubleshooting)

---

## What You Need

Before you start, make sure you have:
- ✅ A computer (Mac or PC)
- ✅ A text editor (we'll show you how to use one)
- ✅ Your videos ready (YouTube links or MP4 files)
- ✅ An internet connection
- ✅ About 15-20 minutes

---

## Step 1: Get a Weather API Key

The website needs to know the weather to show the right video. We'll use a free service called OpenWeatherMap.

### Detailed Instructions:

1. **Open your web browser** (Chrome, Safari, Firefox, etc.)

2. **Go to this website:**
   ```
   https://openweathermap.org/api
   ```

3. **Click the "Sign Up" button** (usually in the top right corner)

4. **Fill out the registration form:**
   - Enter your username
   - Enter your email address
   - Create a password
   - Check the box to agree to terms
   - Click "Create Account"

5. **Check your email** for a confirmation message from OpenWeatherMap

6. **Click the confirmation link** in the email

7. **Log in** to OpenWeatherMap with your new account

8. **Go to the "API keys" section:**
   - Look for a menu item called "API keys" or click this link: https://home.openweathermap.org/api_keys
   - You should see a default API key (a long string of letters and numbers)
   - If you don't see one, click "Generate" to create one

9. **Copy your API key:**
   - Click on the API key to select it
   - Copy it (Cmd+C on Mac, Ctrl+C on Windows)
   - **IMPORTANT:** Keep this key safe! Don't share it publicly.

**✅ You're done with Step 1!** You now have an API key that looks something like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

---

## Step 2: Add Your API Key to the Website

Now we'll add your API key to the website code.

### Detailed Instructions:

1. **Find the `script.js` file** in your project folder
   - It should be in the same folder as `index.html`

2. **Open `script.js` with a text editor:**
   
   **On Mac:**
   - Right-click on `script.js`
   - Choose "Open With" → "TextEdit"
   - OR use a code editor like Visual Studio Code (free download from https://code.visualstudio.com)

   **On Windows:**
   - Right-click on `script.js`
   - Choose "Open With" → "Notepad"
   - OR use a code editor like Visual Studio Code

3. **Find this line** (it should be near the top, around line 3):
   ```javascript
   const WEATHER_API_KEY = 'YOUR_API_KEY_HERE';
   ```

4. **Replace `YOUR_API_KEY_HERE`** with your actual API key:
   ```javascript
   const WEATHER_API_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
   ```
   (Use your actual API key, not this example!)

5. **Save the file:**
   - Mac: Press `Cmd + S`
   - Windows: Press `Ctrl + S`

**✅ You're done with Step 2!** The website can now check the weather.

---

## Step 3: Prepare Your Videos

You need videos for different times of day and weather conditions. Here's what you need:

### Video Requirements:

**Time of Day Categories:**
- **Morning** (5 AM - 12 PM)
- **Afternoon** (12 PM - 5 PM)
- **Evening** (5 PM - 9 PM)
- **Night** (9 PM - 5 AM)

**Weather Categories:**
- **Sunny** (clear skies)
- **Cloudy** (cloudy skies)
- **Rainy** (rain or drizzle)
- **Snowy** (snow)

**Total Videos Needed:** You need at least 16 videos (4 times × 4 weather types), but you can start with fewer and use a default video for missing ones.

### Option A: Using YouTube Videos

If your videos are on YouTube:

1. **Get the YouTube video URL:**
   - Go to your YouTube video
   - Copy the URL from the address bar (e.g., `https://www.youtube.com/watch?v=abc123xyz`)

2. **Convert YouTube to MP4:**
   - Use a free online converter like:
     - https://www.y2mate.com
     - https://www.onlinevideoconverter.com
   - Paste your YouTube URL
   - Choose MP4 format
   - Download the converted file

3. **Upload to a hosting service:**
   - You can't use YouTube URLs directly in the video tag
   - Upload your MP4 files to:
     - **Google Drive** (make files public and get shareable links)
     - **Dropbox** (get public links)
     - **GitHub** (if you're hosting the site there)
     - **A web hosting service** (like Netlify, Vercel, or your own server)

### Option B: Using MP4 Files Directly

If you already have MP4 files:

1. **Organize your videos:**
   - Name them clearly, like: `morning-sunny.mp4`, `afternoon-rainy.mp4`, etc.
   - Put them in a `videos` folder in your project

2. **If hosting locally:**
   - Keep the files in your project folder
   - Use relative paths like: `videos/morning-sunny.mp4`

3. **If hosting online:**
   - Upload videos to your web hosting service
   - Get the full URL for each video

**✅ You're done with Step 3!** You should now have video URLs ready to add.

---

## Step 4: Add Video URLs to Your Website

Now we'll tell the website where to find your videos.

### Detailed Instructions:

1. **Open `script.js`** in your text editor (same way as Step 2)

2. **Find the `VIDEO_LIBRARY` section** (around line 8-35)

3. **You'll see something like this:**
   ```javascript
   const VIDEO_LIBRARY = {
       morning_sunny: 'https://example.com/videos/morning-sunny.mp4',
       morning_cloudy: 'https://example.com/videos/morning-cloudy.mp4',
       // ... more videos
   };
   ```

4. **Replace each example URL** with your actual video URL:

   **Example 1: If your video is on Google Drive:**
   ```javascript
   morning_sunny: 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID',
   ```

   **Example 2: If your video is in a `videos` folder:**
   ```javascript
   morning_sunny: 'videos/morning-sunny.mp4',
   ```

   **Example 3: If your video is on a website:**
   ```javascript
   morning_sunny: 'https://yoursite.com/videos/morning-sunny.mp4',
   ```

5. **Replace ALL the video URLs** you have videos for. For videos you don't have yet, you can:
   - Leave the example URL (it won't work, but won't break the site)
   - Use your default video URL for all missing ones
   - Use the same video for multiple conditions

6. **Make sure each line:**
   - Has a video URL in quotes
   - Ends with a comma (except the last one)
   - Looks like: `key: 'url',`

7. **Save the file** (`Cmd + S` or `Ctrl + S`)

**✅ You're done with Step 4!** Your website now knows where to find your videos.

---

## Step 5: Customize Your Messages (Optional)

You can change the text messages that appear on your website.

### Detailed Instructions:

1. **Open `script.js`** in your text editor

2. **Find the `MESSAGES` section** (around line 37-60)

3. **You'll see messages like:**
   ```javascript
   const MESSAGES = {
       morning_sunny: 'The morning sun invites you to step outside',
       morning_cloudy: 'A gentle morning awaits beyond your screen',
       // ... more messages
   };
   ```

4. **Change any message** to whatever you want:
   ```javascript
   morning_sunny: 'Your custom message here',
   ```

5. **Tips for good messages:**
   - Keep them short (1-2 lines)
   - Make them encouraging
   - Focus on connecting with nature
   - Use simple, clear language

6. **Save the file**

**✅ You're done with Step 5!** Your messages are now personalized.

---

## Step 6: Test Your Website

Now let's make sure everything works!

### Detailed Instructions:

1. **Open `index.html` in your web browser:**
   - **On Mac:** Right-click `index.html` → "Open With" → "Safari" or "Chrome"
   - **On Windows:** Right-click `index.html` → "Open With" → "Chrome" or "Edge"

2. **Allow location access:**
   - Your browser will ask for permission to use your location
   - Click "Allow" or "Yes"
   - This lets the website know where you are for weather

3. **Check if it works:**
   - You should see a video playing in the background
   - A message in the center
   - A "Leave this page" button
   - Time, city, and weather at the bottom

4. **Test on your phone:**
   - If you're hosting online, visit the website on your phone
   - Make sure everything looks good and works

5. **Test different conditions:**
   - Try opening the site at different times of day
   - Check if it shows different videos for different weather

**✅ You're done!** Your website should now be working!

---

## Troubleshooting

### Problem: "The video won't play"

**Solutions:**
- Make sure your video URLs are correct (copy and paste them into a browser to test)
- Check that your videos are in MP4 format
- If using Google Drive, make sure the file is set to "Anyone with the link can view"
- Try a different video URL format

### Problem: "Weather shows as 'Unknown'"

**Solutions:**
- Check that you added your API key correctly (no extra spaces or quotes)
- Make sure your API key is active (it might take a few minutes after creating it)
- Check your internet connection
- Open the browser's developer console (F12) to see error messages

### Problem: "Location not working"

**Solutions:**
- Make sure you clicked "Allow" when the browser asked for location
- Check your browser's location settings
- Try refreshing the page
- The site will use a default location (New York) if it can't get yours

### Problem: "Text is too small or too big on my phone"

**Solutions:**
- The website should automatically adjust, but if it doesn't:
- Open `styles.css`
- Find the font sizes and adjust them
- Look for lines like `font-size: 1.5rem;` and change the number

### Problem: "The website looks broken"

**Solutions:**
- Make sure all three files (`index.html`, `styles.css`, `script.js`) are in the same folder
- Check that you didn't accidentally delete any important code
- Make sure all quotes and brackets are properly closed
- Try refreshing the page (Cmd+R or Ctrl+R)

### Still Having Problems?

- Check the browser's developer console for error messages:
  - **Mac:** Press `Cmd + Option + I` (Chrome) or `Cmd + Option + C` (Safari)
  - **Windows:** Press `F12`
- Look for red error messages and read what they say
- Make sure all your file names match exactly (case-sensitive!)

---

## Quick Reference: File Locations

Your project should have these files in the same folder:
```
your-project-folder/
├── index.html      (Main website file)
├── styles.css      (Design and styling)
├── script.js       (Functionality and videos)
└── videos/         (Optional: folder for video files)
    ├── morning-sunny.mp4
    ├── afternoon-rainy.mp4
    └── ... (your other videos)
```

---

## Next Steps

Once your website is working:
1. **Host it online** so others can visit it
   - Use free services like Netlify, Vercel, or GitHub Pages
2. **Add more videos** for different conditions
3. **Customize the design** by editing `styles.css`
4. **Share it** with others!

---

## Need More Help?

- Check the code comments in `script.js` - they explain what each part does
- Look at the structure of the code - it's organized to be easy to understand
- Experiment! Try changing small things and see what happens

Good luck! 🌿

