// Make the map object
const map = L.map("map", {
  zoomControl: false,
  dragging: false,
});

unitDropdown.value = "Metric";

// Toggle feature for the unit dropdown button
unitDropdown.addEventListener("click", () => {
  const newUnit =
    unitDropdown.textContent === "Imperial" ? "Metric" : "Imperial";
  unitDropdown.textContent = newUnit;
  unitDropdown.value = newUnit;
});

// Submit button event handler and call the functions to find weather data according to the user data
searchBtn.addEventListener("click", () => {
  const userLocation = locationInput.value;
  const userUnit = unitDropdown.value;

  (async () => {
    const { latitude, longitude } = await getLatitudeAndLongitude(userLocation);
    const dataWeather = await getWeatherData(latitude, longitude, userUnit);
    const dataForecast = await get5DayForecastData(
      latitude,
      longitude,
      userUnit
    );
    const currentDay = new Date(dataWeather.dt * 1000);
    const sunrise = new Date(dataWeather.sys.sunrise * 1000);
    const sunset = new Date(dataWeather.sys.sunset * 1000);
    const hoursInBetween = Math.abs(sunset.getHours() - sunrise.getHours());
    const minutesInBetween = Math.abs(
      sunset.getMinutes() - sunrise.getMinutes()
    );

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // UI Components to be updated
    tempTxt.innerHTML = `${dataWeather.main.temp.toFixed(1)}`;
    statusTxt.innerHTML = `${dataWeather.weather[0].main}`;
    locationTxt.innerHTML = `${userLocation}, ${dataWeather.sys.country}`;
    dateTimeTxt.innerHTML = `${currentDay.toLocaleDateString("en-US")}`;
    dayTxt.textContent = `${days[currentDay.getDay()]}`;
    windsTxt.textContent = `${dataWeather.wind.speed}`;
    humidityTxt.textContent = `${dataWeather.main.humidity}%`;
    visibilityTxt.textContent = `${dataWeather.visibility}`;
    sunriseAndSunsetTxt.textContent = `${hoursInBetween} hours ${minutesInBetween} minutes`;
    feelsLikeTempTxt.textContent = `${dataWeather.main.feels_like.toFixed(0)}`;

    // User unit states
    if (userUnit === "Metric") {
      tempTxt.textContent += "°C";
      windsTxt.textContent += " m/s";
      visibilityTxt.innerHTML =
        (Number(visibilityTxt.innerHTML) * 0.000621371).toFixed(1) + " km";
      feelsLikeTempTxt.textContent += "°C";
    } else if (userUnit === "Imperial") {
      tempTxt.textContent += "°F";
      windsTxt.textContent += " mph";
      visibilityTxt.innerHTML =
        Number(visibilityTxt.innerHTML) / 1000 + " miles";
      feelsLikeTempTxt.textContent += "°F";
    }

    // Map setup for changing the view of the map according to the location
    map.setView([latitude, longitude], 12);

    const Esri_WorldImagery = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    ).addTo(map);

    const [...timestamps] = dataForecast.list;
    const result = timestamps.filter((step) =>
      step.dt_txt.includes("00:00:00")
    );

    let forecastTempHTML = ``;
    let forecastDateHTML = ``;
    let forecastDayHTML = ``;

    for (let day of result) {
      const date = new Date(day.dt * 1000);
      const dayNumber = date.getDay();

      const forecastTempData = `
           <div class="forecastTempData font-bold">${
             userUnit === "Metric"
               ? `${day.main.temp.toFixed(1)}°C`
               : `${day.main.temp.toFixed(1)}°F`
           }</div>
      `;

      const forecastDateData = `
           <div class="forecastDateData">${day.dt_txt
             .split(" ")[0]
             .replaceAll("-", "/")}</div>
      `;

      const forecastDayData = `
           <div class="forecastDayData">${days[dayNumber]}</div>
         </div>
      `;

      forecastTempHTML += forecastTempData;
      forecastDateHTML += forecastDateData;
      forecastDayHTML += forecastDayData;
    }

    forecastTempContainer.innerHTML = forecastTempHTML;
    forecastDateContainer.innerHTML = forecastDateHTML;
    forecastDayContainer.innerHTML = forecastDayHTML;
  })();
});
