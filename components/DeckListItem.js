import React, { Component } from "react";
//import _ from "lodash";
//import { connect } from "react-redux";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
//import { fetchDeckActionCreator } from "../actions/decks";
import { white, dark_pink } from "../utils/colors";

class DeckListItem extends Component {

	render() {
		const { deck } = this.props;
		// if (_.isEmpty(deck)) {
		// 	return (
		// 		<View style={styles.card}>
		// 			<ActivityIndicator size="small" color={dark_pink} />
		// 		</View>
		// 	);
		// }

		const size = deck.questions.length;

		return (
			<View style={styles.card}>
				<Text style={styles.title}>{deck.title}</Text>
				<Text style={styles.details}>
					{size === 1? `${size} card`: `${size} cards`}
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: white,
		marginTop: 10,
		marginRight: 10,
		marginLeft: 10,
		padding: 10,
		borderRadius: 8
	},
	title: {
		fontSize: 18,
		marginBottom: 6
	},
	details: {
		fontSize: 12,
		opacity: 0.5
	}
});

export default DeckListItem;