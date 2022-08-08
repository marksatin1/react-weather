import d01 from '../assets/weather-icons/01d.png';
import n01 from '../assets/weather-icons/01n.png';
import d02 from '../assets/weather-icons/02d.png';
import n02 from '../assets/weather-icons/02n.png';
import b03 from '../assets/weather-icons/03.png';
import b04 from '../assets/weather-icons/04.png';
import b09 from '../assets/weather-icons/09.png';
import d10 from '../assets/weather-icons/10d.png';
import n10 from '../assets/weather-icons/10n.png';
import b11 from '../assets/weather-icons/11.png';
import b13 from '../assets/weather-icons/13.png';
import b50 from '../assets/weather-icons/50.png';
import sunrise from '../assets/weather-icons/sunrise.png';
import sunset from '../assets/weather-icons/sunset.png';
import clearDay from '../assets/bg-imgs/clear-day-sm.jpg';
import clearNight from '../assets/bg-imgs/clear-night-sm.jpg';
import cloudyDay from '../assets/bg-imgs/cloudy-day-sm.jpg';
import cloudyNight from '../assets/bg-imgs/cloudy-night-sm.jpg';
import mistDay from '../assets/bg-imgs/mist-day-sm.jpg';
import mistNight from '../assets/bg-imgs/mist-night-sm.jpg';
import rainDay from '../assets/bg-imgs/rain-day-sm.jpg';
import rainNight from '../assets/bg-imgs/rain-night-sm.jpg';
import snowDay from '../assets/bg-imgs/snow-day-sm.jpg';
import snowNight from '../assets/bg-imgs/snow-night-sm.jpg';
import thunderDay from '../assets/bg-imgs/thunder-day-sm.jpg';
import thunderNight from '../assets/bg-imgs/thunder-night-sm.jpg';

const { DateTime } = require('luxon');

export const unixToZoneTime = (datetime, timezone, type) => {
  const tzDT = DateTime.fromSeconds(datetime).setZone(timezone);
  const hour = tzDT.c.hour;
  const usHour = ((hour + 11) % 12) + 1;
  let minutes = tzDT.c.minute;

  if (minutes < 10) {
    minutes = '0' + String(minutes);
  }

  let suffix = hour >= 12 ? 'PM' : 'AM';

  if (type === 'hour') {
    return usHour + suffix;
  } else if (type === 'full') {
    return usHour + ':' + minutes + ' ' + suffix;
  } else {
    return null;
  }
};

export const unixToDay = (datetime) => {
  const day = new Date(datetime * 1000).getDay();
  const dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  return dayNames[day];
};

export const codeToIcon = (iconCode) => {
  let icon =
    iconCode === '01d'
      ? d01
      : iconCode === '01n'
      ? n01
      : iconCode === '02d'
      ? d02
      : iconCode === '02n'
      ? n02
      : iconCode === '03d' || iconCode === '03n'
      ? b03
      : iconCode === '04d' || iconCode === '04n'
      ? b04
      : iconCode === '09d' || iconCode === '09n'
      ? b09
      : iconCode === '10d'
      ? d10
      : iconCode === '10n'
      ? n10
      : iconCode === '11d' || iconCode === '11n'
      ? b11
      : iconCode === '13d' || iconCode === '13n'
      ? b13
      : iconCode === '50d' || iconCode === '50n'
      ? b50
      : iconCode === 'sunrise'
      ? sunrise
      : sunset;
  return icon;
};

export const codeToBgImage = (iconCode) => {
  let bgImg =
    iconCode === '01d'
      ? clearDay
      : iconCode === '01n'
      ? clearNight
      : iconCode === '02d' || iconCode === '03d' || iconCode === '04d'
      ? cloudyDay
      : iconCode === '02n' || iconCode === '03n' || iconCode === '04n'
      ? cloudyNight
      : iconCode === '09d' || iconCode === '10d'
      ? rainDay
      : iconCode === '09n' || iconCode === '10n'
      ? rainNight
      : iconCode === '11d'
      ? thunderDay
      : iconCode === '11n'
      ? thunderNight
      : iconCode === '13d'
      ? snowDay
      : iconCode === '13n'
      ? snowNight
      : iconCode === '50d'
      ? mistDay
      : iconCode === '50n'
      ? mistNight
      : null;
  return bgImg;
};

export const uvDescriber = (rating) => {
  let uvDescrip =
    rating === 0
      ? 'Very Low'
      : rating === 1 || rating === 2
      ? 'Low'
      : rating === 3 || rating === 4 || rating === 5
      ? 'Moderate'
      : rating === 6 || rating === 7
      ? 'High'
      : rating === 8 || rating === 9 || rating === 10
      ? 'Very High'
      : 'Extreme';
  return uvDescrip;
};

export const visConverter = (meterDist) => {
  let miles = Math.round(meterDist * 0.000621371);
  let vis = miles >= 10 ? 10 : miles;
  return vis;
};

export const convertToC = (temp) => {
  temp = ((temp - 32) * 5) / 9;
  return temp;
};
