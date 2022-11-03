import React, {useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Dimensions,
  Text,
  Button,
} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';

import {colors, fonts, sizes} from '../../data/theme';

const {width, height} = Dimensions.get('window');

const styles = {
  container: {
    padding: 20,
  },
  photoFullView: {
    marginBottom: 20,
  },
  photoEmptyView: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#999',
    borderStyle: 'dashed',
    height: height / 2,
    marginBottom: 20,
  },
  photoFullImage: {
    width: '100%',
    borderRadius: 10,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
};

export default function ImagePicker() {
  const [photoState, setPhotoState] = useState({});
  console.log(photoState);

  async function handleChangePress() {
    const result = await launchImageLibrary();
    //console.log(result);
    if (typeof result.assets[0] == 'object') {
      setPhotoState(result.assets[0]);
    }
  }

  async function handleRemovePress() {
    setPhotoState({});
  }

  const hasPhoto = typeof photoState.uri != 'undefined';

  function Photo(props) {
    if (hasPhoto) {
      return (
        <View style={styles.photoFullView}>
          <Image
            style={styles.photoFullImage}
            resizeMode="cover"
            source={{
              uri: photoState.uri,
              width: width,
              height: height / 2,
            }}
          />
        </View>
      );
    } else {
      return <View style={styles.photoEmptyView} />;
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Header */}
        <Text style={{...fonts.heading, color: colors.light.fgColor}}>
          Edit Profile
        </Text>
        <Text style={{...fonts.body3, color: colors.light.fgColor}}>
          Mirror, Mirror On The Wall...
        </Text>
        <Photo></Photo>
        <View style={styles.buttonView}>
          <Button
            onPress={handleChangePress}
            title={hasPhoto ? 'Change Photo' : 'Add Photo'}
          />
          {hasPhoto && (
            <Button onPress={handleRemovePress} title="Remove Photo" />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
