import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../context/axiosConfig";


export const fetchAsyncUser = createAsyncThunk(
  "users/fetchAsyncUser",
  async () => {
    const response = await client.get( "/api/user");
    return response.data;
  }
);

const initialState = {
  users: null,
  removeSelectedFeed: {}
};

const feedSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    removeSelectedFeed: (state) => {
      state.selectFeed = {};
    },
  },
  extraReducers: {
    [fetchAsyncUser.pending]: () => { },
    [fetchAsyncUser.fulfilled]: (state, { payload }) => {state.users = payload;},
    [fetchAsyncUser.rejected]: () => { }
  },
});

export const { removeSelectedFeed } = feedSlice.actions;
export const getUser = (state) => state.users.users;
export default feedSlice.reducer;