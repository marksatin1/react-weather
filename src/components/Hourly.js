import Window from './Window';

import { codeToIcon, unixToZoneTime } from '../helpers/Helpers';

const Hourly = ({ weather, tempSymbol }) => {
  const hrlyWeather = weather.hrly,
    dailyWeather = weather.daily;
  let hrsWithSun = [];

  if (dailyWeather[0]) {
    // copy array so not to splice into original data
    for (let hour of hrlyWeather) {
      hrsWithSun.push(hour);
    }

    let sunrise1 = dailyWeather[0].sunrise,
      sunset1 = dailyWeather[0].sunset,
      sunrise2 = dailyWeather[1].sunrise,
      sunset2 = dailyWeather[1].sunset;

    let sunriseIdx = hrlyWeather.findIndex((hour) => hour.dt > sunrise1.dt);
    let sunsetIdx = hrlyWeather.findIndex((hour) => hour.dt > sunset1.dt);

    if (sunriseIdx !== -1 && sunriseIdx !== 0) {
      hrsWithSun.splice(sunriseIdx, 0, sunrise1);
    } else if (sunriseIdx === 0) {
      sunriseIdx = hrlyWeather.findIndex((hour) => hour.dt > sunrise2.dt);
      hrsWithSun.splice(sunriseIdx, 0, sunrise2);
    }

    if (sunsetIdx !== -1 && sunsetIdx !== 0) {
      hrsWithSun.splice(sunsetIdx, 0, sunset1);
    } else if (sunsetIdx === 0) {
      sunsetIdx = hrlyWeather.findIndex((hour) => hour.dt > sunset2.dt);
      hrsWithSun.splice(sunsetIdx, 0, sunset2);
    }
  }

  return (
    <Window className='window-lg' title='Hourly Forecast'>
      <div className='hours-box'>
        {hrsWithSun.map((hour) => {
          return (
            <div key={hour.dt} className='hour'>
              <p className='time'>
                {hour === hrsWithSun[0]
                  ? 'Now'
                  : hour.temp === 'SUNRISE' || hour.temp === 'SUNSET'
                  ? unixToZoneTime(hour.dt, weather.tz, 'full')
                  : unixToZoneTime(hour.dt, weather.tz, 'hour')}
              </p>
              <img
                src={codeToIcon(hour.icon)}
                alt={hour.icon}
                className='icon'
              />
              <p className='temp'>
                {hour.temp === 'SUNRISE' || hour.temp === 'SUNSET'
                  ? hour.temp
                  : tempSymbol === '°C'
                  ? hour.temp.Cels + '°'
                  : hour.temp.Fahr + '°'}
              </p>
            </div>
          );
        })}
      </div>
    </Window>
  );
};

export default Hourly;
