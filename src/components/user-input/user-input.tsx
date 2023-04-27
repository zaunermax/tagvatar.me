'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks';
import { LoadingSpinner } from '@/components/loading-spinner/loading-spinner';

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

	const generateImage = () => {
		setLoading(true);
		getGeneratedImage(username, apiKey)
			.then(({ avatarUrl }) => {
				setAvatarUrl(avatarUrl);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
			<div className="bg-gray-800 p-8 rounded-md shadow-lg w-full max-w-md">
				<h1 className="text-2xl font-bold mb-6 text-center text-white">
					AI Generated Image
				</h1>
				<div className="space-y-4">
					<input
						type="text"
						placeholder="Gamertag"
						className="w-full px-4 py-2 border border-gray-700 bg-gray-700 text-white rounded-md"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						type="text"
						placeholder="OpenAI API Key"
						className="w-full px-4 py-2 border border-gray-700 bg-gray-700 text-white rounded-md"
						value={apiKey}
						onChange={(e) => setApiKey(e.target.value)}
					/>
				</div>
				<button
					className="w-full mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
					onClick={generateImage}
				>
					{loading ? <LoadingSpinner /> : 'Generate Image'}
				</button>
				<div className="mt-6">
					<div className="w-full h-64 bg-gray-700 rounded-md flex items-center justify-center">
						{avatarUrl ? (
							<img src={avatarUrl} className="max-h-full max-w-full" />
						) : (
							<p className="text-white">No image generated yet</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
