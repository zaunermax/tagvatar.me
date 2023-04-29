import { UserInput } from '@/components/user-input';
import { InfoSection } from '@/components/info-section';
import { Analytics } from '@vercel/analytics/react';
import Image from 'next/image';

export default async function Home() {
	return (
		<div className="relative min-h-screen bg-gray-900">
			<Image
				src={'/background.png'}
				alt={''}
				fill={true}
				sizes={'100vw'}
				quality={100}
				className={'object-cover brightness-50'}
			/>
			<div
				className={
					'absolute flex h-full w-screen flex-col items-center overflow-y-scroll'
				}
			>
				<UserInput />
				<InfoSection />
				<Analytics />
			</div>
		</div>
	);
}
