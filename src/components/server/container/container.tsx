export const Container = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="mt-6 w-full max-w-md rounded-md bg-gray-800 p-8 shadow-lg">
			{children}
		</div>
	);
};
