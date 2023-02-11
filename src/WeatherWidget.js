import {useState, useEffect} from 'react';
import config from './config.js'

function WeatherWidget({location}) {
    const [data, setData] = useState(null);
    // const [localTime, setLocalTime] = useState(null);
    const apiKey = config.apiKey;

    function fetchWeather(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
        .then(res => res.json())
        .then(obj => setData(obj));
    };

    // function getLocalTime(timezone) {
    //     let date = new Date();
    //     let utcOffset =  date.getTimezoneOffset();
    //     let weatherOffset = (timezone/60);
    //     let localTime = date.getTime();
    //     console.log("Local: " + date.toLocaleTimeString());
    //     let utcTime = new Date(localTime + utcOffset * 60 * 1000);
    //     console.log("UTC: " + utcTime.toLocaleTimeString());

    //     if (weatherOffset > 0) {
    //     let weatherTime = new Date(utcTime + weatherOffset * 60 * 1000);
    //     let weatherTimeString = weatherTime.toLocaleTimeString();
    //     console.log("Weather: " + weatherTime.toLocaleTimeString());
    //     } else {
    //     let weatherTime = new Date(utcTime - (Math.abs(weatherOffset)) * 60 * 1000);
    //     let weatherTimeString = weatherTime.toLocaleTimeString();
    //     console.log("Weather:  " + weatherTime.toLocaleTimeString());
    //     };
       
    //     return ( (weatherTimeString.length == 11) ? weatherTimeString.slice(0,5) + " " +weatherTimeString.slice(-2) : weatherTimeString.slice(0,4) + " " +weatherTimeString.slice(-2)) ;
    // };



    useEffect (() => {
        if (location) {
            fetchWeather(location);
            // setLocalTime(getLocalTime(data.timezone));
            console.log('request made');
        }
    }, [location]);


    
    if (!data) {
        return (
            <>
            <h3>Enter a City to Get the Current Weather</h3>
            </>
        );
    }

    console.log('render occurred')
    return (
        <div>
            <div className="weather loading">
                <h2 className="city">Weather in {location}</h2>
                <h3 className="datetime">Local Time: Coming Soon!</h3>
                <h1 className="temp">{data.main.temp}°F</h1>
                <div className="flex">
                    <img src="https://openweathermap.org/img/wn/04n.png" alt="" className="icon"/>
                    <div className="description">{data.weather[0].description}</div>
                </div>
                <div className="humidity">Humidity: {data.main.humidity}%</div>
                <div className="wind">Wind Speed: {data.wind.speed} mph</div>
            </div>
        </div>
    )

}
export default WeatherWidget