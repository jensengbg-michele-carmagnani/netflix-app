import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    favoriteMovieId:null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
    favoriteMovie: (state, action) => {
      state.favoriteMovieId = action.payload;
    }
  },
});
export const { login, logout, favoriteMovie } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
