import React,{useContext} from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { UserLocationContext } from '../context/userLocationContext';

export default function AppMapView() {
  const {location,setLocation} = useContext(UserLocationContext)
  return location?.latitude && (
    <View style={styles.container}>
      <MapView style={styles.map}  region={{
        latitude:location?.latitude,
        longitude:location?.longitude,
        latitudeDelta:0.00422,
        longitudeDelta:0.00421
      }} >
        <Marker coordinate={{
          longitude:location?.longitude,
          latitude:location?.latitude
           
        }} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

