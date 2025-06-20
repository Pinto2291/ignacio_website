// /projects/project2/script.js
document.addEventListener('DOMContentLoaded', () => {
    // --- IMPORTANT: PASTE YOUR OPENWEATHERMAP API KEY HERE ---
    const apiKey = "77f4c17daae7a9180eb4ba61607b942d"; 
    
    // DOM Elements
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherDisplay = document.getElementById('weather-display');
    const loader = document.getElementById('loader');
    const errorDisplay = document.getElementById('error-display');

    const cityNameEl = document.getElementById('city-name');
    const weatherIconEl = document.getElementById('weather-icon');
    const temperatureEl = document.getElementById('temperature');
    const descriptionEl = document.getElementById('description');
    const humidityEl = document.getElementById('humidity');
    const windSpeedEl = document.getElementById('wind-speed');

    // Function to fetch weather data from API
    const fetchWeather = async (city) => {
        // Show loader and hide other sections
        loader.classList.remove('hidden');
        weatherDisplay.classList.add('hidden');
        errorDisplay.classList.add('hidden');

        // Check for API key
        if (apiKey === "YOUR_API_KEY_HERE") {
            displayError("Please enter your API key in script.js");
            return;
        }

        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error('City not found');
            }
            
            const data = await response.json();
            displayWeather(data);

        } catch (error) {
            displayError(error.message);
        }
    };

    // Function to display fetched weather data
    const displayWeather = (data) => {
        cityNameEl.textContent = data.name;
        weatherIconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionEl.textContent = data.weather[0].description;
        humidityEl.textContent = `${data.main.humidity}%`;
        windSpeedEl.textContent = `${data.wind.speed} m/s`;
        
        // Hide loader and show weather data
        loader.classList.add('hidden');
        weatherDisplay.classList.remove('hidden');
    };

    // Function to display an error message
    const displayError = (message) => {
        errorDisplay.querySelector('p').textContent = message;
        loader.classList.add('hidden');
        errorDisplay.classList.remove('hidden');
    };

    // Event listeners for search
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeather(city);
            }
        }
    });

    // Fetch weather for a default city on page load
    fetchWeather("Caracas"); 
});