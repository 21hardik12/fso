import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getCountries = async () => {
  try {
    const response = await axios.get(baseUrl);
    const countryData = response.data.map((country) => {
      return {
        name: country.name.common,
        capital: country.capital,
        languages: country.languages,
        area: country.area,
        flag: country.flags.png,
        latlng: country.latlng
      };
    });
    return countryData;
  } catch (error) {
    console.error(error);
  }
};

export default getCountries;