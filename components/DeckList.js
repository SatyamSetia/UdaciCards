import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { addQuestionActionCreator } from "../actions/questions";
import {
	fetchAllDecksActionCreator,
	fetchDeckActionCreator,
	createDeckActionCreator
} from "../actions/decks";

class DeckList extends Component {
	componentDidMount() {
		//this.props.createDeck('Javascript')
		//this.props.addQuestion("Javascript", { question: "q4", answer: "a4" });
		this.props
			.getDeck("Javascript")
			.then(() => console.log(this.props.deck));
		this.props
			.getAllDecks()
			.then(decks => console.log("cdm ", this.props.decks));
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
		getDeck: title => dispatch(fetchDeckActionCreator(title)),
		createDeck: title => dispatch(createDeckActionCreator(title)),
		addQuestion: (title, queAns) =>
			dispatch(addQuestionActionCreator(title, queAns))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
