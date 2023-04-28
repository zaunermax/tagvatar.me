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
	'{{gamerTag}} as a skilled zombie hunter in a post-apocalyptic FPS world, carrying powerful firearms',
	'Illustration of {{gamerTag}} as an elite space marine in an alien-infested FPS setting, blasting extraterrestrial enemies',

	// RPGs (Role-Playing Games)
	'{{gamerTag}} as a medieval RPG character, in the style of a fantasy painting, wielding a sword and shield',
	'Illustration of {{gamerTag}} as a mysterious mage in a classic RPG, casting a powerful spell',
	'{{gamerTag}} as a stealthy rogue character in a dark fantasy RPG setting, preparing for a stealthy attack',
	'{{gamerTag}} gaming avatar, fantasy character, RPG-inspired, wielding mystical weapon, vivid colors',
	'{{gamerTag}} as an armored knight in a high-fantasy RPG, standing proudly in front of a magnificent castle',
	'Illustration of {{gamerTag}} as a talented archer in an open-world RPG, scouting from a treetop vantage point',

	// Anime
	'{{gamerTag}} as an anime-style gaming protagonist, in a colorful digital world, ready for action',
	'Illustration of {{gamerTag}} in the style of a mecha anime pilot, piloting a giant robot suit',
	'{{gamerTag}} as a heroic anime character, in a vibrant virtual reality game setting, sword in hand',
	'{{gamerTag}} illustrated gaming avatar, anime style, powerful pose, wielding gaming weapon, dynamic background',
	'{{gamerTag}} as a determined anime character in an epic gaming tournament, focused on victory',
	'Illustration of {{gamerTag}} as an anime swordsman in a game-inspired setting, engaging in a fierce duel',

	// Racing Games
	'{{gamerTag}} as a professional race car driver, in a stylized racing game, surrounded by fast cars',
	'Illustration of {{gamerTag}} as a daring motorbike racer in a high-speed racing game environment',
	'{{gamerTag}} in a futuristic racing game setting, piloting a sleek, neon-lit hovercraft',
	'{{gamerTag}} as an off-road racing champion, tearing through a muddy track in a rugged all-terrain vehicle',
	'Illustration of {{gamerTag}} as a street racer in an urban racing game, navigating through neon-lit city streets',

	// Platformers
	'{{gamerTag}} as a cute, adventurous character in a colorful 2D platformer world, jumping between platforms',
	'Illustration of {{gamerTag}} in the style of a classic pixel-art platformer game, running through a retro level',
	'{{gamerTag}} as a heroic character in a 3D platformer game, exploring a fantastical landscape',
	'{{gamerTag}} as a nimble character in a challenging platformer, swinging from vines and dodging obstacles',
	'Illustration of {{gamerTag}} in an underwater platformer level, swimming among vibrant coral reefs and sea creatures',

	// Fighting Games
	'{{gamerTag}} as a powerful martial artist in a stylized fighting game, ready to unleash a devastating combo',
	'Illustration of {{gamerTag}} as a bold brawler in an arcade fighting game, facing off against a fierce opponent',
	'{{gamerTag}} as a legendary warrior in a fantasy fighting game setting, displaying an impressive battle stance',
	'{{gamerTag}} as a supernatural fighter in a dark and gritty fighting game, harnessing arcane powers',
	'Illustration of {{gamerTag}} as a cybernetic warrior in a futuristic fighting game, facing an array of robotic enemies',

	// MOBAs (Multiplayer Online Battle Arenas)
	'{{gamerTag}} as a strategic MOBA game hero, commanding an army on a vibrant battlefield',
	'Illustration of {{gamerTag}} in the style of a popular MOBA game, surrounded by teammates and minions',
	'{{gamerTag}} as a powerful champion in a top-down MOBA game setting, locked in an intense standoff',
	'{{gamerTag}} as a skilled support hero in a fantasy MOBA game, healing teammates and turning the tide of battle',
	'Illustration of {{gamerTag}} as a cunning MOBA assassin, striking from the shadows and eliminating key targets',

	// MMORPGs (Massively Multiplayer Online Role-Playing Games)
	'{{gamerTag}} as a skilled adventurer in a vast MMORPG world, surrounded by fellow players and epic quests',
	'Illustration of {{gamerTag}} as a legendary hero in a fantasy MMORPG, engaged in an epic boss battle',
	'{{gamerTag}} as a resourceful crafter in a sprawling MMORPG setting, showing off their latest creations',
	'{{gamerTag}} as a charismatic diplomat in an MMORPG, forging alliances and influencing the course of the game world',
	'Illustration of {{gamerTag}} as an intrepid explorer in a sci-fi MMORPG, discovering new planets and alien species',

	// Puzzle Games
	'{{gamerTag}} as a clever character in a mind-bending puzzle game, solving intricate challenges',
	'Illustration of {{gamerTag}} in a whimsical puzzle game world, interacting with colorful blocks and unique mechanics',
	'{{gamerTag}} as an inventive character in a 3D puzzle game environment, navigating complex mazes and contraptions',
	'{{gamerTag}} as a curious character in a mysterious puzzle game, uncovering hidden secrets and solving riddles',
	'Illustration of {{gamerTag}} in a relaxing puzzle game setting, connecting colorful patterns and shapes',

	// Rhythm Games
	'{{gamerTag}} as a dynamic character in a vibrant rhythm game, dancing to the beat of catchy tunes',
	'Illustration of {{gamerTag}} as a skilled musician in a rhythm-based game, playing multiple instruments',
	'{{gamerTag}} as a DJ in a lively rhythm game setting, mixing beats and keeping the party going',
	'{{gamerTag}} as a synchronized swimmer in a rhythm-based sports game, performing intricate aquatic choreography',
	'Illustration of {{gamerTag}} as a master percussionist in a drumming rhythm game, keeping the beat with precision',

	// Strategy Games
	'{{gamerTag}} as a brilliant tactician in a classic strategy game, commanding armies on a detailed map',
	'Illustration of {{gamerTag}} as a futuristic commander in a real-time strategy game, managing resources and technology',
	'{{gamerTag}} as a cunning leader in a turn-based strategy game, planning moves and outsmarting opponents',
	'{{gamerTag}} as a wise monarch in a historical strategy game, building an empire and expanding their realm',
	'Illustration of {{gamerTag}} as a shrewd business tycoon in a city-building strategy game, constructing a thriving metropolis',
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
