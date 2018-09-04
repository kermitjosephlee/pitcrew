import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Container,
  Picker
} from "react-native";
import { MapView } from "expo";
import GetLocation from "./getLocation"
import RiderMap from "./riderMap"

// const sendRiderData = () => {
//   e.preventDefault();
//   const data = {
//     username: this.refs.username.value,
//     password: this.refs.password.value,
//     type: this.refs.type.value
//   };
//   this.signIn(data);
// }

export default class Rider extends Component {
  state = {
    riderLocation: null,
    type: null,
  }

  static navigationOptions = {
    title: "Rider"
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
    this.state = { rider: "", contact: "" };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View>
          <TextInput
            style={{
              height: 40,
              margin: 15,
              padding: 5,
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
              height: 40,
              margin: 15,
              padding: 5,
              borderColor: "gray",
              borderWidth: 1
            }}
            placeholder="Mobile Number"
            keyboardType={"number-pad"}
            onSubmitEditing={text => this.setState({ contact })}
            value={this.state.contact}
          />
        </View>

        <View>
          <Button title="Submit" onPress={() => navigate("RiderMap")} />
        </View>
        <View>
          <GetLocation onGetLocation={this.getUserLocationHandler} />
          <RiderMap riderLocation={this.state.riderLocation}/>
        </View>
        <View>
          <Picker
          selectedValue={this.state.type}
          style={{height: 160, width: "100%", position: "absolute"}}
          onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}>
            <Picker.Item label="choose the type of help" value={null} />
            <Picker.Item label="Mechanical" value="mechanical" />
            <Picker.Item label="Medical" value="medical" />
            <Picker.Item label="Sweep" value="sweep" />
          </Picker>
        </View>
      </View>
    );
  }
}
