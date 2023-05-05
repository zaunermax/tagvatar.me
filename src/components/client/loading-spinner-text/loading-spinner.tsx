import { LoadingSVG } from './comopnents/loading-svg';

type LoadingSpinnerProps = {
	className?: string;
	text?: string;
};

export const LoadingSpinner = ({ className, text }: LoadingSpinnerProps) => {
	return (
		<div role="status" className={className}>
			<LoadingSVG />
			{text ?? 'Loading...'}
		</div>
	);
};
