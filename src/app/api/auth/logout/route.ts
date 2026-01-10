import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Set-Cookie": "user=; path=/; max-age=0;",
      },
    }
  );
}
