'use client';

import { useAtom } from 'jotai/index';
import { useCallback, useState } from 'react';

import { currentGenreAtom, writeImageGenStateAtom } from '@/atoms/image-gen-state.atom';
import { openaiApiKeyAtom, usernameAtom } from '@/atoms/settings.atom';
import { UserInput } from '@/components/client/user-input';
import { getGeneratedImage } from '@/components/client/user-input/utils/generate-image';
import { handleFetchErrors } from '@/utils/fetch-utils';

export default function Home() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [openaiApiKey] = useAtom(openaiApiKeyAtom);
	const [gamerTag] = useAtom(usernameAtom);
	const [genre] = useAtom(currentGenreAtom);
	const [, setImageGenState] = useAtom(writeImageGenStateAtom);

	const generateImage = useCallback(() => {
		setLoading(true);
		getGeneratedImage(gamerTag, openaiApiKey, genre)
			.then(handleFetchErrors)
			.then(({ avatarUrl, prompt }) => {
				setImageGenState((prev) => ({ ...prev, avatarUrl, prompt }));
				setError(null);
			})
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, [genre, openaiApiKey, gamerTag, setImageGenState]);

	return (
		<UserInput
			apiKey={openaiApiKey}
			loading={loading}
			generateImage={generateImage}
			error={error}
			model={'DALL-E'}
		/>
	);
}
