import axios from 'axios';
import cred from './apiKeys';

export const getCityName = async ({lat, lon}) => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${cred.ACCESS_WEATHER_API_KEY}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const getWeatherByCoords = async ({lat, lon}) => {
  try {
    const response = await axios.get(
      `api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${cred.ACCESS_WEATHER_API_KEY}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const getWeather = async ({name}) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${cred.ACCESS_WEATHER_API_KEY}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}