// A $( document ).ready() block.
$(document).ready(function () {
  // Global variables
  let apiKey = "04b224ea6e7cb3656cbadc58a9e5d125";
  let baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  let oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=";
  let userFormEl = $("#city-search");
  let citySearchEl = $("#city");
  let fiveDayEl = $("#five-day");
  let searchHistoryEl = $("#search-history");
  let currentDay = dayjs().format("dddd,MM/D/YYYY");
  const weatherIconUrl = "https://openweathermap.org/img/wn/";

  //Define function to capitalize the first letter of a string & rest to the lower case
  function titleCase(str) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  }

  //load cities from local storage and recreate history buttons
  function loadSearchHistory() {
    var searchHistoryArray = JSON.parse(
      localStorage.getItem("searched-cities")
    );
    console.log(searchHistoryArray);
    if (!searchHistoryArray) {
      localStorage.setItem("searched-cities", JSON.stringify([]));
    }
    searchHistoryEl.empty();
    searchHistoryArray.reverse();

    //add search history buttons to page
    for (var i = 0; i < searchHistoryArray.length; i++) {
      searchHistory(searchHistoryArray[i]);
    }

    return searchHistoryArray;
  }

  //save to local storage
  function saveSearchHistory(city) {
    var searchHistoryArray = JSON.parse(
      localStorage.getItem("searched-cities")
    );
    if (searchHistoryArray.includes(city)) {
      // console.log("it's already in here");
      return;
    }
    searchHistoryArray.push(city);
    if (searchHistoryArray.length > 5) {
      searchHistoryArray.shift();
    }
    localStorage.setItem("searched-cities", JSON.stringify(searchHistoryArray));
    loadSearchHistory();
  }

  //funciton to create history buttons
  function searchHistory(city) {
    var searchHistoryBtn = $("<button>")
      .addClass("btn")
      .text(city)
      .on("click", function () {
        $("#current-weather").remove();
        $("#five-day").empty();
        $("#five-day-header").remove();
        getCoordinates(city);
      })
      .attr({
        type: "button",
      });

    // append btn to search history div
    searchHistoryEl.append(searchHistoryBtn);
  }

  function getCoordinates(city) {
    var apiCoordinatesUrl = baseUrl + city + "&appid=" + apiKey;

    fetch(apiCoordinatesUrl)
      .then(function (response) {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (city) {
        console.log(city.name);
        saveSearchHistory(city.name);
        searchWeather(city.coord.lat, city.coord.lon, city.name);
      });
  }

  function searchWeather(lat, lon, cityName) {
    var apiOneCallUrl =
      oneCallUrl + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
    fetch(apiOneCallUrl)
      .then(function (response) {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (data) {
        console.log(data.daily);
        displayWeather(data.daily, cityName);
      });
  }

  function displayWeather(data, cityName) {
    //   console.log("making cards");
    //   console.log(data[0].weather[0].icon);

    // ** START CURRENT DAY DISPLAY ** //
    //add div to hold current day details
    var currentWeatherEl = $("<div>").attr({
      id: "current-weather",
    });

    // get the weather icon from city
    var weatherIcon = data[0].weather[0].icon;
    //   console.log(weatherIcon)
    var cityCurrentWeatherIcon = weatherIconUrl + weatherIcon + ".png";

    // create h2 to display city + current day + current weather icon
    var currentWeatherHeadingEl = $("<h2>").text(
      cityName + "(" + currentDay + ")"
    );

    // create img element to display icon
    var iconImgEl = $("<img>").attr({
      id: "current-weather-icon",
      src: cityCurrentWeatherIcon,
      alt: "Weather Icon",
    });
    //create list of current weather details
    var currWeatherListEl = $("<ul>");

    var currWeatherDetails = [
      "Temp: " + data[0].temp.day + "°F",
      "Wind: " + data[0].wind_speed + " MPH",
      "Humidity: " + data[0].humidity + " %",
      "UV Index: " + data[0].uvi,
    ];

    for (var i = 0; i < currWeatherDetails.length; i++) {
      //create an indiviual list item and append to ul

      //run conditional to assign background color to UV index depending how high it is
      if (currWeatherDetails[i] === "UV Index: " + data[0].uvi) {
        var currWeatherListItem = $("<li>").text("UV Index: ");

        currWeatherListEl.append(currWeatherListItem);

        var uviItem = $("<span>").text(data[0].uvi);

        if (uviItem.text() <= 2) {
          uviItem.addClass("favorable");
        } else if (uviItem.text() > 2 && uviItem.text() <= 7) {
          uviItem.addClass("moderate");
        } else {
          uviItem.addClass("severe");
        }

        currWeatherListItem.append(uviItem);

        //create every list item that isn't uvIndex
      } else {
        var currWeatherListItem = $("<li>").text(currWeatherDetails[i]);
        //append to ul
        currWeatherListEl.append(currWeatherListItem);
      }
    }

    //append curr weather div to col2 before #five-day
    $("#five-day").before(currentWeatherEl);
    //append current weather heading to current weather div
    currentWeatherEl.append(currentWeatherHeadingEl);
    //append icon to current weather header
    currentWeatherHeadingEl.append(iconImgEl);
    //append ul to current weather
    currentWeatherEl.append(currWeatherListEl);

    // ** END CURRENT DAY DISPLAY ** //

    // ** START 5-DAY FORECAST DISPLAY ** //

    //create h2 header for 5-day forecast
    var fiveDayHeaderEl = $("<h2>")
      .text("5-Day Forecast:")
      .attr({
        id: "five-day-header",
      })
      .addClass("forcast");

    //append 5 day forecast header to col2 after current weather div
    $("#current-weather").after(fiveDayHeaderEl);

    // create array for the dates for the next 5 days

    var fiveDayArray = [];

    for (var i = 0; i < 5; i++) {
      let forecastDate = dayjs()
        .add(i + 1, "days")
        .format("dddd,MM/D/YYYY");

      fiveDayArray.push(forecastDate);
    }

    // for each date in the array create a card displaying temp, wind and humidity
    for (var i = 0; i < fiveDayArray.length; i++) {
      // create a div for each card
      var cardDivEl = $("<div>").addClass("col3");

      // create div for the card body
      var cardBodyDivEl = $("<div>").addClass("card-body");

      // create the card-title
      var cardTitleEl = $("<h3>").addClass("card-title").text(fiveDayArray[i]);

      // create the icon for current day weather
      var forecastIcon = data[i].weather[0].icon;

      var forecastIconEl = $("<img>").attr({
        src: weatherIconUrl + forecastIcon + ".png",
        alt: "Weather Icon",
      });

      //create temp
      var tempEL = $("<p>")
        .addClass("card-text")
        .text("Temp: " + data[i].temp.day + "°F");
      //create wind
      var windEL = $("<p>")
        .addClass("card-text")
        .text("Wind: " + data[i].wind_speed + " MPH");
      // create humidity
      var humidityEL = $("<p>")
        .addClass("card-text")
        .text("Humidity: " + data[0].humidity + " %");

      //append cardDivEl to the #five-day container
      fiveDayEl.append(cardDivEl);
      //append cardBodyDivEL to cardDivEl
      cardDivEl.append(cardBodyDivEl);
      //append card title to card body
      cardBodyDivEl.append(cardTitleEl);
      //append icon to card body
      cardBodyDivEl.append(forecastIconEl);
      //append temp details to card body
      cardBodyDivEl.append(tempEL);
      //append wind details to card body
      cardBodyDivEl.append(windEL);
      //append humidity details to card body
      cardBodyDivEl.append(humidityEL);
    }

    // ** END 5-DAY FORECAST DISPLAY ** //
  }

  function submitCitySearch(event) {
    event.preventDefault();
    //get value from user input
    let city = titleCase(citySearchEl.val().trim());

    getCoordinates(city);
    console.log(city);
    //empty the form text area
    citySearchEl.val("");
  }
  // on submission of user data get user input for city and fetch api data
  userFormEl.on("submit", submitCitySearch);

  // on click of search button - empty the current weather and 5-day forecast info
  $("#search-btn").on("click", function () {
    $("#current-weather").remove();
    $("#five-day").empty();
    $("#five-day-header").remove();
  });

  loadSearchHistory();
});
