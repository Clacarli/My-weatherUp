let ahora = new Date();

let date = ahora.getDate();
let year = ahora.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[ahora.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[ahora.getMonth()];
let todayDate = document.querySelector("#currentDate");
todayDate.innerHTML = `${day}, ${date} ${month} ${year}`;

let hours = ahora.getHours();
let minutes = ahora.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = document.querySelector("#nowTime");
time.innerHTML = `${hours}:${minutes} CEST/UTC`;

function getWeather(response) {
  console.log(response.data.weather[0].description);
  let temperature = Math.round(response.data.main.temp);
  let tempItem = document.querySelector("#temps");
  let description = response.data.weather[0].description;
  tempItem.innerHTML = `${temperature}°C and ${description}`;

  let cities = response.data.name;
  let city = document.querySelector("#cityName");
  city.innerHTML = cities;
}

function positionNow(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8c1d3a291a4d37607365dab69374db49";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

navigator.geolocation.getCurrentPosition(positionNow);

function showWeather(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;
  let tempDescript = document.querySelector("#temps");
  let temperatures = Math.round(response.data.main.temp);
  tempDescript.innerHTML = `It is ${temperatures}°C and ${response.data.weather[0].description}`;
}

function getCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#formInput").value;
  let apiKey = "8c1d3a291a4d37607365dab69374db49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
let button = document.querySelector("button");
button.addEventListener("click", getCity);
