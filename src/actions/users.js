export const RECEIVED_USERS = 'RECEIVED_USERS';
export const ADD_QUESTION_FOR_AUTHENTICATED_USER = 'ADD_QUESTION_FOR_AUTHENTICATED_USER';
export const ADD_ANSWER_FOR_AUTHENTICATED_USER = 'ADD_ANSWER_FOR_AUTHENTICATED_USER';

/**
 * Gets or fetches all users from the database
 * @param {*} _users users object from the db
 * @returns an Object with event `type` and `users`
 */
export function receivedUsers(_users) {
    return {
        type: RECEIVED_USERS,
        users: _users
    }
}

/**
 * Adds a new question for the an authenticated user
 * @param {*} _authenticatedUser the id of the user adding the question
 * @param {*} _id id of the question
 * @returns an Object with event `type`, `authenticatedUser` and `id`
 */
export function addQuestionForAuthenticatedUser(_authenticatedUser, _id) {
    return {
        type: ADD_QUESTION_FOR_AUTHENTICATED_USER,
        authenticatedUser: _authenticatedUser,
        id: _id
    }
}

/**
 * Adds a new answer record for an authenticated user on a specific question
 * @param {*} _authenticatedUser the id of the user answering the question
 * @param {*} _id the id of the question being answered
 * @param {*} _answer the answer provided to the question
 * @returns an Object with `authenticatedUser`, `id`, and `answer`
 */
export function addAnswerForAuthenticatedUser (_authenticatedUser, _id, _answer) {
    return {
        type: ADD_ANSWER_FOR_AUTHENTICATED_USER,
        authenticatedUser: _authenticatedUser,
        id: _id,
        answer: _answer,
    }
}
