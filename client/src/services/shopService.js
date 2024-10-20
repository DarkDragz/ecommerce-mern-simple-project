import baseService from "./baseService";

export const getAllShoppingProducts = (queryParams) =>
  baseService.get(`/shop/products/get?${queryParams}`);
export const getProductDetails = (productId) =>
  baseService.get(`/shop/products/get/${productId}`);
export const addToCart = (values) => baseService.post(`/shop/cart/add`, values);
export const getCartItems = (userId) =>
  baseService.get(`/shop/cart/get/${userId}`);
export const updateCartItem = (values) =>
  baseService.put(`/shop/cart/update-cart`, values);
export const deleteCartItem = (productId, userId) =>
  baseService.delete(`/shop/cart/${userId}/${productId}`);

export const addAddress = (values) =>
  baseService.post(`/shop/address/add`, values);

export const getAllAddresses = (userId) =>
  baseService.get(`/shop/address/get/${userId}`);

export const deleteAddress = (userId, addressId) =>
  baseService.delete(`/shop/address/delete/${userId}/${addressId}`);
export const updateAddress = (userId, addressId, values) =>
  baseService.put(`/shop/address/update/${userId}/${addressId}`, values);

export const createOrder = (values) =>
  baseService.post(`/shop/order/create`, values);
export const capturePayment = (values) =>
  baseService.post(`/shop/order/capture`, {
    paymentId: values.paymentId,
    payerId: values.paymentId,
    orderId: values.orderId,
  });

export const getAllOrdersByUser = (userId) =>
  baseService.get(`/shop/order/list/${userId}`);

export const getOrderDetails = (orderId) =>
  baseService.get(`/shop/order/details/${orderId}`);

export const getSearchResults = (search) =>
  baseService.get(`/shop/search/${search}`);

export const addReview = (values) =>
  baseService.post(`/shop/review/add`, values);

export const getProductReview = (productId) =>
  baseService.get(`/shop/review/${productId}`);

export const addFeatureImage = (image) =>
  baseService.post(`/common/feature/add`, { image: image });

export const getFeatureImages = () => baseService.get(`/common/feature/get`);
