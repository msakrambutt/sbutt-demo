import { eq } from "drizzle-orm";
import { filterProductName } from "../datafetching";
import { db, table } from "@/app/drizzle/schema";
import User_id from "./cookies";
import { product } from "@/sanity/product";

const Drizzelefetch = async () => {
 console.log("Drizzelefetch");
  try {
      const usr_id = await User_id();
      console.log(`usr_id${usr_id}`);
      const response = await fetch(`http://localhost:3000/api/cartselect?user_id=${usr_id}`, {
        method: "GET",
        headers:{
          'Content-Type':'application/json'
        }
      });
      const query = await response.json();
      
        console.log(query);
      console.log(response );
      return query;
    //   const query = await db
    //   .select()
    //   .from(table)
    //   .where(eq(table.user_id,'791c10e4-dddd-46d5-8bd2-cd215ce23dea'));
    //   console.log(query);
    //   return JSON.stringify(query);
    // };
    // const query = await fun();
    // console.log(query);
    // return query;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export default Drizzelefetch;
