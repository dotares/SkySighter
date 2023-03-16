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

    const currentDay = new Date(dataWeather.dt * 1000);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    console.log(currentDay.toLocaleDateString("en-US", options));

    // TODO:
    // 1. Get data and attach to html

    // Quick info container temperature according to user's unit
    userUnit === "metric"
      ? (tempTxt.textContent = `${dataWeather.main.temp.toFixed(0)}℃`)
      : (tempTxt.textContent = `${dataWeather.main.temp.toFixed(0)}℉`);

    // Quick info container weather status
    statusTxt.textContent = `${dataWeather.weather[0].main}`;

    // Quick info container location
    locationTxt.innerHTML = `<i class="fa-solid fa-location-dot m-2"></i> ${userLocation}, ${dataWeather.sys.country}`;

    // Quick info container date
  })();
});
