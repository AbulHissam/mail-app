import { createSlice } from "@reduxjs/toolkit";

// Try to fetch from local storage.If available use that value else set what should be the default value to sessionStorage
let filtersFromStorage;
try {
  filtersFromStorage = JSON.parse(sessionStorage.getItem("filtersFromStorage"));
  if (!filtersFromStorage) {
    sessionStorage.setItem("filtersFromStorage", JSON.stringify([]));
    filtersFromStorage = JSON.parse(
      sessionStorage.getItem("filtersFromStorage")
    );
  }
} catch (err) {}

export const mailDataSlice = createSlice({
  name: "mailData",
  initialState: {
    mailData: [],
    filters: [...filtersFromStorage],
  },
  reducers: {
    updateMailData: (state, action) => {
      state.mailData = [...action.payload.mails];
    },
    updateFilters: (state, action) => {
      state.filters = action.payload.filters.map((f) => {
        return f.value;
      });
      // whenever an filter is chose and an action is dispatched set that to sessionStorage
      sessionStorage.setItem(
        "filtersFromStorage",
        JSON.stringify(state.filters)
      );
    },
  },
});

export const { updateMailData, updateFilters } = mailDataSlice.actions;

export const mailDataSelector = (state) => state.mailData.mailData;
export const filterSelector = (state) => state.mailData.filters;

export default mailDataSlice.reducer;
