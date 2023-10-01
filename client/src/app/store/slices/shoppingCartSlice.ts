import { createSlice } from "@reduxjs/toolkit";
import { ShoppingCart } from "../../interfaces/shoppingCart";

interface ShoppingCartState {
    shoppingCart: ShoppingCart | null
}

const initialState: ShoppingCartState = {
    shoppingCart: null
}

export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        setShoppingCart: (state, action) => {
            state.shoppingCart = action.payload
        },
        updateOrRemoveItemFromShoppingCart: (state, action) => {
            if (!state.shoppingCart) return;

            const {productId, quantity, indicator} = action.payload
            const itemIndex = state.shoppingCart.items.findIndex(i => i.productId === productId);
            
            if(itemIndex === -1 || itemIndex === undefined) return;
            
            indicator === 'add' ? state.shoppingCart.items[itemIndex].quantity += quantity : state.shoppingCart.items[itemIndex].quantity -= quantity;

            if(state.shoppingCart.items[itemIndex].quantity <= 0) state.shoppingCart.items.splice(itemIndex, 1)
        },
    }
})

export const {setShoppingCart, updateOrRemoveItemFromShoppingCart} = shoppingCartSlice.actions;