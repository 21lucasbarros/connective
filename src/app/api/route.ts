import {db}from "./../../database"

export async function GET() {
  let calma = await db.selectFrom("user").selectAll().execute()
  return Response.json (calma);
}
