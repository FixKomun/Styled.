import styled from "styled-components";
//Animation
import { motion } from "framer-motion";

export const CartWrapper = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
`;

export const CartStyle = styled(motion.div)`
  width: 30%;
  background: #f1f1f1;
  padding: 2rem 3rem;
  overflow-y: scroll;
  position: relative;
`;

export const CartCard = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  overflow: hidden;
  background: white;
  height: 8rem;
  margin-bottom: 1rem;
  img {
    width: 8rem;
    height: 100%;
    object-fit: cover;
  }
`;

export const CartInfo = styled(motion.div)`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const EmptyCard = styled(motion.div)`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 80%;
  h1 {
    font-size: 1.3rem;
    padding: 2rem 0rem;
  }
  svg {
    font-size: 5rem;
    color: var(--secondary);
  }
`;

export const Quantity = styled(motion.div)`
  padding: 0.5rem 0rem;
  div {
    display: flex;
    gap: 0.5rem;
    padding-top: 0.5rem;
  }
  button {
    background: transparent;
    border: none;
    display: flex;
    font-size: 1.5rem;
  }
  p {
    width: 1rem;
    text-align: center;
  }
  span {
    color: var(--secondary);
  }
  svg {
    color: #494949;
  }
`;

export const Checkout = styled(motion.div)`
  button {
    background: var(--primary);
    padding: 1rem 2rem;
    width: 100%;
    color: white;
    margin-top: 2rem;
    cursor: pointer;
    border: none;
  }
`;

//This is for staggering each card
export const Cards = styled(motion.div)`
`