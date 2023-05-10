export enum GameGenre {
	Random = 'Random',
	Generic = 'Generic',
	FPS = 'FPS',
	RPG = 'RPG',
	Anime = 'Anime',
	Racing = 'Racing',
	Platformer = 'Platformer',
	Fighting = 'Fighting',
	MOBA = 'MOBA',
	MMORPG = 'MMORPG',
	Puzzle = 'Puzzle',
}

// Generic
export const genericPrompts = [
	'Cool {{gamerTag}} gamer avatar, stylized portrait, neon colors, futuristic headset, cyberpunk theme',
	'{{gamerTag}} sci-fi gaming avatar, robotic character, futuristic armor, glowing accents, intense expression',
	'{{gamerTag}} gaming avatar, futuristic character, cyberpunk style, neon colors, intense expression',
	'{{gamerTag}} gaming mascot, chibi character, holding controller, vibrant colors, action pose',
	'{{gamerTag}} adventure gaming avatar, treasure hunter character, explorer outfit, exotic location, vibrant colors',
	'Graffiti-style {{gamerTag}} gamer avatar, street art influence, spray paint textures, urban vibes',
	'Robotic {{gamerTag}} avatar, upper torso, mech-inspired design, metallic armor, glowing LED lights, futuristic theme',
	'Stylized {{gamerTag}} gamer avatar, robotic cybernetic character, half-human half-robot, advanced technology, metallic shades, neon accents',
	'Retro-futuristic {{gamerTag}} avatar, robotic humanoid, upper body, vintage sci-fi aesthetic, bright neon colors, advanced cybernetics',
];

// FPS (First-Person Shooter)
export const fpsPrompts = [
	'{{gamerTag}} as a sci-fi first-person shooter protagonist, battle-worn, in a neon-lit environment',
	'Illustration of {{gamerTag}} in an intense military FPS setting, realistic style, holding a sniper rifle',
	'{{gamerTag}} FPS gaming avatar, battle-hardened mercenary, explosive action, urban warfare setting, gritty comic book style',
	'{{gamerTag}} as a futuristic FPS game character, cyberpunk style, armed with advanced weapons',
	'{{gamerTag}} as a skilled zombie hunter in a post-apocalyptic FPS world, carrying powerful firearms',
	'Illustration of {{gamerTag}} as an elite space marine in an alien-infested FPS setting, blasting extraterrestrial enemies',
];

// RPGs (Role-Playing Games)
export const rpgPrompts = [
	'{{gamerTag}} as a medieval RPG character, in the style of a fantasy painting, wielding a sword and shield',
	'Illustration of {{gamerTag}} as a mysterious mage in a classic RPG, casting a powerful spell',
	'{{gamerTag}} as a stealthy rogue character in a dark fantasy RPG setting, preparing for a stealthy attack',
	'{{gamerTag}} gaming avatar, fantasy character, RPG-inspired, wielding mystical weapon, vivid colors',
	'{{gamerTag}} as an armored knight in a high-fantasy RPG, standing proudly in front of a magnificent castle',
	'Illustration of {{gamerTag}} as a talented archer in an open-world RPG, scouting from a treetop vantage point',
];

// Anime
export const animePrompts = [
	'{{gamerTag}} as an anime-style gaming protagonist, in a colorful digital world, ready for action',
	'Illustration of {{gamerTag}} in the style of a mecha anime pilot, piloting a giant robot suit',
	'{{gamerTag}} as a heroic anime character, in a vibrant virtual reality game setting, sword in hand',
	'{{gamerTag}} illustrated gaming avatar, anime style, powerful pose, wielding gaming weapon, dynamic background',
	'{{gamerTag}} as a determined anime character in an epic gaming tournament, focused on victory',
	'Illustration of {{gamerTag}} as an anime swordsman in a game-inspired setting, engaging in a fierce duel',
];

// Racing Games
export const racingPrompts = [
	'{{gamerTag}} as a professional race car driver, in a stylized racing game, surrounded by fast cars',
	'Illustration of {{gamerTag}} as a daring motorbike racer in a high-speed racing game environment',
	'{{gamerTag}} in a futuristic racing game setting, piloting a sleek, neon-lit hovercraft',
	'{{gamerTag}} as an off-road racing champion, tearing through a muddy track in a rugged all-terrain vehicle',
	'Illustration of {{gamerTag}} as a street racer in an urban racing game, navigating through neon-lit city streets',
];

// Platformers
export const platformerPrompts = [
	'{{gamerTag}} as a cute, adventurous character in a colorful 2D platformer world, jumping between platforms',
	'Illustration of {{gamerTag}} in the style of a classic pixel-art platformer game, running through a retro level',
	'{{gamerTag}} as a heroic character in a 3D platformer game, exploring a fantastical landscape',
	'{{gamerTag}} as a nimble character in a challenging platformer, swinging from vines and dodging obstacles',
	'Illustration of {{gamerTag}} in an underwater platformer level, swimming among vibrant coral reefs and sea creatures',
];

// Fighting Games
export const fightingPrompts = [
	'{{gamerTag}} as a powerful martial artist in a stylized fighting game, ready to unleash a devastating combo',
	'Illustration of {{gamerTag}} as a bold brawler in an arcade fighting game, facing off against a fierce opponent',
	'{{gamerTag}} as a legendary warrior in a fantasy fighting game setting, displaying an impressive battle stance',
	'{{gamerTag}} as a supernatural fighter in a dark and gritty fighting game, harnessing arcane powers',
	'Illustration of {{gamerTag}} as a cybernetic warrior in a futuristic fighting game, facing an array of robotic enemies',
];

// MOBAs (Multiplayer Online Battle Arenas)
export const mobaPrompts = [
	'{{gamerTag}} as a strategic MOBA game hero, commanding an army on a vibrant battlefield',
	'Illustration of {{gamerTag}} in the style of a popular MOBA game, surrounded by teammates and minions',
	'{{gamerTag}} as a powerful champion in a top-down MOBA game setting, locked in an intense standoff',
	'{{gamerTag}} as a skilled support hero in a fantasy MOBA game, healing teammates and turning the tide of battle',
	'Illustration of {{gamerTag}} as a cunning MOBA assassin, striking from the shadows and eliminating key targets',
];

// MMORPGs (Massively Multiplayer Online Role-Playing Games)
export const mmorpgPrompts = [
	'{{gamerTag}} as a skilled adventurer in a vast MMORPG world, surrounded by fellow players and epic quests',
	'Illustration of {{gamerTag}} as a legendary hero in a fantasy MMORPG, engaged in an epic boss battle',
	'{{gamerTag}} as a resourceful crafter in a sprawling MMORPG setting, showing off their latest creations',
	'{{gamerTag}} as a charismatic diplomat in an MMORPG, forging alliances and influencing the course of the game world',
	'Illustration of {{gamerTag}} as an intrepid explorer in a sci-fi MMORPG, discovering new planets and alien species',
];

// Puzzle Games
export const puzzlePrompts = [
	'{{gamerTag}} as a clever character in a mind-bending puzzle game, solving intricate challenges',
	'Illustration of {{gamerTag}} in a whimsical puzzle game world, interacting with colorful blocks and unique mechanics',
	'{{gamerTag}} as an inventive character in a 3D puzzle game environment, navigating complex mazes and contraptions',
	'{{gamerTag}} as a curious character in a mysterious puzzle game, uncovering hidden secrets and solving riddles',
	'Illustration of {{gamerTag}} in a relaxing puzzle game setting, connecting colorful patterns and shapes',
];

// Concatenated array
export const allPrompts = [
	...genericPrompts,
	...fpsPrompts,
	...rpgPrompts,
	...animePrompts,
	...racingPrompts,
	...platformerPrompts,
	...fightingPrompts,
	...mobaPrompts,
	...mmorpgPrompts,
	...puzzlePrompts,
];

export const enumToPrompts = {
	[GameGenre.Generic]: genericPrompts,
	[GameGenre.FPS]: fpsPrompts,
	[GameGenre.RPG]: rpgPrompts,
	[GameGenre.Anime]: animePrompts,
	[GameGenre.Racing]: racingPrompts,
	[GameGenre.Platformer]: platformerPrompts,
	[GameGenre.Fighting]: fightingPrompts,
	[GameGenre.MOBA]: mobaPrompts,
	[GameGenre.MMORPG]: mmorpgPrompts,
	[GameGenre.Puzzle]: puzzlePrompts,
	[GameGenre.Random]: allPrompts,
};

export function getRandomGamerAvatarPrompt(gamerAvatars: string[], gamerTag: string) {
	const randomIndex = Math.floor(Math.random() * gamerAvatars.length);
	const randomAvatar = gamerAvatars[randomIndex] ?? '';
	return randomAvatar.replace('{{gamerTag}}', gamerTag);
}
