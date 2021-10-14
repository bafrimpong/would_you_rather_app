import { SET_AUTHENTICATED_USER } from '../actions/authenticatedUser';

/**
 * A function to check for the type of an action or event to be performed
 * and returns the appropriate object or results based on the parameters passed to it.
 * @param {*} state the state of a component
 * @param {*} action the action to be performed
 * @returns an object
 */
export default function authenticatedUser(state = null, action){
    switch (action.type) {
        case SET_AUTHENTICATED_USER:
            return action.id
        default:
            return state
    }
}