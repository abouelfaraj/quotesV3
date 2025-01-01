import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../context/axiosConfig";


export const fetchAsyncFeeds = createAsyncThunk(
  "feeds/fetchAsyncFeeds",
  async () => {
    const response = await client.get( "/api/allFeeds");
    return response.data;
  }
);

const initialState = {
  feeds: {},
  selectFeed: {},
  removeSelectedFeed: {}
};

const feedSlice = createSlice({
  name: "feeds",
  initialState,
  reducers: {
    removeSelectedFeed: (state) => {
      state.selectFeed = {};
    },
  },
  extraReducers: {
    [fetchAsyncFeeds.pending]: () => { },
    [fetchAsyncFeeds.fulfilled]: (state, { payload }) => {state.feeds = payload;},
    [fetchAsyncFeeds.rejected]: () => { }
  },
});

export const { removeSelectedFeed } = feedSlice.actions;
export const getAllFeeds = (state) => state.feeds.feeds;
export const getSelectedFeed = (state) => state.feeds.selectFeed;
export default feedSlice.reducer;