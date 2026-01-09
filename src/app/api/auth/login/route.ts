import { db } from "@/lib/db";
import { compare } from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Encontrar usuário
    const user = await db
      .selectFrom("user")
      .where("email", "=", email)
      .selectAll()
      .executeTakeFirst();

    if (!user) {
      return Response.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    // Comparar senhas
    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return Response.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    return Response.json({
      user: {
        id: Number(user.id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
