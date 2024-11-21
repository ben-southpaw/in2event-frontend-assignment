import './globals.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: 'In2event Users',
	description: 'User management interface for In2event',
	icons: [
		{ rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
		{ rel: 'icon', url: '/icon.svg' },
		{ rel: 'shortcut icon', url: '/favicon.svg' },
		{ rel: 'apple-touch-icon', url: '/icon.svg' },
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={workSans.className}>
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
				/>
			</head>
			<body>{children}</body>
		</html>
	);
}
