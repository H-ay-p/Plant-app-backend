function getWeather() {
    fetch("http://api.weatherapi.com/v1/forecast")
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.error("Error fetching weather data:", error));
  }
  
  module.exports = getWeather
  