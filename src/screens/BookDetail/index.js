import React, { Component } from "react";
import {
  Text,
  Animated,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
// import { LinearGradient } from "expo";
import styles from "./styles";
// import { Ionicons, EvilIcons } from "@expo/vector-icons";

// const description =
//   "Tolstoy’s epic novel of love, destiny and self-destruction, in a gorgeous new clothbound edition from Penguin Classics. Anna Karenina seems to have everything – beauty, wealth, popularity and an adored son. But she feels that her life is empty until the moment she encounters the impetuous officer Count Vronsky. Their subsequent affair scandalizes society and family alike and soon brings jealously and bitterness in its wake. Contrasting with this tale of love and self-destruction is the vividly observed story of Levin, a man striving to find contentment and a meaning to his life – and also a self-portrait of Tolstoy himself. This acclaimed modern translation by Richard Pevear and Larissa Volokhonsky won the PEN/ Book of the Month Club Translation Prize in 2001.";

export default class BookDetail extends Component {
  state = {
    clicked: false,
    url: ""
  };

  onClick = book => {
    console.log("Click!");
    this.setState({ clicked: !this.state.clicked });
    console.log(book.url);
  };

  onShare = () => {};

  renderBanner = book => {
    return (
      <Animated.View style={[styles.header]}>
        <Image source={{ uri: book.url }} style={styles.imageBackGround} />
        {/* <LinearGradient
          style={styles.linearGradientBox}
          colors={[
            "rgba(51, 51, 51, 0)",
            "rgba(51, 51, 51, 0.3)",
            "rgba(51, 51, 51, 0.65)",
            "rgba(51, 51, 51, 0.95)"
          ]}
        > */}
        <Text style={styles.detailDesc}>{book.title}</Text>
        {/* </LinearGradient> */}
      </Animated.View>
    );
  };

  renderHeadAddress = () => {
    const location = "Dinmukhamed Qonayev St 12/1, Астана 010000";
    const open = "Пн-Пт: 08:00 - 17:00";

    return (
      <View style={{ backgroundColor: "rgba(51, 51, 51, 0.95)" }}>
        <Text style={styles.subTitle}>Traveler's Coffee</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Локация</Text>
          <Text style={styles.text}>{location}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Открыто</Text>
          <Text style={styles.text}>{open}</Text>
        </View>
      </View>
    );
  };

  renderContent = book => {
    return (
      <View>
        {this.renderHeadAddress()}
        <View style={styles.boxContent}>
          <Text style={styles.descTitle}>Описание</Text>
          <Text style={styles.content}>{book.description}</Text>
        </View>
      </View>
    );
  };

  render() {
    const { goBack } = this.props.navigation;
    const book = this.props.navigation.getParam("book", "default");
    const book3 = this.props.navigation.getParam("book3", "default");
    const hitSlop = { top: 15, right: 15, left: 15, bottom: 15 };
    return (
      <View style={styles.body}>
        <ScrollView>
          {this.renderBanner(book3)}
          <View style={[styles.shareIcon]}>
            <TouchableOpacity onPress={this.onShare}>
              {/* <EvilIcons
                style={styles.newsIcons}
                onPress={this.shareText}
                name="share-google"
                size={35}
                color={"#fff"}
                backgroundColor="transparent"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onClick(book3)}>
              <Ionicons
                style={styles.newsIcons}
                name={!this.state.clicked ? "ios-heart-outline" : "ios-heart"}
                size={30}
                color={this.state.clicked ? "red" : "#FFF"}
                onPress={this.readLater}
                backgroundColor={"transparent"}
              /> */}
            </TouchableOpacity>
          </View>
          {this.renderContent(book)}
        </ScrollView>
        <TouchableOpacity
          style={[styles.fab, { bottom: 15 }]}
          onPress={() => goBack()}
          activeOpacity={0}
          hitSlop={hitSlop}
        >
          {/* <Ionicons
            onPress={() => goBack()}
            color={"#fff"}
            iconStyle={{ backgroundColor: "transparent", left: 5 }}
            borderRadius={50}
            backgroundColor={"transparent"}
            name={"ios-close"}
            size={25}
          /> */}
        </TouchableOpacity>
      </View>
    );
  }
}
