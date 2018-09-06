import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import {
  StyleSheet,
  Text,
  View,
  Container,
} from "react-native";

export default class RiderReceipt extends Component {
  static navigationOptions = {
    title: "Receipt"
  };


  render(){

    return(
      <View style={styles.container}>
        <View style={styles.viewBox}>
          <Text style={styles.textBox}>
            Your Help Message
          </Text>
          <Text style={styles.textBox}>
            Has Been Sent!!
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#0071BC",
    borderRadius: 15,
  },
  viewBox: {
    width: "100%",
  },
  textBox: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
})
