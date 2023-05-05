import { atomWithStorage } from 'jotai/utils';

import { GameGenre } from '@/utils/openai';

export const dalleAtom = atomWithStorage('dalle', {
	prompt: null,
	avatarUrl: '/placeholder.png',
	genre: GameGenre.Random as string,
});
