export const handleFetchErrors = async (res: Response) => {
	if (!res.ok) throw new Error((await res.json()).message);
	return res.json();
};
