import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import style from "./style";

class SignUp extends Component {
  state = {
    loading: false,
    email: "",
    password: "",
    name: ""
  };

  signUpUser = (email, password) => {
  };

  render() {
    return (
      <View style={style.wrap}>
        <View style={style.body}>
          <View style={style.wrapForm}>
            <View style={style.textInputWrap}>
              <Text style={style.textLabel}>NAME</Text>
              <TextInput
                placeholder="Enter name"
                underlineColorAndroid="transparent"
                style={style.textInput}
                onChangeText={text => this.setState({ name: text })}
              />
            </View>
            <View style={style.textInputWrap}>
              <Text style={style.textLabel}>Почта</Text>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Enter your email"
                style={style.textInput}
                onChangeText={text => this.setState({ email: text })}
              />
            </View>
            <View style={style.textInputWrap}>
              <Text style={style.textLabel}>Пароль</Text>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Type your password"
                style={style.textInput}
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
              />
            </View>
            <View style={style.wrapButton}>
              <TouchableOpacity style={style.btnLogIn} onPress={this.signUpUser}>
                <Text style={style.btnLogInText}>Зарегистрироваться</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default SignUp;
