// eslint-disable-next-line no-unused-vars
import * as Types from '$lib/types';
import { writable } from 'svelte/store';

/** @type Types.Session */
export const blankSession = {
	UserName: null,
	Token: null,
	SignedIn: false
};

export const userSession = writable(blankSession);
