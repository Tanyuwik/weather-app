//1
let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let today = document.querySelector("#date");
today.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
    forecastHTML = forecastHTML +
    `
          <div class="col-2">
            <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
            <img 
            src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
            alt="" 
            width="42"
            />
            <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperatures-max"> 
              ${Math.round(forecastDay.temp.max)}° 
            </span>
            <span class="weather-forecast-temperatures-min">
              ${Math.round(forecastDay.temp.min)}°
            </span>
          </div>
          </div>
    `;
      }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function unitCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperature = document.querySelector("#temperature-item");
  temperature.innerHTML = Math.round(celsiusTemperatura);
}

function unitFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-item");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = `${Math.round((temperature * 9) / 5 + 32)}`;
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", unitCelsius);
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", unitFahrenheit);

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  celsiusTemperatura = response.data.main.temp;

  let temperature = Math.round(celsiusTemperatura);
  document.querySelector("#temperature-item").innerHTML = `${temperature}`;

  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `${wind}km/h`;

  let humidity = Math.round(response.data.main.humidity);
  document.querySelector("#humidity").innerHTML = `${humidity}%`;

  let pressure = Math.round(response.data.main.pressure);
  document.querySelector("#pressure").innerHTML = `${pressure}`;

  let descriptionElement = document.querySelector("#date-description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-form").value;
  search(city);
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function showGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", searchCity);

let button = document.querySelector("#current");
button.addEventListener("click", showGeoLocation);

search("Barcelona");
