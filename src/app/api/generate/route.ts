import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';
import { dallePrompts, enumToPrompts, GameGenre } from '@/utils';

function getRandomGamerAvatar(gamerAvatars: string[], gamerTag: string) {
	const randomIndex = Math.floor(Math.random() * gamerAvatars.length);
	const randomAvatar = gamerAvatars[randomIndex] ?? '';
	return randomAvatar.replace('{{gamerTag}}', gamerTag);
}

const getOpenAiImage = (prompt: string, apiKey: string) => {
	const openAiConfig = new Configuration({ apiKey });
	const api = new OpenAIApi(openAiConfig);

	return api
		.createImage({
			prompt,
			n: 1,
			size: '256x256',
		})
		.then((response) => {
			return response.data?.data?.[0]?.url;
		})
		.catch((e) => {
			console.error(e.message);
			process.exit(1);
		});
};

export async function POST(request: Request) {
	const { gamerTag, apiKey, genre } = await request.json();

	const prompts = enumToPrompts[genre as GameGenre] ?? dallePrompts;

	const prompt = getRandomGamerAvatar(prompts, gamerTag);

	const avatarUrl = (await getOpenAiImage(prompt, apiKey)) ?? '';

	return NextResponse.json({ avatarUrl, prompt });
}

export async function GET() {
	return NextResponse.json({ options: Object.values(GameGenre) });
}
