/**
 * @typedef User
 * @type {object}
 * @property {string} Id
 * @property {string} Created
 * @property {string} Updated
 * @property {number} Version
 * @property {boolean} IsDeleted
 * @property {string} UserName
 * @property {string} Email
 * @property {boolean} Random
 */

/**
 * @typedef Todo
 * @type {object}
 * @property {string} Id
 * @property {string} Created
 * @property {string} Updated
 * @property {number} Version
 * @property {boolean} IsDeleted
 * @property {string} Task
 * @property {boolean} Completed
 * @property {number} UserId
 */

/**
 * @typedef Session
 * @type {object}
 * @property {boolean} SignedIn
 * @property {?string} UserName
 * @property {?string} Token
 */

export const Types = {};
