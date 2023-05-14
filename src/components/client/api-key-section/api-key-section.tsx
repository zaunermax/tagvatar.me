import clsx from 'clsx';
import { Accordion, Alert, Button, Label, TextInput } from 'flowbite-react';
import { SetStateAction, WritableAtom, useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { FormEvent, ReactNode, useCallback, useId } from 'react';
import { HiInformationCircle } from 'react-icons/hi';

import { KeySettingType } from '@/atoms/settings.atom';
import { LoadingSpinner } from '@/components/client/loading-spinner-text';
import { useApiKeyValid } from '@/hooks/use-openai-api-key-valid';

type ApiKeySectionProps = {
	checkApiKey: (key: string) => Promise<boolean>;
	goBackPath: string;
	labelText: string;
	backToText: string;
	helpTitle: string;
	children: ReactNode;
	className?: string;
	settingsAtom: WritableAtom<KeySettingType, [SetStateAction<KeySettingType>], void>;
};

export const ApiKeySection = ({
	checkApiKey,
	goBackPath,
	labelText,
	backToText,
	helpTitle,
	children,
	className,
	settingsAtom,
}: ApiKeySectionProps) => {
	const keyElementId = useId();
	const router = useRouter();

	const [{ apiKey, isValid }, setSetting] = useAtom(settingsAtom);

	const [openaiPending] = useApiKeyValid({
		settingsAtom,
		checkApiKey,
	});

	const onChangeKey = useCallback(
		(e: FormEvent<HTMLInputElement>) =>
			setSetting((prev) => ({ ...prev, apiKey: e.currentTarget.value })),
		[setSetting],
	);

	const onGoTo = useCallback(() => router.push(goBackPath), [goBackPath, router]);

	return (
		<div className={clsx('space-y-4', className)}>
			<div>
				<div className="mb-2 block">
					<Label htmlFor={keyElementId} value={labelText} />
				</div>
				<TextInput
					id={keyElementId}
					type="password"
					placeholder="Enter your API key"
					className="w-full"
					value={apiKey}
					onChange={onChangeKey}
				/>
			</div>
			{isValid === false && !openaiPending && (
				<Alert color="warning" icon={HiInformationCircle}>
					Your key does not seem to be valid.
				</Alert>
			)}
			<Accordion collapseAll>
				<Accordion.Panel flush={false}>
					<Accordion.Title>{helpTitle}</Accordion.Title>
					<Accordion.Content>{children}</Accordion.Content>
				</Accordion.Panel>
			</Accordion>
			<Button
				className="w-full"
				gradientDuoTone="purpleToPink"
				disabled={!isValid || openaiPending}
				onClick={onGoTo}
			>
				{openaiPending ? (
					<LoadingSpinner text={'Checking key...'} />
				) : isValid ? (
					backToText
				) : (
					'Enter a valid API key first'
				)}
			</Button>
		</div>
	);
};
