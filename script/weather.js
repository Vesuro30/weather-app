
$(function(){
	//within this function, perform all of the necessary setup/initialization required
	//
	//the function is called ONLY upon completion of the DOM load

	//install a click event handler on the button
	//	• call the 'GetWeatherData' function when clicked
	$('button#btnGo').click(GetWeatherData);
	
	//install click event handler on the city search icon
	$('img#searchGo').click(CitySearch);
	
	//install 'return' event handler on the city name
	$('input#city').keydown(function(e){
		if ((e.key === 'Enter') || (e.key === 'Tab')) { e.preventDefault(); CitySearch(); } 
		});
		
	//install 'change' event handler on the city selector
	$('div#cityselect select').change(function(e){
		console.log(e.target.value);
		GetCityData(e.target.value);
		});
		
	});

function GetWeatherData()
	{
	//make an ajax request to the weather data provider
	$.get('https://api.openweathermap.org/data/2.5/weather?q=Denver,us&APPID=dd3d30ad19f4fbf80b58504cc2a578fe&units=imperial',null,function(resp){
		//dump the data to the console (need developers tools to view)
		console.log(resp);

		//push the data as a string to the div on the webpage
		$('div#weather').html(JSON.stringify(resp));

		//construct a 'current conditions' section
		//	• get the conditions icon
		var iconurl = "https://openweathermap.org/img/w/" + resp.weather[0].icon + ".png";
		$('#icon').attr('src', iconurl);

		//install the current temperature
		//	• the temp is in degrees F; convert to C
		var tempC = (resp.main.temp - 32.0)*5/9;
		var $current = $('div#current');
		$('p#temp span').html(resp.main.temp.toFixed(1) + '° F  (' + tempC.toFixed(1) + '° C)');

		//humidity
		$('p#humid span').html(resp.main.humidity);

		//wind
		$('p#wind span').html(resp.wind.speed);

		//sky condition
		$('p#general span').html(resp.weather[0].description);
		$current.show();
		});
	}

function CitySearch()
	{
	//hide the city select div and the city data div
	$('div#cityselect').hide();
	$('div#citydata').hide();
	
	//get the city name
	//	• ensure an entry has been made
	var $city = $('input#city');
	var cityName = $.trim($city.val());
	if (cityName.length === 0)
		{
		alert('You must enter the name of a city in the United States.');
		//clear the input and return the focus
		$city.val('').focus();
		return false;
		}
		else
			{
			//call the 'Geocode' API at openweathermap
			$.get('https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + ',US&limit=5&appid=dd3d30ad19f4fbf80b58504cc2a578fe',null,function(resp){
				//the API returns an array of locations whose name matches the input string
				//	--OR-- it returns an empty array if no matches are found
				if (resp.length === 0)
					{
					alert('No location was found in the United States that matches your entry.\r\n\r\nPlease try again.');
					return false;
					}
					else
						{
						//if more than 1 result, show them 
						//	• construct the 'option' elements for the select
						var opts = '<option value="-1" selected>&bull;&bull; Select from list &bull;&bull;</option>',i;
						var optVal;
						for (i=0; i<resp.length; i++)
							{
							//construct the option value as the concatenation of latitude, longitude, and state
							optVal = resp[i].lat + ';' + resp[i].lon + ';' + resp[i].state;
							opts += '<option value="' + optVal + '">' + resp[i].name + ', ' + resp[i].state + '</option>';
							}
						//install a 'not in list' option
						opts += '<option value="-2">Not in list</option>';
						//install the options
						$('div#cityselect select').html(opts);
						//show the select div
						$('div#cityselect').show();
						console.log(resp);
						}
				});
			}
	}
	
function GetCityData(cityValue)
	{
	//parse the value to get the latitude, longitude, and state
	var info = cityValue.split(';');
	//	info[0] -> latitude; info[1] -> longitude; info[2] -> state
	console.log(info);
	
	//get the data for the city
	$.get('https://api.openweathermap.org/data/2.5/weather?lat=' + info[0] + '&lon=' + info[1] +'&APPID=dd3d30ad19f4fbf80b58504cc2a578fe&units=imperial',null,function(resp){
		//install the name of the city
		$('div#citydata h1 span').html(resp.name + ', ' + info[2]);
		//push the data as a string to the div on the webpage
		$('div#citydata div').html(JSON.stringify(resp));
		//hide the select div and show the city div
		$('div#cityselect').hide();
		$('div#citydata').show();
		

		console.log(resp);
		});
	}


