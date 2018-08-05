import React, { Component } from "react";
import { Image } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  SwitchNavigator
} from "react-navigation";
import BookDetail from "../screens/BookDetail";
import Categories from "../screens/Categories";
import CategoryDetail from "../screens/CategoryDetail";
import Home from "../screens/Home";
import LogIn from "../screens/Login";
import Profile from "../screens/Profile";
import FindBook from "../screens/AddBook/findScreen";
import EditBook from "../screens/AddBook/editScreen";
import WriteBook from "../screens/AddBook/writeSelfScreen";
import GenreCafe from "../screens/AddBook/genreCafeScreen";

export default class Router extends Component {
  render() {
    return <SignedIn />;
  }
}

const HomeStack = createStackNavigator(
  {
    HomeScreen: { screen: Home },
    BookDetail: { screen: BookDetail }
  },
  { headerMode: "none" }
);

const CategoryStack = createStackNavigator(
  {
    Categories: { screen: Categories },
    CategoryDetail: { screen: CategoryDetail },
    BookDetail: { screen: BookDetail }
  },
  { headerMode: "none" }
);

const AddBookStack = createStackNavigator(
  {
    FindScreen: { screen: FindBook },
    EditScreen: { screen: EditBook },
    WriteScreen: { screen: WriteBook },
    GenreCafeScreen: { screen: GenreCafe }
  }
  // { headerStyle: "none" }
);

const ProfileStack = createStackNavigator(
  {
    ProfileScreen: { screen: Profile },
    LoginScreen: { screen: LogIn }
  },
  { headerMode: "none" }
);

export const SignedOut = createStackNavigator(
  {
    Login: { screen: LogIn }
  },
  { headerMode: "none" }
);

export const SignedIn = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Image
            style={{ width: 20, height: 18, resizeMode: "contain" }}
            source={
              focused
                ? require("../assets/icons/tab-home-focused.png")
                : require("../assets/icons/tab-home.png")
            }
          />
        )
      }
    },
    SearchScreen: {
      screen: CategoryStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Image
            style={{ width: 20, height: 18, resizeMode: "contain" }}
            source={
              focused
                ? require("../assets/icons/tab-category-focused.png")
                : require("../assets/icons/tab-category.png")
            }
          />
        )
      }
    },
    AddBookScreen: {
      screen: AddBookStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Image
            style={{ width: 20, height: 18, resizeMode: "contain" }}
            source={
              focused
                ? require("../assets/icons/tab-add-focused.png")
                : require("../assets/icons/tab-add.png")
            }
          />
        )
      }
    },
    ProfileScreen: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Image
            style={{ width: 20, height: 18, resizeMode: "contain" }}
            source={
              focused
                ? require("../assets/icons/tab-user-focused.png")
                : require("../assets/icons/tab-user.png")
            }
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        height: 49,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 0.5,
        borderTopColor: "#eee"
        // backgroundColor: '#fff'
      }
    }
  }
);

// const signedIn = false; //need to update

// export const createRootNavigator = SwitchNavigator(
//   {
//     SignedIn: { screen: SignedIn },
//     SignedOut: { screen: SignedOut }
//   }
//   // { initialRouteName: signedIn ? "SignedIn" : "SignedOut" }
// );
