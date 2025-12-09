# Quick Reference Guide
## Quick Setup Checklist

Use this as a quick checklist when setting up your website.

---

## ✅ Setup Checklist

- [ ] **Got Weather API Key** from openweathermap.org
- [ ] **Added API Key** to `script.js` (line 3)
- [ ] **Prepared videos** (MP4 format, organized by time/weather)
- [ ] **Added video URLs** to `VIDEO_LIBRARY` in `script.js`
- [ ] **Tested website** in browser
- [ ] **Tested on phone** (if hosting online)

---

## 📝 Where to Edit Things

### Change the Weather API Key
**File:** `script.js`  
**Line:** ~3  
**Find:** `const WEATHER_API_KEY = 'YOUR_API_KEY_HERE';`  
**Replace with:** `const WEATHER_API_KEY = 'your-actual-key-here';`

### Add Video URLs
**File:** `script.js`  
**Line:** ~8-35  
**Find:** `const VIDEO_LIBRARY = { ... }`  
**Replace:** Each `'https://example.com/...'` with your actual video URL

### Change Messages
**File:** `script.js`  
**Line:** ~37-60  
**Find:** `const MESSAGES = { ... }`  
**Replace:** The text inside quotes for any message

### Change Colors/Styles
**File:** `styles.css`  
**Look for:** Color codes like `#ffffff` (white) or `rgba(0, 0, 0, 0.5)` (semi-transparent black)

### Change Button Text
**File:** `index.html`  
**Line:** ~24  
**Find:** `Leave this page`  
**Replace with:** Your custom text

---

## 🎥 Video URL Formats

### Local File (in same folder)
```
'videos/morning-sunny.mp4'
```

### Local File (in subfolder)
```
'./videos/afternoon-rainy.mp4'
```

### Google Drive (Public)
```
'https://drive.google.com/uc?export=download&id=FILE_ID'
```

### Online Hosting
```
'https://yoursite.com/videos/evening-cloudy.mp4'
```

---

## 📱 Testing Checklist

- [ ] Video plays automatically
- [ ] Message appears in center
- [ ] Button is clickable
- [ ] Time updates every second
- [ ] City name appears
- [ ] Weather condition appears
- [ ] Works on phone (responsive)
- [ ] Works on desktop/Mac
- [ ] Location permission requested
- [ ] Different videos show for different times/weather

---

## 🔧 Common Fixes

**Video won't play?**
→ Check URL is correct and accessible  
→ Make sure it's MP4 format  
→ Try opening URL directly in browser

**Weather shows "Unknown"?**
→ Check API key is correct (no extra spaces)  
→ Wait a few minutes after creating API key  
→ Check internet connection

**Location not working?**
→ Click "Allow" when browser asks  
→ Check browser location settings  
→ Site will use default location if denied

---

## 📂 File Structure

```
your-project/
├── index.html          ← Main website file
├── styles.css          ← All styling/design
├── script.js           ← All functionality
├── SETUP_TUTORIAL.md   ← Detailed tutorial
├── QUICK_REFERENCE.md   ← This file
└── videos/             ← Your video files (optional)
    ├── morning-sunny.mp4
    ├── afternoon-rainy.mp4
    └── ...
```

---

## 🎨 Customization Ideas

**Change button style:**
- Edit `.leave-button` in `styles.css`

**Change message font:**
- Edit `.main-message h1` in `styles.css`

**Change overlay darkness:**
- Edit `.video-overlay` background color in `styles.css`

**Add more weather types:**
- Add new entries to `VIDEO_LIBRARY` and `MESSAGES` in `script.js`

---

## 💡 Pro Tips

1. **Start with a few videos** - You don't need all 16 videos at once
2. **Use a default video** - Set one video as default for all missing conditions
3. **Test incrementally** - Add one video at a time and test
4. **Keep backups** - Save a copy of working code before making changes
5. **Use comments** - The code has helpful comments explaining each section

---

## 🆘 Need Help?

1. Check `SETUP_TUTORIAL.md` for detailed step-by-step instructions
2. Check browser console (F12) for error messages
3. Verify all file names match exactly
4. Make sure all quotes and brackets are properly closed

---

**Remember:** Save your files after every change! (Cmd+S on Mac, Ctrl+S on Windows)

