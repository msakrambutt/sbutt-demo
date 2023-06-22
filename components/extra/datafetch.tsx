import { cookies } from "next/dist/client/components/headers";
import { eq } from "drizzle-orm";
import { filterProductName } from "../../app/datafetching";
import { db, table } from "@/app/drizzle/schema";

interface queryObj {
  product_id: string | null;
  quantity?: number | null;
}

export const drizzelefetch = async () => {
  const user_id = cookies().get("user_id")?.value as string;
  try {
    const query = await db
      .select()
      .from(table)
      .where(eq(table.user_id, `${user_id}`));
    return query;
  } catch (error) {
    console.log("Nothing is in DB");
    return [];
  }
};

export const vercelfetch = async () => {
  const query = await drizzelefetch();
  console.log("/------------------------");
  console.log(query);
  let product_id;
  let quantity;
  let queryobj: queryObj = {
    product_id,
    quantity,
  };

  console.log("------------------------");
  try {
    if (Object.keys(query).length > 0) {
      const data: queryObj[] = query.map((query: any) => {
        queryobj.product_id = query.product_id;
        queryobj.quantity = query.quantity;
        return { product_id: queryobj.product_id, quantity: queryobj.quantity };
      });

      console.log(data);
      const summedQuantities: { product_id: string; quantity: number }[] =
        Object.values(
          data.reduce(
            (
              result: {
                [product_id: string]: { product_id: string; quantity: number };
              },
              { product_id, quantity }
            ) => {
              if (result[product_id]) {
                result[product_id].quantity += quantity;
              } else {
                result[product_id] = { product_id, quantity };
              }
              return result;
            },
            {}
          )
        );
      return summedQuantities;
    } else {
      return "Nothing in cart";
    }
  } catch (error) {
    console.log(error);
  }
};

const sanityfetch = async () => {
  const data = await vercelfetch();
};
