import React from "react";
import {View, Button, Text, Container} from "react-native"

const GetLocation = props => {
  return(
    <View>
      <View>
        <Button title="Get Location" onPress={props.onGetLocation} />
      </View>
    </View>
  )
}

export default GetLocation
