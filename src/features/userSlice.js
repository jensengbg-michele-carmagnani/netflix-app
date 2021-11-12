import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    favoriteList:[],
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
    addFavoriteMovie: (state, action) => {
      state.favoriteList = action.payload;
    },
    removeFavoriteMovie: (state, action) => {
      state.favoriteList.filter(movie => movie.id === !action.payload.movieId)
    },
    favoriteList(state, action) {
      state.favoriteList = action.payload
    }
  },
});
export const { login, logout, addFavoriteMovie,removeFavoriteMovie, favoriteList } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
