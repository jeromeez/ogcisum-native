import React, {useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Dimensions,
  TextInput,
  Text,
  Appearance,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';

import {colors, fonts, sizes} from '../../data/theme';

const {width, height} = Dimensions.get('window');

const colorScheme = Appearance.getColorScheme();

const styles = {
  container: {
    padding: 20,
  },
  photoFullView: {
    marginBottom: 20,
    height: height / 2,
    borderRadius: 10,
  },
  photoEmptyView: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor:
      colorScheme == 'dark' ? colors.dark.fgColor : colors.light.fgColorLighter,
    borderStyle: 'dashed',
    height: height / 2,
    marginBottom: 20,
    alignItems: 'center',
  },
  photoFullImage: {
    borderWidth: 5,
    borderColor:
      colorScheme == 'dark' ? colors.dark.fgColor : colors.light.fgColorLighter,
    height: height / 2,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.light.fgColor,
    padding: 15,
    width: 150,
    borderRadius: 10,
    top: 170,
  },
  buttonStyle: {
    padding: 5,
    color: colors.light.bgColor,
  },
  buttonChange: {
    padding: 5,
    color: colors.light.bgColor,
  },
  input: {
    height: 40,
    margin: 12,
    textAlign: 'center',
    padding: 10,
    color: colorScheme == 'light' ? colors.light.fgColor : colors.dark.fgColor,
    backgroundColor:
      colorScheme == 'light' ? colors.dark.fgColor : colors.dark.fgColorLighter,
    borderRadius: 10,
  },
  buttonStyle: {
    padding: 5,
    color: colors.light.bgColor,
  },
};

export default function ImagePicker({theme}) {
  // Variable to see the device's dark mode or light mode
  const [photoState, setPhotoState] = useState({});
  // console.log(photoState);

  async function handleChangePress() {
    const result = await launchImageLibrary();
    if (typeof result.assets[0] == 'object') {
      setPhotoState(result.assets[0]);
    }
  }

  async function handleRemovePress() {
    setPhotoState({});
  }

  const hasPhoto = typeof photoState.uri != 'undefined';

  function Photo({children}) {
    if (hasPhoto) {
      return (
        <View style={styles.photoFullView}>
          <ImageBackground
            style={styles.photoFullImage}
            resizeMode="cover"
            source={{
              uri: photoState.uri,
              width: width,
              height: height / 2,
            }}>
            {children}
          </ImageBackground>
        </View>
      );
    } else {
      return <View style={styles.photoEmptyView}>{children}</View>;
    }
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          theme == 'dark' ? colors.dark.bgColor : colors.light.bgColor,
        flex: 1,
      }}>
      <View style={styles.container}>
        <Text
          style={{
            ...fonts.heading,
            color: theme == 'dark' ? colors.dark.fgColor : colors.light.fgColor,
          }}>
          Edit Profile
        </Text>
        <Text
          style={{
            ...fonts.body3,
            color: theme == 'dark' ? colors.dark.fgColor : colors.light.fgColor,
          }}>
          Mirror, Mirror On The Wall...
        </Text>
        <Photo>
          <View>
            <TouchableOpacity
              style={[styles.buttonView, {top: hasPhoto ? 360 : 180}]}
              onPress={handleChangePress}>
              <Text style={{color: colors.light.bgColor}}>
                {hasPhoto ? 'Change Photo' : 'Add Photo'}
              </Text>
            </TouchableOpacity>
          </View>
        </Photo>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Name"
          placeholderTextColor={
            theme == 'light' ? colors.light.fgColor : colors.light.bgColor
          }
          selectionColor={
            theme == 'light' ? colors.light.fgColor : colors.dark.fgColor
          }
        />
      </View>
    </SafeAreaView>
  );
}
