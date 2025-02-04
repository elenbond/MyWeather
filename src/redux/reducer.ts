import { createSlice } from "@reduxjs/toolkit";
import { fetchCityName, fetchWeeklyWeather } from "./actions";

interface WeatherState {
  name: string;
  forecast: any;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  name: "",
  forecast: null,
  loading: false,
  error: null as string | null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityName.fulfilled, (state, action) => {
        state.name = action.payload;
        state.loading = false;
      })
      .addCase(fetchCityName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Undefined error";
      });
    builder
      .addCase(fetchWeeklyWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeeklyWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.forecast = action.payload;
      })
      .addCase(fetchWeeklyWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Undefined error";
      });
  },
});

export default weatherSlice.reducer;