import { useAtom } from 'jotai';
import { useEffect, useTransition } from 'react';

import { useDebounce } from '@/hooks/use-debounce';

import type { WritableAtom, SetStateAction } from 'jotai';

type Props = {
	keyAtom: WritableAtom<string, [SetStateAction<string>], void>;
	validAtom: WritableAtom<null, [boolean | null], void>;
	checkApiKey: (key: string) => Promise<boolean>;
};

export const useApiKeyValid = ({ keyAtom, validAtom, checkApiKey }: Props) => {
	const [isPending, startTransition] = useTransition();

	const [openaiApiKey] = useAtom(keyAtom);
	const [, setValid] = useAtom(validAtom);

	const debouncedOpenAiApiKey = useDebounce(openaiApiKey, 500);

	useEffect(() => {
		if (!debouncedOpenAiApiKey) return;
		startTransition(async () => {
			const isValid = await checkApiKey(debouncedOpenAiApiKey);
			setValid(isValid);
		});
	}, [checkApiKey, debouncedOpenAiApiKey, setValid]);

	useEffect(() => {
		if (!openaiApiKey) setValid(null);
	}, [openaiApiKey, setValid]);

	return [isPending] as const;
};
