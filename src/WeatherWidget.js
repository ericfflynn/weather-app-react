import {useState, useEffect} from 'react';
import config from './config.js'

function WeatherWidget({location}) {
    const [data, setData] = useState(null);

    function getLocalTime(timezone) {
        let date = new Date();
        let utcOffset =  date.getTimezoneOffset();
        let weatherOffset = (timezone/60);
        let localTime = date.getTime();
        let weatherTime = new Date(localTime + utcOffset * 60 * 1000 + weatherOffset * 60 * 1000);
        let weatherTimeString = weatherTime.toLocaleTimeString();
        let time = (weatherTimeString.length === 11) ? weatherTimeString.slice(0,5) + " " +weatherTimeString.slice(-2) : weatherTimeString.slice(0,4) + " " +weatherTimeString.slice(-2);
        return (time);
        
    };

    useEffect (() => {
        const apiKey = config.apiKey;
        function fetchWeather(city) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
            .then(res => res.json())
            .then(obj => setData(obj));
        };

        if (location) {
            fetchWeather(location);
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
                <h3 className="datetime">Local Time: {getLocalTime(data.timezone)}</h3>
                <h1 className="temp">{Math.floor(data.main.temp)}°F</h1>
                <div className="flex">
                    <img src={"https://openweathermap.org/img/wn/"+data.weather[0].icon+".png"} alt="" className="icon"/>
                    <div className="description">{data.weather[0].description}</div>
                </div>
                <div className="humidity">Humidity: {data.main.humidity}%</div>
                <div className="wind">Wind Speed: {Math.floor(data.wind.speed)} mph</div>
            </div>
        </div>
    )

}
export default WeatherWidget