import React, {Component} from "react";
import {StackNavigator} from "react-navigation";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Container
} from "react-native";
import {MapView} from "expo";
import RiderMap from "./riderMap"

import {API_HOST} from './config';

export default class TechIdle extends Component {

  static navigationOptions = {
    title: "Tech",
  }

  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        riderLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02
        }
      })
    }, err => {
      console.log(err)
    })
  }

  componentDidMount() {
    this.getUserLocationHandler();
  }

  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      username: navigation.getParam("username", ""),
      riderLocation: {
        latitude: 40,
        longitude: -78
      }
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.mapBox}>
          <RiderMap riderLocation={this.state.riderLocation}/>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>

          </Text>
        </View>
      </View>
    )
  }
}

/************************************************************/

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  mapBox:{

  },
  textBox:{
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text:{
    fontSize: 20,
    fontWeight: "bold"
  },

})
