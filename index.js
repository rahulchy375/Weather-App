let cityName = document.querySelector(`.cityName`);
let dateTime = document.querySelector(`.date-time`);
let Weather = document.querySelector(`.weather`);
let weatherIcon = document.querySelector(`.weather-icon`);
let temp = document.querySelector(`.temperature`);
let min = document.querySelector(`.min`);
let max = document.querySelector(`.max`);
let feelLike = document.querySelector(`.weather-feelLike`);
let Humidity = document.querySelector(`.weather-humidity`);
let Wind = document.querySelector(`.weather-wind`);
let pressure = document.querySelector(`.weather-pressure`);
let input = document.querySelector(`.input`);
let city = `chittagong`;
let inputForm = document.querySelector(`.inputForm`);

// console.log(api);


// this link for the weather icon from openweather.com website;
// http://openweathermap.org/img/wn/${weather[0].icon}@4x.png

// to get full country name we used from Intl.displayName website. 
const countryName = (code) =>{
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}

// to get the full date from the milliseconds we need it;
const setTime = (dt) =>{
    const curTime = new Date(dt*1000);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }
    return new Intl.DateTimeFormat('en-US', options).format(curTime);
}


// searching city:
inputForm.addEventListener(`submit`, (e) =>{
    e.preventDefault();
    city = input.value;
    getApiValue()
    input.value = ``;
    console.log(city);
});



const getApiValue = async() =>{
    try{
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e5afa1b5e9e465352033164aab0b7662`;
        const res = await fetch(api,{
           headers:{
                accept: "application/json"
            }
        })

        const data = await res.json();
        console.log(data);
        const {main, dt, name, sys, weather, wind} = data;
        cityName.innerHTML = `${name}, ${countryName(sys.country)}`;
        dateTime.innerHTML = setTime(dt);
        temp.innerHTML = `${main.temp.toFixed(2)}&#176 f`;
        min.innerHTML = `Min: ${main.temp_min.toFixed()}&#176 f`;
        max.innerHTML = `Max: ${main.temp_max.toFixed()}&#176 f`;
        Weather.innerHTML = weather[0].main;
        weatherIcon.innerHTML = `<img style = "width: 10%" src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png
        ">`;
        feelLike.innerHTML = `${main.feels_like}&#176`;
        Wind.innerHTML = `${wind.speed}m/s`;
        Humidity.innerHTML = `${main.humidity}%`;
        pressure.innerHTML = `${main.pressure}hPa`;

    } catch (error) {
        console.log(error);
    }
    
}

getApiValue()
document.body.addEventListener(`load`, getApiValue);



// We need this properties to set dt or date and time; this is called options;; 
// weekday: "long"
// year: "numeric"
// month: "long"
// day: "numeric"
// hour: "numeric"
// minute: "numeric"