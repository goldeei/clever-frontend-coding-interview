import { Button } from "@/components/button";
import { FormInput } from "@/components/form-input";
import { Typography } from "@/components/typography";

export default function Home() {
	return (
		<div className="">
			<main className="">
				<Typography variant="h1">Hello World</Typography>
				<Typography variant="body">This is a body text</Typography>
				<Typography variant="label">This is a label text</Typography>
				<Button>Click me</Button>
				<FormInput
					label="Name"
					placeholder="Enter your name"
					id="name"
					aside={
						<a href="#" className="text-primary text-sm">
							Test Aside
						</a>
					}
					error="This is an error"
				/>
			</main>
		</div>
	);
}
