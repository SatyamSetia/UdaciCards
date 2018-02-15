import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createDeck, fetchDeck } from '../utils/api';

export default class DeckList extends Component {
	componentDidMount() {
    //console.log('before')
    createDeck('React');
    //debugger
    fetchDeck('React');
    //console.log('after')
    
  }

	render() {
		return (
				<View>
					<Text>Deck List</Text>
				</View>
			);
	}
}