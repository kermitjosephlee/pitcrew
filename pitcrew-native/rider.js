import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Modal from "react-native-modal";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Container,
  TouchableHighlight
} from "react-native";


//**********************************************************************

export default class Rider extends Component {
  state = {
    name: "",
    contact: "",
    type_of_help: null,
    isModalVisible: false,
  }

  static navigationOptions = {
    title: "Rider"
  }

  getUserLocationHandler = () => {
    console.log("Handler Kicked On")
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        riderLocation:{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
      })
    }, err => {console.log(err)})
  }

  _toggleModal = () =>
   this.setState({ isModalVisible: !this.state.isModalVisible });

   _selectMechanic = () =>
   this.setState({ type_of_help: "mechanical", isModalVisible: !this.state.isModalVisible})

   _selectMedic = () =>
   this.setState({type_of_help: "medical", isModalVisible: !this.state.isModalVisible})

   _selectSweep = () =>
   this.setState({type_of_help: "sweep", isModalVisible: !this.state.isModalVisible})

  constructor(props) {
    super(props);
    this.state = { rider: "", contact: "" };
  }

  componentDidMount() {
    this.getUserLocationHandler();
    console.log(this.state.riderLocation)
  }



  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder='Name'
            onSubmitEditing={text => this.setState({ rider })}
            value={this.state.rider}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Mobile Number"
            keyboardType={"number-pad"}
            onSubmitEditing={text => this.setState({ contact })}
            value={this.state.contact}
          />
        </View>
        <View>
          <Text>
            Type of Help :: {this.state.type_of_help}
          </Text>

        </View>
        <View style={styles.modalBox}>
          <TouchableHighlight style={styles.helpMenu} onPress={this._toggleModal}>
            <Text style={styles.helpMenuText}>Type of Help</Text>
          </TouchableHighlight>
          <Modal style={styles.modalScreen} isVisible={this.state.isModalVisible} backdropColor={'white'} onBackdropPress={() => this.setState({isVisible: false})}>
            <View style={styles.modalViewScreen}>
              <Text style={styles.textBox}>Types of Help</Text>
                <TouchableHighlight style={styles.modalViewScreenMech} onPress={this._selectMechanic}>
                  <Text style={styles.textBox}>Bike Mechanic</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.modalViewScreenMedic} onPress={this._selectMedic}>
                  <Text style={styles.textBox}>First Aid Medic</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.modalViewScreenSweep} onPress={this._selectSweep}>
                  <Text style={styles.textBox}>Sweep Vehicle</Text>
                </TouchableHighlight>
              <TouchableHighlight style={styles.modalViewScreenDone} onPress={this._toggleModal}>
                <Text style={styles.textBox}>Done</Text>
              </TouchableHighlight>
            </View>
          </Modal>
        </View>
        <View>
          <TouchableHighlight style={styles.submit} onPress={() => navigate("RiderSummary")}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

//**********************************************************************

const styles = StyleSheet.create({
  container:{
    flexDirection: "column",
    margin: 10,
  },
  modalBox:{

  },
  textBox:{
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
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
    backgroundColor: "green",
    position: "absolute"
  },
  submitText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  modalViewScreen:{
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
  },
  modalViewScreenMech:{
        width: "100%",
    alignItems: "center",
    backgroundColor: "green",
    justifyContent: "center",
    height: "50%",
  },
  modalViewScreenMedic:{
        width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    height: "50%",
  },
  modalViewScreenSweep:{
        width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    height: "50%",
  },
  modalViewScreenDone:{
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    height: "50%",
  },
  helpMenu:{
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    borderRadius: 40
  },
  helpMenuText:{
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  }
})
