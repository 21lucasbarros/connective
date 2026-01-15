import { db } from "@/lib/db";
import type { User } from "@/lib/types";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await (context.params as Promise<{ id: string }>);
    const id = Number(params.id);
    const user = await db
      .selectFrom("user")
      .where("id", "=", id)
      .selectAll()
      .executeTakeFirst();
    if (!user)
      return Response.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    return Response.json({
      id: Number(user.id),
      name: user.name,
      email: user.email,
      phone: user.phone ?? null,
      cpf: user.cpf ?? null,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await (context.params as Promise<{ id: string }>);
    const id = Number(params.id);
    const body = await request.json();

    const allowed: Partial<Pick<User, "email" | "phone" | "name">> = {};
    if (typeof body.email === "string") allowed.email = body.email;
    if (typeof body.phone === "string") allowed.phone = body.phone;
    if (typeof body.name === "string") allowed.name = body.name;

    if (Object.keys(allowed).length === 0) {
      return Response.json({ error: "Nada para atualizar" }, { status: 400 });
    }

    await db.updateTable("user").set(allowed).where("id", "=", id).execute();
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
