import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Proteger rotas /admin
  if (pathname.startsWith("/admin")) {
    const user = request.cookies.get("user")?.value;

    if (!user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    try {
      const userData = JSON.parse(user);

      // Verificar se o cargo é 'admin'
      if (userData.role !== "admin") {
        // Se está logado mas não é admin, redireciona para a homepage
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
