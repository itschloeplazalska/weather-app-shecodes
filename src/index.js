let now = new Date();
let day = now.getDay();
let hour = now.getHours();
let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();

let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];

let today = days[now.getDay()];

let dayTime = document.querySelector("h2");
dayTime.innerHTML = `${today} ${hour}:${minutes}`;

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
  let currentCity = document.querySelector("#city-name");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  let currentWeatherIcon = response.data.weather[0].icon;
  let currentWeatherIconElement = document.querySelector(
    "#current-weather-icon"
  );
  let weatherDescription = response.data.weather[0].description;
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );

  let highTemp = Math.round(response.data.main.temp_max);
  let highTempElement = document.querySelector("#high-temp");
  let lowTemp = Math.round(response.data.main.temp_min);
  let lowTempElement = document.querySelector("#low-temp");
  let cityHumidity = response.data.main.humidity;
  let cityhumidityElement = document.querySelector("#humidity");
  let cityWindspeed = Math.ceil(
    Math.cbrt(Math.pow(response.data.wind.speed, 2))
  );
  let windspeedElement = document.querySelector("#city-windspeed");

  currentCity.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${temperature}°`;
  currentWeatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png`
  );
  weatherDescriptionElement.innerHTML = `${weatherDescription}`;
  highTempElement.innerHTML = `${highTemp}`;
  lowTempElement.innerHTML = `${lowTemp}`;
  cityhumidityElement.innerHTML = `${cityHumidity}`;
  windspeedElement.innerHTML = `${cityWindspeed}`;
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
