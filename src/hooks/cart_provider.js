import React, { createContext, useState } from "react";

// Create the cart Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});

    // List of products object
    const products = {
        "p-0001": {
            "name": "Fall Limited Edition Sneakers",
            "price": 250,
            "discountPercent": 50,
            "image": require("./../../images/image-product-1.jpg"),
        }
    }

    const addToCart = (itemId, quantity) => {
        setCartItems((prevState) => {
            const cartItems = { ...prevState };
            // Check if item is already in cart
            if (!cartItems[itemId]) {
                cartItems[itemId] = { "quantity": quantity };
            } else {
                cartItems[itemId].quantity += quantity;
                // cap quantity at 99
                if (cartItems[itemId].quantity > 99) {
                    cartItems[itemId].quantity = 99
                }
            }

            return cartItems;
        });
    }

    const removeFromCart = (itemId) => {
        setCartItems((prevState) => {
            const cartItems = { ...prevState };
            // Check if item is already in cart
            if (!cartItems[itemId]) {
                return;
            } else {
                delete cartItems[itemId];
            }

            return cartItems;
        });
    }

    const clearCart = () => {
        setCartItems({});
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);