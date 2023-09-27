import { PropsWithChildren, createContext, useState } from "react";
import { ShoppingCart } from "../interfaces/shoppingCart";

interface Context {
  shoppingCart: ShoppingCart | null;
  setShoppingCart: React.Dispatch<React.SetStateAction<ShoppingCart | null>>;
  updateItemQuantity: (productId: number, quantity: number) => void;
  removeItemFromShoppingCart: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<Context | undefined>(undefined);

export const StoreProvider = ({ children }: PropsWithChildren<any>) => {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart | null>(null);

  function updateItemQuantity(productId: number, quantity: number) {
    handleAddRemove(productId, quantity, 'add')
  }

  function removeItemFromShoppingCart(productId: number, quantity: number) {
    handleAddRemove(productId, quantity, 'remove')
  }

  function handleAddRemove(productId: number, quantity: number, indicator: string) {
    if (!shoppingCart) return;

    const items = [...shoppingCart.items]; //create a copy of state instead of mutate current state
    const itemIndex = items.findIndex((i) => i.productId === productId);

    if (itemIndex >= 0) {
        indicator === 'add' ? items[itemIndex].quantity += quantity : items[itemIndex].quantity -= quantity;
        if (items[itemIndex].quantity <= 0) items.splice(itemIndex, 1);
        setShoppingCart((preState) => {
          return { ...preState!, items }; //! because we are sure the state is not going to be undefined
        });
      }
  }

  return (
    <StoreContext.Provider
      value={{
        shoppingCart,
        setShoppingCart,
        updateItemQuantity,
        removeItemFromShoppingCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
