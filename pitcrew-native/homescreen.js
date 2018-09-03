import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  NavigatorIOS,
  Button,
  Container,
  TouchableHighlight
} from "react-native";

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "PitCrew"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.rider}>
          <TouchableHighlight style={styles.riderBox} onPress={() => navigate("Rider")}>
            <Text style={{fontSize: 30, color: "white", fontWeight: "bold"}}>Press for Help</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.tech}>
          <TouchableHighlight style={styles.techBox} onPress={() => navigate("Tech")}>
            <Text style={{fontSize: 30, color: "white", fontWeight: "bold"}}>Techs :: Sign in Here</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  rider: {
    flex: 3,
    width: "100%",
    backgroundColor: "red",

  },
  riderBox: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tech: {
    flex: 1,
    width: "100%",
    backgroundColor: "steelblue",
  },
  techBox:{
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  }


});
