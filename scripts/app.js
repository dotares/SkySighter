// Submit button event handler and call the functions to find weather data according to the user data

submitButton.addEventListener("click", () => {
  const userLocation = locationInput.value;
  const userUnit = unitsInput.value;

  // function call async

  (async () => {
    // call the geocoding function
    const { latitude, longitude } = await getLatitudeAndLongitude("New York");

    // call the main functions
    const dataWeather = await getWeatherData(latitude, longitude, userUnit);
    const dataAP = await getAirPollutionData(latitude, longitude, userUnit);
    const dataForecast = await get5DayForecastData(
      latitude,
      longitude,
      userUnit
    );

    // TODO:
    // 2. Figure out the open weather map feature
    // 3. Design basic structure with tailwind
    // 4. Set up variables in tailwind structure html

    const currentDay = new Date(dataWeather.dt * 1000);
    const day = currentDay.toLocaleDateString("en-US");

    // dataWeather stuff
    const dataWeatherMain = Object.entries(dataWeather.main);
    const dataWeatherWeatherStatus = Object.entries(dataWeather.weather[0]);
    const dataWeatherSunState = Object.entries(dataWeather.sys);
    const dataWeatherWind = Object.entries(dataWeather.wind);

    // dataWeather stuff without objects or arrays
    const dataWeatherTimezone = dataWeather.timezone;
    const dataWeatherVisibility = dataWeather.visibility;

    // dataAP stuff
    const dataAPComponents = Object.entries(dataAP.list[0].components);
    const dataAPMain = Object.entries(dataAP.list[0].main);

    console.log(dataWeatherMain);
    console.log(dataWeatherWeatherStatus);
    console.log(dataWeatherSunState);
    console.log(dataWeatherTimezone);
    console.log(dataWeatherVisibility);
    console.log(dataWeatherWind);
  })();
});
