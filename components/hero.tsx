import { cn } from "@/lib";
import { LogoIcon } from "./icons";
import { Typography } from "./typography";

interface HeroProps {
	title: string;
	isCentered?: boolean;
}

export const Hero = ({ title, isCentered = true }: HeroProps) => {
	return (
		<div
			className={cn(
				"flex flex-col gap-4 mb-8",
				isCentered && "items-center justify-center",
			)}
		>
			<LogoIcon />
			<Typography variant="h1">{title}</Typography>
		</div>
	);
};
