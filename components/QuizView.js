import React, { Component } from "react";
import { connect } from "react-redux";
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
	ProgressBarAndroid,
	Animated
} from "react-native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
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
import ProgressCircle from "react-native-progress-circle";

class QuizView extends Component {
	state = {
		questions: [],
		currentIndex: 0,
		queSide: true,
		score: 0,
		bounceValue: new Animated.Value(1)
	};

	componentDidMount() {
		this.props.getDeck(this.props.deckTitle);
		this.setState({
			questions: this.props.deck.questions
		});
	}

	componentWillMount() {
		this.animatedValue = new Animated.Value(0);
		this.valueInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ["0deg", "180deg"]
		});
	}

	springAnimation() {
		const { queSide } = this.state;
		Animated.spring(this.animatedValue, {
			toValue: queSide ? 180 : 0,
			friction: 8,
			tension: 10
		}).start();
	}

	bounceAnimation() {
		const { bounceValue } = this.state;
		Animated.sequence([
			Animated.timing(bounceValue, { duration: 300, toValue: 1.5 }),
			Animated.spring(bounceValue, { toValue: 1, friction: 4 })
		]).start();
	}

	onIncorrectPress = () => {
		this.springAnimation();
		this.setState({
			currentIndex: this.state.currentIndex + 1,
			queSide: true
		});
	};

	onCorrectPress = () => {
		this.springAnimation();
		this.setState({
			currentIndex: this.state.currentIndex + 1,
			queSide: true,
			score: this.state.score + 1
		});
	};

	flipCard = () => {
		this.springAnimation();
		this.setState({ queSide: !this.state.queSide });
	};

	onRestart = () => {
		const { queSide } = this.state;
		Animated.spring(this.animatedValue, {
			toValue: !queSide ? 180 : 0,
			friction: 8,
			tension: 10
		}).start();
		this.setState({
			currentIndex: 0,
			queSide: true,
			score: 0
		});
	};

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

	renderLoader() {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color={dark_pink} />
			</View>
		);
	}

	renderScoreCard() {
		const { score, questions, bounceValue } = this.state;
		const percentage = score / questions.length * 100;
		this.bounceAnimation();
		return (
			<View style={styles.container}>
				<View style={styles.card}>
					<View style={styles.cardContent}>
						<ProgressCircle
							percent={percentage}
							radius={70}
							borderWidth={4}
							color={dark_pink}
							shadowColor={white_smoke}
							bgColor={white}
						>
							<Animated.View
								style={{
									transform: [{ scale: bounceValue }]
								}}
							>
								{percentage >= 50 ? (
									<Entypo
										name="thumbs-up"
										size={50}
										color={green}
									/>
								) : (
									<Entypo
										name="thumbs-down"
										size={50}
										color={red}
									/>
								)}
							</Animated.View>
						</ProgressCircle>
					</View>
					<Text style={styles.score}>
						Your Score: {percentage.toString().substring(0, 5)}%
					</Text>
				</View>
				<TouchableOpacity onPress={this.onRestart}>
					<Text style={{ color: dark_pink, fontSize: 18 }}>
						Restart
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	renderQuestionCardFooter() {
		return (
			<View style={styles.cardFooter}>
				<TouchableOpacity
					style={styles.rotateBtn}
					onPress={this.flipCard}
				>
					<MaterialCommunityIcons
						name="rotate-3d"
						size={22}
						color={dark_pink}
					/>
					<Text style={styles.rotateLabel}>Show Answer</Text>
				</TouchableOpacity>
			</View>
		);
	}

	renderAnswerCardFooter() {
		return (
			<View style={styles.cardFooter}>
				<TouchableOpacity
					style={styles.rotateBtn}
					onPress={this.flipCard}
				>
					<MaterialCommunityIcons
						name="rotate-3d"
						size={22}
						color={dark_pink}
					/>
					<Text style={styles.rotateLabel}>Show Question</Text>
				</TouchableOpacity>
				<View style={styles.cardButtons}>
					<TouchableOpacity
						style={styles.incorrect}
						onPress={this.onIncorrectPress}
					>
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
					<TouchableOpacity
						style={styles.correct}
						onPress={this.onCorrectPress}
					>
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
		);
	}

	renderFlipCard() {
		const { queSide, questions, currentIndex } = this.state;
		const que = questions[currentIndex];
		const customRotate = queSide
			? {}
			: {
					transform: [{ rotateY: "180deg" }]
				};
		return (
			<View style={[styles.card, customRotate]}>
				<View style={styles.cardContent}>
					<Text style={styles.cardText}>
						{queSide ? que.question : que.answer}
					</Text>
				</View>
				{queSide
					? this.renderQuestionCardFooter()
					: this.renderAnswerCardFooter()}
			</View>
		);
	}

	render() {
		const { questions, currentIndex, score } = this.state;

		const animatedStyle = {
			transform: [{ rotateY: this.valueInterpolate }]
		};

		if (questions.length === 0) {
			return this.renderLoader();
		} else if (currentIndex === questions.length) {
			return this.renderScoreCard();
		}
		return (
			<View style={styles.container}>
				<Animated.View style={animatedStyle}>
					{this.renderFlipCard()}
				</Animated.View>
				{this.renderProgressBar()}
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
		justifyContent: "center",
		borderRadius: 12
	},
	cardContent: {
		width: "100%",
		height: "70%",
		justifyContent: "center",
		alignItems: "center"
	},
	cardText: {
		fontSize: 26,
		margin: 20,
		textAlign: "center"
	},
	cardFooter: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	rotateBtn: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		opacity: 0.5
	},
	rotateLabel: {
		fontSize: 20,
		fontStyle: "italic",
		color: dark_pink
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
	progress: {
		width: "60%"
	},
	progressCount: {
		fontSize: 18
	},
	score: {
		fontSize: 20,
		margin: 20
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
