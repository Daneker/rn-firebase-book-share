import React, { Fragment } from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

export const TextField = ({ title, setText, value, style }) => {
	return (
		<Fragment>
			<Text style={styles.title}>{title}</Text>
			<TextInput
				style={[styles.searchInput, style]}
				value={value}
				multiline={true}
				numberOfLines={4}
				onChangeText={setText}
			/>
		</Fragment>
	);
};

const styles = StyleSheet.create({
	searchInput: {
		padding: 10,
		borderColor: '#CCC',
		borderWidth: 1,
		borderRadius: 20,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
		margin: 10,
		marginBottom: 20,
		width: 340
	},
	title: {
		paddingRight: 20,
		marginLeft: 20,
		color: 'gray',
		fontSize: 14,
		fontFamily: 'Montserrat'
	}
});
