import { db } from "@/lib/db";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  await db
    .insertInto("services")
    .values({ name, price, description })
    .execute();

  const result = await db
    .selectFrom("services")
    .selectAll()
    .where("name", "=", name)
    .executeTakeFirst();

  return Response.json({
    service: result
      ? {
          id: Number(result.id),
          name: result.name,
          price: result.price,
          description: result.description,
        }
      : null,
  });
}

export async function GET() {
  const services = await db.selectFrom("services").selectAll().execute();
  return Response.json({
    services: services.map((s) => ({
      id: Number(s.id),
      name: s.name,
      price: s.price,
      description: s.description,
    })),
  });
}

export async function PUT(request: Request) {
  const formData = await request.formData();
  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;

  try {
    await db
      .updateTable("services")
      .set({ name, price, description })
      .where("id", "=", id)
      .execute();

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await db.deleteFrom("services").where("id", "=", Number(id)).execute();
    return new Response(null, { status: 204 });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
