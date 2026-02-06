"use client";

import { Hero } from "@/components/hero";
import { PexelPhotoCard } from "@/components/pexel-photo-card";
import { useEffect, useState } from "react";
import { getPhotos } from "./actions";
import { PexelPhoto } from "./types";

export default function AllPhotosPage() {
	const [photos, setPhotos] = useState<PexelPhoto[]>([]);

	useEffect(() => {
		const fetchPhotos = async () => {
			try {
				const data = await getPhotos();
				setPhotos(data);
			} catch (error) {
				console.error("Error fetching photos:", error);
			}
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
			{photos.map(({ id, src, alt, photographer, photographerUrl, avgColor, liked }) => (
				<PexelPhotoCard
					key={id}
					src={src}
					alt={alt}
					photographer={photographer}
					photographerUrl={photographerUrl}
					avgColor={avgColor}
					isLiked={liked}
					onClick={() => handleLike(id)}
				/>
			))}
			</div>
		</div>
	);
}
