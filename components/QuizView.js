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
import {
	white_smoke,
	dark_pink,
	white,
	red,
	green,
	dark_red,
	dark_green
} from "../utils/colors";

class QuizView extends Component {
	state = {
		questions: [],
		currentIndex: 0,
		side: "question",
		score: 0
	};

	componentDidMount() {
		this.props.getDeck(this.props.deckTitle);
		this.setState({
			questions: this.props.deck.questions
		});
	}

	onIncorrectPress = () => {
		this.setState({
			currentIndex: this.state.currentIndex+1,
			side: "question"
		})
	}

	onCorrectPress = () => {
		this.setState({
			currentIndex: this.state.currentIndex+1,
			side: "question",
			score: this.state.score++
		})
	}

	renderProgressBar() {
		const { questions, currentIndex } = this.state;
		return (
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
		);
	}

	render() {
		const { questions, side, currentIndex } = this.state;
		if (questions.length === 0) {
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color={dark_pink} />
				</View>
			);
		} else if (currentIndex === questions.length){
			return (
				<View style={styles.container}></View>
			);
		} else if (side === "question") {
			const que = questions[currentIndex];
			return (
				<View style={styles.container}>
					<View style={styles.card}>
						<View style={styles.cardContent}>
							<Text style={styles.cardText}>{que.question}</Text>
						</View>
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
					{this.renderProgressBar()}
				</View>
			);
		} else if (side === "answer") {
			const que = questions[currentIndex];
			return (
				<View style={styles.container}>
					<View style={styles.card}>
						<View style={styles.cardContent}>
							<Text style={styles.cardText}>{que.answer}</Text>
						</View>
						<View style={styles.rotate}>
							<MaterialCommunityIcons
								name="rotate-3d"
								size={22}
								color={dark_pink}
							/>
							<Text
								style={styles.rotateLabel}
								onPress={() =>
									this.setState({ side: "question" })}
							>
								Show question
							</Text>
						</View>
						<View style={styles.cardButtons}>
							<TouchableOpacity style={styles.incorrect} onPress={this.onIncorrectPress}>
								<Text
									style={{
										color: dark_red,
										fontSize: 18,
										fontWeight: "bold"
									}}
								>
									Incorrect
								</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.correct} onPress={this.onCorrectPress}>
								<Text
									style={{
										color: dark_green,
										fontSize: 18,
										fontWeight: "bold"
									}}
								>
									Correct
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					{this.renderProgressBar()}
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
	cardContent: {
		width: "100%",
		height: "70%",
		justifyContent: "center"
	},
	cardText: {
		fontSize: 26,
		margin: 20,
		textAlign: "center"
	},
	rotate: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-end",
		margin: 10,
		opacity: 0.5
	},
	cardButtons: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-end",
		marginTop: 20
	},
	incorrect: {
		width: "50%",
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: red,
		borderBottomLeftRadius: 12,
		opacity: 0.4
	},
	correct: {
		width: "50%",
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: green,
		borderBottomRightRadius: 12,
		opacity: 0.4
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
