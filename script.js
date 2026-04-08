const API_KEY = "f5431e11e81297e5664173f1381e1552";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const loader = document.getElementById("loader");
const themeToggle = document.getElementById("themeToggle");

// DARK MODE
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// FETCH WEATHER
async function getWeather(city) {
    loader.style.display = "block";

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!res.ok) throw new Error("City not found");

        const data = await res.json();

        cityName.textContent = data.name;
        temp.textContent = `🌡 Temp: ${data.main.temp} °C`;
        desc.textContent = `🌥 ${data.weather[0].description}`;
        humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
        wind.textContent = `💨 Wind: ${data.wind.speed} m/s`;

    } catch (err) {
        cityName.textContent = "Error!";
        temp.textContent = "";
        desc.textContent = "City not found!";
        humidity.textContent = "";
        wind.textContent = "";
    } finally {
        loader.style.display = "none";
    }
}

// BUTTON CLICK
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
});

// ENTER KEY SUPPORT
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

// DEFAULT LOAD
getWeather("Delhi");
