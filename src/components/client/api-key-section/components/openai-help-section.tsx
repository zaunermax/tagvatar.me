export const OpenaiHelpSection = () => {
	return (
		<ol className="list-inside list-decimal text-gray-400">
			<li>
				Create an account on{' '}
				<a
					className="underline hover:text-blue-400"
					href="https://platform.openai.com/"
					target={'_blank'}
				>
					openai.com
				</a>
			</li>
			<li>
				Then go to{' '}
				<a
					className="underline hover:text-blue-400"
					href="https://platform.openai.com/account/api-keys"
					target={'_blank'}
				>
					the api key section
				</a>
			</li>
			<li>Generate a new secret key and copy it</li>
			<li>Put the key into the input</li>
			<li>The first 5$ worth of generation is free</li>
		</ol>
	);
};
