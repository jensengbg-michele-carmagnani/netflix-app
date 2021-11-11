import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    favoriteMovies:[],
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
    addFavoriteMovie: (state, action) => {
      state.favoriteMovies.push(action.payload);
    },
    removeFavoriteMovie: (state, action) => {
      state.favoriteMovies.filter(movie => movie.id === !action.payload.movieId)
    }
  },
});
export const { login, logout, addFavoriteMovie,removeFavoriteMovie } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
