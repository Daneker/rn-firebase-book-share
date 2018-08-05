import React, { Component } from "react";
import { View } from "react-native";
import Router from "./src/router";
// import firebase from "react-native-firebase";

// const db = firebase.firestore();

export default class App extends Component {
  state = {
    loaded: false
  };
  // componentWillMount() {
  //   this._loadAssetsAsync();
  // }
  // _loadAssetsAsync = async () => {
  //   await Font.loadAsync({
  //     Montserrat: require("./src/assets/fonts/Montserrat-Regular.ttf"),
  //     MontserratLight: require("./src/assets/fonts/Montserrat-Light.ttf"),
  //     MontserratBold: require("./src/assets/fonts/Montserrat-SemiBold.ttf")
  //   });
  //   this.setState({ loaded: true });
  // };

  componentDidMount() {
    // db.collection("TEST").add("test");
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Router />
      </View>
    );
  }
}
