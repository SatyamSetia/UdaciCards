import { FETCH_ALL_DECKS, FETCH_DECK } from '../actions/decks';

export function deckReducer(state={}, action) {
	switch(action.type) {
		case FETCH_ALL_DECKS: return action.payload;
		case FETCH_DECK: return action.payload
		default: return state;
	}
}