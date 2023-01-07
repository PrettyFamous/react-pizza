import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortProperty {
  RATING = "rating",
  PRICE = "price",
  TITLE = "title",
}

export enum Order {
  ASCENTIC = "asc",
  DESCENDING = "desc",
}

export type SortItem = {
  name: string;
  sortProperty: SortProperty;
};

export interface filterSliceState {
  categoryId: number;
  sort: SortItem;
  order: Order;
  itemsPerPage: number;
  currentPage: number;
  searchValue: string;
}

const initialState: filterSliceState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: SortProperty.RATING,
  },
  order: Order.ASCENTIC,
  itemsPerPage: 8,
  currentPage: 1,
  searchValue: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<SortItem>) {
      state.sort = action.payload;
    },
    setOrder(state, action: PayloadAction<Order>) {
      state.order = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(state, action: PayloadAction<filterSliceState>) {
      state.currentPage = action.payload.currentPage;
      state.itemsPerPage = action.payload.itemsPerPage;
      state.sort = action.payload.sort;
      state.order = action.payload.order;

      if (action.payload.categoryId) {
        state.categoryId = action.payload.categoryId;
      }

      if (action.payload.searchValue) {
        state.searchValue = action.payload.searchValue;
      }
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const {
  setCategoryId,
  setSort,
  setOrder,
  setCurrentPage,
  setSearchValue,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
