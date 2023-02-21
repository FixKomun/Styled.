"use client";

import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "@/lib/query";
import { useEffect } from "react";
//Styled
import {
  ProductDetailStyled,
  ProductInfo,
  Buy,
  Quantity,
} from "@/styles/ProductDetails";
//Icons
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
//Context
import ShopContext from "@/lib/context";
import { useContext } from "react";
//Toast
import toast from "react-hot-toast";
export default function ProductDetail({ params }) {
  //Reset quanitity
  useEffect(() => {
    setQty(0);
  }, []);

  const { qty, increaseQty, decreaseQty, onAdd, setQty } =
    useContext(ShopContext);
  //FETCH GRAPHQL DATA
  const { slug } = params;
  const [results] = useQuery({ query: GET_PRODUCT_QUERY, variables: { slug } });
  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no...</p>;
  const { title, description, image } = data.products.data[0].attributes;

  //Create a toast
  const notify = () => {
    toast.success(`${title} added to your cart`, {
      duration: 1500,
      icon: "🛒",
    });
  };
  return (
    <ProductDetailStyled className="layout-main">
      <img src={image.data.attributes.formats.medium.url} alt={title} />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>
        <Quantity>
          <span>Quantity</span>
          <button>
            <AiFillMinusCircle onClick={decreaseQty} />
          </button>
          <p>{qty}</p>
          <button>
            <AiFillPlusCircle onClick={increaseQty} />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            onAdd(data.products.data[0].attributes, qty);
            notify();
          }}
        >
          Add to cart
        </Buy>
      </ProductInfo>
    </ProductDetailStyled>
  );
}
