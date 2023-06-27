import { filterProductName } from "../datafetching";
import Drizzelefetch from "./drizilefetch";
interface Product {
  _id: string;
  name: string;
  price: number;
  type: string;
  quantity: number;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}
const log = (message: any) => {
  console.log(message);
};

interface queryObj {
  product_id: string | null;
  quantity?: number | null;
}

export const Datafetch = async () => {
  const query = await Drizzelefetch();
  console.log(`query response${query}`);

  let product_id:string='';
  let quantity;
  let queryobj: queryObj = {
    product_id,
    quantity,
  };

  try {
    if (Object.keys(query).length > 0) {
      const data: queryObj[] = query.map((query: any) => {
        queryobj.product_id = query.product_id;
        queryobj.quantity = query.quantity;
        return { product_id: queryobj.product_id, quantity: queryobj.quantity };
      });

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

      try {
        const updatedData: Product[] = await Promise.all(
          summedQuantities.map(async (item) => {
            const fetchdata = await filterProductName(item.product_id);
            return {
              _id: item.product_id,
              name: fetchdata.name,
              price: fetchdata.price,
              type: fetchdata.type,
              quantity: item.quantity,
              image: fetchdata.image,
            };
          })
        );

        return updatedData;
      } catch (error) {
        console.log("There is no data regarding this product in sanity");
      }
    } else {
      console.log("Nothing in cart");
      return [];
    }
  } catch (error) {
    log(error);
  }
};
