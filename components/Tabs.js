import React from 'react';
import {View, Image, useColorScheme, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';

// Importing Screens
import HomeScreen from '../navigation/screens/NowPlaying';
import ShowMap from './ShowMap';
import ImagePicker from '../navigation/screens/ImagePicker';

// Importing Colors and Icons
import {colors, sizes} from '../data/theme';
import icons from '../data/icons';

/**
 * return full name of the user
 * @param   {string} focused  Tab being focused on
 * @param   {string} icon     Icon being used
 * @param   {string} number   Tab Numbering
 * @param   {string} state    The state of the distance
 * @return  {View}            Returns 1 tab component
 */
function TabIcon({focused, icon, number, state}) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 75,
        width: number == 'second' ? 140 : 70,
        backgroundColor: focused
          ? colors.blackColorTranslucentLess
          : colors.fgColorLighter,
      }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: number == 'second' ? 110 : 70,
          height: 30,
          tintColor: focused
            ? colors.light.bgColor
            : colors.dark.fgColorLighter,
        }}
      />
      {state?.distance?.nearby == true ? (
        <Text
          style={{
            fontSize: sizes.body5,
            color: focused ? colors.light.bgColor : colors.dark.fgColorLighter,
          }}>
          There's Music Nearby
        </Text>
      ) : null}
    </View>
  );
}

const Tab = createBottomTabNavigator();

/**
 * Function to customize the Bottom Tabs
 * @param {string} icon   The icon used
 * @param {string} number The tab numbering
 * @param {string} state  The state of the current
 * @return {TabIcon}      Returns a tab
 */
function tabOptions(icon, number, state) {
  return {
    tabBarIcon: ({focused}) => (
      <TabIcon focused={focused} icon={icon} number={number} state={state} />
    ),
    tabBarActiveTintColor: colors.white,
    tabBarInactiveTintColor: colors.light.fgColorLighter,
    tabBarShowLabel: false,
    headerTintColor: colors.white,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontSize: sizes.body2,
    },
    tabBarStyle: {
      height: 80,
      padding: sizes.padding,
      backgroundColor: 'transparent',
    },
    tabBarLabelStyle: {
      padding: sizes.padding / 2,
    },
  };
}

/**
 * Function to customize the Bottom Tabs
 * @param {string} icon   The icon used
 * @param {string} number The tab numbering
 * @param {string} state  The state of the current
 * @return {TabIcon}      Returns a tab
 */
function Tabs({
  navigation,
  theme,
  stateLocation,
  setStateLocation,
  locations,
  recordingData,
  photoState,
  setPhotoState,
}) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarBackground: () => (
          <LinearGradient
            colors={[colors.purpleColorLighter, colors.blueColorDarker]}
            style={{
              height: 80,
            }}
          />
        ),
      }}>
      <Tab.Screen
        name="Home"
        children={() => (
          <ShowMap
            navigation={navigation}
            theme={theme}
            stateLocation={stateLocation}
            setStateLocation={setStateLocation}
            locations={locations}
          />
        )}
        options={() => tabOptions(icons.darkMap, 'first', false)}
      />
      <Tab.Screen
        name="NowPlaying"
        children={() => (
          <HomeScreen
            navigation={navigation}
            theme={theme}
            stateLocation={stateLocation}
            setStateLocation={setStateLocation}
            recordingData={recordingData}
            photoState={photoState}
          />
        )}
        options={() => tabOptions(icons.logoLight, 'second', stateLocation)}
      />
      <Tab.Screen
        name="Profile"
        children={() => (
          <ImagePicker
            navigation={navigation}
            theme={theme}
            photoState={photoState}
            setPhotoState={setPhotoState}
          />
        )}
        options={() => tabOptions(icons.darkProfile, 'third', false)}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
