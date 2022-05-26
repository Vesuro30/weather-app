//
//
//  API key  028f3f6246d6c2500d2f614c612c9df5


// // JQuery AJAX
// $.get(url      //{              //  No curly braces needed either as .get only needs 1 argument - the URL
//   url: requestUrl,   //  Do not need this line if using a .get
//   method: 'GET',     //  Do not need this line if using a .get
// }  //  ).then(function (response) {
//   console.log('AJAX Response \n-------------');
//   console.log(response);
// });

// // Browser Fetch Method
// fetch(requestUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log('Fetch Response \n-------------');
//     console.log(data);
//   });



//  This script uses the OpenWeather API to receive and generate weather conditions in 
//  different cities as defined by the user.  

//  I want to see the weather outlook for multiple cities so I can plan a trip accordingly
//  Given a weather dashboard with input fields
//  When I search for a city 
//  Then I am present with current and future conditions for that city and that city is
//  added to the search history
//  When I view current weather conditions for that city
//  Then I am presented with the CITY NAME, the date an ICON representing weather
//  conditions, the TEMPERATURE, the HUMIDITY, the WIND SPEED, and the UV INDEX
//  When I view the UV INDEX
//  I am presented with a color that indicates whether the conditions are favorable,
//  moderate or severe
//  When I view FUTURE weather conditions for that city
//  I am presented with a 5-DAY FORECAST that displays the DATE, ICON, TEMPERATURE
//  WIND SPEED and HUMIDITY
//  When I click on a city in the search history
//  I am again presented with current and future conditions for that city


//  Create landing page which will include a search bar, a list of 5 - 10 most 
//  recently searched cities, the date, an icon representing the current weather 
//  conditions, the temperature, wind speed, humidity and UV index for the city
//  that was searched for.  
//  This page will also display the 5 day forecast for the city that was searched
//  for in the form of small 'cards' showing the date, icon representing the forecasted
//  weather conditions, temperature, wind speed, humidity and UV index.
//  







var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Denver,us&APPID=028f3f6246d6c2500d2f614c612c9df5&units=imperial'

fetch(requestUrl)
.then(function (response) {
  return response.json();
  // console.log(response)
})
.then(function (data) {
  // for (var i = 0; i < data.length; i++) 
  // {
  //   var listItem = document.createElement('li');
  //   listItem.textContent = data[i].html_url;
  //   repoList.appendChild(listItem);
  // }
  console.log(data)
});
