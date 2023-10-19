import { configureStore } from "@reduxjs/toolkit";
import { shoppingCartSlice } from "./slices/shoppingCartSlice";
import { catalogSlice } from "./slices/catalogSlice";
import { accountSlice } from "./slices/accountSlice";

export const store = configureStore({
    reducer: {
        shoppingCart: shoppingCartSlice.reducer,
        catalog: catalogSlice.reducer,
        account: accountSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;