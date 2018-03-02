import { AsyncStorage } from "react-native";

const STORAGE_KEY = "@udacicards:decks";

export async function fetchAllDecks() {
	//AsyncStorage.clear();
	let data = await AsyncStorage.getItem(STORAGE_KEY);
	let decks = JSON.parse(data);
	return decks || {};
}

export async function fetchDeck(deckTitle) {
	const decks = await fetchAllDecks();
	return decks[deckTitle] || {};
}

export async function createDeck(deckTitle) {
	const deck = {
		[deckTitle]: {
			title: deckTitle,
			questions: []
		}
	};
	return await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck));
}

export async function addQuestion(deckTitle, queAns) {
	let decks =  await fetchAllDecks();
	if(decks[deckTitle]){
		decks[deckTitle].questions.push(queAns)
		return await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(decks));	
	} else {
		console.log("error");
	}
	
}
