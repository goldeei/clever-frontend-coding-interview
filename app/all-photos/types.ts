export type PexelPhotoResponse = {
	id: number;
	url: string;
	alt: string;
	width: number;
	height: number;
	avg_color: string;
	photographer_url: string;
	photographer_id: number;
	photographer: string;
	src: Record<"medium", string>;
	liked: boolean;
};

export type PexelResponse = {
	next_page: string;
	prev_page: number;
	per_page: number;
	photos: PexelPhotoResponse[];
	total_results: number;
};

export type PexelPhoto = Pick<
	PexelPhotoResponse,
	"id" | "src" | "alt" | "photographer" | "liked"
> & {
	photographerUrl: PexelPhotoResponse["photographer_url"];
	avgColor: PexelPhotoResponse["avg_color"];
};
