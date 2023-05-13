import { atomWithStorage } from 'jotai/utils';
import { focusAtom } from 'jotai-optics';

export type KeySettingType = {
	apiKey: string;
	isValid: boolean | null;
};

export type SettingsType = {
	userName: string;
	openai: KeySettingType;
	sd: KeySettingType;
};

const initialSettings: SettingsType = {
	userName: '',
	openai: {
		apiKey: '',
		isValid: null,
	},
	sd: {
		apiKey: '',
		isValid: null,
	},
};

export const settingsAtom = atomWithStorage('settings', initialSettings);

export const openaiSettingsAtom = focusAtom(settingsAtom, (s) => s.prop('openai'));

export const sdSettingsAtom = focusAtom(settingsAtom, (s) => s.prop('sd'));

export const usernameAtom = focusAtom(settingsAtom, (s) => s.prop('userName'));
