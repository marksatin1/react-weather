const Current = ({ weather, tempSymbol }) => {
  const crntWeather = weather.crnt;
  return (
    <div className='current'>
      <h2>{weather.city}</h2>
      <div className='temp-box'>
        <h1>
          {tempSymbol === '°C' ? crntWeather.temp.Cels : crntWeather.temp.Fahr}
        </h1>
        <span id='degree'>&#176;</span>
      </div>
      <h3 id='descrip'>{crntWeather.descrip}</h3>
      <h3>
        H: {tempSymbol === '°C' ? crntWeather.high.Cels : crntWeather.high.Fahr}
        &#176; L:{' '}
        {tempSymbol === '°C' ? crntWeather.low.Cels : crntWeather.low.Fahr}
        &#176;
      </h3>
    </div>
  );
};

export default Current;
