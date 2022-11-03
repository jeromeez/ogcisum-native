// Additional Libraries
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Components
import ShowMap from './components/ShowMap';
import {SafeAreaView} from 'react-native-safe-area-context';

// Themes
import {colors} from './data/theme';

// Screens
import HomeScreen from './navigation/screens/HomeScreen';
import ImagePicker from './navigation/screens/ImagePicker';
import Tabs from './components/Tabs';

const Stack = createStackNavigator();

// App function
export default function App() {
  return (
    <SafeAreaView style={{backgroundColor: colors.darkGreen, flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Tabs'}>
          <Stack.Screen name="Tabs" children={props => <Tabs {...props} />} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     color: '#fff',
//     flex: 1,
//     justifyContent: 1,
//   },
// });
