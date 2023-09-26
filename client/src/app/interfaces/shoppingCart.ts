import { ShoppingItem } from "./shoppingItem";

export interface ShoppingCart {
    id: number;
    buyerId: string;
    items: ShoppingItem[];
  }
  
 