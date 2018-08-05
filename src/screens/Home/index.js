import React, { Component } from "react";
import { Image, View, TouchableOpacity, Dimensions, Text } from "react-native";
import books from "./bookArray";
import styles from "./styles";
import Carousel from "react-native-snap-carousel";
// import { LinearGradient, Constants } from "expo";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(75);
const slideHeight = viewportHeight * 0.65;
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const slideInnerContainer = {
  width: itemWidth,
  height: slideHeight,
  borderRadius: 6,
  overflow: "hidden",
  paddingHorizontal: itemHorizontalMargin,
  paddingBottom: 18 // needed for shadow
};

export default class Home extends Component {
  showBook = item => {
    console.log("item", item);
    this.props.navigation.navigate("BookDetail", { book: item });
  };

  renderItem = ({ item, index }) => {
    console.log("renderItem", item);
    const image = item.url;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          // paddingTop: Constants.statusBarHeight
        }}
      >
        <View style={slideInnerContainer}>
          {/* <LinearGradient
            style={[styles.linearGradient, { width: itemWidth }]}
            colors={["rgba(0,0,0, 0)", "rgba(0, 0, 0, 0.8)"]}
          /> */}
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.showBook(item)}
            style={styles.titleView}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text numberOfLines={2} style={styles.count}>
              {item.author}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={[{ flex: 1, backgroundColor: "#fff" }]}>
        <Text style={styles.headerLabel}>Новые Книги</Text>
        <Carousel
          layout={"stack"}
          layoutCardOffset={18}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideOpacity={0.4}
          contentContainerCustomStyle={styles.sliderContainer}
          removeClippedSubviews={false}
          loop={true}
          data={books}
        />
      </View>
    );
  }
}
