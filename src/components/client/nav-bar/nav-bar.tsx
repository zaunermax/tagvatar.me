'use client';

import { Avatar, Badge, Button, Dropdown, Navbar } from 'flowbite-react';
import { default as Image } from 'next/image';
import { default as Link } from 'next/link';

export const NavBar = () => {
	return (
		<div className="flex w-full max-w-7xl px-0 md:px-6">
			<Navbar fluid={true} rounded={true} className="w-full max-w-7xl md:mt-6">
				<Navbar.Brand href="/">
					<Image
						src={'/logo.png'}
						alt={'the tagvatar logo'}
						width={64}
						height={64}
						className="mr-3 h-11 w-11 rounded-full"
					/>
				</Navbar.Brand>
				<div className="flex md:order-2">
					<Link href="/settings">
						<Button gradientDuoTone="purpleToPink">Settings</Button>
					</Link>
					<Navbar.Toggle className="ml-2 md:ml-0" />
				</div>
				<Navbar.Collapse>
					<Link href={'/'}>
						<Navbar.Link as={'span'}>DALL-E</Navbar.Link>
					</Link>
					<Link href={'#'}>
						<Navbar.Link as={'span'} disabled>
							<span className="flex flex-wrap gap-2">
								<span>Stable Diffusion</span>
								<Badge color="warning">soon</Badge>
							</span>
						</Navbar.Link>
					</Link>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};
