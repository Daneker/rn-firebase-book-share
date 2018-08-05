import React, { Component } from 'react';
import {
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Image,
	View,
	StyleSheet,
	ListView
} from 'react-native';
// import * as firebase from "firebase";
import firebase from 'react-native-firebase';

// const config = {
//   apiKey: "AIzaSyCDkZYueY4tOxghhoeKms6hPlWeiiJ_a8s",
//   authDomain: "react-firebase-b1a7a.firebaseapp.com",
//   databaseURL: "https://react-firebase-b1a7a.firebaseio.com",
//   projectId: "react-firebase-b1a7a",
//   storageBucket: "react-firebase-b1a7a.appspot.com",
//   messagingSenderId: "660900110511"
// };

// firebase.initializeApp(config);

export default class EditBook extends Component {
	static navigationOptions = {
		title: 'О Книге',
		headerStyle: {
			backgroundColor: '#fff'
		}
	};

	componentDidMount() {
		console.log(firebase);
		// let that = this;
		// firebase
		// 	.database()
		// 	.ref('/books')
		// 	.on('child_added', function(data) {
		// 		var newData = [...that.state.listViewData];
		// 		newData.push(data);
		// 		that.setState({ listViewData: newData });
		// 	});
	}

	handelUploadButtonPress = async () => {
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
		const result = await ImagePicker.launchImageLibraryAsync();
		// const photo = await ImagePicker.launchCameraAsync();
		if (!result.cancelled) {
			this.uploadImage(result.uri, 'test-image')
				.then(() => {
					Alert.alert('Success');
				})
				.catch(error => {
					Alert.alert(error);
				});
		}
	};

	uploadImage = async (uri, imageName) => {
		const response = await fetch(uri);
		const blob = await response.blob();

		// let ref = firebase
		// 	.storage()
		// 	.ref()
		// 	.child('images/' + imageName);

		// let ref = firebase
		//   .database()
		//   .ref("/books")
		//   .child(imageName)
		//   .set({ url: imageName });

		// return ref.put(blob);
	};

	addBook(data) {
		let key = firebase
			.database()
			.ref('/contacts')
			.push().key;
		firebase
			.database()
			.ref('/contacts')
			.child(key)
			.set({ name: data });
	}

	searchUpdated(text) {
		this.setState({ searchText: text });
	}

	onNext = () => {
		this.props.navigation.navigate('GenreCafeScreen');
	};

	render() {
		return <View style={{ flex: 1, backgroundColor: 'red' }} />;

		const item = this.props.navigation.getParam('book', 'default');
		// console.log(item)
		const url = item.volumeInfo.imageLinks
			? { uri: item.volumeInfo.imageLinks.thumbnail }
			: {
					uri:
						'http://squamafoils.com/wp-content/uploads/2015/07/import_placeholder.png'
			  };

		const authors = item.volumeInfo.authors
			? item.volumeInfo.authors[0]
			: 'No author';

		const description = item.volumeInfo.description
			? item.volumeInfo.description
			: 'Description is not available';

		return (
			<View style={styles.container}>
				<ScrollView
					style={{ paddingBottom: 5 }}
					showsVerticalScrollIndicator={false}
				>
					<View>
						<View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
							<Text style={styles.title}>Название</Text>
							<TextInput
								style={styles.searchInput}
								value={item.volumeInfo.title}
								multiline={true}
								numberOfLines={4}
							/>
							<Text style={styles.title}>Авторы</Text>
							<TextInput
								style={styles.searchInput}
								value={authors}
								multiline={true}
								numberOfLines={4}
							/>
							<Text style={styles.title}>Описание</Text>
							<TextInput
								style={[styles.searchInput, { minHeight: 120 }]}
								multiline={true}
								numberOfLines={4}
								value={description}
							/>
							<TouchableOpacity onPress={this.handelUploadButtonPress}>
								<Image style={styles.imageComponentStyle} source={url} />
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
				<TouchableOpacity style={styles.btnLogIn} onPress={this.onNext}>
					<Text style={styles.btnLogInText}>Дальше</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 5,
		backgroundColor: '#fff',
		alignItems: 'center'
	},
	imageComponentStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 340,
		backgroundColor: 'white',
		width: 240,
		borderRadius: 20,
		paddingBottom: 10,
		paddingTop: 10,
		alignSelf: 'center',
		marginTop: 5
	},
	searchInput: {
		padding: 10,
		borderColor: '#CCC',
		borderWidth: 1,
		borderRadius: 20,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
		margin: 10,
		marginBottom: 20,
		width: 340
	},
	btnLogIn: {
		flexDirection: 'row',
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgb(72,194,172)',
		paddingTop: 12,
		paddingRight: 40,
		paddingBottom: 12,
		paddingLeft: 40,
		marginBottom: 14,
		borderRadius: 25,
		width: 300
	},
	btnLogInText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 14
	},
	title: {
		paddingRight: 20,
		marginLeft: 20,
		color: 'gray',
		fontSize: 14,
		fontFamily: 'Montserrat'
	}
});
