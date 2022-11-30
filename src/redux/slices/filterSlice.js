import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
  orderDesc: false,
  itemsCount: 0,
  itemsPerPage: 4,
  currentPage: 1,
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
    setItemsCount(state, action) {
      state.itemsCount = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setOrderDesc,
  setItemsCount,
  setCurrentPage,
} = filterSlice.actions;

export default filterSlice.reducer;
