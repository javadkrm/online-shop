import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./prouctThunk";


type Product = {
    id: number,
    title: string,
    price: number,
    quantity: number
}

interface ProductState {
    items: Product[],
    loading: boolean,
    error: string | null
}

const initialState: ProductState = {
    items: [],
    loading: false,
    error: null
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (bulider) => {
        bulider
            .addCase(fetchProducts.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false,
                state.items = action.payload.map((product) => ({
                    ...product,
                    quantity: 0
                }))
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            
    }
})


export default productSlice.reducer