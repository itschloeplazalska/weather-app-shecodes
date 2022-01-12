function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = date.getDay();

  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];

  let today = days[date.getDay()];

  return `${today} ${hours}:${minutes}`;
}

// Search City

const apiKey = "1b6b25bfac91fc52318401fc9d698a65";
let tempUnits = "&units=metric";

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let cityName = cityInput.value;
  let newCityUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let newCity = document.querySelector("#city-name");
  if (cityInput.value) {
    axios
      .get(`${newCityUrl}q=${cityName}&appid=${apiKey}${tempUnits}`)
      .then(showTemperature);
    newCity.innerHTML = `${cityInput.value}`;
  } else {
    alert(`Enter a city to check the Weather Forecast!`);
  }
}
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

// C to F button

// function changeTemperatureCelsius(event) {
//   event.preventDefault();
//   let temperatureCelsius = document.querySelector("#current-temp");
//   temperatureCelsius.innerHTML = 12 + "°";
// }

// let showCelsius = document.querySelector("#celsius-button");
// showCelsius.addEventListener("click", changeTemperatureCelsius);

// function changeTemperatureFahrenheit(event) {
//   event.preventDefault();
//   let temperatureFahrenheit = document.querySelector("#current-temp");
//   temperatureFahrenheit.innerHTML = 53.6 + "°";
// }
// let showFahrenheit = document.querySelector("#fahrenheit-button");
// showFahrenheit.addEventListener("click", changeTemperatureFahrenheit);

// Show Temperature in Current Location
function showTemperature(response) {
  console.log(response.data);
  let currentCityElement = document.querySelector("#city-name");
  let dateElement = document.querySelector("h2");
  let temperatureElement = document.querySelector("#current-temp");
  let currentWeatherIcon = response.data.weather[0].icon;
  let currentWeatherIconElement = document.querySelector(
    "#current-weather-icon"
  );
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  let highTempElement = document.querySelector("#high-temp");
  let lowTempElement = document.querySelector("#low-temp");
  let cityhumidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#city-windspeed");

  celsiusTemperature = response.data.main.temp;

  currentCityElement.innerHTML = response.data.name;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  currentWeatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png`
  );
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;
  highTempElement.innerHTML = Math.round(response.data.main.temp_max);
  lowTempElement.innerHTML = Math.round(response.data.main.temp_min);
  cityhumidityElement.innerHTML = response.data.main.humidity;
  windspeedElement.innerHTML = Math.ceil(
    Math.cbrt(Math.pow(response.data.wind.speed, 2))
  );
}

// Current location and temperature

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}`;
  axios.get(`${apiUrl}${tempUnits}&appid=${apiKey}`).then(showTemperature);
}

function onClick() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", onClick);

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = convertTemperature(fahrenheitUnits.innerHTML);
  temperature.innerHTML = Math.round(fahrenheitTemperature);
  celsiusUnits.innerHTML = toggleUnit(celsiusUnits.innerHTML);
  fahrenheitUnits.innerHTML = toggleUnit(fahrenheitUnits.innerHTML);
}

function convertTemperature(newUnit) {
  if (newUnit === "F") {
    return (celsiusTemperature * 9) / 5 + 32;
  } else {
    return celsiusTemperature;
  }
}

function toggleUnit(unit) {
  return unit === "C" ? "F" : "C";
}

let celsiusTemperature = null;
let temperature = document.querySelector("#current-temp");
let smallUnits = document.querySelector("#fahrenheit-unit");
let celsiusUnits = document.querySelector("#celsius-unit");
let fahrenheitUnits = document.querySelector("#fahrenheit-unit");
smallUnits.addEventListener("click", showFahrenheitTemperature);
