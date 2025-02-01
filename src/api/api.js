import axios from 'axios';
import cred from './apiKeys';

export const getWeather = async ({lat, lon}) => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${cred.ACCESS_WEATHER_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
