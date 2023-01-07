import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Item = {
  id: number;
  title: string;
  price: number;
  count: number;
  imageUrl: string;
  type: string;
  size: number;
};

interface cartSliceState {
  totalPrice: number;
  totalCount: number;
  items: Item[];
}

const initialState: cartSliceState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );

      if (findItem) {
        ++findItem.count;
      } else {
        state.items.push(action.payload);
      }

      state.totalPrice += action.payload.price;
      ++state.totalCount;
    },
    decItem(state, action: PayloadAction<Item>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );

      if (findItem) {
        if (findItem.count > 1) {
          --findItem.count;
        } else {
          state.items.splice(state.items.indexOf(findItem), 1);
        }
      }

      state.totalPrice -= action.payload.price;
      --state.totalCount;
    },
    removeItem(state, action: PayloadAction<Item>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );

      if (findItem) {
        state.items.splice(state.items.indexOf(findItem), 1);
      }

      state.totalPrice -= action.payload.price * action.payload.count;
      state.totalCount -= action.payload.count;
    },
    clearItems(state) {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCountInCart = (id: number) => (state: RootState) =>
  state.cart.items.reduce(
    (sum: number, obj: Item) => (obj.id === id ? obj.count + sum : sum),
    0
  );

export const { addItem, decItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
