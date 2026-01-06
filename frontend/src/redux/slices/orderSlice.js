import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
  orderCreated: false,
};

// Create order
export const createOrder = createAsyncThunk(
  'order/create',
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await API.post('/order/new', orderData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get my orders
export const getMyOrders = createAsyncThunk(
  'order/getMyOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get('/orders/me');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get order details
export const getOrderDetails = createAsyncThunk(
  'order/getDetails',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/order/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Admin: Get all orders
export const getAllOrders = createAsyncThunk(
  'order/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get('/admin/orders');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Admin: Update order
export const updateOrder = createAsyncThunk(
  'order/update',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/admin/order/${id}`, { status });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Admin: Delete order
export const deleteOrder = createAsyncThunk(
  'order/delete',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/admin/order/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetOrderCreated: (state) => {
      state.orderCreated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.orderCreated = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        state.orderCreated = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get my orders
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get order details
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get all orders (admin)
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetOrderCreated } = orderSlice.actions;
export default orderSlice.reducer;