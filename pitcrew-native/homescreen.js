import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  NavigatorIOS,
  Button,
  Container
} from "react-native";

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "PitCrew"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View>
          <Button title="Go to Rider" onPress={() => navigate("Rider")} />
        </View>
        <View>
          <Button title="Go to Tech" onPress={() => navigate("Tech")} />
        </View>
      </View>
    );
  }
}
