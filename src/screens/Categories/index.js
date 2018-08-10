import React, { Component } from 'react';
import {
	Image,
	TouchableOpacity,
	View,
	Text,
	FlatList,
	ScrollView
} from 'react-native';
import categories from './categoriArray';
import styles from './styles';
import SearchBar from './SearchBar';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';

const cafe = [
	{
		title: 'Salem',
		url: require('../../assets/genres/salem.jpg')
	}
];

const ref = firebase.firestore().collection('users');
const refBooks = firebase.firestore().collection('books');
export default class Categories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			books: []
		};
		this.ref = firebase.firestore().collection('books');
	}

	renderHeader = title => {
		return (
			<View style={styles.headerTitle}>
				<Text style={styles.headerText}>{title}</Text>
			</View>
		);
	};

	showCategory = item => {
		this.unsubscribe = this.ref.onSnapshot(snapshot => {
			var books = [];
			snapshot.forEach(doc => {
				console.log(item.item.title);
				console.log(doc.data().genre.name);
				if (
					item.item.title === doc.data().genre.name ||
					item.item.title === doc.data().cafe.name
				) {
					books.push({
						data: doc.data(),
						bookTitle: doc.data().title,
						bookAuthor: doc.data().authors,
						bookUrl: doc.data().imageUrl,
						bookDesc: doc.data().description,
						genre: doc.data().genre.name,
						cafe: doc.data().cafe.name
					});
				}
			});
			console.log('books', books);
			this.props.navigation.navigate('CategoryDetail', {
				category: books,
				header: item.item.title
			});
		});
	};

	renderCollectionItem = (item, index) => {
		return (
			<TouchableOpacity
				activeOpacity={0.9}
				style={styles.panel}
				onPress={() => this.showCategory(item)}
			>
				<Image
					source={item.item.url}
					style={styles.imagePanel}
					// resizeMode="contain"
				/>
				<LinearGradient
					style={styles.linearGradient}
					colors={['rgba(0,0,0, 0)', 'rgba(0, 0, 0, 0.5 )']}
				/>
				<View style={styles.titleView}>
					<Text style={styles.title}>{item.item.title}</Text>
				</View>
			</TouchableOpacity>
		);
	};

	renderCafe = (item, index) => {
		return (
			<TouchableOpacity
				activeOpacity={0.9}
				style={styles.panel}
				onPress={() => this.showCategory(item)}
			>
				<Image
					source={item.item.url}
					style={styles.imagePanel}
					// resizeMode="contain"
				/>
				<LinearGradient
					style={styles.linearGradient}
					colors={['rgba(0,0,0, 0)', 'rgba(0, 0, 0, 0.5 )']}
				/>
				<View style={styles.titleView}>
					<Text style={styles.title}>{item.item.title}</Text>
				</View>
			</TouchableOpacity>
		);
	};

	showCafe = item => {
		this.unsubscribe = this.ref.onSnapshot(snapshot => {
			var books = [];
			snapshot.forEach(doc => {
				if (item.title === doc.data().genre) {
					books.push({
						bookTitle: doc.data().title,
						bookAuthor: doc.data().authors,
						bookUrl: doc.data().imageUrl,
						bookDesc: doc.data().description,
						genre: doc.data().genre,
						cafe: doc.data().cafe
					});
				}
			});
			this.setState({
				books: books
			});
		});
	};

	keyExtractor = (item, index) => index.toString();
	render() {
		console.log(this.state.books);
		return (
			<ScrollView
				style={{
					backgroundColor: '#fff',
					paddingVertical: 20
				}}
			>
				<SearchBar />
				<ScrollView style={{ backgroundColor: '#fff' }}>
					{this.renderHeader('Жанры')}
					<FlatList
						data={categories}
						horizontal={true}
						keyExtractor={this.keyExtractor}
						renderItem={(item, index) => this.renderCollectionItem(item, index)}
					/>
					{this.renderHeader('Кофейни')}
					<FlatList
						data={cafe}
						horizontal={true}
						keyExtractor={this.keyExtractor}
						renderItem={(item, index) => this.renderCafe(item, index)}
					/>
				</ScrollView>
			</ScrollView>
		);
	}
}
