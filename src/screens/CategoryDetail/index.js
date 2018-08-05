import React, { Component } from "react";
import {
  Image,
  FlatList,
  ScrollView,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import books from "../Home/bookArray";
import styles from "./styles";
// import { LinearGradient, Constants } from "expo";

export default class CategoryDetail extends Component {
  renderItem = (item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.panel}
        onPress={() => this.showBook(item)}
      >
        <Image source={{ uri: item.item.url }} style={styles.imagePanel} />
        {/* <LinearGradient
          style={styles.linearGradient}
          colors={["rgba(0,0,0, 0)", "rgba(0, 0, 0, 0.5 )"]}
        /> */}
        <View style={styles.titleView}>
          <Text style={styles.title}>Some Title</Text>
          <Text numberOfLines={2} style={styles.subText}>
            Some Author
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  showBook = item => {
    this.props.navigation.navigate("BookDetail", { book3: item.item });
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View
        style={[
          {
            flex: 1,
            backgroundColor: "#fff",
            // paddingTop: Constants.statusBarHeight
          }
        ]}
      >
        <Text style={styles.headerLabel}>Жанр</Text>
        <ScrollView>
          <FlatList
            data={books}
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
