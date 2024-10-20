import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as adminService from "../../services/adminService";
import { AxiosError } from "axios";
import { Notification } from "@/components/ui/Notification";
const initialState = {
  isLoading: false,
  productList: [],
  orderList: [],
  orderDetails: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = [...state.productList, action.payload.data];
      })
      .addCase(addProduct.rejected, (state) => {
        state.isLoading = false;
        // state.productList = [];
      })
      .addCase(uploadProductImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadProductImage.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(uploadProductImage.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(getAllOrdersOfAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersOfAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersOfAllUsers.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })

      .addDefaultCase((state) => state);
  },
});

export const addProduct = createAsyncThunk(
  "admin/addProduct",
  async ({ values }) => {
    try {
      const { data } = await adminService.addProduct(values);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);
export const uploadProductImage = createAsyncThunk(
  "admin/uploadProductImage",
  async ({ values }) => {
    try {
      const { data } = await adminService.uploadImage(values);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

export const editProduct = createAsyncThunk(
  "admin/editProduct",
  async ({ values, productId }) => {
    try {
      const { data } = await adminService.editProduct(values, productId);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async ({ productId }) => {
    try {
      const { data } = await adminService.deleteProduct(productId);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);
export const getAllProducts = createAsyncThunk(
  "admin/getAllProducts",
  async () => {
    try {
      const { data } = await adminService.getAllProducts();
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

export const getAllOrdersOfAllUsers = createAsyncThunk(
  "admin/getAllOrdersOfAllUsers",
  async () => {
    try {
      const { data } = await adminService.getAllOrdersOfAllUsers();
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "admin/getOrderDetailsForAdmin",
  async ({ orderId }) => {
    try {
      const { data } = await adminService.getOrderDetailsForAdmin(orderId);
      return data;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        Notification({ message: e.response.data.message });
        return Promise.reject();
      }
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ orderId, orderStatus }) => {
    try {
      const { data } = await adminService.updateOrderStatus(
        orderId,
        orderStatus
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
export const { resetOrderDetails } = adminSlice.actions;

export default adminSlice.reducer;
