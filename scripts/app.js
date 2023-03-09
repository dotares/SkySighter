// GEOCODE API: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//
// CURRENT WEATHER DATA: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

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

    const [{ lat: latitude, lon: longitude }] = await response.json();

    return { latitude, longitude };
  } catch (err) {
    console.log(err);
  }
};

const { latitude, longitude } = getLatitudeAndLongitude("New York");
console.log(latitude, longitude);

// Function for fetching current weather data

const getWeatherData = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${openWeatherAPIKey}`
    );

    if (!response.ok)
      throw new Error(`${response.status}: (${response.status})`);
  } catch (err) {
    console.log(err);
  }
};
