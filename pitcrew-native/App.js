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
import TopScreen from "./topscreen";

import { StackNavigator } from "react-navigation";

const NavigationApp = StackNavigator({
  Home: { screen: HomeScreen },
  Rider: { screen: Rider }
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "HomeScreen"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() => navigate("Rider", { name: "Jane" })}
      />
    );
  }
}

class Rider extends React.Component {
  static navigationOptions = {
    title: "Rider"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() => navigate("HomeScreen")}
      />
    );
  }
}
