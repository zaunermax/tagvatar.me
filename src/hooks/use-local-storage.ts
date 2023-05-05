import { useDebugValue, useEffect, useState } from 'react';
export const useLocalStorage = <S>(
	key: string,
	initialState?: S | (() => S),
): [S, React.Dispatch<React.SetStateAction<S>>] => {
	const [state, setState] = useState<S>(initialState as S);
	useDebugValue(state);

	useEffect(() => {
		const item = localStorage.getItem(key);
		console.log('got oida', key, item);
		if (item) setState(parse(item));
	}, [key]);

	useEffect(() => {
		console.log('setz oida', key, state);
		localStorage.setItem(key, JSON.stringify(state));
	}, [key, state]);

	return [state, setState];
};

const parse = (value: string) => {
	try {
		return JSON.parse(value);
	} catch {
		return value;
	}
};
