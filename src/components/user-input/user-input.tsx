'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks';
import { LoadingSpinner } from '@/components/loading-spinner/loading-spinner';
import { PromptComponent } from '@/components/used-prompt';

const getGeneratedImage = (gamerTag: string, apiKey: string) =>
	fetch('/api/generate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			gamerTag,
			apiKey,
		}),
	}).then((res) => res.json());

export const UserInput = () => {
	const [username, setUsername] = useLocalStorage('username', '');
	const [apiKey, setApiKey] = useLocalStorage('apiKey', '');
	const [loading, setLoading] = useState(false);
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
	const [prompt, setPrompt] = useState<string | null>(null);

	const generateImage = () => {
		setLoading(true);
		getGeneratedImage(username, apiKey)
			.then(({ avatarUrl, prompt }) => {
				setAvatarUrl(avatarUrl);
				setPrompt(prompt);
			})
			.finally(() => setLoading(false));
	};

	return (
		<div className="w-full max-w-md rounded-md bg-gray-800 p-8 shadow-lg">
			<h1 className="mb-6 text-center text-2xl font-bold text-white">
				AI Generated Image
			</h1>
			<div className="space-y-4">
				<input
					type="text"
					placeholder="Gamertag"
					className="w-full rounded-md border border-gray-700 bg-gray-700 px-4 py-2 text-white"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="text"
					placeholder="OpenAI API Key"
					className="w-full rounded-md border border-gray-700 bg-gray-700 px-4 py-2 text-white"
					value={apiKey}
					onChange={(e) => setApiKey(e.target.value)}
				/>
			</div>
			<button
				disabled={loading}
				className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
				onClick={generateImage}
			>
				{loading ? <LoadingSpinner /> : 'Generate Image'}
			</button>
			<div className="mt-6">
				<div className="flex h-64 w-full items-center justify-center rounded-md bg-gray-700">
					{avatarUrl ? (
						<img src={avatarUrl} className="max-h-full max-w-full" />
					) : (
						<p className="text-white">No image generated yet</p>
					)}
				</div>
			</div>
			{prompt && <PromptComponent prompt={prompt} />}
		</div>
	);
};
