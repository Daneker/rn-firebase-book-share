import React, { Component } from 'react';
import { Text, View } from 'react-native';
import ScrollableTabView, {
	ScrollableTabBar
} from 'react-native-scrollable-tab-view';
// import DropdownAlert from "react-native-dropdownalert";
import styles from './style';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default class LogIn extends Component {
	onNavigate = () => {
		this.props.navigation.navigate('ProfileScreen');
	};

	render() {
		return (
			<View style={styles.body}>
				<ScrollableTabView
					initialPage={0}
					locked={false}
					tabBarUnderlineStyle={styles.activeTab}
					tabBarActiveTextColor="rgb(27, 229, 141)"
					tabBarInactiveTextColor="rgba(0, 0, 0, 0.4)"
					tabBarTextStyle={styles.textTab}
					renderTabBar={() => (
						<ScrollableTabBar
							underlineHeight={0}
							style={{ borderBottomColor: 'transparent' }}
							tabsContainerStyle={{ paddingLeft: 0, paddingRight: 0 }}
							tabStyle={styles.tab}
						/>
					)}
				>
					<SignIn tabLabel="Sign In" navigate={this.onNavigate} />
					<SignUp tabLabel="Sign Up" navigate={this.onNavigate} />
				</ScrollableTabView>
			</View>
		);
	}
}
