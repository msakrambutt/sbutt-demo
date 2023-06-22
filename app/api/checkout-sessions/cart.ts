// import Stripe from "stripe";
// import { client } from "../../../lib/sanity/client";
// import { merchQuery } from "../../../lib/sanity/merchQuery";
// import { NextRequest, NextResponse } from "next/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KE);

// export default async function handler(req: NextRequest, res: NextResponse) {
//   if (req.method === "POST") {
//     try {
//       // Validate the cart details that were sent from the client.

//       const cartItems = req.body;

//       //Sanity client performs merchQuery

//       let sanityData = await client.fetch(merchQuery);

//       // The POST request is then validated against the data from Sanity.

//       const line_items = validateCartItems(sanityData, cartItems);

//       // Create Checkout Sessions from body params.

//       const params = {
//         submit_type: "pay",

//         mode: "payment",

//         payment_method_types: ["card"],

//         billing_address_collection: "auto",

//         //The validated cart items are inserted.

//         line_items,

//         success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,

//         cancel_url: `${req.headers.origin}`,
//       };

//       const checkoutSession = await stripe.checkout.sessions.create(params);
//     } catch (err) {
//       res.status(500).json({ statusCode: 500, message: err.message });
//     }
//   } else {
//     res.setHeader("Allow", "POST");

//     res.status(405).end("Method Not Allowed");
//   }
// }
