import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { Constants } from 'expo';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { white, dark_pink } from './utils/colors';

import reducer from './reducers/index';
import DeckList from './components/DeckList';
import AddNewDeck from './components/AddNewDeck';
import DeckDetail  from './components/DeckDetail';
import AddCard from './components/AddCard';
import QuizView from './components/QuizView';

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor}/>
    }
  },
  NewDeck: {
    screen: AddNewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name='add-box' size={30} color={tintColor}/>
    }
  }
}, {
  navigationOptions: {
    title: 'UdaciCards',
    headerStyle: {
      backgroundColor: dark_pink,
      elevation: 0,
      height: 36
    },
    headerTitleStyle: { 
      color: white
    }
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? dark_pink : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : dark_pink,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: dark_pink
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: dark_pink
      }
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: dark_pink
      }
    }
  }
})

function CustomStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  
  render() {
    const store = createStore(reducer,{}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <CustomStatusBar backgroundColor={dark_pink} barStyle="light-content"/>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
