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

const ref = firebase.firestore().collection('users');
class SignUp extends Component {
	state = {
		loading: false,
		email: '',
		password: ''
	};

	componentWillMount() {
		this.storeUserData();
	}

	storeUserData = async () => {
		try {
			await AsyncStorage.setItem('userData', this.state.email);
		} catch (error) {
			console.log(error);
		}
	};

	signUpUser = (email, password) => {
		if (
			this.state.email === '' ||
			this.state.password === '' ||
			this.state.username === ''
		) {
			return alert('Пусто');
		}
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				console.log('USER ID', user.uid);
				ref.add({
					user: user.uid,
					userEmail: user.email,
					userFavs: []
				});

				this.setUID(user.uid);
			} else {
				try {
					if (this.state.password.length < 6) {
						alert('Минимальное количество характеров должно равняться 6');
						return;
					}
					firebase
						.auth()
						.createUserAndRetrieveDataWithEmailAndPassword(email, password);
				} catch (error) {
					alert('Почтовый адрес уже используется');
				}
				this.props.navigate();
			}
		});
	};

	setUID = async uid => {
		try {
			await AsyncStorage.setItem('USER_ID', `${uid}`);
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
							<Text style={style.textLabel}>Пользователь</Text>
							<TextInput
								underlineColorAndroid="transparent"
								placeholder="Введите имя пользователя"
								style={style.textInput}
								onChangeText={text => this.setState({ username: text })}
							/>
						</View>
						<View style={style.textInputWrap}>
							<Text style={style.textLabel}>Почта</Text>
							<TextInput
								underlineColorAndroid="transparent"
								placeholder="Введите почтовый адрес"
								style={style.textInput}
								onChangeText={text => this.setState({ email: text })}
							/>
						</View>
						<View style={style.textInputWrap}>
							<Text style={style.textLabel}>Пароль</Text>
							<TextInput
								underlineColorAndroid="transparent"
								placeholder="Введите пароль"
								style={style.textInput}
								secureTextEntry={true}
								onChangeText={text => this.setState({ password: text })}
							/>
						</View>
						<View style={style.wrapButton}>
							<TouchableOpacity
								style={style.btnLogIn}
								onPress={() =>
									this.signUpUser(this.state.email, this.state.password)
								}
							>
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
