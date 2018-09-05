import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Container,
  TouchableHighlight
} from "react-native";
import { MapView } from "expo";
import GetLocation from "./getLocation"
import RiderMap from "./riderMap"
import {API_HOST} from './config'

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

  sendPostRequest = () => {
    fetch(`${API_HOST}/newTicket`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        contact: this.state.contact,
        description: this.state.description,
        type: this.state.type_of_help,
        lat: this.state.latitude,
        lng: this.state.longitude,
        startTime: new Date(),
        status: "pending"
      }),
    });
    this.props.navigation.navigate("RiderReceipt");
  }

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      name: navigation.getParam("name", ""),
      contact: navigation.getParam("contact", ""),
      description: navigation.getParam("description", ""),
      type_of_help: navigation.getParam("type_of_help", ""),
      latitude: navigation.getParam("latitude", ""),
      longitude: navigation.getParam("longitude", ""),
    };
  }

  render(){
    const { navigate } = this.props.navigation;
    return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <View>
          <Text>
          name :: {this.state.name}
          </Text>
        </View>
        <View>
          <Text style={styles.textRender}>
          contact :: {this.state.contact}
          </Text>
        </View>
        <View>
          <Text style={styles.textRender}>
          description :: {this.state.description}
          </Text>
        </View>
        <View>
          <Text style={styles.textRender}>
          help :: {this.state.type_of_help}
          </Text>
        </View>
        <View>
          <Text style={styles.textRender}>
          lat :: {this.state.latitude}
          </Text>
        </View>
        <View>
          <Text style={styles.textRender}>
          lng :: {this.state.longitude}
          </Text>
        </View>
      </View>
      <View>
        <GetLocation onGetLocation={this.getUserLocationHandler} />
        <RiderMap riderLocation={this.state.riderLocation}/>
      </View>
      <View>
        <TouchableHighlight style={styles.submit} onPress={this.sendPostRequest}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableHighlight>
      </View>

    </View>

    )
  }
}

//**********************************************************************

const styles = StyleSheet.create({
  container:{
    flexDirection: "column",
    margin: 10,
  },
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
  },
  summary:{
    height: 200,
    width: "100%"
  },
  textRender: {
    fontSize: 15,
  }
})
