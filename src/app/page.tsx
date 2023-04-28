import { UserInput } from '@/components/user-input';
import { InfoSection } from '@/components/info-section';
import { Analytics } from '@vercel/analytics/react';
import { getServerURL } from '@/utils';

export default async function Home() {
	const genres = await fetch(`${getServerURL()}/api/generate`, {
		method: 'GET',
		next: { revalidate: 60 * 60 },
	})
		.then((res) => res.json())
		.then(({ options }) => options as string[]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
			<UserInput genres={genres} />
			<InfoSection />
			<Analytics />
		</div>
	);
}
