'use client';

import { Flowbite as FlowbiteProvider } from 'flowbite-react';
import { Provider as JotaiProvider } from 'jotai';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<JotaiProvider>
			<FlowbiteProvider
				theme={{
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
				}}
			>
				{children}
			</FlowbiteProvider>
		</JotaiProvider>
	);
}
