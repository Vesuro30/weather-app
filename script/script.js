//
//
//


// // JQuery AJAX
// $.ajax({
//   url: requestUrl,
//   method: 'GET',
// }).then(function (response) {
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







var url = 'https://api.openweathermap.org/data/2.5/weather?q=Denver,us&APPID=dd3d30ad19f4fbf80b58504cc2a578fe&units=imperial'

fetch(url)
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
