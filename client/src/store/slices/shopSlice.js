import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as shopService from "../../services/shopService";
import { AxiosError } from "axios";
import { Notification } from "@/components/ui/Notification";
const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
  cartItems: [],
  addressList: [],
  approvalURL: null,
  orderId: null,
  orderList: [],
  orderDetails: null,
  searchResults: [],
  reviews: [],
  features: [],
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
    resetOrderId: (state) => {
      state.orderId = null;
    },
    resetCart: (state) => {
      state.cartItems = [];
    },
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
    resetProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllShoppingProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllShoppingProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getAllShoppingProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(getProductDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(getProductDetail.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      })
      .addCase(addProductToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addProductToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = [...state.addressList, action.payload.data];
      })
      .addCase(addAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(getAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        let tempArray = state.addressList?.filter(
          (e) => e._id !== action.payload.data._id
        );
        state.addressList = [...tempArray, action.payload.data];
      })
      .addCase(updateAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
        state.approvalURL = action.payload.approvalURL;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderId = null;
        state.approvalURL = null;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(getAllOrdersByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUser.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })

      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(getSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      })
      .addCase(getProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getProductReview.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      })

      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.features = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.features = [];
      })
      .addDefaultCase((state) => state);
  },
});

export const getAllShoppingProducts = createAsyncThunk(
  "shop/getAllShoppingProducts",
  async ({ queryParams }) => {
    try {
      const { data } = await shopService.getAllShoppingProducts(queryParams);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);
export const getProductDetail = createAsyncThunk(
  "shop/getProductDetail",
  async ({ productId }) => {
    try {
      const { data } = await shopService.getProductDetails(productId);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "shop/addProductToCart",
  async ({ productId, userId, quantity }) => {
    try {
      const { data } = await shopService.addToCart({
        productId,
        quantity,
        userId,
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

export const getCartItems = createAsyncThunk(
  "shop/getCartItems",
  async ({ userId }) => {
    try {
      const { data } = await shopService.getCartItems(userId);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);
export const updateCartItem = createAsyncThunk(
  "shop/updateCartItem",
  async ({ productId, userId, quantity }) => {
    try {
      const { data } = await shopService.updateCartItem({
        productId,
        userId,
        quantity,
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "shop/deleteCartItem",
  async ({ productId, userId }) => {
    try {
      const { data } = await shopService.deleteCartItem(productId, userId);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

export const addAddress = createAsyncThunk(
  "shop/addAddress",
  async ({ values, userId }) => {
    try {
      const { data } = await shopService.addAddress({ ...values, userId });
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

export const getAllAddresses = createAsyncThunk(
  "shop/getAllAddresses",
  async ({ userId }) => {
    try {
      const { data } = await shopService.getAllAddresses(userId);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "shop/deleteAddress",
  async ({ userId, addressId }) => {
    try {
      const { data } = await shopService.deleteAddress(userId, addressId);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

export const updateAddress = createAsyncThunk(
  "shop/updateAddress",
  async ({ userId, addressId, values }) => {
    try {
      const { data } = await shopService.updateAddress(
        userId,
        addressId,
        values
      );
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

export const createOrder = createAsyncThunk(
  "shop/createOrder",
  async ({ values }) => {
    try {
      const { data } = await shopService.createOrder(values);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

export const capturePayment = createAsyncThunk(
  "shop/capturePayment",
  async (values) => {
    try {
      const { data } = await shopService.capturePayment(values);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);
export const getAllOrdersByUser = createAsyncThunk(
  "shop/getAllOrdersByUser",
  async ({ userId }) => {
    try {
      const { data } = await shopService.getAllOrdersByUser(userId);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);
export const getOrderDetails = createAsyncThunk(
  "shop/getOrderDetails",
  async ({ orderId }) => {
    try {
      const { data } = await shopService.getOrderDetails(orderId);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

export const getSearchResults = createAsyncThunk(
  "shop/getSearchResults",
  async (search) => {
    try {
      const { data } = await shopService.getSearchResults(search);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

export const addReview = createAsyncThunk(
  "shop/addReview",
  async ({ values }) => {
    try {
      const { data } = await shopService.addReview(values);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

export const getProductReview = createAsyncThunk(
  "shop/getProductReview",
  async (productId) => {
    try {
      const { data } = await shopService.getProductReview(productId);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

export const addFeatureImage = createAsyncThunk(
  "shop/addFeatureImage",
  async (image) => {
    try {
      const { data } = await shopService.addFeatureImage(image);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

export const getFeatureImages = createAsyncThunk(
  "shop/getFeatureImages",
  async () => {
    try {
      const { data } = await shopService.getFeatureImages();
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

export const {
  resetOrderDetails,
  resetOrderId,
  resetCart,
  resetSearchResults,
  resetProductDetails,
} = shopSlice.actions;
export default shopSlice.reducer;
