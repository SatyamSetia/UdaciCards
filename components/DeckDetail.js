import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
	Animated
} from "react-native";
//import { MaterialIcons } from '@expo/vector-icons'
import { fetchDeckActionCreator } from "../actions/decks";
import { white_smoke, dark_pink, white } from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from '../utils/api';

class DeckDetail extends Component {
	static navigationOptions = ({ navigation }) => {
		const { entryId } = navigation.state.params;
		return {
			title: `${entryId}`
		};
	};

	state = {
		deck: {},
		bounceValue: new Animated.Value(1)
	};

	componentDidMount() {
		this.props
			.getDeck(this.props.deckTitle)
			.then(() => this.setState({ deck: this.props.deck }));
		const { bounceValue } = this.state;
		Animated.sequence([
			Animated.timing(bounceValue, { duration: 400, toValue: 1.07 }),
			Animated.spring(bounceValue, { toValue: 1, friction: 2 })
		]).start();
	}

	onQuizStart = (disabled) => {
		clearLocalNotification().then(setLocalNotification);
		this.props.navigation.navigate("QuizView",{
			entryId: this.props.deckTitle
		});
	}

	onAddCard = () => {
		this.props.navigation.navigate("AddCard",{
			entryId: this.props.deckTitle
		});
	}

	render() {
		const { deck, bounceValue } = this.state;
		if (_.isEmpty(deck)) {
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color={dark_pink} />
				</View>
			);
		}

		const size = deck.questions.length;

		return (
			<View style={styles.container}>
				<Animated.View style={[styles.card, {transform: [{ scale: bounceValue }]}]}>
					<Text style={styles.title}>{deck.title}</Text>
					<Text style={styles.details}>
						{size === 1? `${size} card`: `${size} cards`}
					</Text>

					<TouchableOpacity
						style={styles.button}
						disabled={size===0?true:false}
						onPress={this.onQuizStart}
					>
						<Text style={{ color: white, fontSize: 18 }}>
							Start Quiz
						</Text>
					</TouchableOpacity>
				</Animated.View>
				<TouchableOpacity
					onPress={this.onAddCard}
				>
					<Text style={{ color:dark_pink, fontSize: 18 }}>
							Add Card
						</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white_smoke,
		alignItems: "center",
		justifyContent: "space-around"
	},
	card: {
		width: 280,
		height: 300,
		backgroundColor: white,
		alignItems: "center",
		borderRadius: 12
	},
	title: {
		fontSize: 28,
		margin: 30
	},
	details: {
		fontSize: 20,
		opacity: 0.5,
		margin: 30
	},
	button: {
		backgroundColor: dark_pink,
		width: "100%",
		height: 50,
		marginTop: 73,
		borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
		alignItems: "center",
		justifyContent: "center"
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
