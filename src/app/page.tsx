import { UserInput } from '@/components/user-input';
import { InfoSection } from '@/components/info-section';
import { Analytics } from '@vercel/analytics/react';

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
			<UserInput />
			<InfoSection />
			<Analytics />
		</div>
	);
}
