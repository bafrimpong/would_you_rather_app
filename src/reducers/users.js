import { RECEIVED_USERS, ADD_QUESTION_FOR_AUTHENTICATED_USER, ADD_ANSWER_FOR_AUTHENTICATED_USER } from '../actions/users';

export default function users(state = {}, action) {
    const { type } = action

    switch (type) {
        case RECEIVED_USERS:
            return {
                ...state, ...action.users
            }
        case ADD_QUESTION_FOR_AUTHENTICATED_USER:
            const { authenticatedUser, id } = action
            return {
                ...state,
                [authenticatedUser]: {
                    ...state[authenticatedUser],
                    questions: state[authenticatedUser].questions.concat(id)
                }
            }
        case ADD_ANSWER_FOR_AUTHENTICATED_USER:
            const { answer } = action
            return {
                ...state,
                [action.authenticatedUser]: {
                    ...state[action.authenticatedUser],
                    answers: {
                        ...state[action.authenticatedUser].answers,
                        [action.id]: answer
                    }
                }
            }
        default:
            return state
    }
}