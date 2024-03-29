// API KEYS:
import config from "./config.js";

const openWeatherAPIKey = config.OPEN_WEATHER_API_KEY;

// Function for geocoding

const getLatitudeAndLongitude = async (location) => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${openWeatherAPIKey}`
  );
  if (!response.ok)
    throw new Error(`${response.statusText}: (${response.status})`);
  const [data] = await response.json();
  return { latitude: data.lat, longitude: data.lon };
};

// Function for getting all types of API endpoint data

const fetchData = async function (endpoint) {
  const response = await fetch(endpoint);
  if (!response.ok)
    throw new Error(`${response.statusText}: (${response.status})`);
  return response.json();
};

const getWeatherData = async function (lat, lon, unit) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&units=${unit}&lon=${lon}&appid=${openWeatherAPIKey}`;
  return fetchData(url);
};

const get5DayForecastData = async function (lat, lon, unit) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&units=${unit}&lon=${lon}&appid=${openWeatherAPIKey}`;
  return fetchData(url);
};

export { getLatitudeAndLongitude, getWeatherData, get5DayForecastData };
