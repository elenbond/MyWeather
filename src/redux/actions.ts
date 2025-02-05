import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCityName, getWeeklyWeather } from "../api/api";

export const fetchCityName = createAsyncThunk("weather/fetchCityName", async ({lat, lon}: {lat: number; lon: number}) => {
  try {
    const response = await getCityName({ lat, lon });
    // console.log("API Response:", response)
    
      if (!response || !response.data || response.data.length === 0) {
        throw new Error("City not found");
      }
    // console.log("city name", response.data?.[0]?.name);

      return response.data?.[0]?.name;
  } catch (error) {
    throw error
  }
})

export const fetchWeeklyWeather = createAsyncThunk(
  "weather/fetchWeeklyWeather",
  async ({ lat, lon }: { lat: number; lon: number }) => {
    try {
      const response = await getWeeklyWeather({ lat, lon });
      if (!response) {
        throw new Error("Weather data not found");
      }
      // console.log("Weekly weather API Response:", response);
      return response;
    } catch (error) {
      throw error;
    }
  }
);