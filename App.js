// Additional Libraries
import React, {useEffect, useState} from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';

// Screens
import Tabs from './components/Tabs';

// App function
export default function App() {
  // Get Color Scheme
  const themeMode = useColorScheme();
  const [stateLocation, setStateLocation] = useState();

  const [samples, setSamples] = useState();
  useEffect(() => {
    const fetchSample = async () => {
      // Make sure to use https instead of http to avoid Network Request Error
      await fetch(
        'https://wmp.interaction.courses/api/v1/?apiKey=NQrs4GBt&mode=read&endpoint=samples',
      )
        .then(res => res.json())
        .then(res => {
          // console.log('res: ', res.samples);
          setSamples(res.samples);
        })
        .catch(e => console.log('e: ', e));
    };

    fetchSample();
  }, []);

  const [locations, setLocation] = useState();
  useEffect(() => {
    const fetchLocation = async () => {
      // Make sure to use https instead of http to avoid Network Request Error
      await fetch(
        'https://wmp.interaction.courses/api/v1/?apiKey=NQrs4GBt&mode=read&endpoint=locations',
      )
        .then(res => res.json())
        .then(res => {
          // console.log('res: ', res.locations);
          setLocation(res.locations);
        })
        .catch(e => console.log('e: ', e));
    };

    fetchLocation();
  }, []);

  const [sampleToLocation, setSampleLocation] = useState();
  useEffect(() => {
    const fetchSampleLocation = async () => {
      // Make sure to use https instead of http to avoid Network Request Error
      await fetch(
        'https://wmp.interaction.courses/api/v1/?apiKey=NQrs4GBt&mode=read&endpoint=samples_to_locations',
      )
        .then(res => res.json())
        .then(res => {
          // console.log('res: ', res.samples_to_locations);
          setSampleLocation(res.samples_to_locations);
        })
        .catch(e => console.log('e: ', e));
    };

    fetchSampleLocation();
  }, []);

  // function filterSTL() {
  //   if (typeof stateLocation?.id === 'undefined') {
  //     return null;
  //   }
  //   console.log(stateLocation?.id);
  //   const resultSTL = sampleToLocation.map(location =>
  //     console.log('location:', location),
  //   );
  //   // .filter(location => location?.locations_id == stateLocation?.id);
  //   console.log('ktl', resultSTL);
  //   const resultSamples = sampleToLocation?.filter(sample =>
  //     resultSTL?.include(sample.id),
  //   );
  //   return resultSamples;
  // }

  // console.log('StateLocID', stateLocation?.id);
  // // console.log(filterSTL());
  // console.log('filtered', filterSTL());

  return (
    <NavigationContainer>
      <Tabs
        theme={themeMode}
        stateLocation={stateLocation}
        setStateLocation={setStateLocation}
        locations={locations}
      />
    </NavigationContainer>
  );
}
