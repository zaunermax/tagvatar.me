import { atomWithStorage } from 'jotai/utils';
import { focusAtom } from 'jotai-optics';

import { GameGenre } from '@/utils/image-prompts';

export type ImageGenStateType = {
	avatarUrl: string;
	prompt: string | null;
	sdAvatarUrl: string;
	sdPrompt: string | null;
	genre: string;
};

export const initialImageGenState: ImageGenStateType = {
	avatarUrl: '/placeholder.png',
	prompt: null,
	sdAvatarUrl: '/placeholder.png',
	sdPrompt: null,
	genre: GameGenre.Random,
};

export const imageGenStateAtom = atomWithStorage('image', initialImageGenState);

export const currentGenreAtom = focusAtom(imageGenStateAtom, (s) => s.prop('genre'));
