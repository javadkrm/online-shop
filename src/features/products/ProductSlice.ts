import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ApiError, Product, ProductResponse } from "./types/Product";
import { getProducts } from "./services/ProductService";

export const fetchProducts = createAsyncThunk<
  ProductResponse,
  { page: number; limit: number },
  { rejectValue: ApiError }
>(
  "products/fetchProducts",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      return await getProducts(page, limit);
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue({
        message: apiError.message || "Failed to fetch products",
        status: apiError.status || 500,
      });
    }
  }
);

interface ProductState {
  items: Product[];
  total: number;
  loading: boolean;
  error: ApiError | null;
}

const initialState: ProductState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? ({message : action.error.message ?? "Something Went Wrong", status: 500 })
      });
  },
});

export default productSlice.reducer;