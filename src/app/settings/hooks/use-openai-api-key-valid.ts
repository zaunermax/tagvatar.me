import { useAtom } from 'jotai';
import { useEffect, useTransition } from 'react';

import { openaiApiKeyAtom, writeOpenaiApiKeyValidAtom } from '@/atoms/settings.atom';
import { useDebounce } from '@/hooks/use-debounce';
import { checkOpenaiApiKey } from '@/server-actions/check-openai-key';

export const useOpenaiApiKeyValid = () => {
	const [isPending, startTransition] = useTransition();

	const [openaiApiKey] = useAtom(openaiApiKeyAtom);
	const [, setValid] = useAtom(writeOpenaiApiKeyValidAtom);

	const debouncedOpenAiApiKey = useDebounce(openaiApiKey, 500);

	useEffect(() => {
		if (!debouncedOpenAiApiKey) return;
		startTransition(async () => {
			const isValid = await checkOpenaiApiKey(debouncedOpenAiApiKey);
			setValid(isValid);
		});
	}, [debouncedOpenAiApiKey, setValid]);

	useEffect(() => {
		if (!openaiApiKey) setValid(null);
	}, [openaiApiKey, setValid]);

	return { isPending };
};
