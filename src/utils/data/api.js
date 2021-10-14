import { _getUsers, _getQuestions } from './_DATA.js';

export const POLL = "POLL";
export const POLL_RESULTS = "POLL_RESULTS";
export const UNANSWERED_QUESTION = "UNANSWERED_QUESTION";
export const ANSWERED_QUESTION = "ANSWERED_QUESTION";
export const SCORE = "score";

export function getInitialAppData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([_users, _questions]) => ({
    users: _users,
    questions: _questions,
  }))
}

