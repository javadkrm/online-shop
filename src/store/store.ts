import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import { productApi } from "../features/products/services/productsApi";

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        [productApi.reducerPath]: productApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store