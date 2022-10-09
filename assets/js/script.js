let key = "5dbae0dc8c44a91682771011f1d94610";
let weatherKey = "15c1fbec437ec6e53f3b5116649b1a63";
let cityName = "Kissimmee";

function fetchResults(e) {
    let locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${key}`
    fetch(locationUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log("Location data:", data[0]);
        let lat = data[0].lat;
        let lon = data[0].lon;
        let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${key}`;
        fetch(weatherUrl)
            .then(function (response) {
            return response.json();
            })
            .then(function (data) {
            console.log("Weather data:", data);
    });
    });
}
fetchResults()

