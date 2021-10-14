export const SET_AUTHENTICATED_USER = 'SET_AUTHENTICATED_USER';

/**
 * Sets the `id` of the authenticated user by accepting the id
 * as a parameter
 * @param {*} _id id of the user being authenticated
 * @returns an Object with event or action `type` and `id`
 */
export function setAuthenticatedUser (_id) {
    return {
        type: SET_AUTHENTICATED_USER,
        id: _id
    }
}