import React, { Component } from "react";
import { connect } from 'react-redux';
import {
	KeyboardAvoidingView,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from "react-native";
import { white, white_smoke, deep_sky_blue } from "../utils/colors";
import { createDeckActionCreator } from '../actions/decks';

class AddNewDeck extends Component {
	state = {
		title: ""
	};

	onPress = () => {
		if(this.state.title === '') {
			return;
		}
		this.props.createDeck(this.state.title);
		this.setState({
			title: ''
		})
	}

	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<Text style={styles.question}>
					What is the title of your deck?
				</Text>
				<TextInput
					value={this.state.title}
					onChangeText={title => this.setState({ title })}
					style={styles.input}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={this.onPress}
				>
					<Text style={{color: white, fontSize: 18}}>Create</Text>
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
	question: {
		fontSize: 22
	},
	input: {
		width: 250,
		height: 48,
		margin: 40,
		fontSize: 20
	},
	button: {
		height: 42,
		width: 100,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: deep_sky_blue,
		borderRadius: 8
	}
});

function mapDispatchToProps(dispatch) {
	return {
		createDeck: title => dispatch(createDeckActionCreator(title))
	}
}

export default connect(null, mapDispatchToProps)(AddNewDeck);
