import { View, Text, FlatList, TouchableOpacity,Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {useGlobalContext} from '../../context/GlobalProvider'
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { searchShops,getUserShops, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import ShopCard from "../../components/ShopCard";
import { router, useLocalSearchParams } from "expo-router";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
  const {user,setUser,setIsLogged}= useGlobalContext()
  const { query } = useLocalSearchParams();
  const { data: shops } = useAppwrite(() => getUserShops(user.$id));
  const logout = async() =>{
    await signOut()
    setUser(null)
    setIsLogged(false)
    router.replace('/sign-in')
  }

  // console.log("home.jsx -> useAppwrite -> shops", shops);
  return (
    <View>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={shops}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <ShopCard shop={item} />}
          ListHeaderComponent={() => (
            <View className='w-full justify-center items-center mt-6 mb-12'>
              <TouchableOpacity className=' flex flex-col  justify-center w-full items-end mb-10 mr-10' onPress={logout}>
                <View className='flex flex-col justify-center items-center gap-2'>
                <Image source={icons.logout} resizeMode="contain" className='w-6 h-6'/>
                <Text className='text-sm text-gray-100 text-center font-pregular'>Logout</Text>
                </View>
              </TouchableOpacity>
              <View className='w-16 h-16 border rounded-lg border-secondary justify-center items-center'>
                <Image source={{uri:user?.avatar}} className='w-[90%] h-[90%] rounded-lg' resizeMode="cover"/>
              </View>
              <InfoBox 
                title = {user?.username}
                containerStyles = 'mt-5'
                titleStyles='text-lg'
              />
              <View className='mt-5 flex-row '>
              <InfoBox 
                
                title = {shops.length || 0}
                subtitle = 'Shops'
                containerStyles = 'mr-10'
                titleStyles='text-xl'
              />
              <InfoBox 
                title = '3'
                subtitle = 'Routes'
                containerStyles = 'ml-10'
                titleStyles='text-xl'
              />
              </View>

            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No shops Found"
              subtitle="No shops found in this name!"
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default Profile;
