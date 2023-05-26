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

function getTemperature(response) { console.log(response.data);
     celciusTemperature = Math.round(response.data.main.temp);
    let h3 = document.querySelector(`#h3`);
    h3.innerHTML = `${celciusTemperature}°`;

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
    getForecast(response.data.coord)
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

function getForecast(coordinates){
console.log(coordinates)
let apiKey= (`9e0fb79c2f66d0cd0dcf06710976a873`);
let apiUrl= (`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`);

axios.get(apiUrl).then(displayForecast);
};

function formFunction(event){ event.preventDefault();
    let city = document.querySelector(`#input1`).value;
    let h1 = document.querySelector (`h1`);
    h1.innerHTML =(`${city}`);

    showCity(city);
}  ; 

function showCity(city){
let apiKey = (`540c88386d3856c60e763ebebac0656f`);
let apiUrl = (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

axios.get(apiUrl).then(getTemperature);
};

function showFahrenheitTemperature(event){
event.preventDefault();

fahrenheitLink.classList.add("active");
celciusLink.classList.remove("active");
let temperatureElement = document.querySelector(`#h3`);
let FahrenheitTemperature = (celciusTemperature * 9) / 5 + 32 ;

temperatureElement.innerHTML = Math.round (FahrenheitTemperature); 
};


function showCelciusTemperature(event){
event.preventDefault();

celciusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
let temperatureElement = document.querySelector(`#h3`);
temperatureElement.innerHTML = Math.round(celciusTemperature);

};
function formatForecastDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
let days =["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

return days[day]

};

function displayForecast(response){
    let forecast = response.data.daily;

    let forecastElement=document.querySelector("#weatherForecast");
let forecastHTML= `<div class="row">`;

forecast.forEach (function (forecastDay, index){
if (index <6) 
{
forecastHTML = forecastHTML + `
<div class= "col-2">
<div id="forecastDate">
${formatForecastDay(forecastDay.dt)}
</div>
<img src= "https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42" />
<div id="forcastTemperatures">
    <span id="maxTemp">${Math.round(forecastDay.temp.max)}°</span><span id = "minTemp">${Math.round(forecastDay.temp.min)}°</span>
</div>
</div>
    `}
}) ;

forecastHTML=forecastHTML+ `</div>`;
    forecastElement.innerHTML = forecastHTML
};

 celciusTemperature = null;
 

let form = document.querySelector (`#entryForm`);
form.addEventListener (`submit` , formFunction);


let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener(`click`, showFahrenheitTemperature);

let celciusLink = document.querySelector("#celciusLink");
celciusLink.addEventListener(`click`, showCelciusTemperature);

showCity(`Meyerton`);