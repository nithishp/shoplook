import { View, Text,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from "../context/GlobalProvider";
import { FontAwesome } from '@expo/vector-icons';
import MapSearchBar from './MapSearchBar';


const MapHeader = () => {
    const {user} = useGlobalContext()
  return (
   
        <SafeAreaView>
      <View className=" flex flex-row items-center ">
        <View className='m-1'>
          <Image
            source={{ uri: user.avatar }}
            className="w-[45px] h-[45px] object-contain rounded-full"
            alt="UserIcon"
          />
        </View>

        <View className='m-1'>
          <Text className=" font-psemibold text-[28px]">
            Hello {user.username}
          </Text>
        </View>
        <View className='m-1 ml-auto mr-4'>
          <FontAwesome name="filter" size={24} color="black" />
        </View>
      </View>
      <View className='mt-4'>
      <MapSearchBar />

      </View>
    </SafeAreaView>
    
  )
}

export default MapHeader