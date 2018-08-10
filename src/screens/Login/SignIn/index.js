import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	TextInput,
	AsyncStorage
} from 'react-native';
import style from './style';
import firebase from 'react-native-firebase';

class SignIn extends Component {
	constructor() {
		super();
		this.unsubscribe = null;

		this.state = {
			loading: false,
			appLoading: false,
			email: '',
			password: ''
		};
	}

	// componentWillUnmount() {
	// 	this.unsubscribeCol();
	// }

	signInUser = (email, password) => {
		console.log('asdadsas');
		if (this.state.email === '' || this.state.password === '') {
			return alert('Пусто');
		}
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				console.log('already authorized');
				return;
			}
		});
		try {
			firebase
				.auth()
				.signInAndRetrieveDataWithEmailAndPassword(email, password)
				.then(user => {
					console.log('user', user);
					this.props.navigate();
				});
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		return (
			<View style={style.wrap}>
				<View style={style.body}>
					<View style={style.wrapForm}>
						<View style={style.textInputWrap}>
							<Text style={style.textLabel}>Почта</Text>
							<TextInput
								placeholder="Введите почтовый адрес"
								underlineColorAndroid="transparent"
								style={style.textInput}
								onChangeText={text => this.setState({ email: text })}
							/>
						</View>
						<View style={style.textInputWrap}>
							<Text style={style.textLabel}>Пароль</Text>
							<TextInput
								placeholder="Введите пароль"
								underlineColorAndroid="transparent"
								style={style.textInput}
								secureTextEntry={true}
								onChangeText={text => this.setState({ password: text })}
							/>
						</View>
					</View>
					<View style={style.wrapButton}>
						<TouchableOpacity
							style={style.btnLogIn}
							onPress={() =>
								this.signInUser(this.state.email, this.state.password)
							}
						>
							<Text style={style.btnLogInText}>Войти</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

export default SignIn;
