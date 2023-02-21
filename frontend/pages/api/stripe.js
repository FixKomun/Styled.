import Stripe from "stripe";
import { getSession } from "@auth0/nextjs-auth0";
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {
  const session = getSession(req, res);
  const user = session?.user;
  const customerId = user
    ? user[`${process.env.BASE_URL}/stripe_customer_id`]
    : undefined;
  if (req.method === "POST") {
    try {
      //Create a Checkout session
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        customer: customerId,
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["DE", "HR", "US"],
        },
        allow_promotion_codes: true,
        shipping_options: [
          { shipping_rate: "shr_1MdGP6LjfLC7K5JWTgjDUCZq" },
          { shipping_rate: "shr_1MdGfILjfLC7K5JWzI5MqEDS" },
        ],
        line_items: req.body.map((item) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.title,
                images: [item.image.data.attributes.formats.medium.url],
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
            adjustable_quantity: { enabled: true, minimum: 1 },
          };
        }),
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/canceled`,
      });
      res.status(200).json(session);
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message);
    }
  }
}
