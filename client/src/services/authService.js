import baseService from "./baseService";

export const register = (values) => baseService.post("/auth/register", values);
export const login = (values) => baseService.post("/auth/login", values);
export const logout = () => baseService.post("/auth/logout");
