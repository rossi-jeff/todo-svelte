export const buildHeaders = () => {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Accept', 'application/json');
	return headers;
};
