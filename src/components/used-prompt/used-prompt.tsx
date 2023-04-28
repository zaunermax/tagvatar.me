export const PromptComponent = ({ prompt }: { prompt: string }) => {
	return (
		<div className="mt-4 rounded-md bg-gray-700 p-4">
			<h3 className="mb-2 font-semibold text-white">Used Prompt:</h3>
			<p className="text-gray-300">{prompt}</p>
		</div>
	);
};
