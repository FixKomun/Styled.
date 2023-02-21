import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import Cart from "./Cart";
import User from "./User";
//Style
import { NavStyle, NavItems } from "@/styles/NavStyle";
import { AnimatePresence, motion } from "framer-motion";
//Context
import ShopContext from "@/lib/context";
import { useContext } from "react";
//Auth0
import { useUser } from "@auth0/nextjs-auth0/client";
export default function Nav() {
  const { showCart, setShowCart, totalQuantity } = useContext(ShopContext);
  const { user, error, isLoading } = useUser();
  return (
    <NavStyle>
      <Link href={"/"}>Styled.</Link>
      <NavItems>
        <User />
        <div onClick={() => setShowCart(true)}>
          {totalQuantity > 0 && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
              {totalQuantity}
            </motion.span>
          )}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavStyle>
  );
}
