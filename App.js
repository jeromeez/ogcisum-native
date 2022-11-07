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

  const [photoState, setPhotoState] = useState({});

  // Function for Fetching samples
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

  // Function for Fetching Locations
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

  // Function for Fetching Sample to Location
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

  /**
   * Function to filter the APIs based on location ID and
   * @param   {string} LocationID  The location ID in the API
   * @param   {string} Sample_ID   The sample ID that is connected to the location ID
   * @return  {resultSamples}      Returns an array that contains filtered data
   */
  function filterSTL() {
    if (typeof stateLocation?.id === 'undefined') {
      return null;
    }
    const resultSTL = sampleToLocation
      ?.filter(location => location?.locations_id == stateLocation?.id)
      .map(e => e?.samples_id);
    if (!resultSTL) {
      return null;
    }
    const resultSamples = samples?.filter(sample =>
      resultSTL?.includes(sample.id),
    );
    return resultSamples;
  }

  const isNearby = stateLocation?.distance?.nearby;

  // Data for WebView
  // data being extracted -> recording_data & type
  let recordingData = [];
  if (isNearby) {
    recordingData = filterSTL();
    recordingData = recordingData?.map(e => {
      return {
        recording_data: JSON.parse(e.recording_data),
        type: e.type,
      };
    });
  }
  console.log('recording', recordingData);

  return (
    <NavigationContainer>
      <Tabs
        theme={themeMode}
        stateLocation={stateLocation}
        setStateLocation={setStateLocation}
        locations={locations}
        recordingData={recordingData}
        photoState={photoState}
        setPhotoState={setPhotoState}
      />
    </NavigationContainer>
  );
}
