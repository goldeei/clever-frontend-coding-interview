"use client";

import { Hero } from "@/components/hero";
import { PexelPhotoCard } from "@/components/pexel-photo-card";
import { useEffect, useState } from "react";

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

type PexelResponse = {
	next_page: string;
	prev_page: number;
	per_page: number;
	photos: PexelPhotoResponse[];
	total_results: number;
};

export default function AllPhotosPage() {
	const [photos, setPhotos] = useState<PexelPhotoResponse[]>([]);

	const getPhotos = async (): Promise<PexelPhotoResponse[]> => {
		const response = await fetch(
			`https://api.pexels.com/v1/search?query=nature&per_page=10`,
			{
				headers: {
					Authorization: process.env.PEXELS_API_KEY as string,
				},
			},
		);
		const data: PexelResponse = await response.json();
		return data.photos;
	};

	useEffect(() => {
		const fetchPhotos = async () => {
			const data = await getPhotos();
			setPhotos(data);
		};
		fetchPhotos();
	}, []);

	const handleLike = (id: number) => {
		setPhotos((prev) =>
			prev.map((photo) =>
				photo.id === id ? { ...photo, liked: !photo.liked } : photo,
			),
		);
	};

	return (
		<div className="max-w-[500px] mx-auto">
			<Hero title="All Photos" isCentered={false} />
			<div className="flex flex-col gap-3">
				{photos.map(
					({
						id,
						src,
						alt,
						photographer,
						photographer_url,
						avg_color,
						liked,
					}) => (
						<PexelPhotoCard
							key={id}
							src={src}
							alt={alt}
							photographer={photographer}
							photographer_url={photographer_url}
							avg_color={avg_color}
							isLiked={liked}
							onClick={() => handleLike(id)}
						/>
					),
				)}
			</div>
		</div>
	);
}
