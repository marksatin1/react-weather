import React, { useEffect, useState } from 'react';

import LocationCard from '../components/LocationCard';
import Window from '../components/Window';

const axios = require('axios');

const SearchScreen = ({
  weatherDataLocs,
  setWeatherDataLocs,
  setLocSettings,
  weather,
  setWeather,
  setSearchWindow,
  tempSymbol,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedLoc, setSearchedLoc] = useState(false);
  const [cardClasses, setCardClasses] = useState('location-card--pulled');

  const searchInputHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const getLocationHandler = (event) => {
    if (event.key === 'Enter') {
      axios
        .get('http://api.openweathermap.org/geo/1.0/direct', {
          params: {
            q: searchInput,
            limit: 1,
            appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
          },
        })
        .then((response) => {
          const { data } = response;

          setLocSettings({
            city: data[0].name,
            lat: data[0].lat,
            lon: data[0].lon,
          });
          setSearchedLoc(true);
          setSearchInput('');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const addLocHandler = () => {
    setWeatherDataLocs((prev) => [...prev, weather]);
    setCardClasses('location-card--pulled disappear');
  };

  const cancelLocHandler = () => {
    setCardClasses('location-card--pulled disappear');
  };

  const homeScreenHandler = (idx) => {
    setWeather(weatherDataLocs[idx]);
    setSearchWindow(false);
  };

  useEffect(() => {
    localStorage.setItem('storedLocs', JSON.stringify(weatherDataLocs));
  }, [weatherDataLocs]);

  return (
    <>
      <div className='search-screen'>
        <h1>Weather</h1>
        <input
          type='text'
          id='search-bar'
          placeholder='Search for a city'
          value={searchInput}
          onChange={searchInputHandler}
          onKeyDown={getLocationHandler}
        />
        {weatherDataLocs?.map((loc, idx) => {
          return (
            <Window
              key={loc.city}
              className={'window-location'}
              onClick={() => homeScreenHandler(idx)}
            >
              <div className='box1'>
                <div className='box2'>
                  <h2>{loc.city}</h2>
                  <div className='box3'>
                    <p>{loc.alertName && loc.descrip}</p>
                  </div>
                </div>
                <div className='box4'>
                  <h1>
                    {tempSymbol === '°C'
                      ? loc.crnt.temp.Cels
                      : loc.crnt.temp.Fahr}
                    &#176;
                  </h1>
                  <p>
                    H:{' '}
                    {tempSymbol === '°C'
                      ? loc.crnt.high.Cels
                      : loc.crnt.high.Fahr}
                    &#176; L:{' '}
                    {tempSymbol === '°C'
                      ? loc.crnt.low.Cels
                      : loc.crnt.low.Fahr}
                    &#176;
                  </p>
                </div>
              </div>
            </Window>
          );
        })}
      </div>
      {searchedLoc && (
        <div className={cardClasses}>
          <div className='loc-btns'>
            <button type='button' onClick={cancelLocHandler}>
              Cancel
            </button>
            <button type='button' onClick={addLocHandler}>
              Add
            </button>
          </div>
          <LocationCard weather={weather} />
        </div>
      )}
    </>
  );
};

export default SearchScreen;
