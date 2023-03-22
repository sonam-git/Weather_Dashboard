# Weather_Dashboard
The main purpose of this project is create a simple weather forcast application that allows a user to check the current weather & daily weather for
up to 5 days.
# Description
This project invites you to use the knowledge you learned about server side api & fetch the data from them. Where we use a api called openweathermap (https://openweathermap.org/forecast5).
 We also used jQuery & day.js libraries.This app will run in  the browser and feature dynamically updated HTML and CSS powered by jQuery.
## User Story
* AS A traveler
* I WANT to see the weather outlook for multiple cities
* SO THAT I can plan a trip accordingly
## Acceptance Criteria
* GIVEN a weather dashboard with form inputs
* WHEN I search for a city
* THEN I am presented with current and future conditions for that city and that city is added to the search history
* WHEN I view current weather conditions for that city
* THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
* WHEN I view future weather conditions for that city
* THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
* WHEN I click on a city in the search history
* THEN I am again presented with current and future conditions for that city
# Motivation
This motivates you to showcase the skills and knowledge you learned such as how to use third party such as jQuery and day.js along with the server side APIs and 
fetch data in your project, which basically helps the developer to reduce their time to build any application. It also gives you an oppertunity to understand 
& learn more about third party & server side API mentioned above.
APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data 
from another application's API and using it in the context of their own. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically 
updated HTML and CSS.
# Technologies Used
* HTML
* CSS
* JavaScript
* JQuery
* Day.js
* Server side API (openweathermap)

# Build Status
Since we were not given a starter code for this challange, we picked the jQuery to fetch the data from the server side api called openweathermap.

# code Style

## HTML
* Created index.html file
* Linked css file & javascript file in the head & bottom of body section respectively.
* Header section includes Weather Dashboard heading.
* Main section include the form element with heading h1 search for a city following with form element for user input.
* Button called search is added right below the user input form for event listener.
* Created divs to hold the cities already searched in and stored in the local storage.
* created couple of div's to hold dynamically generated weather forcast for current and further 5 more days.

## CSS
* Added pseudo class hover added to the all the buttons in order to make it user friendly.
* Responsive in smaller screen.
* Added reset.css file.
* Added border radius to the boxes and buttons for better UI/UX
* Overall user friendly.

## JavaScript / JQuery
* Wrapped the entire code within the $(document).ready (function(){})
* Decleared variables as needed
* Created a function to make the first letter of user input city name uppercase.
* Created a function to load Search history of the city which already stored in the local storage.
* Created a function to save the user input in the local storage.
* Created a function to get the Co ordinates of the city that user searched for, where we fetch the data using base url,city name & api key.
* Created another function to get the weather data using the co ordinates fetched from the previous api call, where we used onecall url, latitude, longitude, 
  and apikey.
* Again created a function called display weather to grab the data from the previous function and populated dynamically in the html file, where the today's 
  weather and 5 day weather data are populated.
* click event listener function has been added bottom of the file.

# Screenshots
### Desktop View
![Desktop View](https://user-images.githubusercontent.com/89502092/227014918-a97b7241-90f3-43ef-924a-9a1a29749f69.png)


### Responsive View
![mobile view1](https://user-images.githubusercontent.com/89502092/227014959-ce8542b9-a783-4250-86a4-7f504b6bba48.png)  ![mobile view 2](https://user-images.githubusercontent.com/89502092/227014991-1883ec41-399c-4b4c-8cbe-36f91ac4c4ec.png)



# Github URL:
https://github.com/sonam-git/Weather_Dashboard/
# Deployed Live URL:
https://sonam-git.github.io/Weather_Dashboard/
# License
N/A

