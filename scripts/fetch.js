// API KEYS:

const openWeatherAPIKey = config.OPEN_WEATHER_API_KEY;

// Function for geocoding

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

// Function for getting all types of API endpoint data

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
