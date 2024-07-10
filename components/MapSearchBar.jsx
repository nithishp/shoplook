import { View, Text } from 'react-native'
import React from 'react'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'


const MapSearchBar = () => {
  return (
    <View className = ''>
      <GooglePlacesAutocomplete
      placeholder='Search Location...'
      fetchDetails={true}
      enablePoweredByContainer={false}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyDmmqLuITuWp8qfRIEmzJiZIlwE_6p7pXI',
        language: 'en',
      }}
    />
    </View>
  )
}

export default MapSearchBar