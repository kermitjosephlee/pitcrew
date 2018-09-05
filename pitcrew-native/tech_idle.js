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
import {API_HOST_WS} from './config';

export default class TechIdle extends Component {

  static navigationOptions = {
    title: "Tech",
  }

  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      id: navigation.getParam("id", 0),
      username: navigation.getParam("username", ""),
      riderLocation: {
        latitude: 40,
        longitude: -78
      },
      assignedTicket: false,
      ticket_id: "",
    }
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

    this.socket = new WebSocket(`${API_HOST_WS}`);

    this.socket.onopen = event => {
      let tech_id_message = {
        id: this.state.id,
        type: "id"
      };

      console.log("Connected to server");
      this.socket.send(JSON.stringify(tech_id_message));

      this.socket.addEventListener("message", evt => {
        console.log("receiving from WSS: ...", evt.data);
        const data = JSON.parse(evt.data);
        if (data.type == "notification") {
          this.setState({ assignedTicket: true, ticket_id: data.ticket_id });
        }
      });
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
            id :: {this.state.id}
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
