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
import {API_HOST} from './config';

export default class Tech extends Component {
  static navigationOptions = {
    title: "Tech"
  };

  submit = () => {
    fetch(`${API_HOST}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: this.state.username, password: this.state.password})
    })
    this.props.navigation.navigate("TechIdle", {username: this.state.username});
  }

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    const {navigate} = this.props.navigation;
    return (<View style={styles.container} keyboardShouldPersistTaps='handled'>
      <View style={styles.textViewBox}>
        <TextInput style={styles.textInput} placeholder='username' keyboardType={"default"} onChangeText={username => this.setState({username})} value={this.state.username}/>
      </View>
      <View style={styles.textViewBox}>
        <TextInput style={styles.textInput} placeholder="password" keyboardType={"default"} secureTextEntry={true} onChangeText={password => this.setState({password})} value={this.state.password}/>
      </View>
      <View>
        <TouchableHighlight style={styles.submit} onPress={this.submit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableHighlight>
      </View>
    </View>)
  }
}

/****************************************************************/

const styles = StyleSheet.create({
  container: {
    margin: 0
  },
  textViewBox: {
    marginTop: 20
  },
  submit: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    borderRadius: 15,
    margin: 15
  },
  submitText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold"
  },
  textInput: {
    height: 60,
    margin: 20,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 20
  }
})
