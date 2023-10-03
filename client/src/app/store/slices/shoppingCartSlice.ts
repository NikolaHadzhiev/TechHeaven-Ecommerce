import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ShoppingCart } from "../../interfaces/shoppingCart";
import apiRequests from "../../api/requests";

interface ShoppingCartState {
    shoppingCart: ShoppingCart | null,
    loadingState: string;
}

const initialState: ShoppingCartState = {
    shoppingCart: null,
    loadingState: 'idle'
}

export const addItemAsync = createAsyncThunk<ShoppingCart, {productId: number, quantity?: number}>(
    'shoppingCart/addItemAsync',
    async ({productId, quantity = 1}, thunkAPI) => {
        try{
            return await apiRequests.ShoppingCart.addItem(productId, quantity);
        }catch (error: any){
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const removeItemAsync = createAsyncThunk<void, {productId: number, quantity?: number, name?: string}>(
    'shoppingCart/removeItemAsync',
    async ({productId, quantity = 1}, thunkAPI) => {
        try{
            await apiRequests.ShoppingCart.removeItem(productId, quantity);
        }catch (error: any){
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        setShoppingCart: (state, action) => {
            state.shoppingCart = action.payload
        }
    },
    extraReducers: (builder => {
        //addItemAsync
        builder.addCase(addItemAsync.pending, (state, action) => {
            state.loadingState = `pendingAddItem ${action.meta.arg.productId}`;
        })
        builder.addCase(addItemAsync.fulfilled, (state, action) => {
            state.shoppingCart = action.payload;
            state.loadingState = 'idle';
        })
        builder.addCase(addItemAsync.rejected, (state) => {
            state.loadingState = 'idle';
        })

        //removeItemAsync
        builder.addCase(removeItemAsync.pending, (state, action) => {
            state.loadingState = `pendingRemoveItem ${action.meta.arg.productId} ${action.meta.arg.name}`;
        })
        builder.addCase(removeItemAsync.fulfilled, (state, action) => {
            if (!state.shoppingCart) return;

            const {productId, quantity} = action.meta.arg
            const itemIndex = state.shoppingCart.items.findIndex(i => i.productId === productId);
            
            if(itemIndex === -1 || itemIndex === undefined) return;
            
           state.shoppingCart.items[itemIndex].quantity -= quantity!;

            if(state.shoppingCart.items[itemIndex].quantity <= 0) state.shoppingCart.items.splice(itemIndex, 1);

            state.loadingState = 'idle'
        })
        builder.addCase(removeItemAsync.rejected, (state) => {
            state.loadingState = 'idle';
        })
    })
})

export const {setShoppingCart} = shoppingCartSlice.actions;