'use client';

import { TextInput } from 'flowbite-react';
import { useAtom } from 'jotai';
import { default as Image } from 'next/image';
import { useState } from 'react';

import { openaiApiKeyAtom } from '@/atoms';
import { Container } from '@/components/server/container';
import { PromptComponent } from '@/components/server/used-prompt';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { handleFetchErrors } from '@/utils/fetch-utils';
import { GameGenre } from '@/utils/openai';

import { GenerateButton } from './components/generate-button';
import { getGeneratedImage } from './utils/generate-image';

export const UserInput = () => {
	const [username, setUsername] = useLocalStorage('username', '');
	const [avatarUrl, setAvatarUrl] = useLocalStorage<string>(
		'avatarImage',
		'/placeholder.png',
	);
	const [prompt, setPrompt] = useLocalStorage<string | null>('prompt', null);

	const [loading, setLoading] = useState(false);
	const [genre, setGenre] = useState<string>(GameGenre.Random);
	const [error, setError] = useState<string | null>(null);

	const [openaiApiKey] = useAtom(openaiApiKeyAtom);

	const generateImage = () => {
		setLoading(true);
		getGeneratedImage(username, openaiApiKey, genre)
			.then(handleFetchErrors)
			.then(({ avatarUrl, prompt }) => {
				setAvatarUrl(avatarUrl);
				setPrompt(prompt);
				setError(null);
			})
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	};

	return (
		<Container>
			<h1 className="mb-6 text-center text-2xl font-bold leading-tight text-white md:text-3xl">
				Generate your own AI gamer avatar images
			</h1>
			<div className="space-y-4 pt-4">
				<TextInput
					type="text"
					placeholder="Gamertag"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<select
					className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					defaultValue={'Random'}
					onChange={(e) => setGenre(e.target.value)}
				>
					{Object.values(GameGenre)?.map((genre) => (
						<option key={genre} value={genre}>
							{genre}
						</option>
					))}
				</select>
			</div>
			<GenerateButton
				imageExists={!!prompt}
				generateImage={generateImage}
				loading={loading}
			/>
			{error && (
				<div className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white">
					<p>Something went wrong while generating the image: {error}</p>
				</div>
			)}
			<div className="mt-4">
				<div className="flex h-64 w-full items-center justify-center rounded-md bg-gray-700">
					<Image
						src={avatarUrl ?? '/placeholder.png'}
						width={256}
						height={256}
						alt={'your generated image'}
						style={{ height: 256, width: 256 }}
					/>
				</div>
			</div>
			{prompt && <PromptComponent prompt={prompt} />}
		</Container>
	);
};
