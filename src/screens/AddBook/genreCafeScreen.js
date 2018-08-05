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
import SearchableDropdown from "react-native-searchable-dropdown";

const genres = [
  {
    id: 1,
    name: "Javascript"
  },
  {
    id: 2,
    name: "Java"
  },
  {
    id: 3,
    name: "Ruby"
  },
  {
    id: 4,
    name: "React Native"
  },
  {
    id: 5,
    name: "PHP"
  },
  {
    id: 6,
    name: "Python"
  },
  {
    id: 7,
    name: "Go"
  },
  {
    id: 8,
    name: "Swift"
  }
];

const cafes = [
  {
    id: 1,
    name: "Traveler's Coffee"
  },
  {
    id: 2,
    name: "Nedelka"
  },
  {
    id: 4,
    name: "Coffe Boom"
  }
];

export default class GenreCafe extends Component {
  state = {
    genre: "",
    cafe: ""
  };

  onShareBook = () => {};

  static navigationOptions = {
    title: "Поделиться",
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
              <Text style={[styles.title, { paddingTop: 50 }]}>
                Выберите жанр
              </Text>
              <SearchableDropdown
                onTextChange={text => alert(text)}
                onItemSelect={item => alert(JSON.stringify(item))}
                containerStyle={{
                  padding: 5
                }}
                textInputStyle={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 20
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: "#ddd",
                  borderColor: "#bbb",
                  borderWidth: 1,
                  borderRadius: 20
                }}
                itemTextStyle={{
                  color: "#222"
                }}
                items={genres}
                defaultIndex={2}
                // resetValue={false}
                underlineColorAndroid="transparent"
              />
              <Text style={[styles.title, { paddingTop: 50 }]}>
                Выберите кофейню
              </Text>
              <SearchableDropdown
                onItemSelect={item => this.setState({ cafe: item })}
                containerStyle={{
                  padding: 5
                }}
                textInputStyle={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 20
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: "#ddd",
                  borderColor: "#bbb",
                  borderWidth: 1,
                  borderRadius: 20
                }}
                itemTextStyle={{
                  color: "#222"
                }}
                itemsContainerStyle={{
                  maxHeight: 140
                }}
                items={cafes}
                defaultIndex={2}
                resetValue={false}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.btnLogIn} onPress={this.onShareBook}>
          <Text style={styles.btnLogInText}>Поделиться Книгой</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  searchInput: {
    padding: 10,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 20,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    width: 340,
    paddingBottom: 30,
    marginBottom: 60
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
    fontSize: 16,
    fontFamily: "Montserrat"
  }
});
