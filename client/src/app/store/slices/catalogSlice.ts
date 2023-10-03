import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import apiRequests from "../../api/requests";
import { Product } from "../../interfaces/product";
import { RootState } from "../configureStrore";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        try {
            return await apiRequests.Catalog.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await apiRequests.Catalog.details(productId)
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        loadingStatus: 'idle'
    }),

    reducers: {},

    extraReducers: (builder => {
        //fetchProductsAsync
        builder.addCase(fetchProductsAsync.pending, (state, action) => {
            state.loadingStatus = 'pendingFetchProducts'
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.loadingStatus = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            state.loadingStatus = 'idle';
        });

        //fetchProductAsync
        builder.addCase(fetchProductAsync.pending, (state, action) => {
            state.loadingStatus = 'pendingFetchProduct'
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload)
            state.loadingStatus = 'idle';
        });
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            state.loadingStatus = 'idle';
        });
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);