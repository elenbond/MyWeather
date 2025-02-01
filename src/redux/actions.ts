import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWeather } from "../api/api";

export const fetchWeather = createAsyncThunk("weather/fetchWeather", async ({lat, lon}: {lat: number; lon: number}) => {
  try {
    const response = await getWeather({ lat, lon })
    return response.data
  } catch (error) {
    throw error
  }
})