'use server';

import {
	allPrompts,
	enumToPrompts,
	GameGenre,
	getRandomGamerAvatarPrompt,
} from '@/utils/image-prompts';

const engineId = 'stable-diffusion-xl-beta-v2-2-2';
const apiHost = 'https://api.stability.ai';

export interface GenerationResponse {
	artifacts: Array<{
		base64: string;
		seed: number;
		finishReason: string;
	}>;
}

export const generateStableDiffusionImage = async (
	apiKey: string,
	genre: string,
	gamerTag: string,
) => {
	const prompts = enumToPrompts[genre as GameGenre] ?? allPrompts;
	const prompt = getRandomGamerAvatarPrompt(prompts, gamerTag.slice(0, 50));

	const response = await fetch(`${apiHost}/v1/generation/${engineId}/text-to-image`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			text_prompts: [{ text: prompt }],
			height: 512,
			width: 512,
			steps: 30,
		}),
	});

	if (!response.ok) {
		return {
			prompt,
			url: null,
			error: 'Something went wrong, please try again later.',
		};
	}

	const responseJSON = (await response.json()) as GenerationResponse;
	const base64 = responseJSON.artifacts[0]?.base64;

	return {
		prompt,
		url: base64 ? `data:image/png;base64,${base64}` : null,
	};
};

export const checkSdApiKey = async (apiKey: string) => {
	const response = await fetch(`${apiHost}/v1/user/account`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${apiKey}`,
		},
	});

	return response.ok;
};
