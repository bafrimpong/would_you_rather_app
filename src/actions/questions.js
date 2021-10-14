export const RECEIVED_QUESTIONS = 'RECEIVED_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER = 'ADD_ANSWER';

/**
 * Gets or fetches all questions from the database
 * @param {*} _questions questions received or called from the db
 * @returns an object with event `type`, and `questions`
 */
export function receivedQuestions (_questions) {
    return {
        type: RECEIVED_QUESTIONS,
        questions: _questions
    }
}

/**
 * Adds or saves a question record to the database
 * @param {*} _question the question text to be saved
 * @returns an object with event `type`, and `question`
 */
export function addQuestionAction(_question) {
    console.log('CHECKING IF THIS METHOD IS REALLY CALLED', _question)
    return {
        type: ADD_QUESTION,
        question: _question
    }
}

/**
 * Adds or saves an answer record to the database
 * @param {*} _id id of the question to be answered
 * @param {*} _answer the answer to the question
 * @param {*} _authenticatedUser id of the user answering the question
 * @returns an object with event `type`, `id`, `answer`, and `authenticatedUser`
 */
export function addAnswerAction(_id, _answer, _authenticatedUser) {
    return {
        type: ADD_ANSWER,
        id: _id,
        answer: _answer,
        authenticatedUser: _authenticatedUser
    }
}