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
			<body className={`antialiased min-h-screen p-9 sm:p-6 sm:pb-0`}>
				{children}
			</body>
		</html>
	);
}
