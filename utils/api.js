import { AsyncStorage } from "react-native";

export function fetchAllDecks() {
 	return AsyncStorage.getAllKeys()
			.then(keys => AsyncStorage.multiGet(keys));
}

// export function fetchDeck(deckTitle) {
// 	return AsyncStorage.getItem(deckTitle);
// }

// export function createDeck(deckTitle, deck) {
// 	return AsyncStorage.setItem(deckTitle, JSON.stringify(deck)).then(
// 		console.log("created")
// 	);
// }
