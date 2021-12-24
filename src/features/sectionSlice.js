import { createSlice } from "@reduxjs/toolkit";

// Try to fetch from local storage.If available use that value else set what should be the default value to sessionStorage
let section;
try {
  section = sessionStorage.getItem("section");
  if (!section) {
    sessionStorage.setItem("section", "inbox");
    section = sessionStorage.getItem("section");
  }
} catch (err) {}

export const sectionSlice = createSlice({
  name: "section",
  initialState: {
    selectedSection: section,
  },
  reducers: {
    setSelectedSection: (state, action) => {
      state.selectedSection = action.payload.section;
      // Whenever this action is dispatched from components update the sessionStorage
      sessionStorage.setItem("section", state.selectedSection);
    },
  },
});

export const { setSelectedSection } = sectionSlice.actions;

export const sectionSelector = (state) => state.section.selectedSection;

export default sectionSlice.reducer;
