/* eslint-disable @next/next/no-img-element */

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
				<div tw="absolute flex flex-col items-center justify-center">
					<img
						style={{
							borderRadius: '100%',
							marginBottom: 30,
						}}
						src={`${getServerURL()}/logo.png`}
						alt={'logo'}
						width={160}
						height={160}
					/>
					<div
						tw="flex flex-col items-center justify-center"
						style={{
							fontSize: 60,
							minWidth: 400,
							letterSpacing: -2,
							fontWeight: 700,
							textAlign: 'center',
							padding: '5px 60px',
							backgroundImage:
								'linear-gradient(60deg, rgb(121, 40, 202), rgb(255, 0, 128))',
							borderRadius: 10,
							color: 'white',
						}}
					>
						AI gamer tools
					</div>
				</div>
			</div>
		),
		{ ...size },
	);
}
