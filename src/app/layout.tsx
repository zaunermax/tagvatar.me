import './globals.css';
import { Inter } from 'next/font/google';
import { default as Image } from 'next/image';
import { NavBar } from '../components/client/nav-bar';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'tagVAtar',
	description: 'Generate your own avatar with OpenAI and your gamertag',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark">
			<body className={inter.className}>
				<div className="relative min-h-screen bg-gray-900">
					<Image
						src={'/background-new.png'}
						alt={''}
						fill={true}
						sizes={'100vw'}
						quality={100}
						className={'object-cover brightness-50'}
						loading={'eager'}
					/>
					<div
						className={
							'absolute flex h-full w-screen flex-col items-center overflow-y-scroll'
						}
					>
						<NavBar />
						{children}
					</div>
				</div>
			</body>
			<Analytics />
		</html>
	);
}
