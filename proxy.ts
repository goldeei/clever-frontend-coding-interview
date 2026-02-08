import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/all-photos"];

export default function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const token = request.cookies.get("auth-token")?.value;

	if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
		const signInUrl = new URL("/sign-in", request.url);
		return NextResponse.redirect(signInUrl);
	}

	if (pathname.startsWith("/sign-in") && token) {
		const allPhotosUrl = new URL("/all-photos", request.url);
		return NextResponse.redirect(allPhotosUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public files (public folder)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
	],
};
