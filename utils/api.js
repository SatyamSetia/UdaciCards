import { AsyncStorage } from "react-native";

const STORAGE_KEY_DECKS = "@udacicards:decks";

export function fetchAllDecks() {
	return AsyncStorage.getItem(STORAGE_KEY_DECKS).then(decks =>
		JSON.parse(decks)
	);
}

export function fetchDeck(deckTitle) {
	return AsyncStorage.getItem(STORAGE_KEY_DECKS).then(
		decks => JSON.parse(decks)[deckTitle] || null
	);
}

export function createDeck(deckTitle) {
	const deck = {
		[deckTitle]: {
			title: deckTitle,
			questions: []
		}
	};
	return AsyncStorage.mergeItem(STORAGE_KEY_DECKS, JSON.stringify(deck));
}

// export function addQuestion(deckTitle, queAns) {

// 	return AsyncStorage.getItem(deckTitle).then(deck => {
// 		console.log((JSON.parse(deck))['questions'].push(queAns))
// 	})
// }
