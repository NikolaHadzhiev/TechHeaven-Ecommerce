import { PropsWithChildren, createContext, useState } from "react";
import { ShoppingCart } from "../interfaces/shoppingCart";

interface Context {
    shoppingCart: ShoppingCart | null;
    setShoppingCart: (shoppingCart: ShoppingCart) => void;
    updateItemQuantity: (productId: number, quantity: number) => void;
    removeItemFromShoppingCart: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<Context | undefined>(undefined);

export const StoreProvider = ({children}: PropsWithChildren<any>) => {
    const [shoppingCart, setShoppingCart] = useState<ShoppingCart | null>(null);

    function updateItemQuantity(productId: number, quantity: number){
        if(!shoppingCart) return;
        
        const items = [...shoppingCart.items]; //create a copy of state instead of mutate current state
        const itemIndex = items.findIndex(i => i.productId === productId);

        if(itemIndex >= 0){
            items[itemIndex].quantity += quantity;
            setShoppingCart(preState => {
                return {...preState!, items} //! because we are sure the state is not going to be undefined
            })
        }
    }

    function removeItemFromShoppingCart(productId: number, quantity: number){
        if(!shoppingCart) return;
        
        const items = [...shoppingCart.items]; //create a copy of state instead of mutate current state
        const itemIndex = items.findIndex(i => i.productId === productId);

        if(itemIndex >= 0){
            items[itemIndex].quantity -= quantity;
            if(items[itemIndex].quantity <= 0) items.splice(itemIndex, 1);
            setShoppingCart(preState => {
                return {...preState!, items} //! because we are sure the state is not going to be undefined
            })
        }
    }

    return (
        <StoreContext.Provider value={{shoppingCart, setShoppingCart, updateItemQuantity, removeItemFromShoppingCart}}>
            {children}
        </StoreContext.Provider>
    )
}




