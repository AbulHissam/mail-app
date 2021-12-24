import { createSlice } from "@reduxjs/toolkit";

let filtersFromStorage;
try {
  filtersFromStorage = JSON.parse(sessionStorage.getItem("filtersFromStorage"));
  if (!filtersFromStorage) {
    sessionStorage.setItem("filtersFromStorage", JSON.stringify([]));
    filtersFromStorage = JSON.parse(
      sessionStorage.getItem("filtersFromStorage")
    );
  }
  console.log(filtersFromStorage);
} catch (err) {}

export const mailDataSlice = createSlice({
  name: "mailData",
  initialState: {
    mailData: [],
    selectedMail: {},
    filters: [...filtersFromStorage],
  },
  reducers: {
    updateMailData: (state, action) => {
      state.mailData = [...action.payload.mails];
    },
    setSelectedMail: (state, action) => {
      state.selectedMail = {
        ...action.payload,
      };
      sessionStorage.setItem("mail", JSON.stringify(state.selectedMail));
    },
    updateFilters: (state, action) => {
      state.filters = action.payload.filters.map((f) => {
        return f.value;
      });
      sessionStorage.setItem(
        "filtersFromStorage",
        JSON.stringify(state.filters)
      );
    },
  },
});

export const { updateMailData, setSelectedMail, updateFilters } =
  mailDataSlice.actions;

export const mailDataSelector = (state) => state.mailData.mailData;
export const selectedMailSelector = (state) => state.mailData.selectedMail;
export const filterSelector = (state) => state.mailData.filters;

export default mailDataSlice.reducer;
