import './globals.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Users Management',
  description: 'Manage your users',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={workSans.className}>
      <body>{children}</body>
    </html>
  );
}
