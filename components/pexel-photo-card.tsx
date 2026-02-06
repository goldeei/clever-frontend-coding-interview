import { PexelPhoto } from "@/app/all-photos/types";
import Image from "next/image";
import Link from "next/link";
import { LinksIcon, StarIcon } from "./icons";
import { Typography } from "./typography";

type PexelPhotoCardProps = Pick<
	PexelPhoto,
	"src" | "alt" | "photographer" | "photographerUrl" | "avgColor"
> & { isLiked: boolean; onClick: () => void };

export const PexelPhotoCard = ({
	src,
	alt,
	photographerUrl,
	avgColor,
	photographer,
	isLiked,
	onClick,
}: PexelPhotoCardProps) => {
	return (
		<article className="flex gap-3">
			<button
				onClick={onClick}
				className="h-fit focus:outline-none focus:ring-2 focus:ring-primary rounded"
				aria-label={isLiked ? "Unlike photo" : "Like photo"}
				aria-pressed={isLiked}
			>
				<StarIcon
					className="transition-colors"
					fill={isLiked ? "var(--secondary)" : "none"}
					stroke={isLiked ? "var(--secondary)" : "var(--border)"}
				/>
			</button>
			<div className="relative size-[75px] shrink-0 rounded-lg overflow-hidden">
				<Image
					src={src.medium}
					alt={alt}
					fill
					className="object-cover"
					unoptimized
				/>
			</div>
			<div className="flex flex-col gap-0.5 pt-0.5 min-w-0">
			<div className="flex items-center justify-between">
				<Typography variant="label">{photographer}</Typography>
				<Link
					href={photographerUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="text-primary text-xs flex items-center gap-1"
				>
					<LinksIcon className="size-3" />
					<span>Portfolio</span>
				</Link>
			</div>
				<Typography
					variant="body"
					className="whitespace-nowrap overflow-hidden text-ellipsis"
					title={alt}
				>
					{alt}
				</Typography>
			<div
				className="flex items-center gap-1"
				style={{ "--avg-color": avgColor } as React.CSSProperties}
				role="img"
				aria-label={`Average color: ${avgColor}`}
			>
				<Typography
					variant="body"
					className="text-(--avg-color) inline-block mr-1"
					aria-hidden="true"
				>
					{avgColor}
				</Typography>
				<div
					className="size-3 bg-(--avg-color) inline-block"
					aria-hidden="true"
				/>
			</div>
			</div>
		</article>
	);
};
