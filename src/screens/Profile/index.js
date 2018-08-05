import React, { Component } from "react";
import { Image, TouchableOpacity, View, Text, FlatList } from "react-native";

import { Icon } from "react-native-elements";
// import { LinearGradient } from "expo";
import styles from "./styles";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import books from "./bookArray";

export default class Categories extends Component {
  renderHeader = title => {
    return (
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    );
  };

  showCategory = () => {
    // this.props.navigation.navigate("CategoryDetail");
  };

  onLogin = () => {
    this.props.navigation.navigate("LoginScreen");
  };
  renderCollectionItem = (item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.panel}
        onPress={this.showCategory}
      >
        <Image source={{ uri: item.item.url }} style={styles.imagePanel} />
        {/* <LinearGradient
          style={styles.linearGradient}
          colors={["rgba(0,0,0, 0)", "rgba(0, 0, 0, 0.5 )"]}
        /> */}
        <View style={styles.titleView}>
          <Text style={styles.title}>Название</Text>
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = (item, index) => index.toString();
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.headerContainer]}>
          <View style={[styles.shareIcon]}>
            <TouchableOpacity onPress={this.onLogin}>
              <Image
                source={require("../../assets/icons/icon-user.png")}
                style={styles.newsIcons}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={require("../../assets/icons/profile.png")}
            />
            <Text style={styles.userNameText}>Some Name</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  onPress={this.onPressPlace}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>Город, Страна</Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", paddingTop: 10, marginTop: 10 }}
            >
              <Image
                style={{ width: 35, height: 35, marginLeft: 5, marginRight: 5 }}
                source={require("../../assets/icons/star-fill.png")}
              />
              <Image
                style={{ width: 35, height: 35, marginLeft: 5, marginRight: 5 }}
                source={require("../../assets/icons/star-fill.png")}
              />
              <Image
                style={{ width: 35, height: 35, marginLeft: 5, marginRight: 5 }}
                source={require("../../assets/icons/star-fill.png")}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#F6F7F8",
            paddingTop: 10,
            paddingBottom: 7,
            alignItems: "center",
            borderColor: "gray",
            borderWidth: 0.2
          }}
        >
          <Text style={styles.wishlist}>Предпочитаю</Text>
        </View>
        <ScrollableTabView
          initialPage={0}
          locked={false}
          tabBarUnderlineStyle={styles.activeTab}
          tabBarActiveTextColor="rgb(27, 229, 141)"
          tabBarInactiveTextColor="rgba(0, 0, 0, 0.4)"
          tabBarTextStyle={styles.textTab}
          style={{ backgroundColor: "#F6F7F8" }}
          renderTabBar={() => (
            <ScrollableTabBar
              underlineHeight={0}
              style={{ borderBottomColor: "transparent" }}
              tabsContainerStyle={{ paddingLeft: 0, paddingRight: 0 }}
              tabStyle={styles.tab}
            />
          )}
        >
          <View tabLabel="Нравится">
            <View style={{ backgroundColor: "#F6F7F8" }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={books}
                horizontal={true}
                keyExtractor={this.keyExtractor}
                renderItem={(item, index) =>
                  this.renderCollectionItem(item, index)
                }
              />
            </View>
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}
