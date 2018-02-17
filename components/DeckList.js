import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from 'react-redux';
//import { createDeck, fetchAllDecks, fetchDeck, addQuestion } from "../utils/api";
import { fetchAllDecksActionCreator, fetchDeckActionCreator, createDeckActionCreator } from '../actions/decks'

class DeckList extends Component {
	componentDidMount() {
		this.props.createDeck('JavaScript')
		//createDeck('HTML').then(() => addQuestion('HTML',{question: 'q1', answer: 'a1'}));
		//addQuestion('JavaScript',{question: 'q1', answer: 'a1'});
		this.props.getDeck('NewRedux').then(() => console.log(this.props.deck))
		//createDeck('NewRedux');
		this.props.getAllDecks().then((decks) => console.log(this.props.decks))
		//fetchAllDecks();
	}

	render() {
		return (
			<View>
				<Text>Deck List</Text>
			</View>
		);
	}
}

function mapStateToProps({ deckReducer }) {
	return {
		decks: deckReducer,
		deck: deckReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAllDecks: () => dispatch(fetchAllDecksActionCreator()),
		getDeck: (title) => dispatch(fetchDeckActionCreator(title)),
		createDeck: (title) => dispatch(createDeckActionCreator(title))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
