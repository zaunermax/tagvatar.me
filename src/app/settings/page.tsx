'use client';

import { Accordion, Alert, Button, Label, TextInput } from 'flowbite-react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { FormEvent, useCallback, useEffect, useId, useTransition } from 'react';
import { HiInformationCircle } from 'react-icons/hi';

import { settingsAtom } from '@/atoms/settings.atom';
import { InfoSection } from '@/components/client/info-section';
import { LoadingSpinner } from '@/components/client/loading-spinner-text';
import { Container } from '@/components/server/container';

import { useOpenaiApiKeyValid } from './hooks/use-openai-api-key-valid';

export default function Settings() {
	const openAiApiKeyId = useId();
	const router = useRouter();

	const [{ openaiApiKey, openaiApiKeyValid }, setSettings] = useAtom(settingsAtom);

	const { isPending } = useOpenaiApiKeyValid();

	const goToDalle = useCallback(() => router.push('/'), [router]);

	const onChangeOpenAPIKey = useCallback(
		(e: FormEvent<HTMLInputElement>) =>
			setSettings((prev) => ({ ...prev, openaiApiKey: e.currentTarget.value })),
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
				{openaiApiKeyValid === false && !isPending && (
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
					disabled={!openaiApiKeyValid || isPending}
					onClick={goToDalle}
				>
					{isPending ? (
						<LoadingSpinner text={'Checking key...'} />
					) : openaiApiKeyValid ? (
						'Back to DALL-E'
					) : (
						'Enter a valid API key first'
					)}
				</Button>
			</Container>
			<InfoSection />
		</>
	);
}
