import { createDeck, fetchAllDecks, fetchDeck } from "../utils/api";
export const FETCH_ALL_DECKS = "FETCH_ALL_DECKS";

export function fetchAllDecksAction(decks) {
	return {
		type: FETCH_ALL_DECKS,
		payload: decks
	};
}

export function fetchAllDecksActionCreator() {
	return function(dispatch) {
		return fetchAllDecks().then(decks => {
			var obj = {};
			decks.forEach(deck => (obj[deck[0]] = JSON.parse(deck[1])));
			dispatch(fetchAllDecksAction(obj));
		});
	};
}
