import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCityName, getWeeklyWeather } from "../api/api";

export const fetchCityName = createAsyncThunk("weather/fetchCityName", async ({lat, lon}: {lat: number; lon: number}) => {
  try {
    const response = await getCityName({ lat, lon });
    // console.log("API Response:", response)
    // console.log("назва міста за координатами actions", response)
    
      if (!response || !response.data || response.data.length === 0) {
        throw new Error("City not found");
      }
      // console.log("city назва та країна", response.data?.[0]?.name,",", response.data?.[0]?.country,);
      // console.log("API Response data:", response.data)
      return response.data;
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