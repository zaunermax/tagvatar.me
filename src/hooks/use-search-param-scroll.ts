import { useSearchParams } from 'next/navigation';

import { useDelayedScrollIntoView } from './use-delayed-scroll-into-view';

export const useSearchParamScroll = (searchParamKey: string) => {
	const searchParams = useSearchParams();
	const focus = searchParams.get(searchParamKey);
	useDelayedScrollIntoView(focus);
};
