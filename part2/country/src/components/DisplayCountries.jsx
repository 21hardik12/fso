export const DisplayCountries = ({ countries, handleShowCountry }) => {
  return (
    <div>
      {countries.length <= 10 ? (
        countries.map(country => <li key={country.name}>{country.name}<button onClick={() => { handleShowCountry(country); }}>show</button></li>)
      ) : (
        <p>To many matches ({countries.length}), be more specific</p>
      )}
    </div>
  );
};
