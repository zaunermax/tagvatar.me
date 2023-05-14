import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

import { AppLayout } from '@/components/server/app-layout';
import { getServerURL } from '@/utils/get-server-url';

import Loading from './loading';
import { Providers } from './providers';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'tagVAtar',
	description: 'Generate your own avatar with OpenAI and your gamer-tag',
	metadataBase: new URL(getServerURL()),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark">
			<body className={inter.className}>
				<Providers>
					<AppLayout>
						<Suspense fallback={<Loading />}>{children}</Suspense>
					</AppLayout>
				</Providers>
			</body>
			<Analytics />
		</html>
	);
}
