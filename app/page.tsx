import { Button } from "@/components/button";
import { Typography } from "@/components/typography";

export default function Home() {
	return (
		<div className="">
			<main className="">
				<Typography variant="h1">Hello World</Typography>
				<Typography variant="body">This is a body text</Typography>
				<Typography variant="label">This is a label text</Typography>
				<Button>Click me</Button>
			</main>
		</div>
	);
}
