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
};

export const getWeeklyWeather = async ({ lat, lon }) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=76&units=metric&appid=${cred.ACCESS_WEATHER_API_KEY}`
    );
    // console.log("getWeeklyWeather", response)
    const dailyData = response.data.list.reduce((acc, item) => {
      const date = item.dt_txt.split(" ")[0];
      // console.log("date", date);
      if (!acc[date]) {
        acc[date] = { tempSum: 0, count: 0, minTemp: item.main.temp, maxTemp: item.main.temp };
      }
      acc[date].tempSum += item.main.temp;
      acc[date].count += 1;
      acc[date].minTemp = Math.min(acc[date].minTemp, item.main.temp);
      acc[date].maxTemp = Math.max(acc[date].maxTemp, item.main.temp);
      // console.log("acc", acc);
      return acc;
    }, {});
    const weeklyForecast = Object.keys(dailyData).map((date) => ({
      date,
      avgTemp: dailyData[date].tempSum / dailyData[date].count,
      minTemp: dailyData[date].minTemp,
      maxTemp: dailyData[date].maxTemp,
    }));
    // console.log("weeklyForecast", weeklyForecast);
    return weeklyForecast;
  } catch (error) {
    console.error("Weather API error:", error);
  }
};

export const getCoordsByCityName = async ({ city }) => {
  try{
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${cred.ACCESS_WEATHER_API_KEY}`
    );
    // console.log("City coords by name API Response:", response);
    return response;
  } catch (error) {
    console.error(error);
  } 
  
}