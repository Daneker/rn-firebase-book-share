import React, { Component, Fragment } from 'react';
import {
	Image,
	FlatList,
	ScrollView,
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
	Dimensions
} from 'react-native';
import books from '../Home/bookArray';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';

const { height, width } = Dimensions.get('window');

const TICK =
	'https://cdn.pixabay.com/photo/2014/04/02/11/01/tick-305245_640.png';

export default class PublishBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			books: [],
			loading: false,
			selectedItem: null
		};
		this.ref = firebase.firestore().collection('books');
	}

	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(snapshot => {
			var books = [];
			snapshot.forEach(doc => {
				if (!doc.data().isPublished) {
					books.push({
						id: doc.data().bookId,
						key: doc.ref.id,
						bookTitle: doc.data().title,
						bookAuthor: doc.data().authors,
						bookUrl: doc.data().imageUrl,
						ticked: false
					});
				}
			});
			this.setState({
				books: books,
				loading: false,
				picked: false
			});
		});
	}

	renderBook = item => {
		const { selectedItem } = this.state;
		let newValue;

		if (selectedItem) {
			newValue = selectedItem.id;
		}

		return (
			<Fragment>
				<Image source={{ uri: item.bookUrl }} style={styles.imagePanel} />
				{item.id === newValue && (
					<Image
						source={{
							uri: TICK
						}}
						style={{
							width: 24,
							height: 24,
							position: 'absolute',
							top: 10,
							right: 28
						}}
					/>
				)}
			</Fragment>
		);
	};

	renderItem = ({ item, index }) => {
		return (
			<TouchableOpacity
				activeOpacity={0.9}
				style={styles.panel}
				onPress={() => this.updateBooks(item)}
			>
				{this.renderBook(item)}
				<LinearGradient
					style={styles.linearGradient}
					colors={['rgba(0,0,0, 0)', 'rgba(0, 0, 0, 0.9 )']}
				/>
				<View style={styles.titleView}>
					<Text style={styles.title}>{item.bookTitle}</Text>
					<Text numberOfLines={2} style={styles.subText}>
						{item.bookAuthor}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};

	updateBooks = item => {
		this.setState({ selectedItem: item });
	};

	keyExtractor = (item, index) => index.toString();

	showBook = () => {
		const { selectedItem } = this.state;
		this.ref.doc(selectedItem.key).update({
			bookId: selectedItem.id,
			title: selectedItem.bookTitle,
			authors: selectedItem.bookAuthor,
			imageUrl: selectedItem.bookUrl,
			isPublished: true
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.headerLabel}>Мои книги</Text>
				<ScrollView>
					<FlatList
						data={this.state.books}
						horizontal={false}
						keyExtractor={this.keyExtractor}
						renderItem={this.renderItem}
						numColumns={2}
						extraData={this.state}
					/>
				</ScrollView>
				<TouchableOpacity style={styles.btnLogIn} onPress={this.showBook}>
					<Text style={styles.btnLogInText}>Поделиться Книгой</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	panel: {
		flex: 1,
		marginBottom: 15,
		borderRadius: 8,
		paddingLeft: 15,
		paddingRight: 15
	},
	imagePanel: {
		borderRadius: 8,
		alignItems: 'center',
		marginLeft: 'auto',
		marginRight: 'auto',
		shadowColor: '#000',
		shadowOpacity: 0.2,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 2 },
		width: '100%',
		height: 200,
		position: 'relative'
	},
	titleView: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
		position: 'absolute',
		left: 20,
		bottom: 15
	},
	title: {
		fontSize: 14,
		color: '#fff',
		fontFamily: 'Montserrat',
		fontWeight: 'bold',
		marginRight: 20,
		shadowColor: '#000',
		shadowOpacity: 0.5,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 4 }
	},
	linearGradient: {
		height: 60,
		position: 'absolute',
		bottom: 0,
		left: 15,
		borderRadius: 8,
		justifyContent: 'flex-end',
		width: '100%'
	},
	headerLabel: {
		color: '#333',
		fontSize: 28,
		fontFamily: 'Montserrat',
		alignSelf: 'center',
		paddingBottom: 20,
		paddingTop: 10
	},
	subText: {
		fontSize: 10,
		color: '#fff',
		marginTop: 4,
		fontFamily: 'Montserrat',
		alignItems: 'flex-start',
		marginRight: 22,
		shadowColor: '#000',
		shadowOpacity: 0.5,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 4 }
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
		marginTop: 6,
		marginBottom: 8,
		borderRadius: 8,
		width: 300,
		alignSelf: 'center'
	},
	btnLogInText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 14
	}
});
