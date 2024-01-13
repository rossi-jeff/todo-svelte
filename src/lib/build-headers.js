// eslint-disable-next-line no-unused-vars
import * as Types from '$lib/types';

export const buildHeaders = (/** @type Types.Session */ session) => {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Accept', 'application/json');
	if (session.Token) {
		headers.append('Authorization', `Bearer ${session.Token}`);
	}
	return headers;
};
