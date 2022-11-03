import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';

import HomeScreen from '../navigation/screens/HomeScreen';
import ShowMap from './ShowMap';
import ImagePicker from '../navigation/screens/ImagePicker';

import {colors, sizes} from '../data/theme';
import icons from '../data/icons';

// Styles
const styles = StyleSheet.create({
  logo: {
    width: 66,
    height: 58,
  },
});

function TabIcon({focused, icon}) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: 50,
      }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 100,
          height: 30,
          tintColor: focused ? colors.light.bgColor : colors.lightLime,
        }}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

function tabOptions(icon) {
  return {
    tabBarIcon: ({focused}) => <TabIcon focused={focused} icon={icon} />,
    tabBarActiveTintColor: colors.white,
    tabBarInactiveTintColor: colors.purpleColorLighter,
    tabBarShowLabel: false,
    headerTintColor: colors.white,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontSize: sizes.body2,
    },
    tabBarStyle: {
      height: 80,
      padding: sizes.padding,
      backgroundColor: colors.purpleColorLighter,
    },
    tabBarLabelStyle: {
      padding: sizes.padding / 2,
    },
  };
}

function Tabs({navigation}) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarBackground: () => {
          return (
            <View>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[colors.purpleColorLighter, colors.blueColorDarker]}
              />
            </View>
          );
        },
      }}>
      <Tab.Screen
        name="Home"
        children={() => <ShowMap navigation={navigation} />}
        options={() => tabOptions(icons.darkMap)}
      />
      <Tab.Screen
        name="Music"
        children={() => <HomeScreen navigation={navigation} />}
        options={() => tabOptions(icons.logoLight)}
      />
      <Tab.Screen
        name="Profile"
        children={() => <ImagePicker navigation={navigation} />}
        options={() => tabOptions(icons.darkProfile)}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
