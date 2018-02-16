import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from 'react-redux';
import { createDeck, fetchAllDecks, fetchDeck } from "../utils/api";
import { fetchAllDecksActionCreator, fetchDeckActionCreator } from '../actions/decks'

class DeckList extends Component {
	componentDidMount() {
		// createDeck("React2", { title: "react2", questions: ['q1','q2'] });
		// createDeck("Redux", { title: "redux", questions: ['q3','q4'] });
		// fetchDeck('React2').then(data => console.log(data));
		// //this.props.decks;
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
		getDeck: (title) => dispatch(fetchDeckActionCreator(title))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
