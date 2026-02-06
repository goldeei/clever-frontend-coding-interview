import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Clever Frontend Coding Interview",
	description: "A frontend coding interview challenge for Clever Real Estate",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>{children}</body>
		</html>
	);
}
