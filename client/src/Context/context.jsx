import React, { createContext, useState, useContext } from "react";

export const cartContext = createContext();

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const addToCart = (product , size , quantity) => {
        console.log("Product added to cart:", product);
        const newItem = {...product , size , quantity};
        setCart([...cart, newItem]);
    }

    const removeFromCart = (itemId) => {
        setCart(cart.filter(product => product.id != itemId));
    }
    

    return (
        <cartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </cartContext.Provider>
    )
}

export default CartProvider;