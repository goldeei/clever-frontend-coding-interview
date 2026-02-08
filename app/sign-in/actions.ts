"use server";

import { cookies } from "next/headers";

export async function signIn(username: string, password: string) {
	const errors: { username?: string; password?: string } = {};

	if (username !== process.env.USERNAME) {
		errors.username = "Invalid username";
	}
	if (password !== process.env.PASSWORD) {
		errors.password = "Invalid password";
	}

	const success = Object.keys(errors).length === 0;

	if (success) {
		const cookieStore = await cookies();
		cookieStore.set("auth-token", "authenticated", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 60 * 60 * 24 * 7,
		});
	}

	return {
		success,
		errors,
	};
}

export async function signOut() {
	const cookieStore = await cookies();
	cookieStore.delete("auth-token");
}
