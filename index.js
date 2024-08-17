const apikey = "9807520e8abd945d4ce49e0e3a473757";
const api = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".navbar input");
const searchbtn = document.querySelector(".navbar button");
const changeicon = document.querySelector(".change");

const weatherIcons = {
    Clouds: "clouds.png",
    Clear: "clear.png",
    Rain: "rain.png",
    Mist: "mist.png",
    Drizzle: "drizzle.png",
    Haze: "clouds.png" 
};

async function fetchWeather(city) {
    try {
        const response = await fetch(`${api}${city}&appid=${apikey}`);

      
        if (!response.ok) {
            throw new Error(`City not found: ${response.statusText}`);
        }

        const data = await response.json();

        // Update the UI with weather data
        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
        document.querySelector(".windspeed").textContent = `${data.wind.speed} km/h`;

        // Update the weather icon based on the weather condition
        const weatherCondition = data.weather[0].main;
        changeicon.src = weatherIcons[weatherCondition] || "default.png";

    } catch (error) {
        
        console.error("Error fetching weather data:", error);
        alert("Unable to fetch weather data. Please check the city name and try again.");
    }
}

searchbtn.addEventListener("click", () => {
    const city = searchbox.value.trim();
    
    
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});