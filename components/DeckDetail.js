import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { fetchDeckActionCreator } from "../actions/decks";
import { white_smoke, dark_pink } from "../utils/colors";

class DeckDetail extends Component {
	static navigationOptions = ({ navigation }) => {
		const { entryId } = navigation.state.params;
		return {
			title: `${entryId}`
		};
	};

	state = {
		deck: {}
	};

	componentDidMount() {
		this.props
			.getDeck(this.props.deckTitle)
			.then(() => this.setState({ deck: this.props.deck }));
	}

	render() {
		const { deck } = this.state;
		if (_.isEmpty(deck)) {
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color={dark_pink} />
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<View style={styles.card} />
			</View>
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
	card: {
		flex: 1
	}
});

function mapStateToProps(state, { navigation, deckReducer }) {
	return {
		deckTitle: navigation.state.params.entryId,
		deck: state.deckReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getDeck: title => dispatch(fetchDeckActionCreator(title))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);
