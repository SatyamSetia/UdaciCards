import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
	ProgressBarAndroid
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { fetchDeckActionCreator } from "../actions/decks";
import { white_smoke, dark_pink, white } from "../utils/colors";

class QuizView extends Component {
	state = {
		questions: [],
		currentIndex: 0,
		side: "question"
	};

	componentDidMount() {
		this.props.getDeck(this.props.deckTitle);
		this.setState({
			questions: this.props.deck.questions
		});
	}

	render() {
		const { questions, side, currentIndex } = this.state;
		if (questions.length === 0) {
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color={dark_pink} />
				</View>
			);
		} else if (side === "question") {
			const que = questions[currentIndex];
			return (
				<View style={styles.container}>
					<View style={styles.card}>
						<View style={styles.cardContent}><Text style={styles.cardText}>{que.question}</Text></View>
						<View style={styles.rotate}>
							<MaterialCommunityIcons
								name="rotate-3d"
								size={22}
								color={dark_pink}
							/>
							<Text
								style={styles.rotateLabel}
								onPress={() =>
									this.setState({ side: "answer" })}
							>
								Show Answer
							</Text>
						</View>
					</View>
					<View style={styles.progress}>
						<Text style={styles.progressCount}>
							{currentIndex + 1}/{questions.length}
						</Text>
						<ProgressBarAndroid
							color={dark_pink}
							styleAttr="Horizontal"
							progress={(currentIndex + 1) / questions.length}
							indeterminate={false}
						/>
					</View>
				</View>
			);
		}

		return <View style={styles.container} />;
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
	cardContent:{
		width: '100%',
		height: '80%',
		justifyContent: 'center'
	},
	cardText: {
		fontSize: 26,
		margin: 'auto',
		textAlign: "center"
	},
	rotate: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-end",
		margin: 10
	},
	rotateLabel: {
		fontSize: 20,
		fontStyle: "italic",
		color: dark_pink
	},
	progress: {
		width: "60%"
	},
	progressCount: {
		fontSize: 18
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

export default connect(mapStateToProps, mapDispatchToProps)(QuizView);
