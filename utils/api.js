import { AsyncStorage } from 'react-native';

export function fetchDeck(deckTitle) {
	//console.log('fetching')
	return AsyncStorage.getItem(deckTitle).then((data) => console.log(JSON.parse(data).title));
}

export function createDeck(deckTitle) {
	return AsyncStorage.setItem(deckTitle, JSON.stringify({title: 'react'})).then(console.log('created'));
}