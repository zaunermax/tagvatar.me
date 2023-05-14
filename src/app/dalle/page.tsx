'use client';

import { useAtom } from 'jotai';
import { useCallback, useState } from 'react';

import { imageGenStateAtom } from '@/atoms/image-gen-state.atom';
import { openaiSettingsAtom, usernameAtom } from '@/atoms/settings.atom';
import { UserInput } from '@/components/client/user-input';
import { getGeneratedImage } from '@/components/client/user-input/utils/generate-image';
import { handleFetchErrors } from '@/utils/fetch-utils';

export default function Home() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [{ apiKey, isValid }] = useAtom(openaiSettingsAtom);
	const [{ avatarUrl, prompt, genre }, setImageGenState] = useAtom(imageGenStateAtom);
	const [gamerTag] = useAtom(usernameAtom);

	const generateImage = useCallback(() => {
		setLoading(true);
		getGeneratedImage(gamerTag, apiKey, genre)
			.then(handleFetchErrors)
			.then(({ avatarUrl, prompt }) => {
				setImageGenState((prev) => ({ ...prev, avatarUrl, prompt }));
				setError(null);
			})
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, [genre, apiKey, gamerTag, setImageGenState]);

	return (
		<UserInput
			apiKeyValid={isValid}
			loading={loading}
			generateImage={generateImage}
			error={error}
			model={'DALL-E'}
			avatarUrl={avatarUrl}
			avatarPrompt={prompt}
		/>
	);
}
