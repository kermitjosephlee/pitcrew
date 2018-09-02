import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  NavigatorIOS
} from "react-native";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to PitCrew</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
