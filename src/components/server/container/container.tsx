import clsx from 'clsx';

type ContainerProps = {
	children: React.ReactNode;
	className?: string;
};

export const Container = ({ children, className }: ContainerProps) => {
	return (
		<div
			className={clsx(
				'mt-6 w-full max-w-md rounded-md bg-gray-800 p-8 shadow-lg',
				className,
			)}
		>
			{children}
		</div>
	);
};
