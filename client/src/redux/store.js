import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { leadersReducer } from "./slices/leaders";
import { commentsReducer } from "./slices/comments";
const store = configureStore({
  reducer: {
    auth: authReducer,
    leaders: leadersReducer,
    comments: commentsReducer,
  },
});
export default store;
