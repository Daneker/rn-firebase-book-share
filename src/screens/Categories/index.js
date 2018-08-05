import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  ScrollView
} from "react-native";
// import { LinearGradient, Constants } from "expo";
import categories from "./categoriArray";
import styles from "./styles";
import SearchBar from "./SearchBar";

export default class Categories extends Component {
  renderHeader = title => {
    return (
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    );
  };

  showCategory = item => {
    this.props.navigation.navigate("CategoryDetail");
    console.log(item);
  };

  renderCollectionItem = (item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.panel}
        onPress={() => this.showCategory(item)}
      >
        <Image source={item.item.url} style={styles.imagePanel} />
        {/* <LinearGradient
          style={styles.linearGradient}
          colors={["rgba(0,0,0, 0)", "rgba(0, 0, 0, 0.5 )"]}
        /> */}
        <View style={styles.titleView}>
          <Text style={styles.title}>{item.item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = (item, index) => index.toString();
  render() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          paddingTop: 20
        }}
      >
        <SearchBar />
        <ScrollView style={{ backgroundColor: "#fff" }}>
          {this.renderHeader("Жанры")}
          <FlatList
            data={categories}
            horizontal={true}
            keyExtractor={this.keyExtractor}
            renderItem={(item, index) => this.renderCollectionItem(item, index)}
          />
          {this.renderHeader("Кофейни")}
          <FlatList
            data={categories}
            horizontal={true}
            keyExtractor={this.keyExtractor}
            renderItem={(item, index) => this.renderCollectionItem(item, index)}
          />
        </ScrollView>
      </View>
    );
  }
}
