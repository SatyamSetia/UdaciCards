import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { white, dark_pink } from "../utils/colors";

class DeckListItem extends Component {

	render() {
		const { deck } = this.props;

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