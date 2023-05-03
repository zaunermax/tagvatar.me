'use client';

import { default as Image } from 'next/image';
import image from './assets/kofi.png';
import { useSearchParamScroll } from '@/hooks';

export const InfoSection = () => {
	useSearchParamScroll('focus');

	return (
		<div
			className="my-6 w-full max-w-md rounded-md bg-gray-800 p-8 text-gray-300 shadow-lg"
			id="how-to-api-key"
		>
			<h2 className="mb-2 font-semibold">How do I get an API key?</h2>
			<ol className="list-inside list-decimal">
				<li>
					Create an account on{' '}
					<a
						className="underline hover:text-blue-400"
						href="https://platform.openai.com/"
						target={'_blank'}
					>
						openai.com
					</a>
				</li>
				<li>
					Then go to{' '}
					<a
						className="underline hover:text-blue-400"
						href="https://platform.openai.com/account/api-keys"
						target={'_blank'}
					>
						the api key section
					</a>
				</li>
				<li>Generate a new secret key and copy it</li>
				<li>Put the key into the input</li>
				<li>The first 5$ worth of generation is free</li>
			</ol>
			<h2 className="mt-4 font-semibold">
				This project is{' '}
				<a
					className={'font-medium text-blue-600 hover:underline dark:text-blue-500'}
					href={'https://github.com/zaunermax/gamertag-avatar-generator'}
				>
					open source
				</a>{' '}
				- give it a ⭐
			</h2>
			<a href={'https://ko-fi.com/mxmlnznr'} className={'mt-4 block'} target={'_blank'}>
				<Image className={'w-1/2'} src={image} alt={'buy me a ko-fi'} />
			</a>
		</div>
	);
};
