import React, { Component } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  View,
  StyleSheet
} from "react-native";

export default class WriteBook extends Component {
  searchUpdated(text) {
    this.setState({ searchText: text });
  }

  handelUploadButtonPress = () => {};

  onNext = () => {
    this.props.navigation.navigate("GenreCafeScreen");
  };

  static navigationOptions = {
    title: "О Книге",
    headerStyle: {
      backgroundColor: "#fff"
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={{ paddingBottom: 5 }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
              <Text style={styles.title}>Название</Text>
              <TextInput
                style={styles.searchInput}
                multiline={true}
                numberOfLines={4}
              />
              <Text style={styles.title}>Авторы</Text>
              <TextInput
                style={styles.searchInput}
                multiline={true}
                numberOfLines={4}
              />
              <Text style={styles.title}>Описание</Text>
              <TextInput
                style={[styles.searchInput, { minHeight: 120 }]}
                multiline={true}
                numberOfLines={4}
              />
              <TouchableOpacity onPress={this.handelUploadButtonPress}>
                <Image
                  style={styles.imageComponentStyle}
                  source={{
                    uri:
                      "http://squamafoils.com/wp-content/uploads/2015/07/import_placeholder.png"
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.btnLogIn} onPress={this.onNext}>
          <Text style={styles.btnLogInText}>Дальше</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  imageComponentStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 340,
    backgroundColor: "white",
    width: 240,
    borderRadius: 20,
    paddingBottom: 10,
    paddingTop: 10,
    alignSelf: "center",
    marginTop: 10
  },
  searchInput: {
    padding: 10,
    borderColor: "#CCC",
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
  btnLogIn: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(72,194,172)",
    paddingTop: 12,
    paddingRight: 40,
    paddingBottom: 12,
    paddingLeft: 40,
    marginBottom: 14,
    borderRadius: 25,
    width: 300
  },
  btnLogInText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14
  },
  title: {
    paddingRight: 20,
    marginLeft: 20,
    color: "gray",
    fontSize: 14,
    fontFamily: "Montserrat"
  }
});
