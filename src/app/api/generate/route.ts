import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

import { allPrompts, enumToPrompts, GameGenre } from '@/utils/openai';

function getRandomGamerAvatar(gamerAvatars: string[], gamerTag: string) {
	const randomIndex = Math.floor(Math.random() * gamerAvatars.length);
	const randomAvatar = gamerAvatars[randomIndex] ?? '';
	return randomAvatar.replace('{{gamerTag}}', gamerTag);
}

const getOpenAiImage = (prompt: string, apiKey: string) => {
	const openAiConfig = new Configuration({ apiKey });
	const api = new OpenAIApi(openAiConfig);

	return api
		.createImage({ prompt, n: 1, size: '256x256' })
		.then((response) => response.data?.data?.[0]?.url)
		.catch((error) => {
			if (error.response) {
				throw new Error(error.response.data.error.message);
			} else {
				throw new Error('No response received from OpenAI');
			}
		});
};

export async function POST(request: Request) {
	const { gamerTag = '', apiKey = null, genre = GameGenre.Random } = await request.json();

	if (!gamerTag)
		return NextResponse.json({ message: 'No gamer tag provided' }, { status: 400 });

	if (!apiKey)
		return NextResponse.json({ message: 'No API key provided' }, { status: 400 });

	const prompts = enumToPrompts[genre as GameGenre] ?? allPrompts;

	const prompt = getRandomGamerAvatar(prompts, gamerTag.slice(0, 50));

	try {
		const avatarUrl = (await getOpenAiImage(prompt, apiKey)) ?? '';
		return NextResponse.json({ avatarUrl, prompt });
	} catch (e) {
		return NextResponse.json(
			{
				message:
					e instanceof Error
						? e.message
						: 'The provided gamer tag resulted in an error, it was probably filtered by the AI system',
			},
			{ status: 400 },
		);
	}
}
