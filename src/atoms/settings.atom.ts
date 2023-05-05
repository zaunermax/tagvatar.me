import { atomWithStorage } from 'jotai/utils';
import { focusAtom } from 'jotai-optics';

export const settingsAtom = atomWithStorage('settings', {
	openaiApiKey: '',
	openaiApiKeyValid: null,
	huggingFaceApiKey: '',
	userName: '',
});

export const openaiApiKeyAtom = focusAtom(settingsAtom, (s) => s.prop('openaiApiKey'));

export const usernameAtom = focusAtom(settingsAtom, (s) => s.prop('userName'));
