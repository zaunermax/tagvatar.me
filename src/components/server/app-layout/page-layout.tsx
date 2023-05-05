import { default as Image } from 'next/image';

import { NavBar } from '@/components/client/nav-bar';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
	return (
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
	);
};
