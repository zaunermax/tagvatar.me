export const InfoSection = () => {
	return (
		<div className="mt-6 text-gray-300 max-w-md">
			<h2 className="font-semibold mb-2">How do I get an API key?</h2>
			<ol className="list-decimal list-inside">
				<li>
					Create an account on{' '}
					<a
						className="underline hover:text-blue-400"
						href="https://platform.openai.com/"
					>
						openai.com
					</a>
				</li>
				<li>
					Then go to{' '}
					<a
						className="underline hover:text-blue-400"
						href="https://platform.openai.com/account/api-keys"
					>
						the api key section
					</a>
				</li>
				<li>Create a new API key and copy it to the input above</li>
				<li>The first 5$ are completely free</li>
				<li>You can generate a lot of images with that</li>
			</ol>
		</div>
	);
};
