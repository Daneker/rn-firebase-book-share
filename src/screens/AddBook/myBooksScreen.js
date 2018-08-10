import React, { Component } from 'react';
import {
	Image,
	FlatList,
	ScrollView,
	View,
	TouchableOpacity,
	Text
} from 'react-native';
import books from '../Home/bookArray';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';

export default class MyBooks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			books: [],
			loading: false
		};
		this.ref = firebase.firestore().collection('books');
	}

	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(snapshot => {
			var books = [];
			snapshot.forEach(doc => {
				books.push({
					bookTitle: doc.data().title,
					bookAuthor: doc.data().authors,
					bookUrl: doc.data().imageUrl
				});
			});
			this.setState({
				books: books,
				loading: false
			});
			console.log(this.state.books);
		});
	}

	renderItem = ({ item, index }) => {
		console.log(item);
		console.log(item.bookUrl);
		return (
			<TouchableOpacity
				activeOpacity={0.9}
				style={styles.panel}
				// onPress={() => this.showBook(item)}
			>
				<Image source={{ uri: item.bookUrl }} style={styles.imagePanel} />
				<LinearGradient
					style={styles.linearGradient}
					colors={['rgba(0,0,0, 0)', 'rgba(0, 0, 0, 0.5 )']}
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

	keyExtractor = (item, index) => index.toString();

	render() {
		return (
			<View
				style={[
					{
						flex: 1,
						backgroundColor: '#fff'
						// paddingTop: Constants.statusBarHeight
					}
				]}
			>
				<ScrollView>
					<FlatList
						data={this.state.books}
						horizontal={false}
						keyExtractor={this.keyExtractor}
						renderItem={this.renderItem}
						numColumns={2}
					/>
				</ScrollView>
			</View>
		);
	}
}

import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

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
	}
});
