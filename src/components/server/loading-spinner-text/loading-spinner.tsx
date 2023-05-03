import { Spinner } from 'flowbite-react';

export const LoadingSpinner = () => {
	return (
		<div role="status">
			<Spinner aria-label={'button loading spinner'} />
			Loading...
		</div>
	);
};
