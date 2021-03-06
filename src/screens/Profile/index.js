import React, { Component } from 'react';
import {
	Image,
	TouchableOpacity,
	View,
	Text,
	FlatList,
	AsyncStorage,
	ScrollView
} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import styles from './styles';
import books from './bookArray';

const resetAction = StackActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })]
});

const ref = firebase.firestore().collection('users');
const refBooks = firebase.firestore().collection('books');

export default class Categories extends Component {
	state = {
		loading: true,
		user: ''
	};

	componentDidMount() {
		this.fetchAllBooks();
		this.fetchUser();
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
						docs: currentUser,
						favoritesBooks: currentUser.data.favorites,
						loading: false
					});
				});
			} else {
				this.props.navigation.dispatch(resetAction);
			}
		});
	};

	onLogin = () => {
		firebase
			.auth()
			.signOut()
			.then(
				() => {
					this.props.navigation.dispatch(resetAction);
				},
				error => {
					console.log(error);
				}
			);
	};

	renderCollectionItem = (item, index) => {
		const bookItem = this.state.books.filter(
			book => book.data.bookId == item.item
		)[0];

		if (bookItem) {
			return (
				<TouchableOpacity activeOpacity={0.9} style={styles.panel}>
					<Image source={{ uri: bookItem.bookUrl }} style={styles.imagePanel} />
					<LinearGradient
						style={styles.linearGradient}
						colors={['rgba(0,0,0, 0)', 'rgba(0, 0, 0, 0.5 )']}
					/>
					<View style={styles.titleView}>
						<Text style={styles.title}>{bookItem.bookAuthor}</Text>
					</View>
				</TouchableOpacity>
			);
		}
	};

	renderStars = () => {
		return (
			<View style={{ flexDirection: 'row', marginTop: 10 }}>
				<Image
					style={{ width: 35, height: 35, marginLeft: 5, marginRight: 5 }}
					source={require('../../assets/icons/star-fill.png')}
				/>
				<Image
					style={{ width: 35, height: 35, marginLeft: 5, marginRight: 5 }}
					source={require('../../assets/icons/star-fill.png')}
				/>
				<Image
					style={{ width: 35, height: 35, marginLeft: 5, marginRight: 5 }}
					source={require('../../assets/icons/star-fill.png')}
				/>
			</View>
		);
	};

	renderHeader = () => {
		return (
			<View style={{ alignItems: 'center', marginVertical: 25 }}>
				<View style={{ position: 'absolute', top: 0, right: 20 }}>
					<Icons name="log-out" size={28} color="grey" onPress={this.onLogin} />
				</View>
				<Image
					style={styles.userImage}
					source={require('../../assets/icons/profile.png')}
				/>
				<Text style={styles.userNameText}>{this.state.docs.data.name}</Text>
				<Text style={styles.userNameText}>{this.state.docs.data.mail}</Text>
				{this.renderStars()}
			</View>
		);
	};

	keyExtractor = (item, index) => index.toString();
	render() {
		// const user = this.props.navigation.getParam('username');

		if (this.state.loading) {
			return (
				<View
					style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				>
					<Text>Загрузка</Text>
				</View>
			);
		}

		return (
			<View style={{ flex: 1 }}>
				<View style={{ flex: 5 }}>{this.renderHeader()}</View>
				<View
					style={{
						flex: 5,
						backgroundColor: 'white'
					}}
				>
					<View style={{ paddingTop: 25 }}>
						<FlatList
							showsHorizontalScrollIndicator={false}
							data={this.state.favoritesBooks}
							horizontal={true}
							keyExtractor={this.keyExtractor}
							renderItem={this.renderCollectionItem}
						/>
					</View>
				</View>
			</View>
		);
	}
}
