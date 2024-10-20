import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../../services/authService";
import { AxiosError } from "axios";
import { Notification } from "@/components/ui/Notification";
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload: { user } }) => {
        state.isLoading = false;
        state.user = user;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload: { user } }) => {
        state.isLoading = false;
        state.user = user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addDefaultCase((state) => state);
  },
});

//Dispatch function to call the register user service
export const register = createAsyncThunk(
  "auth/register",
  async ({ values }) => {
    try {
      const { data } = await authService.register(values);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

//Dispatch function to call the login user service
export const login = createAsyncThunk("auth/login", async ({ values }) => {
  try {
    const { data } = await authService.login(values);
    return data;
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      Notification({ message: e.response.data.message });

      return Promise.reject();
    }
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const { data } = await authService.logout();
    return data;
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      Notification({ message: e.response.data.message });

      return Promise.reject();
    }
  }
});

export const { logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
