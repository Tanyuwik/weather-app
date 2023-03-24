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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML = forecastHTML +
    `
          <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
            <img 
            src="http://openweathermap.org/img/wn/50d@2x.png" 
            alt="" 
            width="42"
            />
            <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperatures-max"> 
              18° 
            </span>
            <span class="weather-forecast-temperatures-min">
              12°
            </span>
          </div>
          </div>
    `;
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
displayForecast();
