import { getInitialAppData }  from '../utils/data/api'
import { _saveQuestion, _saveQuestionAnswer } from '../utils/data/_DATA.js'

import { receivedUsers, addQuestionForAuthenticatedUser, addAnswerForAuthenticatedUser } from './users';
import { setAuthenticatedUser } from './authenticatedUser'
import { receivedQuestions, addQuestionAction, addAnswerAction } from './questions';

// set the initial id to empty or null
const USER_ID = ''

/**
 * Gets all users, questions, and sets authenticated users at 
 * app start
 * @returns a dispatch of objects
 */
export function handleGetInitialAppData() {
    return dispatch => {
        // dispatch(showLoading())
        return getInitialAppData().then(({ users, questions }) => {
            dispatch(receivedUsers(users))
            dispatch(receivedQuestions(questions))
            dispatch(setAuthenticatedUser(USER_ID))
            // dispatch(hideLoading())
        })
    }
}

/**
 * 
 * @param {*} _optionOneText 
 * @param {*} _optionTwoText 
 * @returns 
 */
export function handleAddQuestion (_optionOneText, _optionTwoText) {
    return (dispatch, getState) => {
        const { authenticatedUser } = getState();

        // dispatch(showLoading())
        return _saveQuestion({
            author: authenticatedUser,
            optionOneText: _optionOneText,
            optionTwoText: _optionTwoText
        }).then((question) => {
            dispatch(addQuestionAction(question))
            dispatch(addQuestionForAuthenticatedUser(authenticatedUser, question.id))
        })//.then(() => dispatch(hideLoading()))
    }
}

/**
 * Adds an answer to question by attaching the current or authenticatedUser id
 * @param {*} _id 
 * @param {*} _answer 
 * @returns return an object 
 */
export function handleAddAnswer(_id, _answer) {
    return (dispatch, getState) => {
        const { authenticatedUser } = getState();

        return _saveQuestionAnswer({
            authenticatedUser: authenticatedUser,
            questionId: _id,
            answer: _answer
        }).then(dispatch(addAnswerAction(_id, _answer, authenticatedUser))
        ).then( dispatch(addAnswerForAuthenticatedUser(authenticatedUser, _id, _answer)))
    }
}