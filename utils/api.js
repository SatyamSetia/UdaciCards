import { AsyncStorage } from "react-native";

const STORAGE_KEY = "@udacicards:decks";

export async function fetchAllDecks() {
	//AsyncStorage.clear();
	let data = await AsyncStorage.getItem(STORAGE_KEY);
	let decks = JSON.parse(data);
	return decks || null;
}

export async function fetchDeck(deckTitle) {
	const decks = await fetchAllDecks();
	return decks[deckTitle] || null;
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
	console.log(deckTitle," ",queAns);
	let decks =  await fetchAllDecks();
	console.log("before push ",decks)
	decks[deckTitle].questions.push(queAns)
	console.log("after push ", decks) 
	return await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(decks));
}
