export const SdHelpSection = () => {
	return (
		<ol className="list-inside list-decimal text-gray-400">
			<li>
				Create an account on{' '}
				<a
					className="underline hover:text-blue-400"
					href="https://beta.dreamstudio.ai/account"
					target={'_blank'}
				>
					dreamstudio.ai
				</a>
			</li>
			<li>
				Then go to{' '}
				<a
					className="underline hover:text-blue-400"
					href="https://beta.dreamstudio.ai/account"
					target={'_blank'}
				>
					the api key section
				</a>
			</li>
			<li>Copy the key that was already generated</li>
			<li>Put the key into the input</li>
			<li>You will get about 10-15 images for free</li>
		</ol>
	);
};
