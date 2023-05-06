import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { focusAtom } from 'jotai-optics';

import { GameGenre } from '@/utils/image-prompts';

export type ImageGenStateType = {
	prompt: string | null;
	avatarUrl: string;
	genre: string;
};

export const initialImageGenState: ImageGenStateType = {
	prompt: null,
	avatarUrl: '/placeholder.png',
	genre: GameGenre.Random,
};

export const imageGenStateAtom = atomWithStorage('image', initialImageGenState);

export const writeImageGenStateAtom = atom(
	null,
	(
		_,
		set,
		value: ImageGenStateType | ((prev: ImageGenStateType) => ImageGenStateType),
	) => {
		set(imageGenStateAtom, value);
	},
);

export const currentGenreAtom = focusAtom(imageGenStateAtom, (s) => s.prop('genre'));
