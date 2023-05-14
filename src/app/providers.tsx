'use client';

import { Flowbite as FlowbiteProvider, ThemeProps } from 'flowbite-react';
import { Provider as JotaiProvider } from 'jotai';
import { SessionProvider } from 'next-auth/react';

const theme: ThemeProps = {
	dark: true,
	theme: {
		accordion: {
			root: {},
			title: {
				flush: {
					off: 'focus:ring-4 focus:ring-gray-200 dark:focus:ring-blue-500',
				},
			},
		},
	},
};

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<JotaiProvider>
			<FlowbiteProvider theme={theme}>
				<SessionProvider>{children}</SessionProvider>
			</FlowbiteProvider>
		</JotaiProvider>
	);
}
