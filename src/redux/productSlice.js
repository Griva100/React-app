import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
    "https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=10&inc=category%252Cprice%252Cthumbnail%252Cimages%252Ctitle%252Cid&query=mens-watches";

// Fetch products from API
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await axios.get(API_URL);
    console.log("Response", response);
    return response.data.data.data;
});

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        status: "idle",
        error: null
    },
    reducers: {
        updateProduct: (state, action) => {
            const updatedProduct = action.payload;
            const index = state.items.findIndex(product => product.id === updatedProduct.id);
            if (index !== -1) {
                state.items[index] = updatedProduct;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.error("API Fetch Error:", action.error.message);
            });
    }
});

export const { updateProduct } = productSlice.actions;
export default productSlice.reducer;
