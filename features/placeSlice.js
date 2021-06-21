import { createSlice } from "@reduxjs/toolkit";

export const placeSlice = createSlice({
  name: "place",
  initialState: {
    nearby: null,
    place: null,
    filtered: null,
  },
  reducers: {
    addPlace: (state, action) => {
      state.place = action.payload;
      state.filtered = action.payload;
    },
    navNearby: (state, action) => {
      state.nearby = action.payload;
    },
    updateFilters: (state, action) => {
      state.filtered = action.payload;
    },
    clearFilters: (state) => {
      state.filtered = state.place;
    },
    clearNearby: (state) => {
      state.nearby = null;
    },
  },
});

export const { addPlace, updateFilters, clearFilters, navNearby, clearNearby } =
  placeSlice.actions;

export const selectNearby = (state) => state.place.nearby;

export const selectPlaces = (state) => state.place.place;
export const selectFiltered = (state) => state.place.filtered;

export default placeSlice.reducer;
