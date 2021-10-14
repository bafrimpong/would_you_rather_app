import { RECEIVED_QUESTIONS, ADD_QUESTION, ADD_ANSWER } from '../actions/questions';

export default function questions(state = {}, action) {
    const { type, question, id, answer, authenticatedUser } = action
    switch (type) {
        case RECEIVED_QUESTIONS:
            return {
                ...state, ...action.questions
            }
        case ADD_QUESTION:
            return {
                ...state,
                [question.id]: question
            }
        case ADD_ANSWER:
            return {
                ...state,
                [id]: {
                    ...state[id],
                    [answer]: {
                        ...state[id][answer],
                        votes: state[id][answer].votes.concat(authenticatedUser)
                    }
                }
            }
        default:
            return state
    }
}