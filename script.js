document.addEventListener("DOMContentLoaded", () => {

const Default = "835ea6a02d111de70d3ed7c116cc5191";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const loader = document.getElementById("loader");
const themeToggle = document.getElementById("themeToggle");

// 🛑 SAFETY CHECK (IMPORTANT)
if (!searchBtn || !cityInput) {
    console.error("HTML elements not found!");
    return;
}

// DARK MODE
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });
}

// FETCH WEATHER
async function getWeather(city) {
    loader.style.display = "block";

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Default}&units=metric`
        );

        const data = await res.json();

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        cityName.textContent = data.name;
        temp.textContent = `🌡 Temp: ${data.main.temp} °C`;
        desc.textContent = `🌥 ${data.weather[0].description}`;
        humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
        wind.textContent = `💨 Wind: ${data.wind.speed} m/s`;

    } catch (err) {
        console.error(err);
        cityName.textContent = "Error!";
        desc.textContent = "City not found!";
        temp.textContent = "";
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
cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

// DEFAULT LOAD
getWeather("Delhi");

});
