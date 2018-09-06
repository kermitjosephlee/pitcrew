import React from "react";
import {View, StyleSheet} from "react-native";
import {MapView} from "expo";

const RiderMap = props => {
  let riderLocationMarker = null;

  if (props.riderLocation){
    riderLocationMarker = <MapView.Marker coordinate={props.riderLocation}/>
  }
  return (
    <View style={styles.mapContainer}>
      <MapView initialRegion={{
        latitude: 43.631663,
        longitude: -79.428959,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      }}
      region={props.userLocation}
      style={styles.map}>
        {riderLocationMarker}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: 240
  },
  map: {
    width: "100%",
    height: "100%"
  }
})


export default RiderMap;
