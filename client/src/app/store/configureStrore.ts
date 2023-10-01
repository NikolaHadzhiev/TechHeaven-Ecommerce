import { configureStore } from "@reduxjs/toolkit";
import { shoppingCartSlice } from "./slices/shoppingCartSlice";

export const store = configureStore({
    reducer: {
        shoppingCart: shoppingCartSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;