import React, { Component } from "react";
import _ from "lodash";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView
} from "react-native";
import { connect } from "react-redux";
import { addQuestionActionCreator } from "../actions/questions";
import {
	fetchAllDecksActionCreator,
	fetchDeckActionCreator,
	createDeckActionCreator
} from "../actions/decks";
import DeckListItem from "./DeckListItem";
import { white_smoke, white } from "../utils/colors";

class DeckList extends Component {
	state = {
		decks: {}
	};

	componentDidMount() {
		//this.props.createDeck("React");
		//this.props.addQuestion("Javascript", { question: "q5", answer: "a5" });
		// this.props
		// 	.getDeck("Javascript")
		// 	.then(() => console.log(this.props.deck));
		this.props
			.getAllDecks()
			.then(decks => this.setState({ decks: this.props.decks }));
	}

	render() {
		const { decks } = this.state;
		if (_.isEmpty(decks)) {
			return (
				<View style={styles.container}>
					<Text>No deck to show.</Text>
				</View>
			);
		}
		return (
			<ScrollView style={styles.list}>
				{Object.keys(decks).map(deckTitle => (
					<TouchableOpacity
						key={deckTitle}
						onPress={() =>
							this.props.navigation.navigate("DeckDetail", {
								entryId: deckTitle
							})}
					>
						<DeckListItem title={deckTitle} />
					</TouchableOpacity>
				))}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white_smoke,
		alignItems: "center",
		justifyContent: "center"
	},
	list: {
		backgroundColor: white_smoke,
		height: "100%"
	}
});

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
		addQuestion: (title, queAns) =>
			dispatch(addQuestionActionCreator(title, queAns))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
