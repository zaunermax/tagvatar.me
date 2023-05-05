'use client';

import { default as Image } from 'next/image';

import { useSearchParamScroll } from '@/hooks/use-search-param-scroll';

import image from './assets/kofi.png';

export const InfoSection = () => {
	useSearchParamScroll('focus');

	return (
		<div
			className="my-6 w-full max-w-md rounded-md bg-gray-800 p-8 text-gray-300 shadow-lg"
			id="how-to-api-key"
		>
			<h2 className="text-center font-semibold">
				This project is{' '}
				<a
					className={'font-medium text-blue-600 hover:underline dark:text-blue-500'}
					href={'https://github.com/zaunermax/gamertag-avatar-generator'}
					target={'_blank'}
				>
					open source
				</a>{' '}
				- give it a ⭐
			</h2>
			<a
				href={'https://ko-fi.com/mxmlnznr'}
				className={'mt-4 flex justify-center'}
				target={'_blank'}
			>
				<Image className={'w-1/2'} src={image} alt={'buy me a ko-fi'} />
			</a>
		</div>
	);
};
