// ***************************************************
// TODO and REFACTOR Notes:
//
// 3. fix date issues
// 4. add forecast functionality
//
// >> No need for multiple if statements for a single
// case. Just add all of the single case executions
// inside of a single if statement.
//
// >> Make it OOP
// ***************************************************

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

		const currentTime = `${String(currentDay.getHours()).padStart(
			2,
			"0"
		)}:${String(currentDay.getMinutes()).padStart(2, "0")}`;

		// Quick info temperature status
		if (userUnit === "standard")
			tempTxt.textContent = `${dataWeather.main.temp.toFixed(1)} K`;
		if (userUnit === "metric")
			tempTxt.textContent = `${dataWeather.main.temp.toFixed(1)}℃`;
		if (userUnit === "imperial")
			tempTxt.textContent = `${dataWeather.main.temp.toFixed(1)}℉`;

		// Quick info container weather status
		statusTxt.textContent = `${dataWeather.weather[0].main}`;

		// Quick info container location
		locationTxt.innerHTML = `<i class="fa-solid fa-location-dot m-2"></i> ${userLocation}, ${dataWeather.sys.country}`;

		// Quick info container date
		dateTimeTxt.innerHTML = `<i class="fa-solid fa-calendar-days m-2"></i> ${currentDay.toLocaleDateString(
			"en-US",
			options
		)}`;

		// Quick info time
		timeTxt.innerHTML = `<i class="fa-solid fa-clock m-2"></i> ${currentTime}`;

		// Secondary info winds

		if (userUnit === "imperial")
			windsTxt.textContent = `${dataWeather.wind.speed} mph winds`;
		else windsTxt.textContent = `${dataWeather.wind.speed} m/s winds`;

		// Secondary info humidity

		humidityTxt.textContent = `${dataWeather.main.humidity}% humidity`;

		// Secondary info temp min and max

		if (userUnit === "standard")
			minAndMaxTempTxt.textContent = `${dataWeather.main.temp_min.toFixed(
				0
			)} K min/${dataWeather.main.temp_max.toFixed(0)} K max`;
		if (userUnit === "metric")
			minAndMaxTempTxt.textContent = `${dataWeather.main.temp_min.toFixed(
				0
			)}℃ min/${dataWeather.main.temp_max.toFixed(0)}℃ max`;
		if (userUnit === "imperial")
			minAndMaxTempTxt.textContent = `${dataWeather.main.temp_min.toFixed(
				0
			)}℉ min/${dataWeather.main.temp_max.toFixed(0)}℉ max`;

		// Secondary info visibility

		if (userUnit === "imperial")
			visibilityTxt.textContent = `${(
				dataWeather.visibility * 0.000621371
			).toFixed(1)} miles visibility`;
		else
			visibilityTxt.textContent = `${
				dataWeather.visibility / 1000
			} km visibility`;

		// Secondary info sunrise to sunset

		const sunrise = new Date(dataWeather.sys.sunrise * 1000);
		const sunset = new Date(dataWeather.sys.sunset * 1000);

		console.log(sunrise);

		const sunriseFormatted = `${String(sunrise.getHours()).padStart(
			2,
			"0"
		)}:${String(sunrise.getMinutes()).padStart(2, "0")}`;

		const sunsetFormatted = `${String(sunset.getHours()).padStart(
			2,
			"0"
		)}:${String(sunset.getMinutes()).padStart(2, "0")}`;

		sunriseAndSunsetTxt.innerHTML = `From ${sunriseFormatted} <br> to ${sunsetFormatted}`;

		// Secondary info feels like temperature

		if (userUnit === "standard")
			feelsLikeTempTxt.textContent = `Feels like, ${dataWeather.main.feels_like.toFixed(
				0
			)} K`;
		if (userUnit === "metric")
			feelsLikeTempTxt.textContent = `Feels like, ${dataWeather.main.feels_like.toFixed(
				0
			)}℃`;
		if (userUnit === "imperial")
			feelsLikeTempTxt.textContent = `Feels like, ${dataWeather.main.feels_like.toFixed(
				0
			)}℉`;
	})();
});
