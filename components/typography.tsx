import { cn } from "@/lib";
import { cva, type VariantProps } from "class-variance-authority";
import { ElementType } from "react";

const typographyVariants = cva("text-foreground", {
	variants: {
		variant: {
			h1: "text-lg font-bold",
			label: "text-sm font-bold",
			body: "text-sm",
		},
	},
	defaultVariants: {
		variant: "body",
	},
});

interface TypographyProps extends VariantProps<typeof typographyVariants> {
	children: React.ReactNode;
	className?: string;
	as?: ElementType;
	title?: string;
}

/**
 * Standard typography component.
 *
 * Available variants:
 * - h1 - Main heading
 * - body - Standard p tag
 * - label - Label for form fields, item headers, etc.
 */
export const Typography = ({
	children,
	className,
	variant,
	as,
	title,
}: TypographyProps) => {
	const defaultElement: Record<string, ElementType> = {
		h1: "h1",
		body: "p",
		label: "p",
	};

	const Component = as || defaultElement[variant || "body"];

	return (
		<Component
			className={cn(typographyVariants({ variant }), className)}
			title={title}
		>
			{children}
		</Component>
	);
};
