import { cn } from "@/lib";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode | string;
	className?: string;
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
	return (
		<button
			className={cn(
				"bg-primary hover:bg-primary/95 font-bold transition-colors text-white h-11 px-8 rounded-md cursor-pointer",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
};
