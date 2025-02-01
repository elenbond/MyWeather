import { createSlice } from "@reduxjs/toolkit";
import { fetchWeather } from "./actions";

const initialState = {
  weather: null,
  loading: false,
  error: null as string | null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
    });
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload;
    });
    builder
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Undefined error";
    });
  },
});

export default weatherSlice.reducer;