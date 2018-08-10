import React, { Component } from 'react';
import {
	FlatList,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	View,
	StyleSheet,
	Platform,
	TextInput
} from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';

const KEYS_TO_FILTERS = ['volumeInfo.title', 'volumeInfo.authors'];

export default class FindBook extends React.Component {
	state = {
		searchText: '',
		books: []
	};

	static navigationOptions = {
		title: 'Поиск',
		headerStyle: {
			backgroundColor: '#fff'
		}
	};

	getBook = async () => {
		if (this.state.searchText === '') {
			return;
		}

		try {
			const fetchWord = this.state.searchText.replace(' ', '+');
			const fetchURL = `https://www.googleapis.com/books/v1/volumes?q=${fetchWord}`;
			const response = await fetch(fetchURL);
			const result = await response.json();
			this.setState({ books: result.items });
		} catch (error) {
			console.log(error);
		}
		this.setState({ searchText: '' });
	};

	searchUpdated(text) {
		this.setState({ searchText: text });
		// const fetchURL = `https://www.googleapis.com/books/v1/volumes?q=${text}
	}

	onEditBook = item => {
		this.props.navigation.navigate('EditScreen', { book: item });
		console.log('item123', item);
	};

	onWriteBook = () => {
		this.props.navigation.navigate('EditScreen', { book: 'empty' });
	};

	filterBooks = () =>
		this.state.books.filter(
			createFilter(this.state.searchText, KEYS_TO_FILTERS)
		);

	renderScrollView = () => {
		return (
			<ScrollView style={{ padding: 10 }} showsVerticalScrollIndicator={false}>
				{this.filterBooks().map(book => {
					return (
						<TouchableOpacity
							onPress={() => this.onEditBook(book)}
							key={book.id}
							style={styles.bookItem}
						>
							<React.Fragment>
								<Text style={styles.title}>{book.volumeInfo.title}</Text>
								<Text style={styles.authors}>{book.volumeInfo.authors}</Text>
							</React.Fragment>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		);
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.searchWrap}>
					<Image
						style={styles.searchIcon}
						source={require('../../assets/icons/tab-search.png')}
					/>
					<TextInput
						style={styles.input}
						autoCapitalize={'none'}
						autoCorrect={false}
						placeholder={'Найти...'}
						placeholderTextColor="#999"
						underlineColorAndroid={'transparent'}
						clearButtonMode={'while-editing'}
						onChangeText={text => this.searchUpdated(text)}
						keyboardType="default"
						returnKeyType="done"
						onSubmitEditing={() => this.getBook()}
					/>
				</View>
				{this.state.searchText === '' ? null : this.renderScrollView()}
				<TouchableOpacity onPress={this.onWriteBook}>
					<Text style={styles.btnText}>Нет моей книги</Text>
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
	bookItem: {
		borderBottomWidth: 0.5,
		borderColor: 'rgba(0,0,0,0.3)',
		padding: 10
	},
	title: {
		fontSize: 16,
		fontFamily: 'MontserratLight'
	},
	authors: {
		fontSize: 12,
		fontFamily: 'MontserratLight',
		color: 'gray'
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
	btnText: {
		color: 'gray',
		fontWeight: 'normal',
		fontSize: 14,
		paddingBottom: 20
	},
	searchWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: '#CCC',
		borderWidth: 1,
		borderRadius: 20,
		justifyContent: 'center',
		width: 350,
		height: 40,
		marginTop: 15,
		backgroundColor: '#F6F7F8'
	},
	searchIcon: {
		width: 15,
		height: 15,
		resizeMode: 'contain',
		tintColor: '#999',
		marginHorizontal: 10
	},
	input: {
		flex: 1,
		fontSize: 14,
		// fontFamily: 'Montserrat',
		paddingVertical: 10,
		borderRadius: 20,
		// padding: 10,
		// paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 10,
		margin: 0,
		backgroundColor: '#F6F7F8'
	}
});
