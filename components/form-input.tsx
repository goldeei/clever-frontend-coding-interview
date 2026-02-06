import { cn } from "@/lib";
import { Typography } from "./typography";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	id: string;
	aside?: React.ReactNode;
	error?: string;
}

export const FormInput = ({
	label,
	id,
	aside,
	className,
	error,
	...props
}: FormInputProps) => {
	return (
		<div className={cn("relative flex flex-col gap-2", className)}>
			<div className="flex items-center justify-between">
				<label htmlFor={id}>
					<Typography variant="label">{label}</Typography>
				</label>
				{aside}
			</div>
			<input
				className={cn(
					"text-base h-11 px-2 rounded-lg border border-border",
					error && "border-red-500",
				)}
				id={id}
				aria-describedby={error ? `${id}-error` : undefined}
				aria-invalid={!!error}
				{...props}
			/>
			{error && (
				<p className="text-red-500 text-xs" id={`${id}-error`}>
					{error}
				</p>
			)}
		</div>
	);
};
