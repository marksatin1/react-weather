import Window from './Window';

import sunsetIcon from '../assets/weather-icons/sunset.png';

import { uvDescriber } from '../helpers/Helpers';

const Daily = ({ crntWeather, tempSymbol }) => {
  return (
    <div className='daily-wrapper'>
      <Window title='UV Index' className='window-sm'>
        <h4>{crntWeather.uvi}</h4>
        <meter
          id='uv-meter'
          min='0'
          low='3'
          high='7'
          max='10'
          optimum='0'
          value={crntWeather.uvi}
        >
          UV Meter
        </meter>
        <h3>{uvDescriber(crntWeather.uvi)}</h3>
      </Window>
      <Window title='Sunset' className='window-sm'>
        <h4>{crntWeather.sunset}</h4>
        <div className='sunset-icon-box'>
          <img src={sunsetIcon} alt='Sunset' id='sunset-icon' />
        </div>
        <p>Sunrise: {crntWeather.sunrise}</p>
      </Window>
      <Window title='Feels Like' className='window-sm'>
        <h4>
          {tempSymbol === '°C'
            ? crntWeather.feels.Cels
            : crntWeather.feels.Fahr}
          &#176;
        </h4>
      </Window>
      <Window title='Humidity' className='window-sm'>
        <h4>{crntWeather.humidity}&#37;</h4>
        <p>The dew point is {crntWeather.dew}&#176; right now.</p>
      </Window>
      <Window title='Visibility' className='window-sm'>
        <h4>
          {crntWeather.vis} <span className='units'>mi</span>
        </h4>
      </Window>
      <Window title='Pressure' className='window-sm'>
        <h4>
          {crntWeather.pressure} <span className='units'>hPa</span>
        </h4>
      </Window>
    </div>
  );
};

export default Daily;
