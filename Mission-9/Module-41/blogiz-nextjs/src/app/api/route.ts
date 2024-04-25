import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    message: "GET",
  });
};

export const POST = async (request: Request) => {
  return NextResponse.json({
    message: "POST",
  });
};

export const DELETE = async () => {
  return NextResponse.json({
    message: "DELETE",
  });
};

export const PUT = async () => {
  return NextResponse.json({
    message: "PUT",
  });
};

export const PATCH = async () => {
  return NextResponse.json({
    message: "PATCH",
  });
};
