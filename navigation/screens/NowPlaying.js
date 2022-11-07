import React, {useState, useRef} from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Dimensions,
  Text,
  Button,
  TouchableOpacity,
  Appearance,
} from 'react-native';
import icons from '../../data/icons';
import {WebView} from 'react-native-webview';

import {colors, sizes, fonts} from '../../data/theme';

function NowPlaying({theme, stateLocation, recordingData, photoState}) {
  const {width, height} = Dimensions.get('window');

  // Get the current user's distance, location name, state, suburb
  const distanceNearby = stateLocation.distance.nearby;
  const nearbyLocation = stateLocation.location;
  const nearbyState = stateLocation.state;
  const nearbySuburb = stateLocation.suburb;

  const [webViewState, setWebViewState] = useState({
    loaded: false,
    actioned: false,
  });

  /**
   * Function to check if there's already a photo uploaded
   * @param   {string} photoState  The state of the photo
   * @return  {boolean}            returns true or false
   */
  function hasPhoto(photoState) {
    if ((photoState = {})) {
      return false;
    } else true;
  }

  const webViewRef = useRef();

  function webViewLoaded() {
    setWebViewState({
      ...webViewState,
      loaded: true,
    });
  }

  function handleReloadPress() {
    webViewRef.current.reload();
  }

  /**
   * Function to handle if there's a button press
   * @return {WebView}    Returns current webview state (play or stop)
   */
  function handleActionPress() {
    let strData = JSON.stringify(recordingData);
    if (!webViewState.actioned) {
      webViewRef.current.injectJavaScript(`setupParts(${strData})`);
      webViewRef.current.injectJavaScript('startPlayback()');
    } else {
      webViewRef.current.injectJavaScript('stopPlayback()');
    }
    setWebViewState({
      ...webViewState,
      actioned: !webViewState.actioned,
    });
  }

  // Color Scheme (light or dark)
  const colorScheme = Appearance.getColorScheme();

  // Code for Styles
  const styles = {
    container: {
      backgroundColor:
        theme == 'dark' ? colors.dark.bgColor : colors.light.bgColor,
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      padding: 20,
      justifyContent: 'space-between',
    },
    container2: {
      backgroundColor:
        theme == 'dark' ? colors.dark.bgColor : colors.light.bgColor,
      flex: 1,
      flexDirection: 'column',
      padding: 20,
    },
    webViewContainer: {
      height: 0,
    },
    webview: {},
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
    header: {
      flexDirection: 'row',
      paddingTop: 20,
      width: 350,
    },
    icon: {
      width: 30,
      height: 55,
      marginRight: 20,
    },
    smiley: {
      width: 70,
      height: 70,
      marginRight: 20,
      borderRadius: 70 / 2,
      borderWidth: 3,
      borderColor: colors.dark.fgColorLighter,
      color: 'red',
    },
    input: {
      height: 40,
      width: 350,
      alignItems: 'center',
      padding: 10,
      color: colorScheme == 'light' ? colors.dark.bgColor : colors.dark.fgColor,
      backgroundColor:
        colorScheme == 'light' ? colors.light.fgColor : colors.dark.fgColor,
      borderRadius: 10,
    },
    currentlytext: {
      ...fonts.body2,
      color: theme == 'dark' ? colors.dark.fgColor : colors.light.fgColor,
    },
    nametext: {
      ...fonts.body3,
      color: theme == 'dark' ? colors.dark.fgColor : colors.light.fgColor,
      top: 10,
      flex: 1,
    },
  };

  // Conditional for Smiley Icons
  let iconFix;
  if (colorScheme == 'light') {
    iconFix = icons.darkSmile;
  } else {
    iconFix = icons.lightSmile;
  }

  if (!distanceNearby) {
    return (
      <SafeAreaView style={styles.container2}>
        <View style={styles.container2}>
          <Text
            style={{
              ...fonts.heading,
              color:
                theme == 'dark' ? colors.dark.fgColor : colors.light.fgColor,
            }}>
            No Music Nearby
          </Text>
          <Text
            style={{
              ...fonts.body3,
              color:
                theme == 'dark' ? colors.dark.fgColor : colors.light.fgColor,
            }}>
            It's Oh So Quiet...
          </Text>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'column'}}>
          <View style={styles.header}>
            <Image
              style={styles.icon}
              source={theme == 'dark' ? icons.lightPin : icons.darkPin}
            />
            <View>
              <Text
                style={{
                  ...fonts.heading,
                  color:
                    theme == 'dark'
                      ? colors.dark.fgColor
                      : colors.light.fgColor,
                }}>
                {nearbyLocation}
              </Text>
              <Text
                style={{
                  ...fonts.body3,
                  color:
                    theme == 'dark'
                      ? colors.dark.fgColor
                      : colors.light.fgColor,
                }}>
                {nearbySuburb + ', ' + nearbyState}
              </Text>
            </View>
          </View>
          <View style={styles.webViewContainer}>
            <WebView
              ref={ref => (webViewRef.current = ref)}
              originWhitelist={['*']}
              source={{
                uri: 'https://wmp.interaction.courses/playback-webview/',
              }}
              pullToRefreshEnabled={true}
              onLoad={webViewLoaded}
              style={styles.webview}
            />
            {webViewState && (
              <TouchableOpacity
                style={styles.input}
                onPress={handleActionPress}>
                <Text
                  style={{
                    color:
                      theme == 'dark'
                        ? colors.dark.bgColor
                        : colors.light.bgColor,
                    fontWeight: 'bold',
                  }}>
                  {!webViewState.actioned ? 'Start Playback' : 'Stop Playback'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={{flexDirection: 'column'}}>
          <Text style={styles.currentlytext}>Currently At This Location:</Text>
          <View style={styles.header}>
            <Image
              style={styles.smiley}
              source={hasPhoto() ? {uri: photoState.uri} : iconFix}
            />
            <View style={{paddingBottom: 20}}>
              <Text style={styles.nametext}>Enter Your Name</Text>
            </View>
          </View>
          <View style={styles.header}>
            <Image
              style={styles.smiley}
              source={theme == 'light' ? icons.darkSmile : icons.lightSmile}
            />
            <View style={{paddingBottom: 100}}>
              <Text style={styles.nametext}>And others...</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default NowPlaying;
