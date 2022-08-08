import React, { useState, useEffect } from 'react';

import HomeScreen from './pages/HomeScreen';
import SearchScreen from './pages/SearchScreen';

import { convertToC, unixToZoneTime, visConverter } from './helpers/Helpers';

const axios = require('axios');

const storedLocs = JSON.parse(localStorage.getItem('storedLocs'));

const initLocSettings = {
  city: '',
  lat: null,
  lon: null,
};

const App = () => {
  const [locSettings, setLocSettings] = useState(initLocSettings);
  const [weatherDataLocs, setWeatherDataLocs] = useState(storedLocs || []);
  const [weather, setWeather] = useState({});
  const [searchWindow, setSearchWindow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tempSymbol, setTempSymbol] = useState('°F');

  // Display first stored location if it exists,
  // else geolocate city name/coords
  useEffect(() => {
    if (storedLocs) {
      setWeather(storedLocs[0]);
      setIsLoading(false);
    } else if (!storedLocs && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;

        axios
          .get('https://trueway-geocoding.p.rapidapi.com/ReverseGeocode', {
            params: {
              location: `${latitude}, ${longitude}`,
            },
            headers: {
              'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
              'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com',
            },
          })
          .then((response) => {
            const { data } = response;
            setLocSettings({
              city: data.results[0].locality,
              lat: latitude,
              lon: longitude,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  }, []);

  // Get location weather data, set current weather,
  // and add it as an object to weatherDataLocs array
  // if no weather data objs exist yet
  useEffect(() => {
    if (locSettings?.city) {
      let repeatLocs = weatherDataLocs.filter(
        (loc) => loc.city === locSettings.city
      );

      if (repeatLocs.length === 0) {
        axios
          .get('https://api.openweathermap.org/data/3.0/onecall', {
            params: {
              lat: locSettings.lat,
              lon: locSettings.lon,
              units: 'imperial',
              exclude: 'minutely',
              appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
            },
          })
          .then((response) => {
            const { data } = response;
            console.log(data);
            let hourlyData = [],
              dailyData = [];

            for (let hour = 0; hour < 24; hour++) {
              hourlyData.push({
                dt: data.hourly[hour].dt,
                icon: data.hourly[hour].weather[0].icon,
                temp: {
                  Fahr: Math.round(data.hourly[hour].temp),
                  Cels: Math.round(convertToC(data.hourly[hour].temp)),
                },
              });
            }

            for (let day in data.daily) {
              dailyData.push({
                dt: data.daily[day].dt,
                icon: data.daily[day].weather[0].icon,
                low: {
                  Fahr: Math.round(data.daily[day].temp.min),
                  Cels: Math.round(convertToC(data.daily[day].temp.min)),
                },
                high: {
                  Fahr: Math.round(data.daily[day].temp.max),
                  Cels: Math.round(convertToC(data.daily[day].temp.max)),
                },
                sunrise: {
                  dt: data.daily[day].sunrise,
                  icon: 'sunrise',
                  temp: 'SUNRISE',
                },
                sunset: {
                  dt: data.daily[day].sunset,
                  icon: 'sunset',
                  temp: 'SUNSET',
                },
              });
            }

            let weatherData = {
              city: locSettings.city,
              tz: data.timezone,
              crnt: {
                dt: data.current.dt,
                icon: data.current.weather[0].icon,
                temp: {
                  Fahr: Math.round(data.current.temp),
                  Cels: Math.round(convertToC(data.current.temp)),
                },
                descrip: data.current.weather[0].main,
                low: {
                  Fahr: Math.round(data.daily[0].temp.min),
                  Cels: Math.round(convertToC(data.daily[0].temp.min)),
                },
                high: {
                  Fahr: Math.round(data.daily[0].temp.max),
                  Cels: Math.round(convertToC(data.daily[0].temp.max)),
                },
                sunrise: unixToZoneTime(
                  data.current.sunrise,
                  data.timezone,
                  'full'
                ),
                sunset: unixToZoneTime(
                  data.current.sunset,
                  data.timezone,
                  'full'
                ),
                uvi: Math.round(data.current.uvi),
                feels: {
                  Fahr: Math.round(data.current.feels_like),
                  Cels: Math.round(convertToC(data.current.feels_like)),
                },
                humidity: data.current.humidity,
                dew: Math.round(data.current.dew_point),
                vis: visConverter(data.current.visibility),
                pressure: data.current.pressure,
                alerts: data.alerts
                  ? {
                      event: data.alerts[0].event,
                      descrip: data.alerts[0].description,
                    }
                  : null,
              },
              hrly: hourlyData,
              daily: dailyData,
            };

            setWeather(weatherData);

            if (weatherDataLocs.length === 0) {
              setWeatherDataLocs([weatherData]);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      setIsLoading(false);
    }
  }, [locSettings, weatherDataLocs]);

  return (
    <div className={'app-wrapper'}>
      {isLoading && (
        <div className='loading'>
          <h3>Determining the weather at your location.</h3>
          <br />
          <h3>Please wait.</h3>
        </div>
      )}
      {weather?.city && !isLoading && !searchWindow ? (
        <HomeScreen
          weather={weather}
          weatherDataLocs={weatherDataLocs}
          setSearchWindow={setSearchWindow}
          setWeather={setWeather}
          tempSymbol={tempSymbol}
          setTempSymbol={setTempSymbol}
        />
      ) : weather?.city && !isLoading && searchWindow ? (
        <SearchScreen
          weatherDataLocs={weatherDataLocs}
          setWeatherDataLocs={setWeatherDataLocs}
          setLocSettings={setLocSettings}
          weather={weather}
          setWeather={setWeather}
          setSearchWindow={setSearchWindow}
          tempSymbol={tempSymbol}
        />
      ) : null}
    </div>
  );
};

export default App;
