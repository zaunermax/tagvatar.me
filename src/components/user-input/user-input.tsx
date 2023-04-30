'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks';
import { LoadingSpinner } from '@/components/loading-spinner';
import { PromptComponent } from '@/components/used-prompt';
import { default as Image } from 'next/image';
import { GameGenre, handleFetchErrors } from '@/utils';
import { default as Link } from 'next/link';

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
		<div className="mt-6 w-full max-w-md rounded-md bg-gray-800 p-8 shadow-lg">
			<h1 className="mb-6 text-center text-2xl font-bold leading-tight text-white md:text-3xl">
				Generate your own AI gamer avatar images
			</h1>
			<div className="space-y-4 pt-4">
				<input
					type="text"
					placeholder="Gamertag"
					className="w-full rounded-md border border-gray-700 bg-gray-700 px-4 py-2 text-white"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<div className="flex">
					<input
						type="password"
						placeholder="OpenAI API Key"
						className="w-full rounded-md rounded-r-none border border-gray-700 bg-gray-700 px-4 py-2 text-white"
						value={apiKey}
						onChange={(e) => setApiKey(e.target.value)}
					/>
					<Link
						href="?focus=how-to-api-key"
						replace
						className={
							'inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400'
						}
					>
						?
					</Link>
				</div>
				<select
					className="w-full rounded-md border border-gray-700 bg-gray-700 px-4 py-2 text-white"
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
				className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
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
		</div>
	);
};
