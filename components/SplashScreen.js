import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { dark_pink, white } from "../utils/colors";

export default class SplashScreen extends Component {
	componentWillMount() {
		var navigator = this.props.navigation;
		setTimeout(() => {
			navigator.replace('Home');
		}, 2000);
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={{ marginTop: 'auto' ,marginBottom: 'auto'}}>
					<MaterialCommunityIcons name="cards" size={100} color={white} />
				</View>
				<Text style={styles.name}>UdaciCards</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: dark_pink,
		alignItems: "center",
	},
	name: {
		marginTop: 'auto',
		marginBottom: 10,
		fontSize: 20,
		fontWeight: 'bold',
		color: white
	}
});
