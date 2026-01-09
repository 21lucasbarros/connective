import { db } from "@/lib/db";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  const service = await db
    .insertInto("services")
    .values({ name, price, description })
    .executeTakeFirst();

  return Response.json({ service });
}

export async function GET() {
  const services = await db.selectFrom("services").selectAll().execute();
  return Response.json({ services });
}
