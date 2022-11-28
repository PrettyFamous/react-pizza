import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
  orderDesc: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setOrderDesc(state, action) {
      state.orderDesc = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setOrderDesc } = filterSlice.actions;

export default filterSlice.reducer;
