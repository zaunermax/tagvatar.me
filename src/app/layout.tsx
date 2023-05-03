import './globals.css';

import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { Providers } from './providers';
import { AppLayout } from '@/components/server/app-layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'tagVAtar',
	description: 'Generate your own avatar with OpenAI and your gamertag',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark">
			<body className={inter.className}>
				<Providers>
					<AppLayout>{children}</AppLayout>
				</Providers>
			</body>
			<Analytics />
		</html>
	);
}
