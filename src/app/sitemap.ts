import { MetadataRoute } from 'next';

import { getServerURL } from '@/utils/get-server-url';

export default function sitemap(): MetadataRoute.Sitemap {
	const base = getServerURL();

	return [
		{
			url: base,
			lastModified: new Date(),
		},
		{
			url: `${base}/dalle`,
			lastModified: new Date(),
		},
		{
			url: `${base}/sd`,
			lastModified: new Date(),
		},
		{
			url: `${base}/settings`,
			lastModified: new Date(),
		},
	];
}
