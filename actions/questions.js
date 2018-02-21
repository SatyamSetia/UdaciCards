import { addQuestion } from "../utils/api";
import { fetchAlldecksAction } from './decks'

export function addQuestionActionCreator(deckTitle, queAns) {
	return function(dispatch) {
		return addQuestion(deckTitle, queAns);
	}
}