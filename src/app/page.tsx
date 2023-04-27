import { UserInput } from '@/components/user-input';
import { InfoSection } from '@/components/info-section';

export default function Home() {
	return (
		<div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
			<UserInput />
			<InfoSection />
		</div>
	);
}
