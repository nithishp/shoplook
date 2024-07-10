import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { usePathname,router } from 'expo-router'

const SearchInput = ({initialQuery}) => {
    const pathname = usePathname()
    const [query,setQuery] = useState(initialQuery || '')
  return (

    
      <View className=' border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl space-x-4 focus:border-secondary items-center flex-row'>
            <TextInput className='text-base mt-0.5 text-white flex-1 font-pregular' value={query} placeholder='Search for a Shop'placeholderTextColor='#7b7b8b' onChangeText={(e)=>setQuery(e)}  />
            <TouchableOpacity onPress={()=>{
                if(!query){
                    Alert.alert('No Input', 'Please enter a store name')
                }
                if(pathname.startsWith('/search')) router.setParams({query})
                 else router.push(`/search/${query}`)
            }}>
                <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
            </TouchableOpacity>
      </View>
    
  )
}

export default SearchInput