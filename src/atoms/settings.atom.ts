import { atomWithStorage } from 'jotai/utils';
import { focusAtom } from 'jotai-optics';

export const settingsAtom = atomWithStorage('settings', {
	openaiApiKey: '',
	openaiApiKeyValid: null,
	huggingFaceApiKey: '',
});

export const openaiApiKeyAtom = focusAtom(settingsAtom, (s) => s.prop('openaiApiKey'));
