import baseService from "./baseService";

export const addProduct = (values) =>
  baseService.post("/admin/products/add", values);

export const editProduct = (values, productId) =>
  baseService.put(`/admin/products/edit/${productId}`, values);

export const deleteProduct = (productId) =>
  baseService.delete(`/admin/products/delete/${productId}`);

export const getAllProducts = () => baseService.get(`/admin/products/get`);

export const uploadImage = (data) =>
  baseService.post("/admin/products/upload-image", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getAllOrdersOfAllUsers = () =>
  baseService.get("/admin/orders/get");

export const getOrderDetailsForAdmin = (orderId) =>
  baseService.get(`/admin/orders/details/${orderId}`);

export const updateOrderStatus = (orderId, orderStatus) =>
  baseService.put(`/admin/orders/update/${orderId}`, {
    orderStatus: orderStatus,
  });
