import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCityName, getWeather, getWeatherByCoords } from "../api/api";

export const fetchCityName = createAsyncThunk("weather/fetchCityName", async ({lat, lon}: {lat: number; lon: number}) => {
  try {
    const response = await getCityName({ lat, lon });
    console.log("API Response:", response)
    
      if (!response || !response.data || response.data.length === 0) {
        throw new Error("City not found");
      }
    console.log("city name", response.data?.[0]?.name);

      return response.data?.[0]?.name;
  } catch (error) {
    throw error
  }
})

export const fetchWeatherByCoords = createAsyncThunk("weather/fetchWeatherByCoords", async ({lat, lon}: {lat: number; lon: number}) => { 
  try {
    const response = await getWeatherByCoords({lat, lon});
    console.log("weatherByCoords API Response:", response)
    return response?.data;
  } catch (error) {
    throw error
  }
})

export const fetchWeather = createAsyncThunk("weather/fetchWeather", async ({name}: {name: string}) => {
  try {
    const response = await getWeather({name})
    if (!response || !response.data || response.data.length === 0) {
      throw new Error("City not found");
    }
    console.log("weather API Response:", response.data.main)
    return response.data;
  } catch (error) {
    throw error
  }
})