export const isAuthenticatedSelector = (state) =>
  state.authSlice.isAuthenticated;
export const userTypeSelector = (state) => state.authSlice.user?.role;
export const userInformationSelector = (state) => state.authSlice.user;
