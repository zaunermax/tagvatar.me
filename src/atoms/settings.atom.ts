import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { focusAtom } from 'jotai-optics';

export const settingsAtom = atomWithStorage('settings', {
	openaiApiKey: '',
	openaiApiKeyValid: null as boolean | null,
	huggingFaceApiKey: '',
	userName: '',
});

export const openaiApiKeyAtom = focusAtom(settingsAtom, (s) => s.prop('openaiApiKey'));

export const usernameAtom = focusAtom(settingsAtom, (s) => s.prop('userName'));

export const openaiApiKeyValidAtom = focusAtom(settingsAtom, (s) =>
	s.prop('openaiApiKeyValid'),
);

export const writeOpenaiApiKeyValidAtom = atom(
	null,
	(get, set, value: boolean | null) => {
		set(openaiApiKeyValidAtom, value);
	},
);
