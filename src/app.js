function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector("#description");
    let temperatureHumidity = document.querySelector("#humidity");
    let temperatureWind = document.querySelector("#wind-speed");
    let iconElement = document.querySelector("#icon");

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = temperature;
    descriptionElement.innerHTML = response.data.condition.description;
    temperatureHumidity.innerHTML = `${response.data.temperature.humidity}%`;
    temperatureWind.innerHTML = `${response.data.wind.speed}km/h`;
    iconElement.innerHTML = `<img src= "${response.data.condition.icon_url}" class
    ="current-temperature-icon"/>`;
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
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSearchSubmit);
  search("Abuja")
  
  let currentDateELement = document.querySelector("#time");
  let currentDate = new Date();
  
  currentDateELement.innerHTML = formatDate(currentDate);

//function handlePosition(position) {
 //   console.log(position.coords.latitude);
 //   console.log(position.coords.longitude);
 // }
  
 // navigator.geolocation.getCurrentPosition(handlePosition)