import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getWeather = async ([lat, lng]) => {
    try {
        const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`    
        const response = await axios.get(baseUrl)  
        
        const iconUrl = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`        
        const weather = {
            temp: response.data.main.temp,
            icon: iconUrl,
            wind: response.data.wind.speed
        }
        return weather
    } catch (error) {
        console.log(error);        
    }       
}

export default getWeather;