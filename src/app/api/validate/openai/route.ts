import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

export async function GET(request: NextRequest) {
	const urlSearchParams = new URLSearchParams(request.nextUrl.search);

	const openApiKey = urlSearchParams.get('openApiKey');

	if (!openApiKey)
		return NextResponse.json({ message: 'No API key provided' }, { status: 400 });

	const openAiConfig = new Configuration({ apiKey: openApiKey });
	const api = new OpenAIApi(openAiConfig);

	const isValid = await api
		.listModels()
		.then(() => true)
		.catch(() => false);

	return NextResponse.json({ isValid });
}
