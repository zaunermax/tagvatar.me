'use client';

import { Alert } from 'flowbite-react';
import { Container } from '@/components/server';
import { HiInformationCircle } from 'react-icons/hi';

export default function Settings() {
	return (
		<Container>
			<h1 className="mb-6 text-center text-2xl font-bold leading-tight text-white md:text-3xl">
				🚧 Under construction 🚧
			</h1>
			<Alert icon={HiInformationCircle} color="warning">
				<div>Coming soon</div>
			</Alert>
		</Container>
	);
}
