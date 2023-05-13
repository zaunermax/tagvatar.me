import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { LoadingSpinner } from '@/components/client/loading-spinner-text';

type GenerateButtonProps = {
	loading: boolean;
	generateImage: () => Promise<void> | void;
	imageExists: boolean;
	apiKeyValid: boolean | null;
};

export const GenerateButton = ({
	loading,
	generateImage,
	imageExists,
	apiKeyValid,
}: GenerateButtonProps) => {
	const router = useRouter();

	const buttonText = apiKeyValid
		? `${imageExists ? 'Re-' : ''}Generate Image`
		: 'Set your API key';

	const linkToSettings = useCallback(() => {
		router.push('/settings');
	}, [router]);

	return (
		<Button
			gradientDuoTone={apiKeyValid ? 'purpleToPink' : 'redToYellow'}
			className="w-full"
			disabled={loading}
			onClick={apiKeyValid ? generateImage : linkToSettings}
		>
			{loading ? <LoadingSpinner /> : buttonText}
		</Button>
	);
};
