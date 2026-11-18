import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ApiError, Product, ProductResponse } from "./types/Product";
import { getProducts } from "./services/ProductService";
import type { RootState } from "../../app/store";

export const fetchProducts = createAsyncThunk<
  ProductResponse,
  { page: number; limit: number },
  { rejectValue: ApiError; state: RootState }
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
  },
  {
    condition: ({ page }, { getState }) => {
      const state = getState();

      if (state.products.currentPage === page) {
        return false;
      }

      return true;
    },
  }
);

interface ProductState {
  items: Product[];
  total: number;
  loading: boolean;
  error: ApiError | null;
  currentRequestId: string | null;
  currentPage: number | null
}

const initialState: ProductState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  currentRequestId: null,
  currentPage: null
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentRequestId = action.meta.requestId
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return
        }
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.currentRequestId = null;
        state.currentPage = action.meta.arg.page
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }

        state.loading = false;
        state.currentRequestId = null;

        if (action.meta.aborted) {
          return;
        }

        state.error = action.payload ?? {
          message: action.error.message ?? "Something went wrong",
          status: 500,
        };
      })
  },
});

export default productSlice.reducer;