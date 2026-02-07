"use client";

import { Button } from "@/components/button";
import { FormInput } from "@/components/form-input";
import { Hero } from "@/components/hero";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "./actions";

/**
 * Sign in page
 *
 * username = user@example.com
 * password = testpass123
 */
export default function SignInPage() {
	const [error, setError] = useState<{
		username?: string;
		password?: string;
	}>({});

	const router = useRouter();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const username = formData.get("username") as string;
		const password = formData.get("password") as string;

		if (!username || !password) return;

		const { success, errors } = await signIn(username, password);

		if (success) {
			router.push("/all-photos");
		} else {
			setError(errors);
		}
	};

	const handleChange = (name: "username" | "password") => () => {
		setError((prev) => ({ ...prev, [name]: undefined }));
	};

	return (
		<div className="size-full flex flex-col items-center sm:justify-center ">
			<div className="w-[320px] flex flex-col items-center">
				<Hero title="Sign in to your account" />
				<form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
					<FormInput
						label="Username"
						id="username"
						type="email"
						placeholder="Enter your username"
						name="username"
						required
						error={error.username}
						onChange={handleChange("username")}
					/>
					<FormInput
						label="Password"
						id="password"
						type="password"
						placeholder="Enter your password"
						name="password"
						required
						error={error.password}
						onChange={handleChange("password")}
						aside={
							<a href="#" className="text-sm text-primary">
								Forgot password?
							</a>
						}
					/>
					<Button type="submit">Sign In</Button>
				</form>
			</div>
		</div>
	);
}
