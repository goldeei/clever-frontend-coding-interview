"use client";

import { Button } from "@/components/button";
import { FormInput } from "@/components/form-input";
import { LogoIcon } from "@/components/icons";
import { Typography } from "@/components/typography";

export default function SignInPage() {
	return (
		<div className="size-full flex flex-col items-center sm:justify-center ">
			<div className="w-[320px] flex flex-col items-center">
				<div className="mb-8 flex flex-col items-center gap-4">
					<LogoIcon />
					<Typography variant="h1">Sign in to your account</Typography>
				</div>
				<form className="w-full flex flex-col gap-6">
					<FormInput
						label="Username"
						id="username"
						type="email"
						placeholder="Enter your username"
					/>
					<FormInput
						label="Password"
						id="password"
						type="password"
						placeholder="Enter your password"
					/>
					<Button>Sign In</Button>
				</form>
			</div>
		</div>
	);
}
