import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from 'react-redux';
import { createDeck, fetchAllDecks, fetchDeck } from "../utils/api";
import { fetchAllDecksActionCreator, fetchDeckActionCreator, createDeckActionCreator } from '../actions/decks'

class DeckList extends Component {
	componentDidMount() {
		this.props.createDeck('JavaScript')
		this.props.getDeck('Redux').then((data) => console.log(this.props.deck))
		this.props.getAllDecks().then(() => console.log(this.props.decks));
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
