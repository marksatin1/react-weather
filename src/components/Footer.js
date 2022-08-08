const Footer = ({
  weatherDataLocs,
  setSearchWindow,
  setWeather,
  tempSymbol,
  setTempSymbol,
}) => {
  const tempSymbolHandler = (event) => {
    let symbol = event.target.innerHTML;

    if (symbol === '°F') {
      setTempSymbol('°C');
    } else {
      setTempSymbol('°F');
    }
  };

  const locBtnHandler = (event) => {
    let btnIdx = event.target.value;
    setWeather(weatherDataLocs[btnIdx]);
  };

  return (
    <div className='footer'>
      <button type='button' id='temp-btn' onClick={tempSymbolHandler}>
        {tempSymbol}
      </button>
      <div className='locations-btn-box'>
        {weatherDataLocs.map((loc, idx) => {
          return (
            <button
              key={loc.city}
              value={idx}
              className='location-btn'
              onClick={locBtnHandler}
            />
          );
        })}
      </div>
      <button id='search-btn' onClick={() => setSearchWindow(true)}>
        Search
      </button>
    </div>
  );
};

export default Footer;
