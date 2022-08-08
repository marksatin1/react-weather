import Window from './Window';

import { unixToDay, codeToIcon } from '../helpers/Helpers';

const Weekly = ({ dailyWeather, tempSymbol }) => {
  return (
    <Window className='window-lg' title='7 Day Forecast'>
      <div className='days-box'>
        {dailyWeather.map((day) => {
          return (
            <div key={day.dt} className='day'>
              <p>{day === dailyWeather[0] ? 'Today' : unixToDay(day.dt)}</p>
              <img src={codeToIcon(day.icon)} alt={day.icon} className='icon' />
              <div className='daily-meter-box'>
                <p>{tempSymbol === '°C' ? day.low.Cels : day.low.Fahr}&#176;</p>
                <meter
                  id='daily-meter'
                  min='0'
                  low='50'
                  high='80'
                  max='110'
                  optimum='70'
                >
                  Daily Weather Meter
                </meter>
                <p>
                  {tempSymbol === '°C' ? day.high.Cels : day.high.Fahr}&#176;
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Window>
  );
};

export default Weekly;
