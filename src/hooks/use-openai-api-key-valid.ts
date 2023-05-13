import { useAtom } from 'jotai';
import { useEffect, useTransition } from 'react';

import { KeySettingType } from '@/atoms/settings.atom';
import { useDebounce } from '@/hooks/use-debounce';

import type { WritableAtom, SetStateAction } from 'jotai';

type Props = {
	settingsAtom: WritableAtom<KeySettingType, [SetStateAction<KeySettingType>], void>;
	checkApiKey: (key: string) => Promise<boolean>;
};

export const useApiKeyValid = ({ settingsAtom, checkApiKey }: Props) => {
	const [isPending, startTransition] = useTransition();

	const [{ apiKey, isValid }, setSetting] = useAtom(settingsAtom);

	const debouncedOpenAiApiKey = useDebounce(apiKey, 500);

	useEffect(() => {
		if (!debouncedOpenAiApiKey) return;
		startTransition(async () => {
			const isValid = await checkApiKey(debouncedOpenAiApiKey);
			setSetting((s) => ({ ...s, isValid }));
		});
	}, [checkApiKey, debouncedOpenAiApiKey, setSetting]);

	useEffect(() => {
		if (!apiKey) setSetting((s) => ({ ...s, isValid: null }));
	}, [apiKey, setSetting]);

	return [isPending] as const;
};
