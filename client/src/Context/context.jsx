import React , { createContext, useState , useContext } from "react";

export const cartContext = createContext();

const CartProvider = ({children}) =>{

    const [cart , setCart] = useState([]);

    const addToCart = (product)=>{
        console.log("Product added to cart:", product);
        setCart([...cart , product]);
    }

    return(
        <cartContext.Provider value={{cart , addToCart}}>
            {children}
        </cartContext.Provider>
    )
}

export default CartProvider;