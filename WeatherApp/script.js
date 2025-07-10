// Refactored code for a weather app
// File: weather-app/script.js
// Purpose: Separated logic, improved variable/function naming, added clarity

const apiKey = 'f608cac7beec8ea098193633d77a1e7b';
function getWeatherData() {
  const cityName = document.getElementById('cityInput').value;
  const resultContainer = document.getElementById('weatherResult');

  if (!cityName) {
    resultContainer.innerHTML = '<p class="error-message">Please enter a city name!</p>';
    return;
  }

  resultContainer.innerHTML = '<p>Loading...</p>';

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === '404') {
        resultContainer.innerHTML = '<p class="error-message">City not found!</p>';
        return;
      }

      const weatherCondition = data.weather[0].main;
      const temperature = Math.round(data.main.temp);
      const humidity = data.main.humidity;
      const city = data.name;

      resultContainer.innerHTML = `
        <div class="weather-condition">${weatherCondition}</div>
        <div class="temperature">${temperature}°C</div>
        <div class="details">Humidity: ${humidity}%</div>
        <div class="details">City: ${city}</div>
      `;
    })
    .catch((error) => {
      resultContainer.innerHTML = '<p class="error-message">Error fetching weather data!</p>';
    });
}