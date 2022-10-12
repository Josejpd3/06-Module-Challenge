// Global Variables ----------------------------------------------------
let key = "5dbae0dc8c44a91682771011f1d94610";
var historyList = [];
let input;
let searchInput = document.querySelector("#input")
let searchBtn = document.querySelector("#searchBtn")
let historySection = document.querySelector(".history-section")
// ----------------------------------------------------------------------

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Initialize and retrieve store content --------------------------------
function init() {
    var storedhistoryList = JSON.parse(localStorage.getItem("historyList"));
    if (storedhistoryList !== null) {
      historyList = storedhistoryList;
    }
    renderhistoryList();
  }
// ---------------------------------------------------------------------

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Display the stored content--------------------------------------------
function renderhistoryList() {
  historySection.innerHTML = "";
  for (var i = 0; i < historyList.length; i++) {
    var search = historyList[i];
    var button = document.createElement("button");
    button.textContent = search;
    button.setAttribute("data-index", i);
    button.setAttribute("id", i);
    button.setAttribute("onClick", "historyFetch(" + button.id + ")");
    button.classList.add("history")
    historySection.appendChild(button);
  }
}
// ----------------------------------------------------------------------

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Decides which input method its going to be used search vs history button
function searchFetch() {
    input = document.getElementById("input").value;
    fetchResults(input)
}

function historyFetch (e) {
  buttonClicked = e;
  input = document.getElementById(buttonClicked).textContent
  fetchResults(input)
}

// ----------------------------------------------------------------------

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Fetches a city depending on input, then fetches the weather for that city based off its cordinates
function fetchResults(input) {
    let locationUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${key}`
    fetch(locationUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log("Location data:", data[0]);
        $("#location").text(data[0].name)
        let lat = data[0].lat;
        let lon = data[0].lon;
        let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${key}`;
        let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}` 
        fetch(weatherUrl)
            .then(function (response) {
            return response.json();
            })
            .then(function (data) {
            console.log("Weather data:", data);
            $("#icon").html(`<img src='http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' alt='rain'></img>`)
            $(".temp-main").text("Temp: " + Math.round((data.main.temp - 273) * 9/5 + 32) + '\xB0' + "F")
            $(".wind-main").text("Wind: " + data.wind.speed + " MPH")
            $(".humidity-main").text("Humidity: " + data.main.humidity + "%")
    });
        fetch(forecastUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log("forecast data: ", data)
                let j = 0;
                for (let i = 7; i < 47; i = i = i + 8) {
                    j++
                    console.log(i)
                    $(".date" + j).text()
                    if (data.list[i].weather[0].icon == "01d") {
                        $(".icon" + j).html("<img src='http://openweathermap.org/img/wn/01d@2x.png' alt='rain'>")
                    }
                    if (data.list[i].weather[0].icon == "02d") {
                        $(".icon" + j).html("<img src='http://openweathermap.org/img/wn/02d@2x.png' alt='rain'>")
                    }
                    if (data.list[i].weather[0].icon == "03d") {
                        $(".icon" + j).html("<img src='http://openweathermap.org/img/wn/03d@2x.png' alt='rain'>")
                    }
                    if (data.list[i].weather[0].icon == "04d") {
                        $(".icon" + j).html("<img src='http://openweathermap.org/img/wn/04d@2x.png' alt='rain'>")
                    }
                    if (data.list[i].weather[0].icon == "09d") {
                        $(".icon" + j).html("<img src='http://openweathermap.org/img/wn/09d@2x.png' alt='rain'>")
                    }
                    if (data.list[i].weather[0].icon == "10d") {
                        $(".icon" + j).html("<img src='http://openweathermap.org/img/wn/10d@2x.png' alt='rain'>")
                    }
                    if (data.list[i].weather[0].icon == "11d") {
                        $(".icon" + j).html("<img src='http://openweathermap.org/img/wn/11d@2x.png' alt='rain'>")
                    }
                    if (data.list[i].weather[0].icon == "13d") {
                        $(".icon" + j).html("<img src='http://openweathermap.org/img/wn/13d@2x.png' alt='rain'>")
                    }
                    if (data.list[i].weather[0].icon == "50d") {
                        $(".icon" + j).html("<img src='http://openweathermap.org/img/wn/50d@2x.png' alt='rain'>")
                    }

                    $(".temp" + j).text("Temp: " + Math.round((data.list[i].main.temp - 273) * 9/5 + 32) + '\xB0' + "F")
                    $(".wind" + j).text("Wind: " + data.list[i].wind.speed + " MPH")
                    $(".humidity" + j).text("Humidity: " + data.list[i].main.humidity + "%")
                }
            })
    });
    $(".content-section").removeClass("hide")
}

// ----------------------------------------------------------------------

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// It stores the inputed text in local storage and displays the storage on the page
function storehistoryList() {
  localStorage.setItem("historyList", JSON.stringify(historyList));
}

searchBtn.addEventListener("click", function(event) {
  event.preventDefault();
  var inputText = searchInput.value.trim();
  if (inputText === "") {
    return;
  }

  for (let i = 0; i < historyList.length; i++)
  if (inputText === historyList[i]) {
    return;
  }

  historyList.push(inputText);
  searchInput.value = "";
  storehistoryList();
  renderhistoryList();
});
init()