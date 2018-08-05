import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import style from "./style";
// import { Spinkit } from './components/Spinkit'
// import { FontAwesome } from "@expo/vector-icons";

class SignIn extends Component {
  state = {
    loading: false,
    appLoading: false,
    email: "",
    password: ""
  };

  updateLoading = status => this.setState({ loading: status });

  loginUser = (email, password) => {};

  async loginWithFacebook() {}

  render() {
    if (this.state.appLoading) {
      return <Spinkit size={30} type="FadingCircle" color="#FFFFFF" />;
    }
    return (
      <View style={style.wrap}>
        <View style={style.body}>
          <View style={style.wrapForm}>
            <View style={style.textInputWrap}>
              <Text style={style.textLabel}>Почта</Text>
              <TextInput
                placeholder="Enter your email"
                underlineColorAndroid="transparent"
                style={style.textInput}
                onChangeText={text => this.setState({ email: text })}
              />
            </View>
            <View style={style.textInputWrap}>
              <Text style={style.textLabel}>Пароль</Text>
              <TextInput
                placeholder="Type your password"
                underlineColorAndroid="transparent"
                style={style.textInput}
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
              />
            </View>
          </View>
          <View style={style.wrapButton}>
            <TouchableOpacity style={style.btnLogIn} onPress={this.loginUser}>
              <Text style={style.btnLogInText}>Войти</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.btnLogIn} onPress={this.signUpUser}>
              {/* <FontAwesome name="facebook" size={20} color="#3B5997" /> */}
              <Text style={style.btnLogInLabel}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default SignIn;
