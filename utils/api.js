import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from 'expo';

const STORAGE_KEY = "@udacicards:decks";
const NOTIFICATION_KEY = "@udacicards:notification"

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

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Quiz pending for today!',
    body: "👋 don't forget to start a quiz for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(18)
              tomorrow.setMinutes(30)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
