import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

import { UserSlice } from "../../types/User";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { uid: "EX3vacDzuNdyYpzuGzBxXuBPjU33" , email: "michele@gmail.com"  } ,
  },
  reducers: {
    login: (state, action: PayloadAction<UserSlice>) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = { uid: "", email: "" };
    },
  },
});
export const { login, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
