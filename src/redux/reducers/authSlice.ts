import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from 'src/apis/authApi.ts';
import { userApi } from 'src/apis/userApi.ts';
import { AuthState } from 'src/interfaces/interfaces.ts';
import { RootState } from 'src/redux/store.ts';

const INITIAL_STATE: AuthState = {
  user: null,
  access: null,
  refresh: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    updateAccessToken: (state, action) => {
      const { access } = action.payload;
      state.access = access;
    },
    logOut: () => {
      return INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    const handleAuthFulfilled = (state: AuthState, action: PayloadAction<AuthState>) => {
      const { user, access, refresh } = action.payload;
      return { ...state, user, access, refresh };
    };

    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, handleAuthFulfilled)
      .addMatcher(authApi.endpoints.signup.matchFulfilled, handleAuthFulfilled)
      .addMatcher(authApi.endpoints.googleLogin.matchFulfilled, handleAuthFulfilled)
      .addMatcher(authApi.endpoints.activateUser.matchFulfilled, handleAuthFulfilled)
      .addMatcher(userApi.endpoints.profile.matchFulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logOut, updateAccessToken } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectUserIsActive = (state: RootState) => state.auth.user!.is_active;
export const selectAccessToken = (state: RootState) => state.auth.access;
