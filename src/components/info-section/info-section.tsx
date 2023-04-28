export const InfoSection = () => {
	return (
		<div className="mt-6 max-w-md px-4 text-gray-300">
			<h2 className="mb-2 font-semibold">How do I get an API key?</h2>
			<ol className="list-inside list-decimal">
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
				<li>Generate a new secret key and copy it to the input</li>
				<li>The first 5$ worth of generation is free</li>
			</ol>
		</div>
	);
};
