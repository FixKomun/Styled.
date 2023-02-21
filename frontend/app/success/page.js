/*THIS DOESNT WORK WITH APP DIRECTORY NEXT JS 13 ->getServerSideProps is not supported anymore...  */
/*
const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export async function getServerSideProps(params) {
  console.log(params.query);
  const session = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ["line_items"],
    }
  );
  return { props: { session } };
}
*/
"use client";
import { useRouter } from "next/navigation";
//Style
import { Checkout } from "@/styles/CartStyle";
export default function Success({ session }) {
  const router = useRouter();
  return (
    <div>
      <div>
        <h1>Thank you for your order.</h1>
        <Checkout>
          <button onClick={() => router.push("/")}>Continue shopping</button>
        </Checkout>
      </div>
    </div>
  );
}
