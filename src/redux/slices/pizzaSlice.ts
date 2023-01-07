import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export const fetchPizzas = createAsyncThunk<fetchedPizzas, string>(
  "pizza/fetchPizzasStatus",
  async (querryString) => {
    const { data } = await axios.get<fetchedPizzas>(
      `https://637e0893cfdbfd9a63a4e9c0.mockapi.io/items${querryString}`
    );

    return data;
  }
);

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

type fetchedPizzas = {
  count: number;
  items: Pizza[];
};

export type Pizza = {
  id: number;
  category: number;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

interface pizzaSliceState {
  items: Pizza[];
  itemsCount: number;
  status: Status;
}

const initialState: pizzaSliceState = {
  items: [],
  itemsCount: 0,
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.itemsCount = 0;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.itemsCount = action.payload.count;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.itemsCount = 0;
      state.items = [];
    });
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state: pizzaSliceState) => {
  //     state.status = "loading";
  //     state.itemsCount = 0;
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state: pizzaSliceState, action) => {
  //     state.items = action.payload.items;
  //     state.itemsCount = action.payload.count;
  //     state.status = "success";
  //   },
  //   [fetchPizzas.rejected]: (state: pizzaSliceState) => {
  //     state.status = "error";
  //     state.itemsCount = 0;
  //     state.items = [];
  //   },
  // },
});

export const selectPizza = (state: RootState) => state.pizza;

export const {} = pizzaSlice.actions;

export default pizzaSlice.reducer;
