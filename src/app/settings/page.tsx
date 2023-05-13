'use client';

import { openaiSettingsAtom, sdSettingsAtom } from '@/atoms/settings.atom';
import {
	OpenaiHelpSection,
	SdHelpSection,
	ApiKeySection,
} from '@/components/client/api-key-section';
import { Container } from '@/components/server/container';
import { InfoSection } from '@/components/server/info-section';
import { checkOpenaiApiKey } from '@/server-actions/check-openai-key';
import { checkSdApiKey } from '@/server-actions/sd-image-actions';

export default function Settings() {
	return (
		<>
			<InfoSection />
			<Container className="space-y-6">
				<h1 className="text-center text-2xl font-bold leading-tight text-white md:text-3xl">
					Settings
				</h1>
				<ApiKeySection
					settingsAtom={sdSettingsAtom}
					checkApiKey={checkSdApiKey}
					goBackPath={'/sd'}
					labelText={'DreamStudio API Key'}
					backToText={'Back to StableDiffusion'}
					helpTitle={'How to get a DreamStudio API key?'}
				>
					<SdHelpSection />
				</ApiKeySection>
				<ApiKeySection
					settingsAtom={openaiSettingsAtom}
					checkApiKey={checkOpenaiApiKey}
					goBackPath={'/dalle'}
					labelText={'OpenAI API Key'}
					backToText={'Back to DALL-E'}
					helpTitle={'How to get an OpenAI API key?'}
				>
					<OpenaiHelpSection />
				</ApiKeySection>
			</Container>
		</>
	);
}
