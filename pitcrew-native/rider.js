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

export default class Rider extends Component {
  static navigationOptions = {
    title: "Rider"
  };

  constructor(props) {
    super(props);
    this.state = { rider: "", contact: "" };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View>
          <TextInput
            style={{
              height: 60,
              margin: 20,
              padding: 10,
              borderColor: "gray",
              borderWidth: 1
            }}
            placeholder='Name'
            onSubmitEditing={text => this.setState({ rider })}
            value={this.state.rider}
          />
        </View>
        <View>
          <TextInput
            style={{
              height: 60,
              margin: 20,
              padding: 10,
              borderColor: "gray",
              borderWidth: 1
            }}
            placeholder="Mobile Number"
            keyboardType={"number-pad"}
            onSubmitEditing={text => this.setState({ contact })}
            value={this.state.contact}
          />
        </View>
      </View>
    );
  }
}
