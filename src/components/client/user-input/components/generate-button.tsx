import { Button } from 'flowbite-react';
import { useAtom } from 'jotai/index';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { openaiApiKeyAtom } from '@/atoms/settings.atom';
import { LoadingSpinner } from '@/components/client/loading-spinner-text';

type GenerateButtonProps = {
	loading: boolean;
	generateImage: () => Promise<void> | void;
	imageExists: boolean;
};

export const GenerateButton = ({
	loading,
	generateImage,
	imageExists,
}: GenerateButtonProps) => {
	const router = useRouter();

	const [apiKey] = useAtom(openaiApiKeyAtom);

	const buttonText = apiKey
		? `${imageExists ? 'Re-' : ''}Generate Image`
		: 'Set your API key';

	const linkToSettings = useCallback(() => {
		router.push('/settings');
	}, [router]);

	return (
		<Button
			gradientDuoTone={apiKey ? 'purpleToPink' : 'redToYellow'}
			className="mt-4 w-full"
			disabled={loading}
			onClick={apiKey ? generateImage : linkToSettings}
		>
			{loading ? <LoadingSpinner /> : buttonText}
		</Button>
	);
};
