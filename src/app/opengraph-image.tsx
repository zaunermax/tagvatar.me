import Image from 'next/image';
import { ImageResponse } from 'next/server';

import { getServerURL } from '@/utils/get-server-url';

export const alt =
	'tagVAtar lets you generate your own avatar with AI and your gamer-tag';
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = 'image/png';
export const runtime = 'edge';

export default async function OpengraphImage() {
	return new ImageResponse(
		(
			<div tw="flex flex-col w-full h-full items-center justify-center">
				<img src={`${getServerURL()}/background-optimized.png`} alt={'background'} />
			</div>
		),
		{ ...size },
	);
}
