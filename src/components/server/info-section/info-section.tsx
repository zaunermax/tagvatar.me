import { default as Image } from 'next/image';

import { Container } from '@/components/server/container';

import kofi from './assets/kofi.png';

export const InfoSection = () => {
	return (
		<Container className="text-gray-300">
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
				<Image
					className={'w-1/2 min-w-[200px]'}
					src={kofi}
					height={170}
					width={1081}
					alt={'buy me a ko-fi'}
				/>
			</a>
		</Container>
	);
};
