import { useContext } from "react";
import { StoreContext } from "../app/context/StoreContext";

export const useStoreContext = () => {
    const context = useContext(StoreContext);

    if(context === undefined){
        throw Error('Context not used inside of provider') 
    }

    return context;
}