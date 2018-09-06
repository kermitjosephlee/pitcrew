import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Modal from "react-native-modal";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Container,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
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

   submit = () => {
     this.props.navigation.navigate("RiderSummary", {
       name: this.state.name,
       contact: this.state.contact,
       description: this.state.description,
       type_of_help: this.state.type_of_help,
       latitude: this.state.riderLocation.latitude,
       longitude: this.state.riderLocation.longitude,
     });
   }

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      contact: "",
      description: "",
      riderLocation: {},
    };
  }

  componentDidMount() {
    this.getUserLocationHandler();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder='Name'
            onChangeText={ name => this.setState({ name })}
            value={this.state.name}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Mobile Number"
            keyboardType={"number-pad"}
            onChangeText={ contact => this.setState({ contact })}
            value={this.state.contact}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInputLarge}
            multiline={true}
            placeholder="Tell Us About Your Issue"
            onChangeText={ description => this.setState({ description })}
            value={this.state.description}
          />
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
                  <Text style={styles.textBox}>Back</Text>
                </TouchableHighlight>
            </View>
          </Modal>
        </View>
        <View>
          <TouchableHighlight style={styles.submit} onPress={this.submit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

//**********************************************************************

const styles = StyleSheet.create({
  container:{
    flexDirection: "column",
    margin: 15
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
    height: 60,
    marginBottom: 30,
    padding: 5,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 20
  },
  textInputLarge: {
    height: 120,
    marginBottom: 30,
    padding: 5,
    fontSize: 20,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 3,
  },
  submit: {
    height: 90,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    borderRadius: 15,
    margin: 0,

  },
  submitText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold"
  },
  helpMenu:{
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    marginBottom: 30,
    borderRadius: 15
  },
  helpMenuText:{
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  modalViewScreen:{
    alignItems: "center",
    justifyContent: "center",
    height: "75%",
    flexDirection: "column",
  },
  modalViewScreenMech:{
    width: "100%",
    alignItems: "center",
    backgroundColor: "green",
    justifyContent: "center",
    flex: 2,
    margin: 15,
    borderRadius: 15,
    padding: 15,
  },
  modalViewScreenMedic:{
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    height: "33%",
    margin: 15,
    borderRadius: 15,
    padding: 15,
    flex: 2,
  },
  modalViewScreenSweep:{
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    height: "33%%",
    margin: 15,
    borderRadius: 15,
    padding: 15,
    flex: 2,
  },
  modalViewScreenDone:{
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    height: "25%",
    margin: 15,
    borderRadius: 15,
    padding: 15,
    flex: 1,
  },


})
