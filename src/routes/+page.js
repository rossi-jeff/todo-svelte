import { baseUrl } from '$lib';
// eslint-disable-next-line no-unused-vars
import * as Types from '$lib/types'

export async function load({ fetch }) {
    /** @type {Array.<string>} */
    const userNames = []
    const result = await fetch(`${baseUrl}/user`)
    /** @type {Array.<Types.User>} */
    const users = await result.json()
    for (const u of users) {
        if (u.Random) userNames.push(u.UserName)
    }
    return { userNames }
}