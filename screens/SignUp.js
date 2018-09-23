/**
 * @format
 * @flow
 */

import { Button, Text, View, TextInput } from "react-native";
import firebase from "react-native-firebase";
import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.onSignUp = this.onSignUp.bind(this);
  }

  async onSignUp() {
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);

      this.props.navigation.replace("Login");
    } catch (error) {
      console.warn(error);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ width: "60%" }}>
          <Text>Correo electrónico</Text>
          <TextInput
            onChangeText={email => this.setState({ email })}
            style={{ height: 40 }}
            placeholder="example@mail.com"
          />

          <Text>Password</Text>
          <TextInput
            onChangeText={password => this.setState({ password })}
            style={{ height: 40, marginBottom: 40 }}
          />

          <Button onPress={this.onSignUp} title="Crear cuenta" />
        </View>
      </View>
    );
  }
}
