import './globals.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import Providers from './providers';

const workSans = Work_Sans({
	subsets: ['latin'],
	display: 'block',
	weight: ['400', '500', '600', '700'],
	preload: true,
	fallback: [
		'system-ui',
		'-apple-system',
		'BlinkMacSystemFont',
		'Segoe UI',
		'Roboto',
		'sans-serif',
	],
	adjustFontFallback: true,
	variable: '--font-work-sans',
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
		<html lang="en" className={`${workSans.variable} ${workSans.className}`}>
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
				/>
			</head>
			<body className="page-fade-in">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
