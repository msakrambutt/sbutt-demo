
import {db} from '@vercel/postgres'
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { NextResponse,NextRequest } from "next/server";

export const POST = async (req: Request) => {
  const conn = await db.connect();
  try {
    if (process.env.SECRET_KEY) {
      const body = await req.json();
      if (body.clientEmail && body.clientName) {
        const emailChk = await conn.sql`SELECT email FROM users
          WHERE email = ${body.clientEmail}`;
          console.log(body);
          console.log(emailChk.rowCount);

        if (emailChk.rowCount>0) {
          console.log(emailChk.rowCount);

          return new NextResponse(
            JSON.stringify({ message: "Email already in use.", status: 400 })
          );
        }
        const resp = await conn.sql`INSERT INTO users (id, name, email, password, user_role)
                VALUES (${uuidv4()}, ${body.clientName} ,${body.clientEmail},${body.clientPwd},${body.client_role})
                RETURNING *`;
                console.log(resp);
        const data = {
          user: {
            id: resp.rows[0].id,
          },
        };
        const token = jwt.sign(data, process.env.SECRET_KEY);
        return new NextResponse(JSON.stringify({ authToken: token}));
      }
    } else {
      return new NextResponse(
        JSON.stringify({ message: "clientName or clientEmail is missing." })
      );
    }
  } catch (error) {
    console.log("🚀 ~ file: route.ts:16 ~ POST ~ error:", error);
    return new NextResponse(
      JSON.stringify({ status: 500, message: "Internal Server Error." })
    );
  }
};


