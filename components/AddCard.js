import React, { Component } from "react";
import { connect } from "react-redux";
import {
	KeyboardAvoidingView,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity
} from "react-native";
import { addQuestionActionCreator } from "../actions/questions";
import { white, white_smoke, deep_sky_blue } from "../utils/colors";

class AddCard extends Component {
	state = {
		question: "",
		answer: ""
	};

	onAddQuestion = () => {
		if (this.state.question === "" || this.state.answer === "") {
			return
		}
		this.props.addQuestion(this.props.deckTitle, {
			question: this.state.question,
			answer: this.state.answer
		});
		this.setState({
			question: '',
			answer: ''
		})
	};

	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<Text style={{ fontSize: 22, margin: 20 }}>
					{this.props.deckTitle}
				</Text>
				<TextInput
					value={this.state.question}
					placeholder="Write question here!!"
					onChangeText={question => this.setState({ question })}
					style={styles.input}
				/>
				<TextInput
					value={this.state.answer}
					placeholder="Write answer here!!"
					onChangeText={answer => this.setState({ answer })}
					style={styles.input}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={this.onAddQuestion}
				>
					<Text style={{ color: white, fontSize: 18 }}>Add</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
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
	input: {
		width: 250,
		height: 48,
		margin: 20,
		fontSize: 20
	},
	button: {
		height: 42,
		width: 100,
		margin: 40,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: deep_sky_blue,
		borderRadius: 8
	}
});

function mapStateToProps(state, { navigation }) {
	return {
		deckTitle: navigation.state.params.entryId
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addQuestion: (title, queAns) =>
			dispatch(addQuestionActionCreator(title, queAns))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
