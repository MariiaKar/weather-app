let now = new Date();
let currentTime = document.querySelector("#time");
let hour = now.getHours();
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
currentTime.innerHTML = `${day} ${hour}:${minutes}`;

function changeToFahrenheit() {
  let todayTemp = document.querySelector("#todayTemp");
  todayTemp.innerHTML = `68°`;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

function changeToCelsus() {
  let todayTemp = document.querySelector("#todayTemp");
  todayTemp.innerHTML = `20°`;
  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", changeToCelsus);
}

function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");

  let h2 = document.querySelector("h2");
  if (searchInput.value) {
    h2.innerHTML = `${searchInput.value}`;
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

function showTemperature(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#todayTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response);
  console.log(response.data);
}
console.log(response.data.main.temp);

function search(city) {
  let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function searchLocation(position) {
  let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
