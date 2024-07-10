import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { act } from 'react'
import { icons } from '../constants'

const zoomIn = {
  0:{
    scale:0.9
  },
  1:{
    scale:1.1
  }
}
const zoomOut = {
  0:{
    scale:1
  },
  1:{
    scale:0.9 
  }
}
const TrendingItem = ({activeItem,item}) =>{

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      <TouchableOpacity
        className="relative justify-center $items-center"
        activeOpacity={0.7}
      >
        <ImageBackground
          source={{ uri: item.image }}
          className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40 "
          resizeMode="cover"
        />
      </TouchableOpacity>
    </Animatable.View>
  );
}

const Trending = ({shops}) => {
  const [activeItem,setActiveItem] = useState(shops[0])
  const viewableItemsChanged = ({viewableItems}) =>{
    setActiveItem(viewableItems[0].key)

  }

  return (
    <FlatList
        data={shops}
        keyExtractor={(item)=>item.$id}
        renderItem={({item})=>(
          <TrendingItem activeItem={activeItem} item={item}/>
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{itemVisiblePercentThreshold:70}}
        contentOffset={{x:170}}
        horizontal
    />
  )
}

export default Trending