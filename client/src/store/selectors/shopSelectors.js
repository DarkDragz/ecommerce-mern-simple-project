export const shopProductsSelector = (state) => state.shopSlice.productList;
export const shopProductDetailsSelector = (state) =>
  state.shopSlice.productDetails;
export const shopCartItemsSelector = (state) => state.shopSlice.cartItems;
export const shopAddressListSelector = (state) => state.shopSlice.addressList;
export const shopApprovalURLSelector = (state) => state.shopSlice.approvalURL;
export const shopOrderIdSelector = (state) => state.shopSlice.orderId;
export const shopOrderListSelector = (state) => state.shopSlice.orderList;
export const shopOrderDetailsSelector = (state) => state.shopSlice.orderDetails;
export const shopSearchResultsSelector = (state) =>
  state.shopSlice.searchResults;
export const shopReviewsSelector = (state) => state.shopSlice.reviews;
export const featureImagesSelector = (state) => state.shopSlice.features;
