import { ShoppingCart } from "./shoppingCart";

export interface User {
    email: string;
    token: string;
    shoppingCart?: ShoppingCart;
    roles?: string[];
}