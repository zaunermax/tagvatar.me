'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks';
import { Container } from '@/components/server/container';
import { PromptComponent } from '@/components/server/used-prompt';
import { LoadingSpinner } from '@/components/client/loading-spinner-text';
import { default as Image } from 'next/image';
import { GameGenre, handleFetchErrors } from '@/utils';
import { default as Link } from 'next/link';
import { TextInput } from 'flowbite-react';
import { useAtom } from 'jotai';
import { openaiApiKeyAtom } from '@/atoms';

const getGeneratedImage = (gamerTag: string, apiKey: string, genre: string) =>
	fetch('/api/generate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			gamerTag,
			apiKey,
			genre,
		}),
	});

export const UserInput = () => {
	const [username, setUsername] = useLocalStorage('username', '');
	const [apiKey, setApiKey] = useLocalStorage('apiKey', '');
	const [avatarUrl, setAvatarUrl] = useLocalStorage<string>(
		'avatarImage',
		'/placeholder.png',
	);
	const [prompt, setPrompt] = useLocalStorage<string | null>('prompt', null);

	const [loading, setLoading] = useState(false);
	const [genre, setGenre] = useState<string>(GameGenre.Random);
	const [error, setError] = useState<string | null>(null);

	const key = useAtom(openaiApiKeyAtom);

	console.log('key', key);

	const generateImage = () => {
		setLoading(true);
		getGeneratedImage(username, apiKey, genre)
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
				<input
					type="text"
					placeholder="Gamertag"
					className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<div>
					<TextInput
						type="password"
						placeholder="OpenAI API Key"
						className="w-full"
						value={apiKey}
						helperText={
							!apiKey && (
								<Link
									className="text-blue-600 hover:underline dark:text-blue-500"
									href="?focus=how-to-api-key"
									replace
								>
									How to get an API key?
								</Link>
							)
						}
						onChange={(e) => setApiKey(e.target.value)}
					/>
				</div>
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
			<button
				disabled={loading}
				className="mr-2 mt-4 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				onClick={generateImage}
			>
				{loading ? <LoadingSpinner /> : `${prompt ? 'Re-' : ''}Generate Image`}
			</button>
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
