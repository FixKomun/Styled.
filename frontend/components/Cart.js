import ShopContext from "@/lib/context";
import { useContext } from "react";
//Svg
import { FaShoppingCart } from "react-icons/fa";
//Styles
import {
  CartWrapper,
  CartStyle,
  CartCard,
  CartInfo,
  EmptyCard,
  Quantity,
  Checkout,
  Cards,
} from "@/styles/CartStyle";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import getStripe from "@/lib/getStripe";
//Animations
const card = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
};

export default function Cart() {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice, showCart } =
    useContext(ShopContext);
  //Payment
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    });
    const data = await response.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <CartWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => setShowCart(false)}
    >
      <CartStyle
        initial={{ opacity: 0, x: "50%" }}
        animate={{ opacity: 1, x: "0%" }}
        exit={{ opacity: 0, x: "50%" }}
        transition={{ type: "tween", duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length < 1 && (
          <EmptyCard
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1>You have more shopping to do 😉</h1>
            <FaShoppingCart />
          </EmptyCard>
        )}
        <Cards layout variants={card} initial="hidden" animate="visible">
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              return (
                <CartCard layout key={item.slug} variants={card}>
                  <img
                    src={item.image.data.attributes.formats.medium.url}
                    alt={item.title}
                  />
                  <CartInfo>
                    <h3>{item.title}</h3>
                    <h3>{item.price}$</h3>

                    <Quantity>
                      <span>Quantity</span>
                      <div>
                        <button onClick={() => onRemove(item)}>
                          <AiFillMinusCircle />
                        </button>
                        <p>{item.quantity}</p>
                        <button onClick={() => onAdd(item, 1)}>
                          <AiFillPlusCircle />
                        </button>
                      </div>
                    </Quantity>
                  </CartInfo>
                </CartCard>
              );
            })}
        </Cards>
        {cartItems.length >= 1 && (
          <Checkout layout>
            <h3>Subtotal:{totalPrice}$</h3>
            <button onClick={handleCheckout}>Purchase</button>
          </Checkout>
        )}
      </CartStyle>
    </CartWrapper>
  );
}
