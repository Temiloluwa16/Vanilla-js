function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector("#description");
    let timeElement = document.querySelector("#time");
    let temperatureHumidity = document.querySelector("#humidity");
    let temperatureWind = document.querySelector("#wind-speed");
    let date = new Date(response.data.time * 1000);

    let iconElement = document.querySelector("#icon");

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    temperatureElement.innerHTML = temperature;
    descriptionElement.innerHTML = response.data.condition.description;
    temperatureHumidity.innerHTML = `${response.data.temperature.humidity}%`;
    temperatureWind.innerHTML = `${response.data.wind.speed}km/h`;
    iconElement.innerHTML = `<img src= "${response.data.condition.icon_url}" class
    ="current-temperature-icon"/>`;
    

    getForecast(response.data.city);
  }
  
  function search(city) {
    
  
    let apiKey = "36bb04605e1o2a2f7ce6c8t6fa5fe0ba";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayTemperature);
  }
  function handleSearchSubmit (event) {
    event.preventDefault(); 
    let searchInputElement = document.querySelector("#search-input");
    search (searchInputElement.value);
    
  }

  
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
    return days[date.getDay()];
  }

  function getForecast(city) {
     let apiKey = "36bb04605e1o2a2f7ce6c8t6fa5fe0ba";
     let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
  
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
  
}
 
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSearchSubmit);
  search("Abuja")
  
  
  let currentDate = new Date();
  
  currentDateELement.innerHTML = formatDate(currentDate);

//function handlePosition(position) {
 //   console.log(position.coords.latitude);
 //   console.log(position.coords.longitude);
 // }
  
 // navigator.geolocation.getCurrentPosition(handlePosition)