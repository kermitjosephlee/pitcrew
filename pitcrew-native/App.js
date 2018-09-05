import React, {Component} from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  NavigatorIOS,
  Button,
  Container
} from "react-native";
import HomeScreen from "./homescreen";
import Rider from "./rider";
import RiderSummary from "./rider_summary";
import RiderReceipt from "./rider_receipt";
import Tech from "./tech";
import TechIdle from "./tech_idle";
import TechActive from "./tech_active";
import RiderMap from "./riderMap";
import TechMap from "./techMap";

import {createStackNavigator} from "react-navigation";

const NavigationApp = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  Rider: {
    screen: Rider
  },
  RiderSummary: {
    screen: RiderSummary
  },
  RiderReceipt: {
    screen: RiderReceipt
  },
  Tech: {
    screen: Tech
  },
  TechIdle: {
    screen: TechIdle
  },
  TechActive: {
    screen: TechActive
  }
});

export default class App extends Component {
  render() {
    return <NavigationApp/>;
  }
}
