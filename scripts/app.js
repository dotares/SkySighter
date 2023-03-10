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

const getWeatherData = async (lat, lon, unit) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&units=${unit}&lon=${lon}&appid=${openWeatherAPIKey}`
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

const getAirPollutionData = async (lat, lon, unit) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&units=${unit}&lon=${lon}&appid=${openWeatherAPIKey}`
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

const get5DayForecastData = async (lat, lon, unit) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&units=${unit}&lon=${lon}&appid=${openWeatherAPIKey}`
    );

    if (!response.ok)
      throw new Error(`${response.statusText}: (${response.status})`);

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

// TODO: Clean the data

// Submit button event handler and call the functions to find weather data according to the user data

submitButton.addEventListener("click", () => {
  const userLocation = locationInput.value;
  const userUnit = unitsInput.value;

  // function call async

  (async () => {
    // call the geocoding function
    const { latitude, longitude } = await getLatitudeAndLongitude(userLocation);

    // call the main functions
    const dataWeather = await getWeatherData(latitude, longitude, userUnit);
    const dataAP = await getAirPollutionData(latitude, longitude, userUnit);
    const dataForecast = await get5DayForecastData(
      latitude,
      longitude,
      userUnit
    );

    // TODO:
    // 1. Implement date variable
    // 2. Display the data variables in divs
    // 3. Figure out the open weather map
    // 4. Install tailwind

    // const currentDay = new Date(dataWeather.dt * 1000);
    // console.log(currentDay.toLocaleDateString("en-US"));

    // dataWeather stuff
    const dataWeatherMain = Object.entries(dataWeather.main);
    const dataWeatherWeatherStatus = Object.entries(dataWeather.weather[0]);
    const dataWeatherSunState = Object.entries(dataWeather.sys);
    const dataWeatherTimezone = dataWeather.timezone;
    const dataWeatherVisibility = dataWeather.visibility;
    const dataWeatherWind = Object.entries(dataWeather.wind);

    // dataAP stuff
    const dataAPComponents = Object.entries(dataAP.list[0].components);
    const dataAPMain = Object.entries(dataAP.list[0].main);

    console.log(dataAP);
  })();
});
