// Weather App Configuration
const CONFIG = {
    API_KEY: 'YOUR_API_KEY_HERE', // You'll need to get this from OpenWeatherMap
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    FORECAST_URL: 'https://api.openweathermap.org/data/2.5/forecast',
    ICON_URL: 'https://openweathermap.org/img/wn',
    DEFAULT_CITY: 'London'
};

// Demo mode - uses mock data when API key is not available
const DEMO_MODE = CONFIG.API_KEY === 'YOUR_API_KEY_HERE';

// DOM Elements
const elements = {
    cityInput: document.getElementById('cityInput'),
    searchBtn: document.getElementById('searchBtn'),
    locationBtn: document.getElementById('locationBtn'),
    loading: document.getElementById('loading'),
    errorMessage: document.getElementById('errorMessage'),
    errorText: document.getElementById('errorText'),
    weatherData: document.getElementById('weatherData'),
    currentLocation: document.getElementById('currentLocation'),
    currentDate: document.getElementById('currentDate'),
    currentTime: document.getElementById('currentTime'),
    currentTemp: document.getElementById('currentTemp'),
    weatherIcon: document.getElementById('weatherIcon'),
    weatherMain: document.getElementById('weatherMain'),
    weatherDescription: document.getElementById('weatherDescription'),
    visibility: document.getElementById('visibility'),
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('windSpeed'),
    feelsLike: document.getElementById('feelsLike'),
    pressure: document.getElementById('pressure'),
    uvIndex: document.getElementById('uvIndex'),
    forecastContainer: document.getElementById('forecastContainer')
};

// Mock data for demo mode
const MOCK_DATA = {
    weather: {
        name: "Demo City",
        main: {
            temp: 22,
            feels_like: 24,
            humidity: 65,
            pressure: 1013
        },
        weather: [{
            main: "Clear",
            description: "clear sky",
            icon: "01d"
        }],
        wind: {
            speed: 3.5
        },
        visibility: 10000,
        coord: {
            lat: 51.5074,
            lon: -0.1278
        }
    },
    forecast: {
        list: [
            {
                dt: Date.now() / 1000 + 86400,
                main: { temp_max: 25, temp_min: 18 },
                weather: [{ main: "Sunny", description: "sunny", icon: "01d" }]
            },
            {
                dt: Date.now() / 1000 + 172800,
                main: { temp_max: 23, temp_min: 16 },
                weather: [{ main: "Cloudy", description: "partly cloudy", icon: "02d" }]
            },
            {
                dt: Date.now() / 1000 + 259200,
                main: { temp_max: 20, temp_min: 14 },
                weather: [{ main: "Rain", description: "light rain", icon: "10d" }]
            },
            {
                dt: Date.now() / 1000 + 345600,
                main: { temp_max: 24, temp_min: 17 },
                weather: [{ main: "Clear", description: "clear sky", icon: "01d" }]
            },
            {
                dt: Date.now() / 1000 + 432000,
                main: { temp_max: 26, temp_min: 19 },
                weather: [{ main: "Sunny", description: "sunny", icon: "01d" }]
            }
        ]
    }
};

// Weather App Class
class WeatherApp {
    constructor() {
        this.currentWeatherData = null;
        this.forecastData = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDateTime();
        this.setInterval();
        
        if (DEMO_MODE) {
            this.showDemoNotice();
            this.loadDemoData();
        } else {
            this.loadDefaultWeather();
        }
    }

    bindEvents() {
        // Search functionality
        elements.searchBtn.addEventListener('click', () => this.handleSearch());
        elements.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        // Location functionality
        elements.locationBtn.addEventListener('click', () => this.getCurrentLocation());
    }

    showDemoNotice() {
        console.log('🌤️ Demo Mode: Using mock weather data. Get a free API key from OpenWeatherMap to use real data!');
    }

    setInterval() {
        // Update time every second
        setInterval(() => this.updateDateTime(), 1000);
    }

    updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        elements.currentDate.textContent = now.toLocaleDateString('en-US', options);
        elements.currentTime.textContent = now.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    async handleSearch() {
        const city = elements.cityInput.value.trim();
        if (!city) return;

        await this.getWeatherByCity(city);
        elements.cityInput.value = '';
    }

    getCurrentLocation() {
        this.showLoading();
        
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by this browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                this.getWeatherByCoords(latitude, longitude);
            },
            (error) => {
                let message = 'Unable to get your location. ';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        message += 'Location access denied.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message += 'Location information unavailable.';
                        break;
                    case error.TIMEOUT:
                        message += 'Location request timed out.';
                        break;
                    default:
                        message += 'An unknown error occurred.';
                }
                this.showError(message);
            },
            {
                timeout: 10000,
                enableHighAccuracy: true
            }
        );
    }

    async loadDefaultWeather() {
        await this.getWeatherByCity(CONFIG.DEFAULT_CITY);
    }

    loadDemoData() {
        this.displayWeatherData(MOCK_DATA.weather);
        this.displayForecast(MOCK_DATA.forecast);
    }

    async getWeatherByCity(city) {
        if (DEMO_MODE) {
            this.loadDemoData();
            return;
        }

        this.showLoading();

        try {
            const response = await fetch(
                `${CONFIG.BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${CONFIG.API_KEY}&units=metric`
            );

            if (!response.ok) {
                throw new Error(`City not found: ${city}`);
            }

            const data = await response.json();
            this.currentWeatherData = data;
            
            // Get forecast data
            await this.getForecastByCoords(data.coord.lat, data.coord.lon);
            
            this.displayWeatherData(data);
        } catch (error) {
            this.showError(error.message);
        }
    }

    async getWeatherByCoords(lat, lon) {
        if (DEMO_MODE) {
            this.loadDemoData();
            return;
        }

        this.showLoading();

        try {
            const response = await fetch(
                `${CONFIG.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${CONFIG.API_KEY}&units=metric`
            );

            if (!response.ok) {
                throw new Error('Weather data not available for this location');
            }

            const data = await response.json();
            this.currentWeatherData = data;
            
            // Get forecast data
            await this.getForecastByCoords(lat, lon);
            
            this.displayWeatherData(data);
        } catch (error) {
            this.showError(error.message);
        }
    }

    async getForecastByCoords(lat, lon) {
        if (DEMO_MODE) return;

        try {
            const response = await fetch(
                `${CONFIG.FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${CONFIG.API_KEY}&units=metric`
            );

            if (response.ok) {
                const data = await response.json();
                this.forecastData = data;
                this.displayForecast(data);
            }
        } catch (error) {
            console.error('Forecast data not available:', error);
        }
    }

    displayWeatherData(data) {
        // Update location
        elements.currentLocation.textContent = `${data.name}${data.sys?.country ? `, ${data.sys.country}` : ''}`;
        
        // Update temperature
        elements.currentTemp.textContent = Math.round(data.main.temp);
        
        // Update weather icon
        const iconCode = data.weather[0].icon;
        elements.weatherIcon.src = `${CONFIG.ICON_URL}/${iconCode}@2x.png`;
        elements.weatherIcon.alt = data.weather[0].description;
        
        // Update weather description
        elements.weatherMain.textContent = data.weather[0].main;
        elements.weatherDescription.textContent = data.weather[0].description;
        
        // Update weather details
        elements.visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
        elements.humidity.textContent = `${data.main.humidity}%`;
        elements.windSpeed.textContent = `${data.wind.speed} m/s`;
        elements.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
        elements.pressure.textContent = `${data.main.pressure} hPa`;
        
        // UV Index (mock data since it requires additional API call)
        elements.uvIndex.textContent = this.getMockUVIndex();
        
        this.showWeatherData();
    }

    displayForecast(data) {
        if (!data || !data.list) return;

        elements.forecastContainer.innerHTML = '';
        
        // Get daily forecasts (every 8th item ≈ daily)
        const dailyForecasts = data.list.filter((_, index) => index % 8 === 0).slice(0, 5);
        
        dailyForecasts.forEach(forecast => {
            const forecastItem = this.createForecastItem(forecast);
            elements.forecastContainer.appendChild(forecastItem);
        });
    }

    createForecastItem(forecast) {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        const item = document.createElement('div');
        item.className = 'forecast-item slide-up';
        
        item.innerHTML = `
            <div class="forecast-date">${dayName}<br>${dayDate}</div>
            <div class="forecast-icon">
                <img src="${CONFIG.ICON_URL}/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
            </div>
            <div class="forecast-temp">
                <span class="forecast-high">${Math.round(forecast.main.temp_max)}°</span>
                <span class="forecast-low">${Math.round(forecast.main.temp_min)}°</span>
            </div>
            <div class="forecast-desc">${forecast.weather[0].description}</div>
        `;
        
        return item;
    }

    getMockUVIndex() {
        // Generate a realistic UV index based on current hour
        const hour = new Date().getHours();
        if (hour < 6 || hour > 20) return '0';
        if (hour < 10 || hour > 16) return Math.floor(Math.random() * 3 + 1).toString();
        return Math.floor(Math.random() * 5 + 6).toString();
    }

    showLoading() {
        this.hideAll();
        elements.loading.style.display = 'block';
    }

    showError(message) {
        this.hideAll();
        elements.errorText.textContent = message;
        elements.errorMessage.style.display = 'block';
    }

    showWeatherData() {
        this.hideAll();
        elements.weatherData.style.display = 'block';
        elements.weatherData.classList.add('fade-in');
    }

    hideAll() {
        elements.loading.style.display = 'none';
        elements.errorMessage.style.display = 'none';
        elements.weatherData.style.display = 'none';
    }
}

// Utility Functions
const utils = {
    // Convert wind direction from degrees to compass direction
    getWindDirection(degrees) {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(degrees / 22.5) % 16;
        return directions[index];
    },

    // Format time from timestamp
    formatTime(timestamp) {
        return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    // Get weather condition class for styling
    getWeatherClass(condition) {
        const conditionMap = {
            'clear': 'sunny',
            'clouds': 'cloudy',
            'rain': 'rainy',
            'drizzle': 'rainy',
            'thunderstorm': 'stormy',
            'snow': 'snowy',
            'mist': 'misty',
            'fog': 'misty'
        };
        return conditionMap[condition.toLowerCase()] || 'default';
    }
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('🌐 Connection restored');
});

window.addEventListener('offline', () => {
    console.log('📵 Connection lost - some features may be limited');
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WeatherApp, utils };
}