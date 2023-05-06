import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { focusAtom } from 'jotai-optics';

export type SettingsType = {
	openaiApiKey: string;
	openaiApiKeyValid: boolean | null;
	dreamStudioApiKey: string;
	dreamStudioApiKeyValid: boolean | null;
	huggingFaceApiKey: string;
	userName: string;
};

const initialSettings: SettingsType = {
	openaiApiKey: '',
	openaiApiKeyValid: null as boolean | null,
	dreamStudioApiKey: '',
	dreamStudioApiKeyValid: null as boolean | null,
	huggingFaceApiKey: '',
	userName: '',
};

export const settingsAtom = atomWithStorage('settings', initialSettings);

export const openaiApiKeyAtom = focusAtom(settingsAtom, (s) => s.prop('openaiApiKey'));

export const sdApiKeyAtom = focusAtom(settingsAtom, (s) => s.prop('dreamStudioApiKey'));

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

export const sdApiKeyValidAtom = focusAtom(settingsAtom, (s) =>
	s.prop('dreamStudioApiKeyValid'),
);

export const writeSdApiKeyValidAtom = atom(null, (get, set, value: boolean | null) => {
	set(sdApiKeyValidAtom, value);
});
