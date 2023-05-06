import { TextInput } from 'flowbite-react';
import { useAtom } from 'jotai/index';
import { default as Image } from 'next/image';

import { imageGenStateAtom } from '@/atoms/image-gen-state.atom';
import { usernameAtom } from '@/atoms/settings.atom';
import { Container } from '@/components/server/container';
import { PromptComponent } from '@/components/server/used-prompt';
import { GameGenre } from '@/utils/image-prompts';

import { GenerateButton } from './components/generate-button';

type UserInputProps = {
	loading: boolean;
	generateImage: () => void;
	error: string | null;
	model: string;
	apiKey: string;
};

export const UserInput = ({
	loading,
	generateImage,
	error,
	model,
	apiKey,
}: UserInputProps) => {
	const [{ avatarUrl, genre, prompt }, setImageGenState] = useAtom(imageGenStateAtom);
	const [username, setUsername] = useAtom(usernameAtom);

	return (
		<Container>
			<h1 className="md:text-1xl mb-4 text-center text-2xl font-bold leading-tight text-white">
				Generate your own AI gamer avatar images with {model}
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
					value={genre}
					onChange={(e) =>
						setImageGenState((prev) => ({ ...prev, genre: e.target.value }))
					}
				>
					{Object.values(GameGenre)?.map((genre) => (
						<option key={genre} value={genre}>
							{genre}
						</option>
					))}
				</select>
				<GenerateButton
					apiKey={apiKey}
					imageExists={!!prompt}
					generateImage={generateImage}
					loading={loading}
				/>
				{error && (
					<div className="rounded-md bg-red-600 px-4 py-2 text-white">
						<p>Something went wrong while generating the image: {error}</p>
					</div>
				)}
				<div className="flex h-64 w-full items-center justify-center rounded-md bg-gray-700">
					<Image
						src={avatarUrl}
						width={256}
						height={256}
						alt={'your generated image'}
						unoptimized
					/>
				</div>
				{prompt && <PromptComponent prompt={prompt} />}
			</div>
		</Container>
	);
};
