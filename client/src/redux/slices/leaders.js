import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchLeaders = createAsyncThunk(
  "leaders/fetchLeaders",
  async (_) => {
    const { data } = await axios.get("/leaderboard");
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading", // loading, loaded, error
};
const LeadersSlice = createSlice({
  name: "leaders",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLeaders.pending]: (state) => {
      state.status = "loading";
    },
    [fetchLeaders.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchLeaders.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const leadersReducer = LeadersSlice.reducer;
export const selectLeadersData = (state) => state.leaders.data;
export const selectLeadersStatus = (state) => state.leaders.status;
