"use server";

import { PexelPhoto, PexelResponse } from "./types";

/**
 * Fetches photos from Pexels API and transforms to app-specific format.
 *
 * Runs server-side. Cached for 1 hour.
 */
export const getPhotos = async (): Promise<PexelPhoto[]> => {
	const response = await fetch(
		`https://api.pexels.com/v1/search?query=nature&per_page=10`,
		{
			headers: {
				Authorization: process.env.PEXELS_API_KEY as string,
			},
			next: { revalidate: 3600 }, // Cache for 1 hour
		},
	);

	if (!response.ok) {
		throw new Error(`Pexels API error: ${response.status}`);
	}

	const data: PexelResponse = await response.json();

	// Transform to camelCase and include only needed fields
	return data.photos.map((photo) => ({
		id: photo.id,
		src: photo.src,
		alt: photo.alt,
		photographer: photo.photographer,
		photographerUrl: photo.photographer_url,
		avgColor: photo.avg_color,
	}));
};
