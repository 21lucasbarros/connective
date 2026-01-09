import { db } from "@/lib/db";
import { hash } from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Verificar se usuário já existe
    const existing = await db
      .selectFrom("user")
      .where("email", "=", email)
      .selectAll()
      .executeTakeFirst();

    if (existing) {
      return Response.json({ error: "Email já registrado" }, { status: 400 });
    }

    // Hash da senha
    const hashedPassword = await hash(password, 10);

    // Criar usuário
    const user = await db
      .insertInto("user")
      .values({
        name,
        email,
        password: hashedPassword,
        role: "user",
      })
      .returning(["id", "name", "email"])
      .executeTakeFirst();

    return Response.json(
      { user, message: "Usuário registrado com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
