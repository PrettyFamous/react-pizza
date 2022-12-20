import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );

      if (findItem) {
        ++findItem.count;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice += action.payload.price;
      ++state.totalCount;
    },
    decItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );

      if (findItem.count > 1) {
        --findItem.count;
      } else {
        state.items.splice(state.items.indexOf(findItem), 1);
      }

      state.totalPrice -= action.payload.price;
      --state.totalCount;
    },
    removeItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );

      state.items.splice(state.items.indexOf(findItem), 1);

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

export const selectCart = (state) => state.cart;
export const selectCountInCart = (id) => (state, id) =>
  state.cart.items.reduce(
    (sum, obj) => (obj.id === id ? obj.count + sum : sum),
    0
  );

export const { addItem, decItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
