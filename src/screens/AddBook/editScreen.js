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
import firebase from 'react-native-firebase';
import RNFetchBlob from 'rn-fetch-blob';
// import CameraRollPicker from 'react-native-camera-roll-picker';
// import RNFetchBlob from 'react-native-fetch-blob';

export default class EditBook extends Component {
	static navigationOptions = {
		title: 'О Книге',
		headerStyle: {
			backgroundColor: '#fff'
		}
	};

	constructor() {
		super();
		this.ref = firebase.firestore().collection('books');
		this.unsubscribe = null;

		this.state = {
			loading: true,
			books: [],
			title: '',
			authors: '',
			description: '',
			imageUrl: null
		};
	}

	componentDidMount() {
		console.log(RNFetchBlob);
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}
	onCollectionUpdate = querySnapshot => {
		const books = [];
		querySnapshot.forEach(doc => {
			const { title, authors, description, imageUrl } = doc.data();
			books.push({
				key: doc.id,
				doc,
				title,
				authors,
				description,
				imageUrl
			});
			this.setState({
				books,
				loading: false
			});
		});
	};

	onAddBook = () => {
		this.ref.add({
			title: this.state.title,
			authors: this.state.authors,
			description: this.state.description,
			imageUrl: this.state.imageUrl
		});
		this.props.navigation.navigate('GenreCafeScreen');
	};

	onPickImage = (selectedImages, currentImage) => {
		const image = currentImage.uri;
		const Blob = RNFetchBlob.polyfill.Blob;
		const fs = RNFetchBlob.fs;
		window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
		window.Blob = Blob;

		let uploadBlob = null;
		const imageRef = firebase
			.storage()
			.ref('posts')
			.child('test.jpg');
		let mime = 'image/jpg';
		fs.readFile(image, 'base64')
			.then(data => {
				return Blob.build(data, { type: `${mime};BASE64` });
			})
			.then(blob => {
				uploadBlob = blob;
				return imageRef.put(blob, { contentType: mime });
			})
			.then(() => {
				uploadBlob.close();
				return imageRef.getDownloadURL();
			})
			.then(url => {
				// URL of the image uploaded on Firebase storage
				console.log(url);
				this.setState({ imageUrl: url });
			})
			.catch(error => {
				console.log(error);
			});
	};

	// onNext = () => {
	// 	this.props.navigation.navigate('GenreCafeScreen');
	// };

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
								onChangeText={text => this.setState({ title: text })}
							/>
							<Text style={styles.title}>Авторы</Text>
							<TextInput
								style={styles.searchInput}
								value={authors}
								multiline={true}
								numberOfLines={4}
								onChangeText={text => this.setState({ authors: text })}
							/>
							<Text style={styles.title}>Описание</Text>
							<TextInput
								style={[styles.searchInput, { minHeight: 120 }]}
								multiline={true}
								numberOfLines={4}
								value={description}
								onChangeText={text => this.setState({ description: text })}
							/>
							<TouchableOpacity onPress={this.onPickImage}>
								<Image style={styles.imageComponentStyle} source={url} />
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
				<TouchableOpacity style={styles.btnLogIn} onPress={this.onAddBook}>
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
