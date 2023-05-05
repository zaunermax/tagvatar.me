export const getGeneratedImage = (gamerTag: string, apiKey: string, genre: string) =>
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
