'use client';

import { useAtom } from 'jotai/index';
import { useCallback, useState, useTransition } from 'react';

import { currentGenreAtom, writeImageGenStateAtom } from '@/atoms/image-gen-state.atom';
import { sdApiKeyAtom, usernameAtom } from '@/atoms/settings.atom';
import { UserInput } from '@/components/client/user-input';
import { generateStableDiffusionImage } from '@/server-actions/generate-sd-image';

export default function StableDiffusion() {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	const [sdApiKey] = useAtom(sdApiKeyAtom);
	const [gamerTag] = useAtom(usernameAtom);
	const [genre] = useAtom(currentGenreAtom);
	const [, setImageGenState] = useAtom(writeImageGenStateAtom);

	const generateImage = useCallback(() => {
		setError(null);
		startTransition(async () => {
			const { url, prompt, error } = await generateStableDiffusionImage(
				sdApiKey,
				genre,
				gamerTag,
			);

			if (!url || error) {
				setError(error ?? 'Something went wrong');
				return;
			}

			setImageGenState((prev) => ({ ...prev, avatarUrl: url, prompt }));
		});
	}, [gamerTag, genre, sdApiKey, setImageGenState]);

	return (
		<UserInput
			apiKey={sdApiKey}
			loading={isPending}
			generateImage={generateImage}
			error={error}
			model={'StableDiffusion'}
		/>
	);
}
