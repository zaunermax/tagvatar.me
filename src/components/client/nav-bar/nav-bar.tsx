'use client';

import { Button, Navbar } from 'flowbite-react';
import { default as Image } from 'next/image';
import { default as Link } from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import logo from './assets/logo.png';

export const NavBar = () => {
	const activeSegment = useSelectedLayoutSegment();

	return (
		<div className="flex w-full max-w-7xl px-0 md:px-6">
			<Navbar fluid={true} rounded={true} className="w-full max-w-7xl md:mt-6">
				<Link href={'/'}>
					<Navbar.Brand as={'span'}>
						<Image
							src={logo}
							alt={'the tagvatar logo'}
							className="mr-3 h-11 w-11 rounded-full"
						/>
					</Navbar.Brand>
				</Link>
				<div className="flex md:order-2">
					<Link href="/settings">
						<Button gradientDuoTone="purpleToPink">Settings</Button>
					</Link>
					<Navbar.Toggle className="ml-2 md:ml-0" />
				</div>
				<Navbar.Collapse>
					<Link href={'/sd'}>
						<Navbar.Link as={'span'} active={activeSegment?.includes('sd')}>
							Stable Diffusion
						</Navbar.Link>
					</Link>
					<Link href={'/dalle'}>
						<Navbar.Link as={'span'} active={activeSegment?.includes('dalle')}>
							DALL-E
						</Navbar.Link>
					</Link>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};
