const key = "25e2198b305c4bc5bf7122151252602"


function getWeather() {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=London&days=1&aqi=no&alerts=no`)
      .then((response)=> {
        return response.json()
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error)
      })
  }
  
  module.exports = getWeather
  