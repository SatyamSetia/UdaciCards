import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { addQuestionActionCreator } from "../actions/questions";
import {
	fetchAllDecksActionCreator,
	fetchDeckActionCreator,
	createDeckActionCreator
} from "../actions/decks";
import DeckListItem from "./DeckListItem";
import { white_smoke } from '../utils/colors';

class DeckList extends Component {
	state = {
		decks: {}
	}
	componentDidMount() {
		//this.props.createDeck("React");
		//this.props.addQuestion("Javascript", { question: "q5", answer: "a5" });
		// this.props
		// 	.getDeck("Javascript")
		// 	.then(() => console.log(this.props.deck));
		this.props
			.getAllDecks()
			.then(decks => this.setState({ decks: this.props.decks}));
	}

	render() {
		const { decks } = this.state;
		return (
			<View style={{ backgroundColor: white_smoke, height: '100%'}}>
				{Object.keys(decks).map(deckTitle => (
					<DeckListItem key={deckTitle} title={deckTitle} />
				))}
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
