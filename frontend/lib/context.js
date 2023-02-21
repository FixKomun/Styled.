import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  //Increase quantity
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 0) return 0;
      return prevQty - 1;
    });
  };
  //Add items to cart
  const onAdd = (product, quantity) => {
    //Increase total price
    setTotalPrice((prevTotal) => prevTotal + product.price * quantity);
    //Increase total quantity
    setTotalQuantity((prevTotal) => prevTotal + quantity);
    //Check if the product is already in cart
    const exist = cartItems.find((item) => item.slug === product.slug);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };
  const onRemove = (product) => {
    //Decrease total price
    setTotalPrice((prevTotal) => prevTotal - product.price);
    //Decrease total quantity
    setTotalQuantity((prevTotal) => prevTotal - 1);
    //Check if the product is already in cart
    const exist = cartItems.find((item) => item.slug === product.slug);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.slug !== product.slug));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  };
  return (
    <ShopContext.Provider
      value={{
        qty,
        increaseQty,
        decreaseQty,
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        onAdd,
        onRemove,
        totalQuantity,
        totalPrice,
        setQty,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
