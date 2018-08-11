import React, { Component } from 'react';
import {
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Image,
	View,
	StyleSheet,
	KeyboardAvoidingView
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import firebase from 'react-native-firebase';

const genres = [
	{ name: 'Биография' },
	{ name: 'Фантастика' },
	{ name: 'Классика & Романы' },
	{ name: 'Бизнес' },
	{ name: 'Детектив' },
	{ name: 'Поэзия' },
	{ name: 'Психология' },
	{ name: 'Саморазвитие' },
	{ name: 'Другие' }
];

const cafes = [{ name: 'Salem' }];

export default class GenreCafe extends Component {
	constructor() {
		super();
		this.ref = firebase.firestore().collection('books');
		this.unsubscribe = null;

		this.state = {
			loading: true,
			genre: '',
			cafe: ''
		};
	}

	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	onCollectionUpdate = querySnapshot => {
		const books = [];
		querySnapshot.forEach(doc => {
			const {
				title,
				authors,
				description,
				imageUrl,
				genre,
				cafe,
				bookId
			} = doc.data();
			books.push({
				key: doc.id,
				doc,
				bookId,
				title,
				authors,
				description,
				imageUrl,
				genre,
				cafe
			});
		});
	};

	onShareBook = () => {
		const title = this.props.navigation.getParam('title', 'default');
		const authors = this.props.navigation.getParam('authors', 'default');
		const description = this.props.navigation.getParam(
			'description',
			'default'
		);
		const imageUrl = this.props.navigation.getParam('imageUrl', 'default');

		this.ref.add({
			bookId: new Date().getTime(),
			title: title,
			authors: authors,
			description: description,
			imageUrl: imageUrl,
			genre: this.state.genre,
			cafe: this.state.cafe
		});

		this.props.navigation.navigate('MyBooksScreen');
	};

	static navigationOptions = {
		title: 'Поделиться',
		headerStyle: {
			backgroundColor: '#fff'
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
					<Text style={[styles.title, { paddingTop: 5 }]}>Выберите жанр</Text>
					<SearchableDropdown
						onTextChange={item => this.setState({ genre: item })}
						onItemSelect={item => this.setState({ genre: item })}
						containerStyle={{
							padding: 5
						}}
						textInputStyle={{
							padding: 12,
							borderWidth: 1,
							borderColor: '#ccc',
							borderRadius: 20,
							width: 300,
							height: 45
						}}
						itemStyle={{
							padding: 10,
							marginTop: 2,
							backgroundColor: '#ddd',
							borderColor: '#bbb',
							borderWidth: 1,
							borderRadius: 20
						}}
						itemTextStyle={{
							color: '#222'
						}}
						items={genres}
						defaultIndex={2}
						// resetValue={false}
						underlineColorAndroid="transparent"
					/>
					<Text style={[styles.title, { paddingTop: 5 }]}>
						Выберите кофейню
					</Text>
					<SearchableDropdown
						onTextChange={item => this.setState({ cafe: item })}
						onItemSelect={item => this.setState({ cafe: item })}
						containerStyle={{
							padding: 5
						}}
						textInputStyle={{
							padding: 12,
							borderWidth: 1,
							borderColor: '#ccc',
							borderRadius: 20,
							height: 45,
							width: 300
						}}
						itemStyle={{
							padding: 10,
							marginTop: 2,
							backgroundColor: '#ddd',
							borderColor: '#bbb',
							borderWidth: 1,
							borderRadius: 20
						}}
						itemTextStyle={{
							color: '#222'
						}}
						itemsContainerStyle={{
							maxHeight: 40
						}}
						items={cafes}
						defaultIndex={2}
						resetValue={false}
						underlineColorAndroid="transparent"
					/>
				</View>
				<TouchableOpacity style={styles.btnLogIn} onPress={this.onShareBook}>
					<Text style={styles.btnLogInText}>Добавить Книгу</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center'
	},
	searchInput: {
		padding: 10,
		borderColor: '#CCC',
		borderWidth: 1,
		borderRadius: 20,
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 20,
		paddingRight: 20,
		margin: 10,
		width: 340,
		paddingBottom: 30,
		marginBottom: 60
	},
	btnLogIn: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgb(72,194,172)',
		paddingTop: 12,
		paddingRight: 40,
		paddingBottom: 12,
		paddingLeft: 40,
		marginBottom: 14,
		borderRadius: 25,
		minWidth: 300
	},
	btnLogInText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 14,
		alignSelf: 'center'
	},
	title: {
		paddingRight: 20,
		marginLeft: 20,
		color: 'gray',
		fontSize: 16,
		fontFamily: 'Montserrat'
	}
});
