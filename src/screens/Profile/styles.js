import { StyleSheet, Dimensions, Platform } from 'react-native';

const styles = StyleSheet.create({
	panel: {
		flex: 1,
		borderRadius: 8,
		backgroundColor: '#fff'
	},
	imagePanel: {
		borderRadius: 8,
		alignItems: 'center',
		marginLeft: 12,
		marginRight: 5,
		shadowColor: '#000',
		shadowOpacity: 0.2,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 2 },
		width: 150,
		height: 207
	},
	titleView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		left: 20,
		bottom: 10
	},
	title: {
		fontSize: 17,
		color: 'white',
		// fontFamily: "MontserratBold",
		marginRight: 20,
		shadowColor: '#000',
		shadowOpacity: 0.5,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 4 }
	},
	headerTitle: {
		marginTop: 20,
		marginBottom: 12,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginLeft: 10
	},
	headerText: {
		fontSize: 22,
		color: '#333',
		letterSpacing: 0.5
		// fontFamily: "MontserratBold"
	},
	linearGradient: {
		height: 60,
		position: 'absolute',
		bottom: -2,
		left: 12,
		borderRadius: 8,
		justifyContent: 'flex-end',
		width: 150
	},
	cardContainer: {
		backgroundColor: '#FFF',
		borderWidth: 0,
		flex: 1,
		margin: 0,
		padding: 0
	},
	container: {
		flex: 1
	},
	book: {
		width: 35,
		height: 35,
		marginLeft: 5,
		marginRight: 5
	},
	headerContainer: {
		paddingBottom: 15,
		paddingTop: 40
	},
	headerColumn: {
		backgroundColor: 'transparent',
		...Platform.select({
			ios: {
				alignItems: 'center',
				elevation: 1,
				marginTop: -1
			},
			android: {
				alignItems: 'center'
			}
		})
	},
	placeIcon: {
		color: '#000',
		fontSize: 20
	},
	userAddressRow: {
		alignItems: 'center',
		flexDirection: 'row'
	},
	userCityRow: {
		backgroundColor: 'transparent'
	},
	userCityText: {
		color: '#A5A5A5',
		fontSize: 14,
		// fontWeight: '600',
		textAlign: 'center'
		// fontFamily: 'Montserrat'
	},
	userImage: {
		borderColor: 'rgb(27, 229, 141)',
		borderRadius: 65,
		borderWidth: 3,
		height: 130,
		marginBottom: 15,
		width: 130
	},
	userNameText: {
		color: '#000',
		fontSize: 22,
		// fontFamily: 'Montserrat',
		paddingBottom: 8,
		textAlign: 'center'
	},
	body: {
		flex: 1,
		paddingRight: 0,
		paddingBottom: 0,
		paddingLeft: 0,
		position: 'absolute',
		top: 50,
		zIndex: 9999,
		justifyContent: 'center',
		alignItems: 'center'
		// backgroundColor: 'gray'
	},
	tab: {
		paddingBottom: 0,
		borderBottomWidth: 0,
		paddingTop: 0,
		paddingLeft: 0,
		paddingRight: 0
	},
	activeTab: {
		height: 0,
		backgroundColor: '#FFFFFF'
	},
	textTab: {
		fontWeight: '200',
		fontSize: 22
	},
	toolbar: {
		left: 14,
		alignSelf: 'flex-start'
	},
	wishlist: {
		fontSize: 20,
		color: 'rgb(27, 229, 141)',
		fontFamily: 'MontserratLight',
		alignSelf: 'center'
	},
	shareIcon: {
		flexDirection: 'row',
		width: 100,
		position: 'absolute',
		right: -50,
		top: -2
	},
	newsIcons: {
		marginLeft: 2,
		paddingTop: 3,
		paddingRight: 5,
		paddingBottom: 8,
		paddingLeft: 5,
		width: 20,
		height: 20
	}
});
export default styles;
