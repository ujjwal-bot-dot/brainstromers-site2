# 🌤️ WeatherNow - Beautiful Weather App

A modern, responsive weather application built with HTML5, CSS3, and JavaScript. Features a beautiful glassmorphism design, real-time weather data, and a 5-day forecast.

## ✨ Features

### 🎨 Beautiful Design
- **Glassmorphism UI** with backdrop blur effects
- **Responsive design** that works on all devices
- **Smooth animations** and transitions
- **Modern gradient backgrounds**
- **Interactive hover effects**

### 🌍 Weather Functionality
- **Current weather conditions** with detailed information
- **5-day weather forecast**
- **City search** functionality
- **Geolocation support** to get weather for your current location
- **Real-time clock** and date display
- **Weather icons** from OpenWeatherMap

### 📊 Weather Details
- Current temperature and "feels like" temperature
- Humidity and atmospheric pressure
- Wind speed and visibility
- UV Index (estimated)
- Weather description and conditions

### 🚀 Technical Features
- **Demo mode** - works without API key using mock data
- **Error handling** with user-friendly messages
- **Offline detection** and status messages
- **Loading states** with animated spinners
- **Clean, modular code** structure

## 🚀 Quick Start

### Option 1: Demo Mode (No Setup Required)
1. Open `index.html` in your browser
2. The app will automatically load with demo data
3. All features work except real weather data

### Option 2: Full Setup with Real Weather Data

#### Step 1: Get a Free API Key
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. Go to "My API Keys" in your account dashboard
4. Copy your API key

#### Step 2: Configure the App
1. Open `script.js`
2. Find this line: `API_KEY: 'YOUR_API_KEY_HERE'`
3. Replace `'YOUR_API_KEY_HERE'` with your actual API key:
   ```javascript
   API_KEY: 'your-actual-api-key-here'
   ```

#### Step 3: Launch the App
1. Open `index.html` in your browser
2. The app will now use real weather data!

## 📱 How to Use

### Search for Weather
1. Type a city name in the search box
2. Click the search button or press Enter
3. View detailed weather information

### Use Your Location
1. Click the location button (📍)
2. Allow location access when prompted
3. Get weather for your current location

### View Forecast
- Scroll down to see the 5-day weather forecast
- Each day shows high/low temperatures and conditions

## 🛠️ Development

### File Structure
```
weather-app/
├── index.html          # Main HTML structure
├── styles.css          # Modern CSS with glassmorphism
├── script.js           # JavaScript functionality
├── README.md           # Original profile README
└── WEATHER_APP_README.md # This weather app guide
```

### CSS Features
- **CSS Custom Properties** for easy theming
- **CSS Grid & Flexbox** for responsive layouts
- **CSS Animations** for smooth interactions
- **Media queries** for mobile responsiveness

### JavaScript Features
- **ES6+ syntax** with classes and async/await
- **Modular code structure** for easy maintenance
- **Error handling** with try/catch blocks
- **API integration** with fetch API

## 🎨 Customization

### Change Colors
Edit the CSS custom properties in `styles.css`:
```css
:root {
    --primary-blue: #2563eb;
    --accent-cyan: #06b6d4;
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* Add more custom colors */
}
```

### Modify Default City
Change the default city in `script.js`:
```javascript
const CONFIG = {
    DEFAULT_CITY: 'Your City Name'
    // ... other config
};
```

## 🌐 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📊 API Information

### OpenWeatherMap API
- **Free tier**: 1,000 calls/day
- **Rate limit**: 60 calls/minute
- **Data includes**: Current weather, 5-day forecast
- **Coverage**: Worldwide

### API Endpoints Used
- Current Weather: `api.openweathermap.org/data/2.5/weather`
- 5-Day Forecast: `api.openweathermap.org/data/2.5/forecast`

## 🔧 Troubleshooting

### Common Issues

**App shows demo data instead of real weather:**
- Check if you've replaced `YOUR_API_KEY_HERE` with your actual API key
- Verify your API key is active (may take a few hours after signup)

**"City not found" error:**
- Try a different spelling or include country code (e.g., "Paris, FR")
- Use exact city names

**Geolocation not working:**
- Ensure you're using HTTPS or localhost
- Check browser location permissions
- Some browsers block geolocation on non-secure sites

**Weather icons not loading:**
- Check internet connection
- API may be temporarily unavailable

## 🚀 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your app will be available at `https://username.github.io/repository-name`

### Other Hosting Options
- **Netlify**: Drag and drop deployment
- **Vercel**: Connect your GitHub repository
- **Firebase Hosting**: Google's hosting service

## 🎓 Learning Outcomes

This project demonstrates:
- **Modern JavaScript** (ES6+, Classes, Async/Await)
- **CSS3 Advanced Features** (Custom Properties, Grid, Flexbox)
- **API Integration** and error handling
- **Responsive Web Design** principles
- **User Experience** best practices

## 📈 Future Enhancements

Potential features to add:
- [ ] Weather alerts and warnings
- [ ] Historical weather data
- [ ] Weather maps integration
- [ ] Dark/light theme toggle
- [ ] Weather comparison between cities
- [ ] Push notifications
- [ ] Weather widgets for embedding

---

**Made with ❤️ by Ujjwal Kumar**

*A perfect project for learning modern web development!*