import { db } from "@/lib/db";

export async function GET() {
  try {
    const users = await db.selectFrom("user").selectAll().execute();
    return Response.json(
      users.map((u) => ({
        id: Number(u.id),
        name: u.name,
        email: u.email,
        password: u.password,
        role: u.role,
        created_at: u.created_at,
        updated_at: u.updated_at,
      }))
    );
  } catch (error) {
    let errorMessage = "Erro desconhecido";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await db.deleteFrom("user").where("id", "=", Number(id)).execute();
    return new Response(null, { status: 204 });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, role } = await request.json();
    await db
      .updateTable("user")
      .set({ role })
      .where("id", "=", Number(id))
      .execute();
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
