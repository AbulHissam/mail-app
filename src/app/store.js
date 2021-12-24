import { configureStore } from "@reduxjs/toolkit";
import sectionReducer from "../features/sectionSlice";
import mailDataReducer from "../features/mailDataSlice";

export const store = configureStore({
  reducer: {
    section: sectionReducer,
    mailData: mailDataReducer,
  },
});
