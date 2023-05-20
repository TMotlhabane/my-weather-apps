function formDate(timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10){hours = `0${hours}`};
let minutes = date.getMinutes ();
if (minutes < 10){minutes = `0${minutes}`} ;
let days = [`Sunday`,`Monday`, `Tuesday`, `Wednesday`, `Thursday` , `Friday`, `Saturday`];
let day= days[date.getDay()];

return `${day}, ${hours}:${minutes}`;
}

function updateWeather(response){
    let townId = (response.data.name);
    let town = document.querySelector(`#town`);
    town.innerHTML = (`${townId}`);

    getTemperature(response);
    description(response);
    getHumidity(response);
    getWind(response);
    getPrecipitation(response);
}; 

function handleButton(){
    navigator.geolocation.getCurrentPosition(buttonFunction);

}

function buttonFunction(position){ 
    let lat = (response.coord.lat);
    let lon = (response.coord.lon);
    let apiKey = (`540c88386d3856c60e763ebebac0656f`);
let apiUrl = (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
axios.get(apiUrl).then(updateWeather);
};

function getTemperature(response) { console.log(response.data);
    let celciusTemperature = Math.round(response.data.main.temp);
    let h3 = document.querySelector(`#h3`);
    h3.innerHTML = (celciusTemperature);

    description(response);
};

function description(response){
    let tempDescription = (response.data.weather[0].description);
    let h4 = document.querySelector(`h4`);
    h4.innerHTML = (`${tempDescription}`);
    let h1 = document.querySelector(`h1`);
    h1.innerHTML = response.data.name
    let h2 = document.querySelector(`h2`);
    h2.innerHTML= formDate (response.data.dt * 1000);
    let iconElement = document.querySelector(`#icon`);

    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    getHumidity(response)
    getWind(response)
    getPrecipitation(response)
};
 
function getHumidity(response){
    let humidityId = Math.round(response.data.main.humidity);
 let humidity = document.querySelector(`#humidity`);
 humidity.innerHTML = (`${humidityId} %`) ;

 
};

function getWind(response){
    let windId = Math.round(response.data.wind.speed );
    let wind = document.querySelector(`#wind`);
    wind.innerHTML = (`${windId} km/h`);

    getPrecipitation(response);
};

function getPrecipitation(response){
 let precipitationId = Math.round(response.data.clouds.all) ;
 let precipitation = document.querySelector (`#precipitation`) ;
 precipitation.innerHTML = (`${precipitationId}%`);

};

function formFunction(event){ event.preventDefault();
    let city = document.querySelector(`#input1`).value;
    let h1 = document.querySelector (`h1`);
    h1.innerHTML =(`${city}`);

    api(city);
}   

function api (city){
let apiKey = (`540c88386d3856c60e763ebebac0656f`);
let apiUrl = (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

axios.get(apiUrl).then(getTemperature);
};

function showFahrenheitTemperature(event){
event.preventDefault();
let temperatureElement = document.querySelector(`#h3`);
let FahrenheitTemperature = (celciusTemperature * 9) / 5 + 32 ;

temperatureElement.innerHTML = Math.round (FahrenheitTemperature); 
};


function showCelciusTemperature(event){
event.preventDefault();
let temperatureElement = document.querySelector(`#h3`);
temperatureElement.innerHTML = Math.round(celciusTemperature);

};

let celciusTemperature = null;

let form = document.querySelector (`#entryForm`);
form.addEventListener (`submit` , formFunction);

let button = document.querySelector(`button`);
button.addEventListener(`click`, handleButton);

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener(`click`, showFahrenheitTemperature);

let celciusLink = document.querySelector("#celciusLink");
celciusLink.addEventListener(`click`, showCelciusTemperature);
