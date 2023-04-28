import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const dallePrompts = [
	// Generic
	'Cool {{gamerTag}} gamer avatar, stylized portrait, neon colors, futuristic headset, cyberpunk theme',
	'{{gamerTag}} gaming mascot, chibi character, holding controller, vibrant colors, action pose',
	'Abstract {{gamerTag}} gamer profile, modern art style, gaming symbols, dynamic shapes, contrasting colors',
	'{{gamerTag}} sci-fi gaming avatar, robotic character, futuristic armor, glowing accents, intense expression',
	'Graffiti-style {{gamerTag}} gamer avatar, street art influence, spray paint textures, urban vibes',
	'{{gamerTag}} adventure gaming avatar, treasure hunter character, explorer outfit, exotic location, vibrant colors',

	// FPS (First-Person Shooter)
	'{{gamerTag}} as a futuristic FPS game character, cyberpunk style, armed with advanced weapons',
	'Illustration of {{gamerTag}} in an intense military FPS setting, realistic style, holding a sniper rifle',
	'{{gamerTag}} as a sci-fi first-person shooter protagonist, battle-worn, in a neon-lit environment',

	// RPGs (Role-Playing Games)
	'{{gamerTag}} as a medieval RPG character, in the style of a fantasy painting, wielding a sword and shield',
	'Illustration of {{gamerTag}} as a mysterious mage in a classic RPG, casting a powerful spell',
	'{{gamerTag}} as a stealthy rogue character in a dark fantasy RPG setting, preparing for a stealthy attack',
	'{{gamerTag}} gaming avatar, fantasy character, RPG-inspired, wielding mystical weapon, vivid colors',

	// Anime
	'{{gamerTag}} as an anime-style gaming protagonist, in a colorful digital world, ready for action',
	'Illustration of {{gamerTag}} in the style of a mecha anime pilot, piloting a giant robot suit',
	'{{gamerTag}} as a heroic anime character, in a vibrant virtual reality game setting, sword in hand',
	'{{gamerTag}} illustrated gaming avatar, anime style, powerful pose, wielding gaming weapon, dynamic background',

	// Racing Games
	'{{gamerTag}} as a professional race car driver, in a stylized racing game, surrounded by fast cars',
	'Illustration of {{gamerTag}} as a daring motorbike racer in a high-speed racing game environment',
	'{{gamerTag}} in a futuristic racing game setting, piloting a sleek, neon-lit hovercraft',

	// Platformers
	'{{gamerTag}} as a cute, adventurous character in a colorful 2D platformer world, jumping between platforms',
	'Illustration of {{gamerTag}} in the style of a classic pixel-art platformer game, running through a retro level',
	'{{gamerTag}} as a heroic character in a 3D platformer game, exploring a fantastical landscape',

	// Fighting Games
	'{{gamerTag}} as a powerful martial artist in a stylized fighting game, ready to unleash a devastating combo',
	'Illustration of {{gamerTag}} as a bold brawler in an arcade fighting game, facing off against a fierce opponent',
	'{{gamerTag}} as a legendary warrior in a fantasy fighting game setting, displaying an impressive battle stance',

	// MOBAs (Multiplayer Online Battle Arenas)
	'{{gamerTag}} as a strategic MOBA game hero, commanding an army on a vibrant battlefield',
	'Illustration of {{gamerTag}} in the style of a popular MOBA game, surrounded by teammates and minions',
	'{{gamerTag}} as a powerful champion in a top-down MOBA game setting, locked in an intense standoff',

	// MMORPGs (Massively Multiplayer Online Role-Playing Games)
	'{{gamerTag}} as a skilled adventurer in a vast MMORPG world, surrounded by fellow players and epic quests',
	'Illustration of {{gamerTag}} as a legendary hero in a fantasy MMORPG, engaged in an epic boss battle',
	'{{gamerTag}} as a resourceful crafter in a sprawling MMORPG setting, showing off their latest creations',

	// Puzzle Games
	'{{gamerTag}} as a clever character in a mind-bending puzzle game, solving intricate challenges',
	'Illustration of {{gamerTag}} in a whimsical puzzle game world, interacting with colorful blocks and unique mechanics',
	'{{gamerTag}} as an inventive character in a 3D puzzle game environment, navigating complex mazes and contraptions',

	// Rhythm Games
	'{{gamerTag}} as a dynamic character in a vibrant rhythm game, dancing to the beat of catchy tunes',
	'Illustration of {{gamerTag}} as a skilled musician in a rhythm-based game, playing multiple instruments',
	'{{gamerTag}} as a DJ in a lively rhythm game setting, mixing beats and keeping the party going',

	// Strategy Games
	'{{gamerTag}} as a brilliant tactician in a classic strategy game, commanding armies on a detailed map',
	'Illustration of {{gamerTag}} as a futuristic commander in a real-time strategy game, managing resources and technology',
	'{{gamerTag}} as a cunning leader in a turn-based strategy game, planning moves and outsmarting opponents',
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

	return NextResponse.json({ avatarUrl, prompt });
}
