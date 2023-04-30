import { useEffect } from 'react';

export const useDelayedScrollIntoView = (id: string | null) => {
	useEffect(() => {
		if (id)
			setTimeout(() => {
				document.getElementById(id)?.scrollIntoView({
					behavior: 'smooth',
				});
			}, 100);
	}, [id]);
};
