

//  https://api.openweathermap.org/data/2.5/onecall?lat=39.7392&lon=-104.9849&exclude=alerts,minutely,hourly&appid=028f3f6246d6c2500d2f614c612c9df5&units=imperial

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
  

var maxRecents = 10;
var userCityName = "";
var userState = "";



$(function()
{
  //  Set click handler on search button
  $("#searchButton").click(citySearch);


  var listSplit = [];
  var listButtons = [];
  //  parse local storage string to array
  listButtons = JSON.parse(localStorage.getItem("recentlySearched"));
  for (let i = 0; i < listButtons.length; i++) 
  {
    //  Generate recently searched "buttons" to allow user to search for that info again
    listSplit = listButtons[i].split(";");
     $("#recentlySearchedList").append("<li>" + listSplit[0] + ", " + listSplit[1] + "</li>");
  }

  //  click handler for recents
  $("#recentlySearchedList").click(function(e)
  {
    var cityState = e.target.innerHTML.split(", ");
    getWeatherData(cityState[0], cityState[1], 1);
  });
});



function citySearch()
{
  //  This function takes the user input and trims leading and trailing spaces via trim.
  //  An empty search entry is not acceptable and will trigger and error.
  //  An entry that contains a comma and state designation will also not be accepted and will trigger an error.
  //  We will test for acceptance criteria by utilizing the open weather API
  
  //  Get and trim the contents of the search bar
  userCityName = $("#searchBar").val().trim();
  //  Get the value of the state select list
  userState = $("#stateSearch").val();
  getWeatherData(userCityName, userState, 0);
};

function getWeatherData(city, state, mode)
{
//  If mode = 0, user has clicked the search button.  If mode = 1 user has clicked a recently searched button
//  call the 'Geocode' API at openweathermap
  if(!mode)
  {
    // mode = 0, user has clicked the search button
    if((city.length === 0) || (state == 0))
    {
      //  Check to see if user has entered the required info
      alert("You must enter both a city and state!");
      return;
    }
  }

  $.get('https://api.openweathermap.org/geo/1.0/direct?q=' + city + ',' + state + ',US&appid=028f3f6246d6c2500d2f614c612c9df5',null,function(resp)
  {
    //  Declare variable
    var listSplit, uviColor;
    console.log(resp);
    //  Check to see if a response was received
    if (resp.length === 0)
      {
        // No response.  alert user
        alert('No location was found in the United States that matches your entry.\r\n\r\nPlease try again.');
        return false;
      }
      else
        {
          var selectedState = resp[0].state;
          var selectedCity  = resp[0].name;
          var recentArray = [];
          // Get previous info from local storage
          recents = localStorage.getItem("recentlySearched");
          //  Check to see if recents contains previous info
          if(recents === null)
          {
            //  Nothing in recents, install selected city and selected state in array
            recentArray[0] = selectedCity + ";" + selectedState;
            $("#recentlySearchedList").click(function(e)
            {
              var cityState = e.target.innerHTML.split(", ");
              getWeatherData(cityState[0], cityState[1], 1);
            });
            $("#recentlySearchedList").append("<li>" + selectedCity + ", " + selectedState + "</li>");
          }
          else
            {
              //  recentArray already contains recently searched info.  
            var citystate = selectedCity + ";" + selectedState;

            recentArray = JSON.parse(recents);
            var i;
            for (i = 0; i < recentArray.length; i++) 
            {
              //  check to see if searched city is already on the recently searched list
              if (recentArray[i] == citystate)
              {
                //  search results are already in recent list.  break loop.
                break;
              } 
            }

            if (i == recentArray.length) 
            {
              //  City is not on the list - new city
              //  Check to see if there are the maximum number of entries in the recentArray
              if(recentArray.length == maxRecents)
              {
                //  Yes - remove last entry in the array
                recentArray.shift();

                //  adding users search to the array of recently searched "buttons"
                recentArray.push(citystate);

                //  Remove all buttons from the DOM
                $("#recentlySearchedList").empty();
                
                //  Rebuild recently searched "buttons" from recentArray
                for (let j = 0; j < recentArray.length; j++) 
                {
                  listSplit = recentArray[j].split(";");
              
                 //  Generate "button" on recently searched list
                 $("#recentlySearchedList").append("<li>" + listSplit[0] + ", " + listSplit[1] + "</li>");
                                  
                }
              }
              else
              {
              // Add the searched city/state to the recentArray
              recentArray.push(citystate);
              //  Split each element in the array at ; leaving us with city, state
              listSplit = citystate.split(";");
              
              //  Generate "button" on recently searched list
                $("#recentlySearchedList").append("<li>" + listSplit[0] + ", " + listSplit[1] + "</li>");
              }
            }


            }
            // //  install results to local storage
          localStorage.setItem("recentlySearched", JSON.stringify(recentArray));

            //  Make call to API to receive response
          $.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + resp[0].lat + '&lon=' + resp[0].lon + '&exclude=minutely,hourly,alerts&appid=028f3f6246d6c2500d2f614c612c9df5&units=imperial', null, function(resp)
          {
            //  Current weather conditions icon URL
            var currentConditionsIconUrl = "https://openweathermap.org/img/w/" + resp.current.weather[0].icon + ".png";
            
            //  Generate city, state and date and icon for the current conditions div
            $("#cityName span#first").html(selectedCity + ", " + selectedState + " (" + moment.unix(resp.current.dt).format("dddd, MMMM Do, YYYY") + ")") + "   " + $("#cityName span#second img").attr("src", currentConditionsIconUrl);

            //  Generate and install current temperature in current conditions div
            $("#temperature span").html(resp.current.temp.toFixed(1));
            //  Generate and install wind speed in current conditions div
            $("#windSpeed span").html(resp.current.wind_speed);
            //  Generate and install humidity in current conditions div
            $("#humidity span").html(resp.current.humidity);
            //  Generate and install UV Index in current conditions div
            $("#uvIndex div").html(resp.current.uvi);
            //  Background color for low exposure level UV Index
            if(resp.current.uvi <= 2){uviColor = "#20f209";}
            //  Background color for moderate exposure level UV Index
            else if(resp.current.uvi > 2 && resp.current.uvi <= 5){uviColor = "#e5ed09";}
            //  Background color for high exposure level UV Index
            else if(resp.current.uvi > 5 && resp.current.uvi <= 7){uviColor = "#f9912f";}
            //  Background color for very high exposure level UV Index
            else {uviColor = "#ff0000";}
            $("#uvIndex div").css({"background-color" : uviColor});
            console.log(resp);


            //  Loop to install weather conditions for the 5-day forecast
            for (let i = 1; i < 6; i++) 
            {

              $("#date" + i).html(moment.unix(resp.daily[i].dt).format("dddd, MMMM Do, YYYY"));
              $("#day" + i + "MinTemp").html("Low Temp: " + resp.daily[i].temp.min.toFixed(1) + "&deg;F");
              $("#day" + i + "MaxTemp").html("High Temp: " + resp.daily[i].temp.max.toFixed(1) + "&deg;F");

              var iconUrl = "https://openweathermap.org/img/w/" + resp.daily[i].weather[0].icon + ".png";

              $("#day" + i + "Icon img").attr("src", iconUrl);
              $("#day" + i + "WindSpeed").html("Wind Speed: " + resp.daily[i].wind_speed + " MPH");
              $("#day" + i + "Humidity").html("Humidity: " + resp.daily[i].humidity + "%");
              
            }

            //  Display current conditions, five day header and five day forecast upon request of weather data
            $("#currentConditions, #fiveDayHeader, #fiveDayForecast").addClass("show");
          });
        }
  });

}



