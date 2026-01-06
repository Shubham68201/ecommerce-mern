import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  productsCount: 0,
  resultPerPage: 8,
  filteredProductsCount: 0,
};

// Get all products
export const getProducts = createAsyncThunk(
  'product/getAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { keyword = '', page = 1, category = '', price = [0, 25000] } = params;
      
      let url = `/products?page=${page}&keyword=${keyword}`;
      
      if (category) {
        url += `&category=${category}`;
      }
      
      url += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      
      const { data } = await API.get(url);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get product details
export const getProductDetails = createAsyncThunk(
  'product/getDetails',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/product/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get top products
export const getTopProducts = createAsyncThunk(
  'product/getTop',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get('/products/top');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get featured products
export const getFeaturedProducts = createAsyncThunk(
  'product/getFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get('/products/featured');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create review
export const createReview = createAsyncThunk(
  'product/createReview',
  async (reviewData, { rejectWithValue }) => {
    try {
      const { data } = await API.put('/review', reviewData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Admin: Get all products
export const getAdminProducts = createAsyncThunk(
  'product/getAdminProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get('/admin/products');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Admin: Create product
export const createProduct = createAsyncThunk(
  'product/create',
  async (productData, { rejectWithValue }) => {
    try {
      const { data } = await API.post('/admin/product/new', productData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Admin: Update product
export const updateProduct = createAsyncThunk(
  'product/update',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/admin/product/${id}`, productData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Admin: Delete product
export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/admin/product/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
        state.resultPerPage = action.payload.resultsPerPage;
        state.filteredProductsCount = action.payload.filteredProductsCount;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get product details
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Admin get products
      .addCase(getAdminProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(getAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearProduct } = productSlice.actions;
export default productSlice.reducer;