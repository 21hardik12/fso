import { useEffect } from "react";
import { useState } from "react";
import { DisplayCountry } from "./components/DisplayCountry";
import { DisplayCountries } from "./components/DisplayCountries";
import getCountries from "./api/countriesApi";

const App = () => {
  const [searchString, setSearchString] = useState("");
  const [countriesTodisplay, setCountriesToDisplay] = useState([]);
  const [countries, setCountries] = useState([])  
  const [singleCountry, setSingleCountry] = useState(null)
  

  useEffect(() => {
    const fetchCountries = async () => {
      const countryData = await getCountries()
      setCountries(countryData)      
    }
    fetchCountries()
  }, []);

  useEffect(() => {
    updateCountriesToDisplay(countries, searchString);
  }, [searchString, countries]);

  function updateCountriesToDisplay(countryData, value) {    
    if (value) {      
      const temp = countryData.filter((country) =>
        country.name.toLowerCase().includes(value.toLowerCase())
      );
      if (temp.length === 1) {
        setSingleCountry(temp[0]);
      }
      setCountriesToDisplay(temp);
    } else {
      setSingleCountry(null);
      setCountriesToDisplay([]);
    }
  }

  const handleSearchChange = (e) => {
    setSearchString(e.target.value);    
  };

  const handleShowCountry = (country) => {
    setSingleCountry(country);
  }

  const handleHideCountry = () => {
    setSingleCountry(null)
  }

  return (
    <div>
      find countries:{" "}
      <input value={searchString} onChange={handleSearchChange}></input>      
      {countries.length !== 0 ? (singleCountry ? (
      <DisplayCountry country={singleCountry} handleHideCountry={handleHideCountry}></DisplayCountry>
    ) : (<DisplayCountries countries={countriesTodisplay} handleShowCountry={handleShowCountry} />))
    : (<p>Loading...</p>)}
    </div>    
  );
};

export default App;
