function getLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, apiError)
    } else {
        console.error("Geolocation is not supported")
    }
}


function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeather(latitude, longitude);    
  
}

function getWeather(latitude, longitude) {
    const apiKey = 'a22ae023eeeb4b88adc112925250302'

    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`)
        .then(response => response.json())
        .then(data => {
            console.log("Weather: ", data)
            display(data)
        })
        .catch(error => console.error(error));
}

function apiError() {
    console.log("Unable to retrieve user's location")
}

function display(data) {
    const location = data.location.name
    const temp = data.current.temp_c
    const time = data.location.localtime

    const locationDiv = document.getElementById("location");
    locationDiv.innerHTML = `<h2>${location}</h2>
                            <p>${temp} C ${time.substring(11, 16)}</p>`
    
}


window.onload = function() {
    getLocation();
}