"use client";

import { Hero } from "@/components/hero";
import { PexelPhotoCard } from "@/components/pexel-photo-card";
import { useEffect, useState } from "react";
import { getPhotos } from "./actions";
import { PexelPhoto } from "./types";

export default function AllPhotosPage() {
	const [photos, setPhotos] = useState<PexelPhoto[]>([]);
	const [likedPhotos, setLikedPhotos] = useState<Set<number>>(() => {
		if (typeof window === "undefined") return new Set();
		const stored = localStorage.getItem("liked-photos");
		return stored ? new Set(JSON.parse(stored)) : new Set();
	});

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
		const newLikedPhotos = new Set(likedPhotos);

		if (newLikedPhotos.has(id)) {
			newLikedPhotos.delete(id);
		} else {
			newLikedPhotos.add(id);
		}

		localStorage.setItem(
			"liked-photos",
			JSON.stringify(Array.from(newLikedPhotos)),
		);
		setLikedPhotos(newLikedPhotos);
	};

	return (
		<div className="max-w-[500px] mx-auto">
			<Hero title="All Photos" isCentered={false} />
			<div className="flex flex-col gap-3">
				{photos.map((photo) => (
					<PexelPhotoCard
						{...photo}
						isLiked={likedPhotos.has(photo.id)}
						onClick={() => handleLike(photo.id)}
						key={photo.id}
					/>
				))}
			</div>
		</div>
	);
}
