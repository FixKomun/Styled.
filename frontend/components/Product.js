import { ProductStyle } from "@/styles/ProductStyle";
import Link from "next/link";
export default function Product({ product }) {
  const { title, price, image, description, slug } = product.attributes;
  return (
    <ProductStyle>
      <Link href={`/product/${slug}`}>
        <div>
          <img src={image.data.attributes.formats.medium.url} alt="" />
        </div>
      </Link>
      <h2>{title}</h2>
      <p>{description}</p>
      <h3>{price}$</h3>
    </ProductStyle>
  );
}
