import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Dimensions, Text } from 'react-native';
import books from './bookArray';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
	'window'
);

function wp(percentage) {
	const value = (percentage * viewportWidth) / 100;
	return Math.round(value);
}

const slideWidth = wp(75);
const slideHeight = viewportHeight * 0.65;
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const slideInnerContainer = {
	width: itemWidth,
	height: slideHeight,
	borderRadius: 6,
	overflow: 'hidden',
	paddingHorizontal: itemHorizontalMargin,
	paddingBottom: 18 // needed for shadow
};

const ref = firebase.firestore().collection('users');
const refBooks = firebase.firestore().collection('books');

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			books: [],
			loading: false,
			favoritesBooks: []
		};
	}

	fetchAllBooks = () => {
		refBooks.onSnapshot(snapshot => {
			var books = [];
			snapshot.forEach(doc => {
				if (doc.data().isPublished) {
					books.push({
						data: doc.data(),
						bookTitle: doc.data().title,
						bookAuthor: doc.data().authors,
						bookUrl: doc.data().imageUrl,
						bookDesc: doc.data().description
					});
				}
			});
			this.setState({
				books: books
			});
		});
	};

	fetchUser = () => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				ref.onSnapshot(snapshot => {
					const docs = snapshot.docs.map(docSnapshot => ({
						id: docSnapshot.id,
						data: docSnapshot.data()
					}));

					const currentUser = docs.filter(
						item => item.data.user === user.uid
					)[0];

					this.setState({
						docID: currentUser.id,
						currentUser: currentUser,
						favoritesBooks: currentUser.data.favorites
					});
				});
			}
		});
	};

	componentDidMount() {
		this.fetchAllBooks();
		this.fetchUser();
	}

	showBook = item => {
		this.props.navigation.navigate('BookDetail', {
			book: item,
			favoriteBooks: this.state.favoritesBooks,
			currentUser: this.state.currentUser
		});
	};

	renderItem = ({ item, index }) => {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: '#fff'
				}}
			>
				<View style={slideInnerContainer}>
					<LinearGradient
						style={[styles.linearGradient, { width: itemWidth }]}
						colors={['rgba(0,0,0, 0)', 'rgba(0, 0, 0, 0.8)']}
					/>
					<Image source={{ uri: item.bookUrl }} style={styles.image} />
					<TouchableOpacity
						activeOpacity={0.9}
						onPress={() => this.showBook(item)}
						style={styles.titleView}
					>
						<Text style={styles.title}>{item.bookTitle}</Text>
						<Text numberOfLines={2} style={styles.count}>
							{item.bookAuthor}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	get pagination() {
		const { entries, activeSlide = 0 } = this.state;
		return (
			<Pagination
				dotsLength={this.state.books.length}
				activeDotIndex={activeSlide}
				dotStyle={{
					width: 12,
					height: 12,
					borderRadius: 6,
					marginHorizontal: 2,
					backgroundColor: 'rgba(111, 111, 111, 0.92)'
				}}
				inactiveDotStyle={{
					width: 10,
					height: 10,
					borderRadius: 5,
					backgroundColor: 'rgba(100, 100, 100, 0.92)'
				}}
				inactiveDotOpacity={0.4}
				inactiveDotScale={0.6}
			/>
		);
	}

	render() {
		return (
			<View style={[{ flex: 1, backgroundColor: '#fff' }]}>
				<Text style={styles.headerLabel}>Новые Книги</Text>
				<Carousel
					layout={'stack'}
					loop={false}
					layoutCardOffset={18}
					renderItem={this.renderItem}
					sliderWidth={sliderWidth}
					itemWidth={itemWidth}
					inactiveSlideOpacity={0.4}
					contentContainerCustomStyle={styles.sliderContainer}
					onSnapToItem={index => this.setState({ activeSlide: index })}
					removeClippedSubviews={false}
					data={this.state.books}
				/>
				{this.pagination}
			</View>
		);
	}
}
