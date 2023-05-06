'use server';

import { Configuration, OpenAIApi } from 'openai';

export async function checkOpenaiApiKey(apiKey: string) {
	const openAiConfig = new Configuration({ apiKey });
	const api = new OpenAIApi(openAiConfig);

	return api
		.listModels()
		.then(() => true)
		.catch(() => false);
}
