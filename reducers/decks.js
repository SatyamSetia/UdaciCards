import { FETCH_ALL_DECKS } from '../actions/decks';

export function deckReducer(state={}, action) {
	switch(action.type) {
		case FETCH_ALL_DECKS: return action.payload;
		default: return state;
	}
}