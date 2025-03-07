import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: null,
  loginError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    signup(state, action) {
      state.users.push(action.payload);
    },
    login(state, action) {
      const { email, password } = action.payload;
      const foundUser = state.users.find(
        (u) => u.email === email && u.password === password
      );
      if (foundUser) {
        state.currentUser = foundUser;
        state.loginError = null;
      } else {
        state.loginError = "User not found or incorrect password!";
      }
    },
    logout(state) {
      (state.currentUser = null), (state.loginError = null);
    },
  },
});

export const { setUsers, setCurrentUser, signup, login, logout } =
  userSlice.actions;
export default userSlice.reducer;
