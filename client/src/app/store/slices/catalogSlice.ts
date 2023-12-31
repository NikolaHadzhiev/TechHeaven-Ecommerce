import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import apiRequests from "../../api/requests";
import { Product } from "../../interfaces/product";
import { RootState } from "../configureStrore";
import { ProductParams } from "../../interfaces/productParams";
import { Pagination } from "../../interfaces/pagination";

interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    loadingStatus: string;
    brands: string[];
    types: string[];
    productParams: ProductParams;
    pagination: Pagination | null;
}

const productsAdapter = createEntityAdapter<Product>();

function getProductParams(productParams: ProductParams){
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.currentPageNumber.toString());
    params.append('pagesize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy);
    if(productParams.search) params.append('search', productParams.search);
    if(productParams.brands?.length > 0) params.append('brands', productParams.brands.toString());
    if(productParams.types?.length > 0) params.append('types', productParams.types.toString());

    return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, {state: RootState}>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        const params = getProductParams(thunkAPI.getState().catalog.productParams);
        try {
            const response = await apiRequests.Catalog.list(params);
            thunkAPI.dispatch(setPagination(response.pagination))
            return response.items;
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

export const fetchFiltersAsync = createAsyncThunk(
    'catalog/fetchFiltersAsync',
    async (_, thunkAPI) => {
        try{
            return apiRequests.Catalog.filters();
        } catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

function initProductParams(){
    return {
        currentPageNumber: 1,
        pageSize: 9,
        orderBy: 'name',
        brands: [],
        types: []
    }
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        loadingStatus: 'idle',
        filtersLoaded: false,
        brands: [],
        types: [],
        productParams: initProductParams(),
        pagination: null
    }),

    reducers: {
        setProductParams: (state, action) => {
            const {resetPageNumber, ...payload} = action.payload;
            
            if(resetPageNumber === false) state.productParams = {...state.productParams, ...payload}
            else state.productParams = {...state.productParams, ...action.payload, currentPageNumber: 1};
            
            state.productsLoaded = false;
        },
        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload}
        },
        resetProductParams: (state, action) => {
            state.productParams = initProductParams()
        },
        setPagination: (state, action) => {
            state.pagination = action.payload;
        },
        setProduct: (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.productsLoaded = false;
        },
        removeProduct: (state, action) => {
            productsAdapter.removeOne(state, action.payload);
            state.productsLoaded = false;
        }
    },

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

        //fetchFiltersAsync
        builder.addCase(fetchFiltersAsync.pending, (state, action) => {
            state.loadingStatus = 'pendingFetchFilters'
        });
        builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.filtersLoaded = true;
            state.loadingStatus = 'idle';
        });
        builder.addCase(fetchFiltersAsync.rejected, (state, action) => {
            state.loadingStatus = 'idle';
        });
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);
export const {setProductParams, resetProductParams, setPagination, setPageNumber, setProduct, removeProduct} = catalogSlice.actions;