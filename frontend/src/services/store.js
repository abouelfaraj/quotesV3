import { configureStore } from "@reduxjs/toolkit";
import feedsReducer from "./feeds/feedSlice";
import usersReducer from "./users/userSlice";

export const store = configureStore({
  reducer: {
    feeds: feedsReducer,
    users: usersReducer
  }
});