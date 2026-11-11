import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Product[]>(
        "https://fakestoreapi.com/products"
      );

      return response.data;
    } catch {
      return thunkAPI.rejectWithValue(
        "دریافت محصولات با خطا مواجه شد"
      );
    }
  }
);