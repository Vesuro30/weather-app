//
//
//  API key  028f3f6246d6c2500d2f614c612c9df5

//  https://api.openweathermap.org/data/2.5/onecall?lat=39.7392&lon=-104.9849&exclude=alerts,minutely,hourly&appid=028f3f6246d6c2500d2f614c612c9df5&units=imperial


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


var userCityName = "";
var userState = "";



$(function()
{
  $("#searchButton").click(citySearch);

});










//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}



function citySearch()
{
  //  This function takes the user input and trims leading and trailing spaces via trim.
  //  An empty search entry is not acceptable and will trigger and error.
  //  An entry that contains a comma and state designation will also not be accepted and will trigger an error.
  //  We will test for acceptance criteria by utilizing the open weather API
  
  userCityName = $("#searchBar").val().trim();
  userState = $("#stateSearch").val();
  getWeatherData(userCityName, userState);
};

function getWeatherData(city, state)
{

//call the 'Geocode' API at openweathermap
  $.get('https://api.openweathermap.org/geo/1.0/direct?q=' + city + ',' + state + ',US&appid=028f3f6246d6c2500d2f614c612c9df5',null,function(resp)
  {
    if (resp.length === 0)
      {
      alert('No location was found in the United States that matches your entry.\r\n\r\nPlease try again.');
      return false;
      }
      else
        {
          var selectedState = resp[0].state;
          var selectedCity  = resp[0].name;
          $.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + resp[0].lat + '&lon=' + resp[0].lon + '&exclude=minutely,hourly,alerts&appid=028f3f6246d6c2500d2f614c612c9df5&units=imperial', null, function(resp)
          {
            
            $("#cityName").html(selectedCity + ", " + selectedState + " (" + moment.unix(resp.current.dt).format("M/DD/YYYY") + ")");
            $("#temperature span").html(resp.current.temp.toFixed(1));
            $("#windSpeed span").html(resp.current.wind_speed);
            $("#humidity span").html(resp.current.humidity);
            $("#uvIndex span").html(resp.current.uvi);

            for (let i = 1; i < 6; i++) 
            {

              console.log(moment.unix(resp.daily[i].dt).format("M/DD/YYYY"));
              $("#date" + i).html(moment.unix(resp.daily[i].dt).format("M/DD/YYYY"));
              $("#day" + i + "MinTemp").html("Minimum Temp: " + resp.daily[i].temp.min.toFixed(1) + "&deg;F");
              $("#day" + i + "MaxTemp").html("Maximum Temp: " + resp.daily[i].temp.max.toFixed(1) + "&deg;F");

              var iconUrl = "https://openweathermap.org/img/w/" + resp.daily[i].weather[0].icon + ".png";

              $("#day" + i + "Icon img").attr("src", iconUrl);
              console.log(resp);
              $("#day" + i + "WindSpeed").html("Wind Speed: " + resp.daily[i].wind_speed + " Miles Per Hour");
              $("#day" + i + "Humidity").html("Humidity: " + resp.daily[i].humidity + "%");
              
            }








            $("#currentConditions, #fiveDayHeader, #fiveDayForecast").addClass("show");
          });
        }
  });
  // var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + ",us&APPID=028f3f6246d6c2500d2f614c612c9df5&units=imperial";
  // $.ajax(requestUrl, {success: function(resp)
  //   {
  //     $("#testing").html(JSON.stringify(resp));
  //     console.log(resp);
      

  //   }, error: function()
  //   {
  //     alert("You have made an error.\n Please try again.");
  //   }});
  

}