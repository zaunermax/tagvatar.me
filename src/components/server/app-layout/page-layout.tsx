import { default as Image } from 'next/image';

import { NavBar } from '@/components/client/nav-bar';

import background from './assets/background.png';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="relative min-h-screen bg-gray-900">
			<Image
				src={background}
				alt={'background image'}
				fill={true}
				className={'object-cover brightness-50'}
				placeholder={'blur'}
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
