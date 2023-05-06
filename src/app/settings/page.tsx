'use client';

import { Accordion, Alert, Button, Label, TextInput } from 'flowbite-react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { FormEvent, useCallback, useId } from 'react';
import { HiInformationCircle } from 'react-icons/hi';

import {
	openaiApiKeyAtom,
	sdApiKeyAtom,
	settingsAtom,
	writeOpenaiApiKeyValidAtom,
	writeSdApiKeyValidAtom,
} from '@/atoms/settings.atom';
import { InfoSection } from '@/components/client/info-section';
import { LoadingSpinner } from '@/components/client/loading-spinner-text';
import { Container } from '@/components/server/container';
import { checkOpenaiApiKey } from '@/server-actions/check-openai-key';
import { checkSdApiKey } from '@/server-actions/sd-image-actions';

import { useApiKeyValid } from './hooks/use-openai-api-key-valid';

// TODO: clean up this duplicated mess of a code :(
export default function Settings() {
	const openAiApiKeyId = useId();
	const sdApiKeyId = useId();
	const router = useRouter();

	const [
		{ openaiApiKey, openaiApiKeyValid, dreamStudioApiKey, dreamStudioApiKeyValid },
		setSettings,
	] = useAtom(settingsAtom);

	const [openaiPending] = useApiKeyValid({
		keyAtom: openaiApiKeyAtom,
		validAtom: writeOpenaiApiKeyValidAtom,
		checkApiKey: checkOpenaiApiKey,
	});

	const [sdPending] = useApiKeyValid({
		keyAtom: sdApiKeyAtom,
		validAtom: writeSdApiKeyValidAtom,
		checkApiKey: checkSdApiKey,
	});

	const goToDalle = useCallback(() => router.push('/dalle'), [router]);
	const goToSd = useCallback(() => router.push('/sd'), [router]);

	const onChangeOpenAPIKey = useCallback(
		(e: FormEvent<HTMLInputElement>) =>
			setSettings((prev) => ({ ...prev, openaiApiKey: e.currentTarget.value })),
		[setSettings],
	);

	const onChangeSdAPIKey = useCallback(
		(e: FormEvent<HTMLInputElement>) =>
			setSettings((prev) => ({ ...prev, dreamStudioApiKey: e.currentTarget.value })),
		[setSettings],
	);

	return (
		<>
			<Container>
				<h1 className="mb-6 text-center text-2xl font-bold leading-tight text-white md:text-3xl">
					Settings
				</h1>
				<div className="mb-2 block">
					<Label htmlFor={openAiApiKeyId} value="Your openAI API key" />
				</div>
				<TextInput
					id={openAiApiKeyId}
					type="password"
					placeholder="OpenAI API Key"
					className="w-full"
					value={openaiApiKey}
					onChange={onChangeOpenAPIKey}
				/>
				{openaiApiKeyValid === false && !openaiPending && (
					<Alert className="mt-4" color="warning" icon={HiInformationCircle}>
						Your key does not seem to be valid.
					</Alert>
				)}
				<Accordion className="mt-4" collapseAll>
					<Accordion.Panel flush={false}>
						<Accordion.Title>How do I get an OpenAI API key?</Accordion.Title>
						<Accordion.Content>
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
						</Accordion.Content>
					</Accordion.Panel>
				</Accordion>
				<Button
					className="mt-4 w-full"
					gradientDuoTone="purpleToPink"
					disabled={!openaiApiKeyValid || openaiPending}
					onClick={goToDalle}
				>
					{openaiPending ? (
						<LoadingSpinner text={'Checking key...'} />
					) : openaiApiKeyValid ? (
						'Back to DALL-E'
					) : (
						'Enter a valid API key first'
					)}
				</Button>
				<div className="mt-8">
					<div className="mb-2 block">
						<Label htmlFor={sdApiKeyId} value="Your dreamstudio API key" />
					</div>
					<TextInput
						id={sdApiKeyId}
						type="password"
						placeholder="OpenAI API Key"
						className="w-full"
						value={dreamStudioApiKey}
						onChange={onChangeSdAPIKey}
					/>
					{openaiApiKeyValid === false && !sdPending && (
						<Alert className="mt-4" color="warning" icon={HiInformationCircle}>
							Your key does not seem to be valid.
						</Alert>
					)}
					<Accordion className="mt-4" collapseAll>
						<Accordion.Panel flush={false}>
							<Accordion.Title>How do I get a dreamstudio API key?</Accordion.Title>
							<Accordion.Content>
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
							</Accordion.Content>
						</Accordion.Panel>
					</Accordion>
					<Button
						className="mt-4 w-full"
						gradientDuoTone="purpleToPink"
						disabled={!dreamStudioApiKeyValid || sdPending}
						onClick={goToSd}
					>
						{sdPending ? (
							<LoadingSpinner text={'Checking key...'} />
						) : dreamStudioApiKeyValid ? (
							'Back to StableDiffusion'
						) : (
							'Enter a valid API key first'
						)}
					</Button>
				</div>
			</Container>
			<InfoSection />
		</>
	);
}
