// GEOCODE API: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
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

    const arrayOfResults = await response.json();
    const { lat: latitude, lon: longitude } = await arrayOfResults[0];
    return { latitude, longitude };
  } catch (err) {
    console.log(err);
  }
};

// Function for getting weather data

const getWeatherAndAirPollutionData = async (lat, lon) => {
  try {
    const responseWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherAPIKey}`
    );

    const responseAirPollution = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${openWeatherAPIKey}`
    );

    if (!responseWeather.ok)
      throw new Error(
        `${responseWeather.statusText}: (${responseWeather.status})`
      );

    if (!responseAirPollution.ok)
      throw new Error(
        `${responseAirPollution.statusText}: (${responseAirPollution.status})`
      );

    const dataWeather = await responseWeather.json();
    const dataAirPollution = await responseAirPollution.json();

    return [dataWeather, dataAirPollution];
  } catch (err) {
    console.log(err);
  }
};

(async () => {
  const { latitude, longitude } = await getLatitudeAndLongitude("Chandigarh");
  const [weatherData, weatherAirPollution] =
    await getWeatherAndAirPollutionData(latitude, longitude);
})();
