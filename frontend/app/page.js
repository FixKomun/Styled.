"use client";
import { useQuery } from "urql";
import { PRODUCT_QUERY } from "@/lib/query";

//Components
import Product from "../components/Product";
//Styles
import { Gallery } from "@/styles/Gallery";
export default function Home() {
  //Fetch oroducts from strapi
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no...</p>;
  const products = data.products.data;

  return (
    <main className="layout-main">
      <Gallery>
        {products.map((product) => (
          <Product product={product} key={product.attributes.slug} />
        ))}
      </Gallery>
    </main>
  );
}
