import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (querryString, thunkAPI) => {
    const { data } = await axios.get(
      `https://637e0893cfdbfd9a63a4e9c0.mockapi.io/items${querryString}`
    );

    return data;
  }
);

const initialState = {
  items: [],
  itemsCount: 0,
  status: "loading", // loading | success | error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.itemsCount = 0;
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload.items;
      state.itemsCount = action.payload.count;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.itemsCount = 0;
      state.items = [];
    },
  },
});

export const selectPizza = (state) => state.pizza;

export const {} = pizzaSlice.actions;

export default pizzaSlice.reducer;
