import LocationCard from '../components/LocationCard';
import Footer from '../components/Footer';

const HomeScreen = ({
  weather,
  weatherDataLocs,
  setSearchWindow,
  setTempUnits,
  setWeather,
  tempSymbol,
  setTempSymbol,
}) => {
  return (
    <>
      <LocationCard weather={weather} tempSymbol={tempSymbol} />
      <Footer
        weatherDataLocs={weatherDataLocs}
        setWeather={setWeather}
        setSearchWindow={setSearchWindow}
        setTempUnits={setTempUnits}
        tempSymbol={tempSymbol}
        setTempSymbol={setTempSymbol}
      />
    </>
  );
};

export default HomeScreen;
