export const DisplayWeather = ({ countryName, temp, icon, wind }) => {
  const celTemp = ((temp - 32) * 5 / 9).toFixed(2);
  return (
    <div>
      <h1>{countryName}</h1>
      <p>temperature {celTemp} Celcius</p>
      <img src={icon} alt="" />
      <p>Wind {wind} m/s</p>
    </div>
  );
};
