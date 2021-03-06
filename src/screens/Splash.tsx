import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { StyleSheet } from 'react-native';
import { View, Title, Spinner, Caption, Image } from '@shoutem/ui';

export default class Splash extends Component<{ navigation: any }> {
  static navigationOptions = {
    header: null,
  };

  asyncState = (state: any) => {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = async (user: any) => {
    if (user) {
      return this.props.navigation.replace('Home');
    }

    this.props.navigation.replace('SignIn');
  };

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <Image
            styleName="medium-avatar"
            source={require('../../assets/icono.png')}
            style={styles.logo}
          />

          <Title styleName="h-center" style={styles.caption}>
            Conductores
          </Title>

          <Spinner />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  container: {
    width: '80%',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 10,
  },
  caption: {
    marginBottom: 40,
  },
});
