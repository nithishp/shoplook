import { View, Text } from 'react-native'
import React from 'react'
import AppMapView from '../../components/AppMapView'
import MapHeader from '../../components/MapHeader'

const MapView = () => {
  return (
    <View className= 'h-full w-full'>
      <View className='absolute z-10 p-[10px] w-full px-6'>
      <MapHeader/>

      </View>
    <AppMapView/>
    </View>
  )
}

export default MapView