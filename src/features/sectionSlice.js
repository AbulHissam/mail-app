import { createSlice } from "@reduxjs/toolkit";

let section;
try {
  section = sessionStorage.getItem("section");
  if (!section) {
    sessionStorage.setItem("section", "inbox");
    section = sessionStorage.getItem("section");
  }
  console.log(section);
} catch (err) {}

export const sectionSlice = createSlice({
  name: "section",
  initialState: {
    selectedSection: section,
  },
  reducers: {
    setSelectedSection: (state, action) => {
      state.selectedSection = action.payload.section;
      sessionStorage.setItem("section", state.selectedSection);
    },
  },
});

export const { setSelectedSection } = sectionSlice.actions;

export const sectionSelector = (state) => state.section.selectedSection;

export default sectionSlice.reducer;
