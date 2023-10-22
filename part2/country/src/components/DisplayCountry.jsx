import { useEffect, useState } from "react";
import getWeather from "../api/weatherApi";
import { DisplayWeather } from "./DisplayWeather";

export const DisplayCountry = ({ country, handleHideCountry }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const weatherData = await getWeather(country.latlng)
      setWeather(weatherData)
    }
    fetchData()
  }, [country.latlng])  
  
  return (
    <div>
      <button onClick={handleHideCountry}>Hide</button>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h4>Languages: </h4>
      {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      <img src={country.flag} alt="" />
      {weather && (<DisplayWeather countryName={country.name}
                      temp={weather.temp}
                      icon={weather.icon}
                      wind={weather.wind}>                        
      </DisplayWeather>)}
    </div>
  );
};
