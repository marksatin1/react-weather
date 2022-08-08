import Current from './Current';
import Alert from './Alert';
import Hourly from './Hourly';
import Weekly from './Weekly';
import Daily from './Daily';

import { codeToBgImage } from '../helpers/Helpers';

const LocationCard = ({ weather, tempSymbol }) => {
  const { alerts } = weather.crnt;

  return (
    <div
      className={'location-card--static'}
      style={{
        backgroundImage: `url(${codeToBgImage(weather?.crnt?.icon)})`,
      }}
    >
      <Current weather={weather} tempSymbol={tempSymbol} />
      {alerts && <Alert alerts={alerts} />}
      <Hourly weather={weather} tempSymbol={tempSymbol} />
      <Weekly dailyWeather={weather.daily} tempSymbol={tempSymbol} />
      <Daily crntWeather={weather.crnt} tempSymbol={tempSymbol} />
    </div>
  );
};

export default LocationCard;
