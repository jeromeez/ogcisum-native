import * as React from 'react';
import {SafeAreaView, View, FlatList, Text} from 'react-native';
import ShowMap from '../../components/ShowMap';
import {colors, sizes} from '../../data/theme';

function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <View>
        <Text style={{alignItems: 'center'}}>This is the home page</Text>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
