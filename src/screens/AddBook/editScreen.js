import React, { Component } from 'react';
import {
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Image,
	View,
	StyleSheet,
	ListView,
	Platform,
	ActivityIndicator
} from 'react-native';
import firebase from 'react-native-firebase';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import { TextField } from './components/TextField';

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
			title: '',
			authors: '',
			description: '',
			imageUrl: null,
			loading: false
		};
	}

	componentDidMount() {
		this.configInitialState();
	}

	configInitialState = () => {
		if (this.props.navigation.getParam('book', 'default') != 'empty') {
			const item = this.props.navigation.getParam('book', 'default');
			const url = item.volumeInfo.imageLinks
				? item.volumeInfo.imageLinks.thumbnail
				: 'http://squamafoils.com/wp-content/uploads/2015/07/import_placeholder.png';

			const authors = item.volumeInfo.authors
				? item.volumeInfo.authors[0]
				: 'No author';

			const description = item.volumeInfo.description
				? item.volumeInfo.description
				: 'Description is not available';

			this.setState({
				title: item.volumeInfo.title,
				authors: authors,
				description: description,
				imageUrl: url
			});
		} else {
			this.setState({
				title: '',
				authors: '',
				description: '',
				imageUrl:
					'http://squamafoils.com/wp-content/uploads/2015/07/import_placeholder.png'
			});
		}
	};

	onNext = () => {
		// console.log('67 state', this.state);
		this.props.navigation.navigate('GenreCafeScreen', {
			title: this.state.title,
			authors: this.state.authors,
			description: this.state.description,
			imageUrl: this.state.imageUrl
		});
	};

	imagePicker = () => {
		ImagePicker.showImagePicker(response => {
			if (!response.didCancel) {
				this.uploadImage(response.uri, response).catch(error =>
					console.log(error)
				);
			}
		});
	};

	uploadImage = (uri, image) => {
		const imageName = (Platform.OS === 'ios' ? uri.replace('file://', '') : uri)
			.split('/')
			.pop();
		const imageRef = firebase
			.storage()
			.ref('posts')
			.child(imageName + '.jpeg');

		// console.log('uri is on 94 -> ', uri);

		return new Promise((resolve, reject) =>
			imageRef
				.putFile(image.path)
				// .then(imageRef.getDownloadURL)
				.then(url => {
					resolve(url);
					// console.log('100 url ->', url);
					this.setState({ imageUrl: url.downloadURL, loading: true });
				})
				.catch(error => {
					console.log('Error while saving the image.. ', error);
				})
		);
	};

	setTitle = title => {
		this.setState({ title });
	};

	setAuthors = authors => {
		this.setState({ authors });
	};

	setDescription = description => {
		this.setState({ description });
	};

	render() {
		return (
			<View style={styles.container}>
				<ScrollView
					style={{ paddingBottom: 5 }}
					showsVerticalScrollIndicator={false}
				>
					<View>
						<View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
							<TextField
								title="Название"
								setText={this.setTitle}
								value={this.state.title}
							/>
							<TextField
								title="Авторы"
								setText={this.setAuthors}
								value={this.state.authors}
							/>
							<TextField
								title="Описание"
								setText={this.setDescription}
								value={this.state.description}
								style={{ minHeight: 120 }}
							/>
							<TouchableOpacity onPress={this.imagePicker}>
								{/* {this.state.loading && (
									<ActivityIndicator size="small" color="#00ff00" />
								)} */}
								<Image
									style={styles.imageComponentStyle}
									source={{ uri: this.state.imageUrl }}
								/>
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
	}
});
