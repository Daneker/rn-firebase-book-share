import React, { Component } from 'react';
import {
	Text,
	Animated,
	View,
	Image,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';

const ref = firebase.firestore().collection('books');
const refUser = firebase.firestore().collection('users');

export default class BookDetail extends Component {
	state = {
		clicked: false,
		selectedItem: null,
		favorites: [],
		loading: true
	};

	componentDidMount() {
		const bookItem = this.props.navigation.getParam('book');
		const favoritesBooks = this.props.navigation.getParam('favoriteBooks');

		console.log('bookItem', bookItem);
		console.log('favoritesBooks', favoritesBooks);

		const searchResult = favoritesBooks.filter(book => {
			return book == bookItem.data.bookId;
		});

		if (searchResult.length > 0) {
			this.setState({
				isFav: true,
				loading: false,
				book: bookItem,
				favoritesBooks: favoritesBooks
			});
		} else {
			this.setState({
				isFav: false,
				loading: false,
				book: bookItem,
				favoritesBooks: favoritesBooks
			});
		}
	}

	addToFav = bookId => {
		const updatedArray = [...this.state.favoritesBooks, bookId + ''];
		console.log(updatedArray);
		this.setState({ favoritesBooks: updatedArray });
	};

	removeFromFav = bookId => {
		const updatedArray = this.state.favoritesBooks.filter(
			book => book !== bookId + ''
		);
		console.log(updatedArray);
		this.setState({ favoritesBooks: updatedArray });
	};

	onClick = book => {
		if (this.state.isFav) {
			this.removeFromFav(book.data.bookId);
		} else {
			this.addToFav(book.data.bookId);
		}

		this.setState({ isFav: !this.state.isFav });
	};

	renderBanner = book => {
		return (
			<Animated.View style={[styles.header]}>
				<Image source={{ uri: book.bookUrl }} style={styles.imageBackGround} />
				<LinearGradient
					colors={['rgba(51, 51, 51, 0)', 'rgba(51, 51, 51, 0.95)']}
					style={styles.linearGradientBox}
				>
					<Text style={styles.detailDesc}>{book.bookTitle}</Text>
				</LinearGradient>
			</Animated.View>
		);
	};

	renderHeadAddress = () => {
		const location = 'Dinmukhamed Qonayev St 12/1, Астана 010000';
		const open = 'Пн-Пт: 08:00 - 17:00';

		return (
			<View style={{ backgroundColor: 'rgba(51, 51, 51, 0.95)' }}>
				<Text style={styles.subTitle}>Traveler's Coffee</Text>
				<View style={styles.row}>
					<Text style={styles.label}>Адрес</Text>
					<Text style={styles.text}>{location}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Открыто</Text>
					<Text style={styles.text}>{open}</Text>
				</View>
			</View>
		);
	};

	renderContent = book => {
		return (
			<View>
				{this.renderHeadAddress()}
				<View style={styles.boxContent}>
					<Text style={styles.descTitle}>Описание</Text>
					<Text style={styles.content}>{book.bookDesc}</Text>
				</View>
			</View>
		);
	};

	render() {
		const book = this.props.navigation.getParam('book');

		if (this.state.loading) {
			return <View />;
		}

		const { goBack } = this.props.navigation;

		const hitSlop = { top: 15, right: 15, left: 15, bottom: 15 };
		return (
			<View style={styles.body}>
				<ScrollView>
					{this.renderBanner(book)}
					<View style={[styles.shareIcon]}>
						<TouchableOpacity onPress={() => this.onClick(book)}>
							<Icon
								style={styles.newsIcons}
								name={!this.state.isFav ? 'favorite-border' : 'favorite'}
								size={30}
								color={this.state.isFav ? 'red' : '#FFF'}
							/>
						</TouchableOpacity>
					</View>
					{this.renderContent(book)}
				</ScrollView>
				<TouchableOpacity
					style={[styles.fab, { bottom: 15 }]}
					onPress={() => goBack()}
					activeOpacity={0}
					hitSlop={hitSlop}
				>
					<Icon
						color={'#fff'}
						iconStyle={{ backgroundColor: 'transparent' }}
						borderRadius={50}
						backgroundColor={'transparent'}
						name={'clear'}
						size={25}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}
