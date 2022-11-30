import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
  order: "asc",
  itemsCount: 0,
  itemsPerPage: 4,
  currentPage: 1,
  searchValue: "",
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
    setOrder(state, action) {
      state.order = action.payload;
    },
    setItemsCount(state, action) {
      state.itemsCount = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setFilters(state, action) {
      console.log(action.payload);
      state.currentPage = action.payload.page;
      state.itemsPerPage = action.payload.limit;
      state.sort = action.payload.sort;
      state.order = action.payload.order;

      if (action.payload.category) {
        state.categoryId = action.payload.category;
      }

      if (action.payload.search) {
        state.searchValue = action.payload.search;
      }
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setOrder,
  setItemsCount,
  setCurrentPage,
  setSearchValue,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
