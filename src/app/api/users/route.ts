import { db } from "@/lib/db";

export async function GET() {
  try {
    const users = await db.selectFrom("user").selectAll().execute();
    return Response.json(users);
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
