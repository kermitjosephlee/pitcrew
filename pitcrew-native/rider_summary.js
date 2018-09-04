import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Container,
  TouchableHighlight
} from "react-native";
import { MapView } from "expo";
import GetLocation from "./getLocation"
import RiderMap from "./riderMap"

//**********************************************************************


export default class RiderSummary extends Component{

  state = {
    name: "",
    contact: "",
    riderLocation: null,
    type: null,
  }

  static navigationOptions = {
    title: "Summary"
  }

  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        riderLocation:{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02
        }
      })
    }, err => {console.log(err)})
  }

  constructor(props) {
    super(props);
    this.state = { name: "", contact: "" };
  }

  render(){
    const { navigate } = this.props.navigation;
    return (
    <View>
      <View>
        <GetLocation onGetLocation={this.getUserLocationHandler} />
        <RiderMap riderLocation={this.state.riderLocation}/>
      </View>

      <View>
        <TouchableHighlight style={styles.submit} onPress={() => navigate("RiderSummary")}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableHighlight>
      </View>
    </View>

    )
  }
}

//**********************************************************************

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    margin: 15,
    padding: 5,
    borderColor: "gray",
    borderWidth: 1
  },
  submit: {
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green"
  },
  submitText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  }
})
