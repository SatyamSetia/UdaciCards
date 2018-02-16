import { createDeck, fetchAllDecks, fetchDeck } from "../utils/api";

export const FETCH_ALL_DECKS = "FETCH_ALL_DECKS";
export const FETCH_DECK = "FETCH_DECK";

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

export function fetchDeckAction(deck) {
	return {
		type: FETCH_DECK,
		payload: deck
	};
}

export function fetchDeckActionCreator(title) {
	return function(dispatch) {
		return fetchDeck(title).then(deck =>
			dispatch(fetchDeckAction(deck)));
	};
}

export function createDeckActionCreator(title) {
	return function(dispatch) {
		return createDeck(title).done();
	};
}
