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
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
export default class CategoryDetail extends Component {
	renderItem = (item, index) => {
		// console.log('renderitem', item);
		return (
			<TouchableOpacity
				activeOpacity={0.9}
				style={styles.panel}
				onPress={() => this.showBook(item)}
			>
				<Image source={{ uri: item.item.bookUrl }} style={styles.imagePanel} />
				<LinearGradient
					style={styles.linearGradient}
					colors={['rgba(0,0,0, 0)', 'rgba(0, 0, 0, 0.5 )']}
				/>
				<View style={styles.titleView}>
					<Text style={styles.title}>{item.item.bookTitle}</Text>
					<Text numberOfLines={2} style={styles.subText}>
						{item.item.bookAuthor}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};

	showBook = item => {
		this.props.navigation.navigate('BookDetail', { book: item.item });
	};

	keyExtractor = (item, index) => index.toString();

	render() {
		const item = this.props.navigation.getParam('category', 'default');
		const header = this.props.navigation.getParam('header', 'default');
		console.log('itemmmmm', item);
		return (
			<View style={styles.container}>
				<Text style={styles.headerLabel}>{header}</Text>
				<ScrollView>
					<FlatList
						data={item}
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
