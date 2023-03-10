// Select DOM elements from HTML

const locationInput = document.querySelector(".locationInput");
const unitsInput = document.querySelector(".unitsInput");
const submitButton = document.querySelector(".submitButton");

// API KEYS:

const openWeatherAPIKey = config.OPEN_WEATHER_API_KEY;

// Function for Geo-coding

const getLatitudeAndLongitude = async (location) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${openWeatherAPIKey}`
    );

    if (!response.ok)
      throw new Error(`${response.statusText}: (${response.status})`);

    const data = await response.json();

    const { lat: latitude, lon: longitude } = await data[0];

    return { latitude, longitude };
  } catch (err) {
    console.log(err);
  }
};

// Function for getting weather data

const getWeatherData = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherAPIKey}`
    );

    if (!response.ok)
      throw new Error(`${response.statusText}: (${response.status})`);

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

// Function for getting air pollution data

const getAirPollutionData = async (lat, lon) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${openWeatherAPIKey}`
    );

    if (!response.ok)
      throw new Error(`${response.statusText}: (${response.status})`);

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

// Function for getting 5 day forcast with 3 hour steps

const get5DayForecastData = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${openWeatherAPIKey}`
    );

    if (!response.ok)
      throw new Error(`${response.statusText}: (${response.status})`);

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

// TODO for 10th March 2023:
// 3. Clean the code to make it much better

// Submit button event handler and call the functions to find weather data according to the user data

submitButton.addEventListener("click", () => {
  const userLocation = locationInput.value;
  const userUnit = unitsInput.value;

  (async () => {
    const { latitude, longitude } = await getLatitudeAndLongitude(userLocation);

    const dataWeather = await getWeatherData(latitude, longitude);
    const dataAP = await getAirPollutionData(latitude, longitude);
    const dataForecast = await get5DayForecastData(latitude, longitude);

    console.log(dataWeather, dataAP, dataForecast);
  })();
});
