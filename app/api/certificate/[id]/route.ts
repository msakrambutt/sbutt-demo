import { NextRequest, NextResponse } from "next/server";
import { users,playlist, watched_time,certificate } from "@/lib/drizzle";
import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";

//GET API
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string} }
) => {
  try {
    const id= params.id;
    //fetch user certifiates against request certificate id
    const certificates = await db
      .select()
      .from(certificate)
      .where(eq(certificate._id,parseInt(id as string)));

    if (certificates.length === 0) {
      let error_response = {
        status: "fail",
        message: "Requested ID  not exist, please provide correct  Id!",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    let json_response = {
      status: "success",
      message: "Requested certificates records fetched Successfully",
      data: {
        certificates,
      },
    };

    return new NextResponse(JSON.stringify(json_response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    let error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

//DELET API
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    if (!id) {
      const error_response = {
        status: "fail",
        message: "Please provide the ID.",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    // Delete the certificate record
    const certificates=await db
      .delete(certificate)
      .where(eq(certificate._id, parseInt(id as string)));

      if (certificates.rowCount === 0) {
        const error_response = {
          status: "failed",
          message: "Certificate Record with Provided ID does not Exist!",
        };
        return new NextResponse(JSON.stringify(error_response), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }


    const json_response = {
      status: "success",
      message: "Requested Certificate record deleted successfully",
    };

    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    const error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};