"use server";

export async function signIn(username: string, password: string) {
	const errors: { username?: string; password?: string } = {};

	if (username !== process.env.USERNAME) {
		errors.username = "Invalid username";
	}
	if (password !== process.env.PASSWORD) {
		errors.password = "Invalid password";
	}

	return {
		success: Object.keys(errors).length === 0,
		errors,
	};
}
