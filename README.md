# UdaciCards Project

This project is completed as a part of React Native course in React Nanodegree from Udacity. It is a mobile flashcard app (android/ios) in which user can create decks and add cards to them. These cards are available in the form of quiz. This project has native features like notifications and animation.

[Download link](https://exp-shell-app-assets.s3-us-west-1.amazonaws.com/android%2F%40satyamsetia%2Fudacicards-1547e53e-2e03-11e8-a98d-0a580a780915-signed.apk) of for .apk file of this project.

## TL;DR

To launch this project on your machine:

* clone this repository.
* install all project dependencies with `npm install`
* install some other packages like lodash, react-native-progress-circle, react-navigation, react-reddux, redux, redux-thunk
* start the development server with `yarn start`

## What You're Getting
```bash
├── README.md - This file.
├── package-lock.json
├── App.test.js
├── app.json
├── App.js # This is root component.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── .watchmanconfig
├── .gitignore
├── .flowconfig
├── .babelrc
├── utils
│   ├── api.js # AsyncStorage is maintained here.
│   └── colors.js
├── reducers
│   ├── decks.js
│   └── colors.js
├── components
│   ├── AddCard.js # component for adding new card
│   ├── AddNewDeck.js # component for adding new deck on ADD NEW DECK tab.
│   ├── DeckDetail.js # component for each deck view.
│   ├── DeckList.js # component for showing Deck list on DECKS tab.
│   ├── DeckListItem.js # component for each deck in list.
│   └── QuizView.js # component for starting quiz.
├── actions
│   ├── decks.js
│   └── colors.js
└── expo
```

## Project Structure
```bash
App.js is the root file which has a StackNavigator which furthur has TabNavigator on the top of the stack. TabNavigator has tabs which are importing DeckList.js and AddNewDeck.js. DeckList is furthur importing DeckListItem.js for rendering each deck item. Other Components in the StackNavigator are imported from DeckDetail.js, AddCard.js and QuizView.js  
```

## Create React Native App

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).
