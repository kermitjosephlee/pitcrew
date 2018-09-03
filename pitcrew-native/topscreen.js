import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  NavigatorIOS,
  Button,
  Container
} from "react-native";

export default class TopScreen extends Component {
  constructor(props) {
    super(props);
    this._onForward = this._onForward.bind(this);
    this.state = { text: "" };
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 2,
            width: "100%",
            backgroundColor: "skyblue",
            alignItems: "center",
            justifyContent: "center",
            color: "white"
          }}
        >
          <Text>Welcome to PitCrew</Text>
        </View>
        <View
          style={{
            flex: 3,
            width: "100%",
            backgroundColor: "red",
            alignItems: "stretch",
            justifyContent: "center"
          }}
        >
          <Button title="Press Here for Help" />
        </View>
        <View
          style={{
            flex: 2,
            width: "100%",
            backgroundColor: "green",
            alignItems: "stretch",
            justifyContent: "center"
          }}
        >
          <Button title="Press Here to Login as a Technician" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly"
  }
});
