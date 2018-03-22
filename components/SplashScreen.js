import React, { Component } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { dark_pink, white } from "../utils/colors";

export default class SplashScreen extends Component {
	state= {
		bounceValue: new Animated.Value(1),
	}

	componentWillMount() {
		var navigator = this.props.navigation;
		setTimeout(() => {
			navigator.replace('Home');
		}, 2000);
	}

	componentDidMount() {
		const { bounceValue } = this.state;
		Animated.sequence([
			Animated.timing(bounceValue, { duration: 400, toValue: 1.1 }),
			Animated.spring(bounceValue, { toValue: 1, friction: 2 })
		]).start();
	}

	render() {
		const { bounceValue } = this.state;
		return (
			<View style={styles.container}>
				<Animated.View style={[styles.icon, {transform: [{ scale: bounceValue }]}]}>
					<MaterialCommunityIcons name="cards" size={100} color={white} />
				</Animated.View>
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
	icon: {
		marginTop: 'auto',
		marginBottom: 'auto'
	},
	name: {
		marginTop: 'auto',
		marginBottom: 10,
		fontSize: 20,
		fontWeight: 'bold',
		color: white
	}
});
