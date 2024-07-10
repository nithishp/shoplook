import { View, Text,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import {Tabs,Redirect} from 'expo-router'
import {icons} from '../../constants'
import { UserLocationContext } from '../../context/userLocationContext'
import * as Location from 'expo-location';


const TabIcon = ({icon,color,name,focused}) =>{
  return(
    <View className="items-center justify-center gap-2">
      <Image source ={icon} resizeMode='contain' tintColor={color} className=" w-6 h-6" />
      <Text className={`${focused?' font-semibold':' font-pregular'} text-xs`} style={{color:color}}>{name}</Text>
    </View>
  )
}

const TabsLayout = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
     
      setLocation(location.coords);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <>
    <UserLocationContext.Provider value={{location,setLocation}}>
      
    <Tabs
      screenOptions={{
        tabBarShowLabel:false,
        tabBarActiveTintColor:'#FFA001',
        tabBarInactiveTintColor:'#CDCDE0',
        tabBarStyle:{
          backgroundColor:'#161622',
          borderTopWidth:1,
          borderTopColor:'#232533',
          height:84
        }
      }}
      >
        <Tabs.Screen name='home' options={{
          title:"Home",
          headerShown: false,
          tabBarIcon:({color,focused})=>(
              <TabIcon 
                icon={icons.home}
                color={color}
                name ="Home"
                focused={focused}
              />
              
          )
        }}/>

<Tabs.Screen name='bookmark' options={{
          title:"Bookmark",
          headerShown: false,
          tabBarIcon:({color,focused})=>(
              <TabIcon 
                icon={icons.bookmark}
                color={color}
                name ="Bookmark"
                focused={focused}
              />
              
          )
        }}/>
<Tabs.Screen name='MapView' options={{
          title:"Map",
          headerShown: false,
          tabBarIcon:({color,focused})=>(
              <TabIcon 
                icon={icons.map}
                color={color}
                name ="Map"
                focused={focused}
              />
              
          )
        }}/>

<Tabs.Screen name='create' options={{
          title:"Create",
          headerShown: false,
          tabBarIcon:({color,focused})=>(
              <TabIcon 
                icon={icons.plus}
                color={color}
                name ="Create"
                focused={focused}
              />
              
          )
        }}/>
        <Tabs.Screen name='profile' options={{
          title:"Profile",
          headerShown: false,
          tabBarIcon:({color,focused})=>(
              <TabIcon 
                icon={icons.profile}
                color={color}
                name ="Profile"
                focused={focused}
              />
              
          )
        }}/>

      </Tabs>
    </UserLocationContext.Provider>
    </>
  )
}

export default TabsLayout