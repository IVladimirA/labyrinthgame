import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (_) => {
    const { data } = await axios.get("/comments/all");
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};
const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchComments.pending]: (state, action) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchComments.rejected]: (state, action) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
export const selectComments = (state) => state.comments.data;
export const selectCommentsStatus = (state) => state.comments.status;
