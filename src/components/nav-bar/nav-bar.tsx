'use client';

import { Avatar, Badge, Dropdown, Navbar } from 'flowbite-react';
import { default as Image } from 'next/image';

export const NavBar = () => {
	return (
		<div className="flex w-full max-w-7xl px-0 md:px-6">
			<Navbar fluid={true} rounded={true} className="w-full max-w-7xl md:mt-6">
				<Navbar.Brand href="#">
					<Image
						src={'/logo.png'}
						alt={'the tagvatar logo'}
						width={64}
						height={64}
						className="mr-3 h-11 w-11 rounded-full"
					/>
				</Navbar.Brand>
				<div className="flex md:order-2">
					<Dropdown
						arrowIcon={false}
						inline={true}
						label={
							<Avatar
								alt="User settings"
								img={() => (
									<Image
										src={'/avatar-placeholder.png'}
										alt={'the tagvatar logo'}
										width={64}
										height={64}
										className="h-11 w-11 rounded-full"
									/>
								)}
								rounded={true}
								className={'mr-2 md:mr-0'}
							/>
						}
					>
						<Dropdown.Header>
							<span className="block text-sm">Anonymous</span>
						</Dropdown.Header>
						<Dropdown.Item>
							Settings{' '}
							<Badge className="ml-2" color="warning">
								soon
							</Badge>
						</Dropdown.Item>
					</Dropdown>
					<Navbar.Toggle />
				</div>
				<Navbar.Collapse>
					<Navbar.Link href="#">DALL-E</Navbar.Link>
					<Navbar.Link href="#" disabled>
						<span className="flex flex-wrap gap-2">
							<span>Stable Diffusion</span>
							<Badge color="warning">soon</Badge>
						</span>
					</Navbar.Link>
					<Navbar.Link href="#" disabled>
						<span className="flex flex-wrap gap-2">
							<span>Midjourney</span>
							<Badge color="warning">soon</Badge>
						</span>
					</Navbar.Link>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};
