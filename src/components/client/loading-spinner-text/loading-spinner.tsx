import { LoadingSVG } from './comopnents/loading-svg';

export const LoadingSpinner = () => {
	return (
		<div role="status">
			<LoadingSVG />
			Loading...
		</div>
	);
};
