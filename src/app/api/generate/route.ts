import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const dallePrompts = [
	'Cool {{gamerTag}} gamer avatar, stylized portrait, neon colors, futuristic headset, cyberpunk theme',
	'{{gamerTag}} gaming mascot, chibi character, holding controller, vibrant colors, action pose',
	'{{gamerTag}} illustrated gaming avatar, anime style, powerful pose, wielding gaming weapon, dynamic background',
	'{{gamerTag}} gaming avatar, fantasy character, RPG-inspired, wielding mystical weapon, vivid colors',
	'Abstract {{gamerTag}} gamer profile, modern art style, gaming symbols, dynamic shapes, contrasting colors',
	'{{gamerTag}} sci-fi gaming avatar, robotic character, futuristic armor, glowing accents, intense expression',
	'Graffiti-style {{gamerTag}} gamer avatar, street art influence, spray paint textures, bold typography, urban vibes',
	'{{gamerTag}} adventure gaming avatar, treasure hunter character, explorer outfit, exotic location, vibrant colors',
];

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
	const { gamerTag, apiKey } = await request.json();

	const prompt = getRandomGamerAvatar(dallePrompts, gamerTag);

	const avatarUrl = (await getOpenAiImage(prompt, apiKey)) ?? '';

	return NextResponse.json({ avatarUrl });
}
